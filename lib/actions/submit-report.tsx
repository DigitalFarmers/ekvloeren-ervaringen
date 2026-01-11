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

// ... (existing admin functions) ...

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

