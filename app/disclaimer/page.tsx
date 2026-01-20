import Link from "next/link"
import { ArrowLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar home
        </Link>
      </Button>

      <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold">Juridische Disclaimer</h1>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-2">1. Doelstelling: Documentatie, geen smaad</h2>
            <p>
              Dit platform (ekvloeren-ervaringen.nl) heeft als uitsluitend doel het documenteren en centraliseren van feitelijke consumentenervaringen met betrekking tot EK Vloeren en de heer Erwin Kooistra (KVK 88945685, voorheen ook opererend onder andere entiteiten).
            </p>
            <p>
              Wij faciliteren het recht op vrije meningsuiting en het maatschappelijk belang van consumentenwaarschuwing, zoals beschermd onder Artikel 10 van het EVRM. Wij beschuldigen niet van strafbare feiten; wij documenteren patronen van wanprestatie die door meerdere onafhankelijke bronnen zijn gemeld en geverifieerd.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">2. Verificatie & Waarheid</h2>
            <p>
              Alle gepubliceerde meldingen worden handmatig gecontroleerd op basis van bewijsstukken (facturen, betaalbewijzen en correspondentie). Wij publiceren geen geruchten, anonieme scheldpartijen of ongefundeerde claims. Hoewel wij maximale zorgvuldigheid betrachten, blijven de individuele auteurs verantwoordelijk voor de juistheid van hun specifieke verhaal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">3. Wederhoor</h2>
            <p>
              EK Vloeren / Erwin Kooistra heeft te allen tijde het recht op wederhoor. Reacties kunnen worden ingezonden naar <a href="mailto:legal@digitalfarmers.be" className="text-primary underline">legal@digitalfarmers.be</a>. Indien een reactie feitelijke onjuistheden weerlegt met bewijs, zal de betreffende melding worden aangepast of verwijderd.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">4. Aansprakelijkheid</h2>
            <p>
              Dit platform fungeert als doorgeefluik (host) voor user-generated content, maar neemt extra redactionele verantwoordelijkheid door verificatie. De beheerders zijn niet aansprakelijk voor indirecte schade die voortvloeit uit het openbaar maken van feitelijke wanprestaties. De ondernemer is zelf verantwoordelijk voor zijn reputatie door zijn contractuele verplichtingen na te komen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">5. Privacy</h2>
            <p>
              Namen van melders worden nooit openbaar gemaakt op de website, tenzij de melder hier expliciet en schriftelijk toestemming voor geeft (bijvoorbeeld voor een media-interview). Persoonsgegevens worden enkel gebruikt voor interne verificatie.
            </p>
            <p className="text-sm text-muted-foreground mt-4 italic">
              Laatst gewijzigd: Januari 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
