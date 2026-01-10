"use server"

import { db } from "@/lib/db"
import { reports, reportFiles } from "@/lib/db/schema"
import { reportSchema } from "@/lib/validations/report"
import { put } from "@vercel/blob"
import { desc, eq } from "drizzle-orm"

export interface SubmitReportResult {
  success: boolean
  message: string
  reportId?: string
}

export async function submitReport(formData: FormData): Promise<SubmitReportResult> {
  try {
    // Parse form data
    const rawData = {
      name: formData.get("name") as string | null,
      contact: formData.get("contact") as string,
      city: formData.get("city") as string | null,
      dateOfIncident: formData.get("dateOfIncident") as string | null,
      amount: formData.get("amount") as string | null,
      paymentMethod: formData.get("paymentMethod") as string | null,
      description: formData.get("description") as string,
      consent: formData.get("consent") === "true",
    }

    // Validate data
    const validatedData = reportSchema.safeParse(rawData)

    if (!validatedData.success) {
      const errors = validatedData.error.errors.map((e) => e.message).join(", ")
      return { success: false, message: errors }
    }

    // Insert report into database
    const [insertedReport] = await db
      .insert(reports)
      .values({
        name: validatedData.data.name || null,
        contact: validatedData.data.contact,
        city: validatedData.data.city || null,
        dateOfIncident: validatedData.data.dateOfIncident || null,
        amount: validatedData.data.amount || null,
        paymentMethod: validatedData.data.paymentMethod || null,
        description: validatedData.data.description,
        consent: validatedData.data.consent,
      })
      .returning({ id: reports.id })

    const reportId = insertedReport.id

    // Handle file uploads
    const files = formData.getAll("files") as File[]
    for (const file of files) {
      if (file.size > 0) {
        // Upload to Vercel Blob
        const blob = await put(`reports/${reportId}/${file.name}`, file, {
          access: "public",
        })

        // Store file reference in database
        await db.insert(reportFiles).values({
          reportId,
          fileName: file.name,
          fileUrl: blob.url,
          fileSize: file.size.toString(),
          fileType: file.type,
        })
      }
    }

    // Send confirmation email if Resend is configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
      const contact = validatedData.data.contact
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)

      if (isEmail) {
        try {
          const { Resend } = await import("resend")
          const resend = new Resend(process.env.RESEND_API_KEY)

          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: contact,
            subject: "Bevestiging van je melding - EK Vloeren Ervaringen",
            html: `
              <h1>Bedankt voor je melding</h1>
              <p>We hebben je melding succesvol ontvangen.</p>
              <p><strong>Referentienummer:</strong> ${reportId}</p>
              <p>We zullen je melding zo spoedig mogelijk bekijken.</p>
              <br>
              <p>Met vriendelijke groet,</p>
              <p>EK Vloeren Ervaringen</p>
            `,
          })
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError)
          // Don't fail the submission if email fails
        }
      }
    }

    return {
      success: true,
      message: "Melding succesvol verzonden",
      reportId,
    }
  } catch (error) {
    console.error("Error submitting report:", error)
    return {
      success: false,
      message: "Er is een fout opgetreden. Probeer het later opnieuw.",
    }
  }
}

export async function getReports() {
  return db.select().from(reports).orderBy(desc(reports.createdAt))
}

export async function getReportFiles(reportId: string) {
  return db.select().from(reportFiles).where(eq(reportFiles.reportId, reportId))
}
