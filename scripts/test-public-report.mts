// Toets voor de publieke projectie van meldingen. Draaien: node scripts/test-public-report.mts
// Bewijst dat getReports("approved") zonder admin-sessie geen contactgegevens of interne notities meer meegeeft.
import { PUBLIC_REPORT_FIELDS, toPublicReport } from "../lib/public-report.ts"

let failed = 0
function check(label: string, ok: boolean) {
  console.log(`${ok ? "OK  " : "FOUT"} ${label}`)
  if (!ok) failed++
}

const row = {
  id: "0b6c1f2e-1111-4222-8333-944455556666",
  created_at: new Date("2026-01-02"),
  status: "approved",
  name: "Jan Testpersoon",
  contact: "jan@voorbeeld.test / 0470 12 34 56",
  city: "Gent",
  date_of_incident: "2025-11-01",
  amount: "1250.00",
  payment_method: "overschrijving",
  description: "Aanbetaling gedaan, nooit geleverd.",
  social_profile_url: "https://voorbeeld.test/jan",
  consent: true,
  link_to_others: true,
  link_to_report_id: null,
  internal_notes: "Belde op 3/1, factuur nagekeken",
  created_by_admin_id: "7",
  updated_by_admin_id: "7",
  updated_at: new Date("2026-01-03"),
  defect_category: "anders",
  defect_details: null,
  created_by_name: null,
  updated_by_name: null,
  files: [{ file_url: "https://blob.voorbeeld.test/factuur.pdf" }],
}

const pub = toPublicReport(row) as Record<string, unknown>
const keys = Object.keys(pub).sort()

for (const secret of ["name", "contact", "internal_notes", "social_profile_url", "files", "created_by_admin_id", "updated_by_admin_id", "link_to_report_id"]) {
  check(`veld '${secret}' zit niet in de publieke melding`, !(secret in pub))
}
const json = JSON.stringify(pub)
check("geen e-mail in de geserialiseerde melding", !json.includes("jan@voorbeeld.test"))
check("geen telefoon in de geserialiseerde melding", !json.includes("0470"))
check("geen interne notitie in de geserialiseerde melding", !json.includes("factuur nagekeken"))
check("enkel de toegelaten velden", JSON.stringify(keys) === JSON.stringify([...PUBLIC_REPORT_FIELDS].sort()))
check("wat de kaart toont blijft", pub.city === "Gent" && pub.amount === "1250.00" && pub.description === row.description && pub.payment_method === "overschrijving" && pub.id === row.id && pub.status === "approved" && pub.date_of_incident === "2025-11-01")

console.log(failed ? `\n${failed} toets(en) gefaald` : "\nalle toetsen groen")
process.exit(failed ? 1 : 0)
