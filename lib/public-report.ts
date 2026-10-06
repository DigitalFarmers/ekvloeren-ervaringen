import type { Report } from "@/lib/db"
// Enkel de velden die de publieke ervaringen-pagina's (components/report-card.tsx) tonen.
// Contactgegevens, interne notities en bestanden blijven admin-only.
export const PUBLIC_REPORT_FIELDS = [
  "id",
  "status",
  "city",
  "date_of_incident",
  "amount",
  "payment_method",
  "description",
] as const

export type PublicReportField = (typeof PUBLIC_REPORT_FIELDS)[number]

export function toPublicReport<T extends Record<PublicReportField, unknown>>(row: T): Pick<T, PublicReportField> {
  return Object.fromEntries(PUBLIC_REPORT_FIELDS.map((key) => [key, row[key]])) as Pick<T, PublicReportField>
}

export type PublicReport = Pick<Report, PublicReportField>
