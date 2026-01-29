import type { Metadata } from "next"
import Link from "next/link"
import { Counter } from "@/components/counter"
import { TotalDamageCounter } from "@/components/total-damage-counter"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Shield, Users, AlertCircle, Scale, Newspaper, FileText, XCircle, CheckCircle2 } from "lucide-react"
import { HeroTitleRotator } from "@/components/hero-title-rotator"

export const metadata: Metadata = {
  title: "EK Vloeren Ervaringen | Voorkom de volgende gedupeerde",
  description: "Meld je ervaring met EK Vloeren. We verzamelen meldingen gestructureerd en vertrouwelijk, zodat patronen zichtbaar worden en anderen niet dezelfde fout maken.",
  openGraph: {
    title: "EK Vloeren Ervaringen | Voorkom de volgende gedupeerde",
    description: "Meld je ervaring met EK Vloeren. Vertrouwelijk en gestructureerd.",
    type: "website",
    locale: "nl_NL",
    siteName: "EK Vloeren Ervaringen",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 sm:text-6xl lg:text-7xl font-heading leading-tight animate-fade-in-up">
            Geld kwijt aan <HeroTitleRotator />
          </h1>

          <ul className="flex flex-col md:flex-row justify-center gap-4 text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-10 font-medium animate-fade-in-up animate-delay-100">
            {/* ... list items remain ... */}
            <li className="flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" /> Voorrijkosten betaald?
            </li>
            <li className="flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" /> Nooit komen opdagen?
            </li>
            <li className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" /> Je bent niet alleen.
            </li>
          </ul>

          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400 mb-6 text-base md:text-lg leading-relaxed animate-fade-in-up animate-delay-200">
            Individuele verhalen verdwijnen. Patronen niet. <br />
            Dit platform verzamelt en verifieert meldingen over <span className="text-zinc-900 dark:text-white font-semibold">Erwin Kooistra (KVK 88945685)</span> om samen een vuist te maken.
            Geen roddels. Geen smaad. Alleen de feiten.
          </p>

          <div className="mx-auto max-w-2xl bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg p-3 mb-10 border border-zinc-200 dark:border-zinc-800 animate-fade-in-up animate-delay-200">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Let op:</span> Het bedrijf staat tot op heden nog steeds gevestigd op het adres:
              <span className="font-mono ml-1 text-zinc-900 dark:text-zinc-200">Stein van Malsenstraat 19, 9842 PS</span>.
              Dit was een huurwoning die intussen verkocht is; hij woont daar niet meer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animate-delay-300">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-[0_0_20px_rgba(16,185,129,0.3)] text-lg px-8 h-12">
              <Link href="/meld-je-ervaring">
                Meld je ervaring
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white h-12 px-8">
              <Link href="/hoe-werkt-dit">
                Bekijk hoe het werkt
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Counter Section - Re-styled */}
      <section className="py-12 border-y border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center text-center">

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 justify-center mb-2">
                <AlertCircle className="w-5 h-5" />
                <h3 className="uppercase tracking-widest text-xs font-bold">Bevestigde Meldingen</h3>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white font-mono tracking-tighter">
                <Counter />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 justify-center mb-2">
                <Scale className="w-5 h-5" />
                <h3 className="uppercase tracking-widest text-xs font-bold">Totaal Schadebedrag</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white font-mono tracking-tighter">
                <TotalDamageCounter />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Section (Why) */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Waarom dit platform bestaat</h2>
          <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>
              Wanneer één persoon zijn verhaal deelt, is het een incident.
              Wanneer tientallen mensen hetzelfde verhaal delen, is het een <strong className="text-zinc-900 dark:text-white">bewijsbaar patroon</strong>.
            </p>
            <p>
              Digital Farmers heeft dit platform gebouwd om versnipperde klachten om te zetten in gestructureerde data.
              Zodat nieuwe klanten gewaarschuwd worden en gedupeerden sterk staan.
            </p>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-zinc-900 dark:text-white font-semibold mb-2">Veilig</h4>
                <p className="text-sm">Je gegevens blijven privé. Alleen het verhaal wordt gedeeld.</p>
              </div>
              <div>
                <Scale className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-zinc-900 dark:text-white font-semibold mb-2">Feitelijk</h4>
                <p className="text-sm">Geen scheldpartijen. Alleen verifieerbare ervaringen.</p>
              </div>
              <div>
                <Users className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-zinc-900 dark:text-white font-semibold mb-2">Samen</h4>
                <p className="text-sm">Van machteloos individu naar collectief dossier.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is / is not Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Doelstelling van dit platform
          </h2>
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Wat dit WÉL is (First on Mobile, Left on Desktop) */}
            <div className="rounded-2xl border border-zinc-200 dark:border-border bg-white dark:bg-card/50 p-8 backdrop-blur-sm order-1 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-100 dark:bg-primary/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-primary" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Wat dit platform is</h3>
              </div>
              <ul className="mt-6 space-y-4 text-zinc-600 dark:text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-primary" />
                  <span>Een centraal punt voor verificatie van meldingen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-primary" />
                  <span>Dossieropbouw om de omvang en patroon aan te tonen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-primary" />
                  <span>Preventie voor toekomstige consumenten.</span>
                </li>
              </ul>
            </div>

            {/* Wat dit NIET is (Second on Mobile, Right on Desktop) */}
            <div className="rounded-2xl border border-zinc-200 dark:border-border bg-white dark:bg-card/50 p-8 backdrop-blur-sm order-2 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Wat dit platform NIET is</h3>
              </div>
              <ul className="mt-6 space-y-4 text-zinc-600 dark:text-muted-foreground">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span>Een plek voor ongefundeerde beschuldigingen of smaad.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span>Een officieel juridisch orgaan of rechtbank.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span>Een vervanging voor officiële aangifte bij politie/ACM.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Verhalen van gedupeerden
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <blockquote className="p-6 bg-card rounded-lg border border-border italic text-muted-foreground">
              &quot;We hebben maanden gespaard voor onze droomvloer. Na betaling van de aanbetaling werd het stil. Geen vloer, geen geld, en een grote scheur in ons vertrouwen.&quot;
              <footer className="mt-4 text-sm font-semibold text-foreground not-italic">— Anoniem, Groningen</footer>
            </blockquote>
            <blockquote className="p-6 bg-card rounded-lg border border-border italic text-muted-foreground">
              &quot;Steeds weer nieuwe smoesjes: leveringsproblemen, ziekte, administratieve fouten. Uiteindelijk bleek ik een van de velen te zijn.&quot;
              <footer className="mt-4 text-sm font-semibold text-foreground not-italic">— Anoniem, Utrecht</footer>
            </blockquote>
            <blockquote className="p-6 bg-card rounded-lg border border-border italic text-muted-foreground">
              &quot;Ik voelde me zo dom dat ik erin getrapt was. Maar door deze site zie ik dat het een professionele opzet was waar iedereen in had kunnen trappen.&quot;
              <footer className="mt-4 text-sm font-semibold text-foreground not-italic">— Anoniem, Rotterdam</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Journalist / Laywer CTA */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ben je <span className="text-blue-600">journalist</span> of <span className="text-blue-600">advocaat</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We hebben een groeiend dossier van gedupeerden en gedocumenteerde patronen.
            Neem contact op om samen te werken aan gerechtigheid.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 transition-colors duration-300">
              <a href="mailto:meld@ekvloeren-ervaringen.nl?subject=Persaanvraag">
                <Newspaper className="mr-2 h-4 w-4" />
                Perscontact
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 transition-colors duration-300">
              <a href="mailto:meld@ekvloeren-ervaringen.nl?subject=Juridisch">
                <Scale className="mr-2 h-4 w-4" />
                Juridisch overleg
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-primary/5 p-12 text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Heb jij ook betaald en bleef het stil?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              <span className="underline decoration-primary/50 decoration-2 underline-offset-4 animate-pulse">Deel je ervaring</span> en help anderen dezelfde fout te voorkomen.
            </p>
            <Button asChild size="lg" className="glow-accent">
              <Link href="/meld-je-ervaring">
                Meld je ervaring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex justify-center space-x-10">
            {/* Hidden theme toggle since we force dark for now, but keeping layout */}
          </div>
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            <div className="pb-6">
              <Link href="/meld-je-ervaring" className="text-sm leading-6 text-zinc-400 hover:text-emerald-400 transition-colors">
                Melden
              </Link>
            </div>
            <div className="pb-6">
              <Link href="/privacy" className="text-sm leading-6 text-zinc-400 hover:text-emerald-400 transition-colors">
                Privacy
              </Link>
            </div>
            <div className="pb-6">
              <Link href="/voorwaarden" className="text-sm leading-6 text-zinc-400 hover:text-emerald-400 transition-colors">
                Voorwaarden
              </Link>
            </div>
            <div className="pb-6">
              <Link href="/contact" className="text-sm leading-6 text-zinc-400 hover:text-emerald-400 transition-colors">
                contact
              </Link>
            </div>
          </nav>

          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 text-center">

            <div className="mb-6 flex flex-col items-center gap-2 animate-fade-in-up">
              <span className="text-2xl">🌱</span>
              <p className="text-zinc-500 italic text-sm">Start small, grow big.</p>
            </div>

            <a
              href="https://digitalfarmers.be"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-white transition-colors text-lg font-medium inline-flex items-center gap-2 mb-2"
            >
              <span className="group-hover:text-emerald-400 transition-colors font-bold">Digital Farmers</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 group-hover:text-white transition-colors">Start small grow big.</span>
            </a>

            <p className="text-xs leading-5 text-zinc-600 max-w-xl mx-auto mt-4">
              Dit platform is een non-profit initiatief ter bescherming van consumenten.
              Wij zijn onafhankelijk en hebben geen commerciële banden met de betrokken partijen.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
