import type { Metadata } from "next"
import Link from "next/link"
import { Counter } from "@/components/counter"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Shield, Users, AlertCircle } from "lucide-react"

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
              Voorkom de volgende gedupeerde.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in-up animate-delay-100">
              Meld je ervaring met EK Vloeren. We verzamelen meldingen gestructureerd en vertrouwelijk, 
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
            <p className="mt-6 text-sm text-muted-foreground animate-fade-in-up animate-delay-300">
              Geen BSN • geen wachtwoorden • geen gegevens van kinderen • geen volledige adressen.
            </p>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card/60 glass-card p-12 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Aantal meldingen tot nu toe
            </h2>
            <div className="counter-glow text-6xl font-bold text-primary mb-6">
              <Counter />
            </div>
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
          <div className="text-center">
            <p className="text-foreground font-semibold mb-2">
              Digital Farmers — Start small. GROW BIG 🌱
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
              We bouwen digitale tools die misstanden zichtbaar maken — snel, schaalbaar en eerlijk.
            </p>
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
