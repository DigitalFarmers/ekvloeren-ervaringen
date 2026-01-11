import type { Metadata } from "next"
import Link from "next/link"
import { Counter } from "@/components/counter"
import { TotalDamageCounter } from "@/components/total-damage-counter"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Shield, Users, AlertCircle, Scale, Newspaper, FileText, XCircle, CheckCircle2 } from "lucide-react"

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
              Meld je ervaring met <span className="text-red-600 font-bold">EK Vloeren (Erwin Kooistra)</span>.
              We verzamelen <span className="text-primary font-bold">meldingen</span> gestructureerd en vertrouwelijk,
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
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">1. Vertrouwelijk</h3>
              <p className="mt-2 text-muted-foreground">
                Je gegevens worden veilig opgeslagen en nooit openbaar gedeeld zonder toestemming.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">2. Gestructureerd</h3>
              <p className="mt-2 text-muted-foreground">
                We bouwen een dossier op dat juridisch bruikbaar is voor eventuele groepsvorderingen.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">3. Preventie</h3>
              <p className="mt-2 text-muted-foreground">
                Samen zorgen we dat er niet nog meer slachtoffers vallen door deze praktijken.
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
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Wat dit IS - Now on the Right (Tablet/Desktop) but first on Mobile? No, user said: "Bij mobiel niet eerst vanboven / wat dit wel is beneden". 
               Wait, user said: "Wat dit wél is / niet is. zet wat dit niet is links, en wat dit wel is rechtSs ook op de "hoe werkt het "pagina. Bij mobiel niet eerst vanboven / wat dit wel is beneden"
               This is slightly ambiguous. "Bij mobiel niet eerst vanboven / wat dit wel is beneden" -> "On mobile not first from top / what this is below".
               Standard stacking is Left -> Top. If "Not" is Left, it will be Top. 
               If User wants "Is" (Right) to NOT be below, they want "Is" to be Top?
               "Bij mobiel niet eerst vanboven" -> Maybe they mean "Don't put [Not] first on top"?
               Let's assume they want "What IS" to be the most visible thing on mobile. 
               So on Mobile: "What IS" first. On Desktop: "What Not" (Left) - "What Is" (Right).
               To achieve this with Grid: Desktop: Not(col-1) Is(col-2). Mobile: Is(order-1) Not(order-2).
           */}

            {/* Wat dit NIET is (Left on Desktop, Second on Mobile) */}
            <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm order-2 lg:order-1">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold">Wat dit NIET is</h3>
              </div>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span>Een plek voor ongefundeerde haat of smaad.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span>Een officieel juridisch orgaan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span>Een vervanging voor aangifte bij de politie.</span>
                </li>
              </ul>
            </div>

            {/* Wat dit WEL is (Right on Desktop, First on Mobile) */}
            <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm order-1 lg:order-2">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Wat dit WÉL is</h3>
              </div>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Een centraal punt voor slachtoffers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Dossieropbouw om de omvang aan te tonen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Waarschuwing voor toekomstige klanten.</span>
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
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
          <div className="mt-8 flex justify-center space-x-10">
            <ThemeToggle />
          </div>
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            <div className="pb-6">
              <Link href="/meld-je-ervaring" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                Melden
              </Link>
            </div>
            <div className="pb-6">
              <Link href="/privacy" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
            <div className="pb-6">
              <Link href="/contact" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </nav>

          <div className="mt-16 border-t border-border/50 pt-8 sm:mt-20 lg:mt-24 text-center">
            <a
              href="https://digitalfarmers.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E68404] hover:text-[#FF9F2E] transition-colors text-lg font-medium inline-block mb-4"
            >
              Digital Farmers <span className="text-muted-foreground">|</span> Start small, <span className="font-bold">GROW BIG</span> 🌱
            </a>
            <p className="text-base text-foreground font-medium mb-1">
              Voor mensen. Voor transparantie. Voor verandering.
            </p>
            <p className="text-sm leading-5 text-muted-foreground max-w-xl mx-auto">
              Een non-profit initiatief van <strong>Digital Farmers</strong> dat technologie inzet om onrecht zichtbaar te maken.
              Wij geloven dat data en transparantie de sterkste wapens zijn tegen misleiding.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
