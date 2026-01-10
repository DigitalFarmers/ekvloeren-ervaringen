"use server"

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
    if (process.env.RESEND_API_KEY && data.contact.includes("@")) {
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@example.com"
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

// Admin functions
interface ReportWithFiles extends Report {
  files: ReportFile[]
}

export async function getReports(
  statusFilter: ReportStatus | "all" = "all",
  searchQuery = "",
): Promise<ReportWithFiles[]> {
  let reports: Report[]

  if (statusFilter === "all" && !searchQuery) {
    reports = (await sql`SELECT * FROM reports ORDER BY created_at DESC`) as Report[]
  } else if (statusFilter === "all") {
    const search = `%${searchQuery}%`
    reports = (await sql`
      SELECT * FROM reports 
      WHERE contact ILIKE ${search} OR city ILIKE ${search}
      ORDER BY created_at DESC
    `) as Report[]
  } else if (!searchQuery) {
    reports = (await sql`
      SELECT * FROM reports 
      WHERE status = ${statusFilter}
      ORDER BY created_at DESC
    `) as Report[]
  } else {
    const search = `%${searchQuery}%`
    reports = (await sql`
      SELECT * FROM reports 
      WHERE status = ${statusFilter} AND (contact ILIKE ${search} OR city ILIKE ${search})
      ORDER BY created_at DESC
    `) as Report[]
  }

  const reportsWithFiles = await Promise.all(
    reports.map(async (report) => {
      const files = (await sql`
        SELECT * FROM report_files WHERE report_id = ${report.id}
      `) as ReportFile[]
      return { ...report, files }
    }),
  )

  return reportsWithFiles
}

export async function updateReportStatus(
  reportId: string,
  status: ReportStatus,
  linkToReportId?: string,
): Promise<void> {
  if (linkToReportId) {
    await sql`
      UPDATE reports 
      SET status = ${status}, link_to_report_id = ${linkToReportId}
      WHERE id = ${reportId}
    `
  } else {
    await sql`
      UPDATE reports SET status = ${status} WHERE id = ${reportId}
    `
  }
}

export async function updateReportNotes(reportId: string, notes: string): Promise<void> {
  await sql`
    UPDATE reports SET internal_notes = ${notes} WHERE id = ${reportId}
  `
}

export async function deleteReport(reportId: string): Promise<void> {
  await sql`DELETE FROM reports WHERE id = ${reportId}`
}

export async function getApprovedCount(): Promise<number> {
  const result = await sql`SELECT COUNT(*) as count FROM reports WHERE status = 'approved'`
  return Number.parseInt(result[0]?.count as string) || 0
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
  await sql`
    INSERT INTO settings (key, value, updated_at) 
    VALUES ('counter_adjustment', ${value.toString()}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${value.toString()}, updated_at = NOW()
  `
}

export async function getPublicCounter(): Promise<number> {
  const [approved, adjustment] = await Promise.all([getApprovedCount(), getCounterAdjustment()])
  return approved + adjustment
}
