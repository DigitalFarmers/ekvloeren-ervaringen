import type { Metadata } from "next"
import Link from "next/link"
import { ReportFormEnhanced } from "@/components/report-form-enhanced"
import { AlertCircle, Shield, Lock, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Meld je ervaring | EK Vloeren Ervaringen",
  description: "Deel je ervaring met EK Vloeren. Een veilig en vertrouwelijk meldpunt voor gedupeerden.",
}

export default function MeldJePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
              <AlertCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
              Jouw Ervaring Telt
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Help anderen door jouw verhaal te delen. Je ervaring draagt bij aan meer transparantie en bewustzijn.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur border border-zinc-200 dark:border-zinc-800">
              <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
              <span className="text-xs text-center text-zinc-600 dark:text-zinc-400 font-medium">Vertrouwelijk</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur border border-zinc-200 dark:border-zinc-800">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
              <span className="text-xs text-center text-zinc-600 dark:text-zinc-400 font-medium">Veilig</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur border border-zinc-200 dark:border-zinc-800">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
              <span className="text-xs text-center text-zinc-600 dark:text-zinc-400 font-medium">Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-4">
        <div className="mx-auto max-w-2xl">
          <ReportFormEnhanced />
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 px-4 bg-zinc-100 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            Hulp nodig bij het indienen?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We begrijpen dat dit moeilijk kan zijn. Als je vragen hebt, neem gerust contact met ons op.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            Neem contact op →
          </Link>
        </div>
      </section>
    </main>
  )
}
