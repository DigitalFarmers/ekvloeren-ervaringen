import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Disclaimer | EK Vloeren Ervaringen",
  description: "Disclaimer voor het EK Vloeren Ervaringen meldpunt.",
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Terug naar home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Disclaimer</h1>
          <p className="mt-2 text-muted-foreground">
            Belangrijke informatie over het gebruik van dit platform.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="rounded-lg border border-border bg-card/60 glass-card p-8 space-y-6">
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Geen juridisch advies</h2>
              <p className="text-muted-foreground">
                Dit platform biedt geen juridisch advies. De gedeelde ervaringen zijn persoonlijke verhalen 
                en geen juridische bewijsvoering. Voor juridisch advies neem je contact op met een gekwalificeerde 
                advocaat of juridisch adviseur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Geen garantie op volledigheid</h2>
              <p className="text-muted-foreground">
                We streven ernaar om ervaringen zo volledig mogelijk weer te geven, maar kunnen niet garanderen 
                dat alle meldingen worden ontvangen of gepubliceerd. Het platform is afhankelijk van vrijwillige 
                bijdragen van gebruikers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Geen waarheidsgetrouwheidsgarantie</h2>
              <p className="text-muted-foreground">
                Hoewel we proberen meldingen te controleren, kunnen we de absolute waarheid van elke ervaring 
                niet garanderen. Gebruikers worden aangemoedigd om kritisch te blijven en zelf onderzoek te doen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Geen aansprakelijkheid</h2>
              <p className="text-muted-foreground">
                EK Vloeren Ervaringen en Digital Farmers zijn niet aansprakelijk voor:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Schade voortvloeiend uit het gebruik van deze website</li>
                <li>Beslissingen die gebruikers nemen op basis van gedeelde informatie</li>
                <li>Onjuistheden in de gedeelde ervaringen</li>
                <li>Verlies van gegevens of technische problemen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Geen relatie met EK Vloeren</h2>
              <p className="text-muted-foreground">
                Dit platform is volledig onafhankelijk en heeft geen enkele relatie, affiliatie of samenwerking 
                met EK Vloeren of haar gelieerde bedrijven. We zijn een onafhankelijk initiatief van gebruikers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Moderatiebeleid</h2>
              <p className="text-muted-foreground">
                We behouden ons het recht voor om meldingen te weigeren, te bewerken of te verwijderen die:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Onrechtmatig zijn of wetten schenden</li>
                <li>Privacy van derden schenden</li>
                <li>Beledigend, discriminerend of lasterlijk zijn</li>
                <li>Niet relevant zijn voor het doel van het platform</li>
                <li>Spam of onjuiste informatie bevatten</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Eigendom content</h2>
              <p className="text-muted-foreground">
                Gebruikers behouden de eigendom van hun ingediende content, maar verlenen ons het recht 
                om deze te gebruiken voor het doel van het platform, inclusief publicatie en analyse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Externe links</h2>
              <p className="text-muted-foreground">
                Deze website kan links bevatten naar externe websites. Wij zijn niet verantwoordelijk voor 
                de content, privacypraktijken of werking van deze externe websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Wijzigingen</h2>
              <p className="text-muted-foreground">
                Deze disclaimer kan worden gewijzigd. Wijzigingen worden bekendgemaakt via de website 
                en treden onmiddellijk in werking na publicatie.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Toepasselijk recht</h2>
              <p className="text-muted-foreground">
                Op deze disclaimer en het gebruik van dit platform is het Nederlands recht van toepassing. 
                Geschillen worden voorgelegd aan de bevoegde Nederlandse rechter.
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
