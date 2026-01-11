import type { Metadata } from "next"
import Link from "next/link"
import { Counter } from "@/components/counter"
import { TotalDamageCounter } from "@/components/total-damage-counter"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Shield, Users, AlertCircle, Scale, Newspaper } from "lucide-react"

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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-fade-in-up">
              Geld kwijt aan <span className="text-red-600">EK Vloeren</span>?<br />Je staat niet alleen.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in-up animate-delay-100">
              Meld je ervaring met <span className="font-semibold text-foreground">EK Vloeren (Erwin Kooistra)</span>.
              We verzamelen meldingen gestructureerd en vertrouwelijk,
              zodat patronen zichtbaar worden en anderen niet dezelfde fout maken.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up animate-delay-200">
              <Button asChild size="lg" className="glow-accent">
                <Link href="/meld-je-ervaring">
                  Meld je ervaring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#hoe-werkt-het">
                  Lees hoe dit werkt
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground animate-fade-in-up animate-delay-300 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" /> Wij verifiëren elke melding (factuur + betalingsbewijs).
            </p>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card/60 glass-card p-12 text-center">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Aantal meldingen
                </h2>
                <div className="counter-glow text-6xl font-bold text-primary mb-2">
                  <Counter />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Totaal gemeld schadebedrag
                </h2>
                <div className="counter-glow text-5xl font-bold text-red-500 mb-2">
                  <TotalDamageCounter />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Op basis van gecontroleerde dossiers
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Alleen gecontroleerde meldingen tellen mee. Geen spam. Geen geruchten.
              </p>
              <Link
                href="#moderatie"
                className="text-primary hover:text-primary/80 text-sm underline"
              >
                Hoe we modereren →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="hoe-werkt-het" className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Waarom we dit platform hebben gebouwd
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Te veel mensen betalen vooraf voor vloeren die nooit geleverd worden.
              Door ervaringen te bundelen, maken we misstanden zichtbaar en helpen we anderen
              een geïnformeerde keuze te maken.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card/60 glass-card p-6 hover:translate-y-[-2px] transition-transform">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Vertrouwelijk</h3>
              <p className="text-sm text-muted-foreground">
                Je gegevens worden veilig behandeld en nooit zonder toestemming gedeeld.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card/60 glass-card p-6 hover:translate-y-[-2px] transition-transform">
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Gestructureerd</h3>
              <p className="text-sm text-muted-foreground">
                We verzamelen feiten, geen geruchten. Elke melding wordt gecontroleerd.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card/60 glass-card p-6 hover:translate-y-[-2px] transition-transform">
              <AlertCircle className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Preventie</h3>
              <p className="text-sm text-muted-foreground">
                Help anderen dezelfde fout te maken door jouw ervaring te delen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is / is not Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Wat dit wél is / niet is
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card/60 glass-card p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Wat dit wél is</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Een onafhankelijk meldpunt</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Gestructureerde ervaringen verzamelen</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Patronen zichtbaar maken</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Helpen anderen informeren</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card/60 glass-card p-8">
              <h3 className="text-xl font-semibold text-destructive mb-6">Wat dit niet is</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Een rechtsbijstand platform</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Een plek voor laster of smaad</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Een verzamelplaats voor geruchten</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Een juridisch adviesbureau</span>
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
            Ben je journalist of advocaat?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We hebben een groeiend dossier van gedupeerden en gedocumenteerde patronen.
            Neem contact op om samen te werken aan gerechtigheid.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <a href="mailto:meld@ekvloeren-ervaringen.nl?subject=Persaanvraag">
                <Newspaper className="mr-2 h-4 w-4" />
                Perscontact
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
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
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Heb jij ook betaald en bleef het stil?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Deel je ervaring en help anderen dezelfde fout te maken.
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
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center group">
            <Link href="https://digitalfarmers.be" target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
              <p className="text-foreground font-semibold mb-2 text-lg">
                Digital Farmers | Start small, GROW BIG <span className="inline-block transition-all duration-[2000ms] group-hover:scale-150 group-hover:rotate-12 group-hover:content-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌴</text></svg>')]">🌱</span>
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                Voor mensen. Voor transparantie. Voor verandering.<br />
                Een non-profit initiatief van digitalfarmers.be dat technologie inzet om onrecht zichtbaar te maken.
              </p>
            </Link>
            <div className="mb-6">
              <ThemeToggle />
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/voorwaarden" className="text-muted-foreground hover:text-foreground">
                Voorwaarden
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/disclaimer" className="text-muted-foreground hover:text-foreground">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
