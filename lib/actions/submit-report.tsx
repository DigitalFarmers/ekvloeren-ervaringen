"use server"

import { revalidatePath } from "next/cache"

import { sql, type Report, type ReportFile, type ReportStatus } from "@/lib/db"
import { reportSchema, checkForModeration } from "@/lib/validations/report"
import { put } from "@vercel/blob"

export interface SubmitReportResult {
  success: boolean
  message: string
  reportId?: string
}

export async function submitReport(formData: FormData): Promise<SubmitReportResult> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      city: formData.get("city") as string,
      dateOfIncident: formData.get("dateOfIncident") as string,
      amount: formData.get("amount") as string,
      paymentMethod: formData.get("paymentMethod") as string,
      description: formData.get("description") as string,
      socialProfileUrl: formData.get("socialProfileUrl") as string,
      consent: formData.get("consent") === "true",
      linkToOthers: formData.get("linkToOthers") === "true",
    }

    const validation = reportSchema.safeParse(rawData)
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.errors[0]?.message || "Validatiefout",
      }
    }

    const data = validation.data

    // Check for moderation flags
    const moderationCheck = checkForModeration(data.description)
    const initialStatus: ReportStatus = moderationCheck.shouldFlag ? "needs_info" : "pending"

    // Insert report
    const result = await sql`
      INSERT INTO reports (
        name, contact, city, date_of_incident, amount, payment_method,
        description, social_profile_url, consent, link_to_others, status, internal_notes
      ) VALUES (
        ${data.name || null},
        ${data.contact},
        ${data.city || null},
        ${data.dateOfIncident || null},
        ${data.amount ? Number.parseFloat(data.amount) : null},
        ${data.paymentMethod || null},
        ${data.description},
        ${data.socialProfileUrl || null},
        ${data.consent},
        ${data.linkToOthers || false},
        ${initialStatus},
        ${moderationCheck.reason ? `Auto-flag: ${moderationCheck.reason}` : null}
      )
      RETURNING id
    `

    const reportId = result[0]?.id as string

    // Handle file uploads
    const files = formData.getAll("files") as File[]
    for (const file of files) {
      if (file.size > 0) {
        try {
          const blob = await put(`reports/${reportId}/${file.name}`, file, {
            access: "public",
          })

          await sql`
            INSERT INTO report_files (report_id, file_name, file_url, file_size, file_type)
            VALUES (${reportId}, ${file.name}, ${blob.url}, ${file.size}, ${file.type})
          `
        } catch (uploadError) {
          console.error("File upload error:", uploadError)
        }
      }
    }

    // Send confirmation email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      const fromEmail = "meld@ekvloeren-ervaringen.nl"

      try {
        // 1. Send confirmation to user
        if (data.contact.includes("@")) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: data.contact,
              subject: "Bevestiging van je melding - EK Vloeren Ervaringen",
              html: `
                <h2>Bedankt voor je melding</h2>
                <p>We hebben je melding succesvol ontvangen.</p>
                <p><strong>Referentienummer:</strong> ${reportId}</p>
                <p>We nemen contact met je op als we meer informatie nodig hebben.</p>
                <br>
                <p>Met vriendelijke groet,<br>EK Vloeren Ervaringen</p>
              `,
            }),
          })
        }

        // 2. Send notification to admin
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: "meld@ekvloeren-ervaringen.nl",
            subject: `Nieuwe melding: ${data.name || 'Anoniem'}`,
            html: `
              <h2>Nieuwe melding ontvangen</h2>
              <p><strong>Naam:</strong> ${data.name}</p>
              <p><strong>Stad:</strong> ${data.city}</p>
              <p><strong>Bedrag:</strong> €${data.amount}</p>
              <p><strong>Datum incident:</strong> ${data.dateOfIncident}</p>
              <p><strong>Beschrijving:</strong></p>
              <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #333;">${data.description}</blockquote>
              <br>
              <p><a href="https://ekvloeren-ervaringen.nl/admin">Ga naar admin dashboard</a></p>
            `,
          }),
        })

      } catch (emailError) {
        console.error("Email error:", emailError)
      }
    }

    return {
      success: true,
      message: "Melding succesvol ingediend",
      reportId,
    }
  } catch (error) {
    console.error("Submit report error:", error)
    return {
      success: false,
      message: "Er is een fout opgetreden bij het indienen van je melding. Probeer het later opnieuw.",
    }
  }
}

export async function createManualReport(data: any): Promise<void> {
  try {
    await sql`
      INSERT INTO reports (
        name, contact, city, date_of_incident, amount, 
        description, status, internal_notes
      ) VALUES (
        ${data.name || null},
        ${data.contact},
        ${data.city || null},
        ${data.dateOfIncident || null},
        ${data.amount ? Number.parseFloat(data.amount) : null},
        ${data.description},
        ${data.status},
        'Handmatig toegevoegd via dashboard'
      )
    `
    revalidatePath("/admin")
    revalidatePath("/")
  } catch (error) {
    console.error("Error creating manual report:", error)
    throw error
  }
}

