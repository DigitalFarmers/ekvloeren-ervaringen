import type { Metadata } from "next"
import { ReportForm } from "@/components/report-form"
import { ShieldCheck, Lock, EyeOff } from "lucide-react"

export const metadata: Metadata = {
  title: "Meld je ervaring | EK Vloeren Ervaringen",
  description: "Deel je ervaring met EK Vloeren. Een veilig en vertrouwelijk meldpunt voor gedupeerden.",
}

export default function MeldJePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="h-3 w-3" />
            Beveiligde omgeving
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-4">Deel je ervaring</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Help ons patronen zichtbaar te maken. Je melding wordt vertrouwelijk en met zorg behandeld.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-10">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center text-center">
            <Lock className="h-5 w-5 text-zinc-400 mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Vertrouwelijk</h3>
            <p className="text-xs text-zinc-400">Alleen beheerders zien je gegevens.</p>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center text-center">
            <EyeOff className="h-5 w-5 text-zinc-400 mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Wat we NIET vragen</h3>
            <p className="text-xs text-zinc-400">Geen BSN, ID of wachtwoorden.</p>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center text-center">
            <ShieldCheck className="h-5 w-5 text-zinc-400 mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Veiligheid</h3>
            <p className="text-xs text-zinc-400">Gezamenlijk dossier tegen misleiding.</p>
          </div>
        </div>

        <ReportForm />
      </div>
    </main>
  )
}
