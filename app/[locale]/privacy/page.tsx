import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy | EK Vloeren Ervaringen",
  description: "Privacyverklaring voor het EK Vloeren Ervaringen meldpunt.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Terug naar home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacyverklaring</h1>
          <p className="mt-2 text-muted-foreground">
            Hoe we omgaan met je persoonlijke gegevens.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="rounded-lg border border-border bg-card/60 glass-card p-8 space-y-6">
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Wie we zijn</h2>
              <p className="text-muted-foreground">
                EK Vloeren Ervaringen is een onafhankelijk meldpunt dat wordt beheerd door Digital Farmers. 
                We verzamelen en publiceren ervaringen van mensen met EK Vloeren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Welke gegevens we verzamelen</h2>
              <p className="text-muted-foreground">We verzamelen alleen gegevens die je vrijwillig verstrekt:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Naam (optioneel)</li>
                <li>E-mailadres of telefoonnummer (vereist voor contact)</li>
                <li>Woonplaats (optioneel)</li>
                <li>Datum van incident</li>
                <li>Betaald bedrag en betaalmethode</li>
                <li>Beschrijving van de ervaring</li>
                <li>Social media profiel (optioneel)</li>
                <li>Upload bestanden (screenshots, PDF's)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Wat we NIET verzamelen</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>BSN of identiteitsbewijs</li>
                <li>Banklogins of wachtwoorden</li>
                <li>Gegevens van kinderen</li>
                <li>Volledige adressen van derden</li>
                <li>Medische of financiële gegevens</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Doel van gegevensverwerking</h2>
              <p className="text-muted-foreground">We gebruiken je gegevens voor:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Verwerken van je melding</li>
                <li>Contact opnemen voor aanvullende informatie</li>
                <li>Verifiëren van de melding</li>
                <li>Publiceren van anoniem samengevatte ervaringen</li>
                <li>Patroonherkenning en statistieken</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Bewaartermijn</h2>
              <p className="text-muted-foreground">
                Je gegevens worden bewaard zolang als nodig voor het doel waarvoor ze zijn verzameld, 
                met een maximum van 7 jaar. Daarna worden ze veilig vernietigd.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Delen van gegevens</h2>
              <p className="text-muted-foreground">
                We delen je gegevens nooit zonder toestemming. Alleen in de volgende gevallen kunnen 
                gegevens worden gedeeld:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Met jouw expliciete toestemming</li>
                <li>Wanneer de wet dit vereist</li>
                <li>Anoniem en geaggregeerd voor statistieken</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Jouw rechten</h2>
              <p className="text-muted-foreground">Je hebt het recht om:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Je gegevens in te zien</li>
                <li>Je gegevens te corrigeren</li>
                <li>Je gegevens te laten verwijderen</li>
                <li>Bezwaar te maken tegen verwerking</li>
                <li>Gegevensoverdracht te vragen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Beveiliging</h2>
              <p className="text-muted-foreground">
                We nemen passende technische en organisatorische maatregelen om je gegevens te beveiligen 
                tegen onbevoegde toegang, wijziging, vernietiging of verlies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Cookies</h2>
              <p className="text-muted-foreground">
                Deze website gebruikt alleen functionele cookies die noodzakelijk zijn voor de werking van de site. 
                Er worden geen tracking- of marketingcookies gebruikt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact</h2>
              <p className="text-muted-foreground">
                Voor vragen over je privacy of het uitoefenen van je rechten, kun je contact opnemen 
                via de contactgegevens op de website.
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