export async function getReports(status: ReportStatus | "all" = "all", query = ""): Promise<any[]> {
  try {
    let reports
    if (status === "all") {
      if (query) {
        reports = await sql`
          SELECT * FROM reports 
          WHERE (name ILIKE ${`%${query}%`} OR contact ILIKE ${`%${query}%`} OR city ILIKE ${`%${query}%`})
          ORDER BY created_at DESC
        `
      } else {
        reports = await sql`SELECT * FROM reports ORDER BY created_at DESC`
      }
    } else {
      if (query) {
        reports = await sql`
          SELECT * FROM reports 
          WHERE status = ${status} 
          AND (name ILIKE ${`%${query}%`} OR contact ILIKE ${`%${query}%`} OR city ILIKE ${`%${query}%`})
          ORDER BY created_at DESC
        `
      } else {
        reports = await sql`SELECT * FROM reports WHERE status = ${status} ORDER BY created_at DESC`
      }
    }

    // Enrich with files
    const reportsWithFiles = await Promise.all(
      reports.map(async (report) => {
        const files = await sql`SELECT * FROM report_files WHERE report_id = ${report.id}`
        return { ...report, files }
      }),
    )

    return reportsWithFiles
  } catch (error) {
    console.error("Error fetching reports:", error)
    return []
  }
}

export async function updateReportStatus(
  reportId: string,
  newStatus: ReportStatus,
  linkToReportId?: string,
): Promise<void> {
  try {
    await sql`
      UPDATE reports 
      SET status = ${newStatus}, link_to_report_id = ${linkToReportId || null}
      WHERE id = ${reportId}
    `
    revalidatePath("/admin")
    revalidatePath("/")
  } catch (error) {
    console.error("Error updating status:", error)
    throw error
  }
}

export async function updateReportNotes(reportId: string, notes: string): Promise<void> {
  try {
    await sql`
      UPDATE reports 
      SET internal_notes = ${notes}
      WHERE id = ${reportId}
    `
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error updating notes:", error)
    throw error
  }
}

export async function deleteReport(reportId: string): Promise<void> {
  try {
    // Delete files from storage would go here ideally
    await sql`DELETE FROM report_files WHERE report_id = ${reportId}`
    await sql`DELETE FROM reports WHERE id = ${reportId}`
    revalidatePath("/admin")
    revalidatePath("/")
  } catch (error) {
    console.error("Error deleting report:", error)
    throw error
  }
}

export async function getApprovedCount(): Promise<number> {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM reports WHERE status = 'approved'`
    return Number.parseInt(result[0]?.count as string) || 0
  } catch {
    return 0
  }
}

export async function getCounterAdjustment(): Promise<number> {
  try {
    const result = await sql`SELECT value FROM settings WHERE key = 'counter_adjustment'`
    return Number.parseInt(result[0]?.value as string) || 0
  } catch {
    return 0
  }
}

export async function setCounterAdjustment(value: number): Promise<void> {
  try {
    // Create settings table if not exists (simple safety)
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(255) PRIMARY KEY,
        value VARCHAR(255) NOT NULL
      )
    `

    // Check if exists
    const exists = await sql`SELECT * FROM settings WHERE key = 'counter_adjustment'`
    if (exists.length > 0) {
      await sql`UPDATE settings SET value = ${value.toString()} WHERE key = 'counter_adjustment'`
    } else {
      await sql`INSERT INTO settings (key, value) VALUES ('counter_adjustment', ${value.toString()})`
    }

    revalidatePath("/")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error setting counter adjustment:", error)
    throw error
  }
}

export async function getPublicCounter(): Promise<number> {
  const [approved, adjustment] = await Promise.all([getApprovedCount(), getCounterAdjustment()])
  return approved + adjustment
}

export async function getApprovedTotalDamage(): Promise<number> {
  try {
    const result = await sql`SELECT SUM(amount) as total FROM reports WHERE status = 'approved'`
    return Number.parseFloat(result[0]?.total as string) || 0
  } catch {
    return 0
  }
}

export async function getTotalDamageAdjustment(): Promise<number> {
  try {
    const result = await sql`SELECT value FROM settings WHERE key = 'total_damage_adjustment'`
    return Number.parseFloat(result[0]?.value as string) || 0
  } catch {
    return 0
  }
}

export async function getPublicTotalDamage(): Promise<number> {
  const [approved, adjustment] = await Promise.all([getApprovedTotalDamage(), getTotalDamageAdjustment()])
  return approved + adjustment
}
