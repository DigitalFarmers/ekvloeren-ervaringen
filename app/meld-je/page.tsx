import type { Metadata } from "next"
import { ReportForm } from "@/components/report-form"

export const metadata: Metadata = {
  title: "Meld je ervaring | EK Vloeren Ervaringen",
  description: "Deel je ervaring met EK Vloeren. Een veilig en vertrouwelijk meldpunt voor gedupeerden.",
}

export default function MeldJePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Meld je ervaring</h1>
          <p className="mt-2 text-muted-foreground">
            Deel je ervaring met EK Vloeren. Alle meldingen worden vertrouwelijk behandeld.
          </p>
        </div>

        <div className="mb-8 rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 font-semibold text-foreground">Wat we NIET vragen</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• BSN of identiteitsbewijs</li>
            <li>• Banklogins of wachtwoorden</li>
            <li>• Adressen van derden</li>
          </ul>
          <p className="mt-3 text-sm text-amber-600 dark:text-amber-500">
            Let op: Deel geen privégegevens van kinderen of volledige adressen.
          </p>
        </div>

        <ReportForm />
      </div>
    </main>
  )
}
