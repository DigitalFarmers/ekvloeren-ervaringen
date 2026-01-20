import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Voorwaarden | EK Vloeren Ervaringen",
  description: "Voorwaarden voor het gebruik van het EK Vloeren Ervaringen meldpunt.",
}

export default function VoorwaardenPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Terug naar home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Voorwaarden</h1>
          <p className="mt-2 text-muted-foreground">
            Voorwaarden voor het gebruik van het EK Vloeren Ervaringen meldpunt.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="rounded-lg border border-border bg-card/60 glass-card p-8 space-y-6">
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Doel van het platform</h2>
              <p className="text-muted-foreground">
                EK Vloeren Ervaringen is een onafhankelijk meldpunt waar mensen hun ervaringen met EK Vloeren kunnen delen. 
                Het platform heeft als doel patronen zichtbaar te maken en anderen te helpen geïnformeerde keuzes te maken.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Wat we vragen</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Een geldig e-mailadres of telefoonnummer voor contact</li>
                <li>Een waarheidsgetrouwe beschrijving van je ervaring</li>
                <li>Toestemming voor verwerking van je gegevens</li>
                <li>Geen bedreigingen of persoonlijke aanvallen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Wat we nooit vragen</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>BSN of identiteitsbewijs</li>
                <li>Banklogins of wachtwoorden</li>
                <li>Gegevens van kinderen</li>
                <li>Volledige adressen van derden</li>
                <li>Privégegevens die niet relevant zijn voor de melding</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Verwerking van meldingen</h2>
              <p className="text-muted-foreground">
                Alle meldingen worden gecontroleerd op relevantie en waarheidsgehalte. 
                We behouden ons het recht voor meldingen te weigeren of te verwijderen die:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Onrechtmatige content bevatten</li>
                <li>Privacy schenden</li>
                <li>Beledigend of lasterlijk zijn</li>
                <li>Niet relevant zijn voor het doel van het platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Privacy en vertrouwelijkheid</h2>
              <p className="text-muted-foreground">
                Je gegevens worden vertrouwelijk behandeld en nooit zonder toestemming gedeeld. 
                We volgen de AVG/GDPR-richtlijnen en slaan alleen gegevens op die nodig zijn voor de behandeling van je melding.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Aansprakelijkheid</h2>
              <p className="text-muted-foreground">
                Dit platform is geen juridisch adviesbureau. De gedeelde ervaringen zijn persoonlijke verhalen 
                en geen juridische bewijsvoering. We zijn niet aansprakelijk voor beslissingen die gebruikers nemen 
                op basis van de gedeelde informatie.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact en klachten</h2>
              <p className="text-muted-foreground">
                Voor vragen of klachten over dit platform of de verwerking van je gegevens, 
                kun je contact opnemen via de contactgegevens op de website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Wijzigingen</h2>
              <p className="text-muted-foreground">
                Deze voorwaarden kunnen worden gewijzigd. Wijzigingen worden bekendgemaakt via de website 
                en treden in werking onmiddellijk na publicatie.
              </p>
            </section>

          </div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/meld-je-ervaring">
              Meld je ervaring
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
