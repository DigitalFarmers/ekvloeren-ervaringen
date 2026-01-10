import { db } from "@/lib/db"
import { reports, reportFiles } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { AdminLogout } from "@/components/admin-logout"
import { Badge } from "@/components/ui/badge"
import { FileText, Mail, Phone, MapPin, Calendar, Euro, CreditCard, Paperclip } from "lucide-react"

async function getReports() {
  const allReports = await db.select().from(reports).orderBy(desc(reports.createdAt))

  const reportsWithFiles = await Promise.all(
    allReports.map(async (report) => {
      const files = await db.select().from(reportFiles).where(eq(reportFiles.reportId, report.id))
      return { ...report, files }
    }),
  )

  return reportsWithFiles
}

export async function AdminDashboard() {
  const allReports = await getReports()

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{allReports.length} meldingen</p>
          </div>
          <AdminLogout />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {allReports.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-lg font-medium text-foreground">Geen meldingen</h2>
            <p className="mt-1 text-sm text-muted-foreground">Er zijn nog geen meldingen binnengekomen.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allReports.map((report) => (
              <div key={report.id} className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-foreground">{report.name || "Anoniem"}</h2>
                      {report.consent && (
                        <Badge variant="secondary" className="text-xs">
                          Toestemming gegeven
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{report.id}</p>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {new Date(report.createdAt).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                <div className="mb-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {report.contact.includes("@") ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                    <span className="text-foreground">{report.contact}</span>
                  </div>

                  {report.city && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-foreground">{report.city}</span>
                    </div>
                  )}

                  {report.dateOfIncident && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-foreground">{report.dateOfIncident}</span>
                    </div>
                  )}

                  {report.amount && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Euro className="h-4 w-4" />
                      <span className="text-foreground">€{Number(report.amount).toFixed(2)}</span>
                    </div>
                  )}

                  {report.paymentMethod && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      <span className="capitalize text-foreground">{report.paymentMethod}</span>
                    </div>
                  )}
                </div>

                <div className="rounded-md bg-muted p-4">
                  <p className="whitespace-pre-wrap text-sm text-foreground">{report.description}</p>
                </div>

                {report.files.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Paperclip className="h-4 w-4" />
                      <span>{report.files.length} bijlage(n)</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {report.files.map((file) => (
                        <a
                          key={file.id}
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-1 text-sm text-foreground transition-colors hover:bg-muted/80"
                        >
                          <FileText className="h-3 w-3" />
                          {file.fileName}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
