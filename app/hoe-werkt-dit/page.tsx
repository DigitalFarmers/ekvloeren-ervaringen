import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Shield, FileText, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Hoe werkt het? | EK Vloeren Ervaringen",
    description: "Zo werkt het EK Vloeren meldpunt: van melding tot verificatie en dossieropbouw.",
}

export default function HowItWorksPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar home
                </Link>
            </Button>

            <h1 className="text-4xl font-bold mb-4">Hoe werkt dit platform?</h1>
            <p className="text-xl text-muted-foreground mb-12">
                Ons proces is gericht op zorgvuldigheid, privacy en juridische houdbaarheid.
            </p>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">

                {/* Step 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="font-bold text-primary">1</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <FileText className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-bold">Jij doet een melding</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Je vult het beveiligde formulier in. We vragen om basisgegevens van jou en de transactie (bedrag, datum).
                            Belangrijk is dat je bewijsstukken uploadt (factuur, betaalbewijs, screenshots van communicatie).
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="font-bold text-primary">2</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="h-6 w-6 text-green-500" />
                            <h3 className="text-xl font-bold">Wij verifiëren</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Een moderator controleert je melding. Kloppen de data? Is er bewijs van betaling? Lopen de verhalen synchroon met bekende patronen?
                            Als we vragen hebben, nemen we contact met je op. Alleen geverifieerde meldingen worden opgenomen in het dossier.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="font-bold text-primary">3</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <CheckCircle2 className="h-6 w-6 text-blue-500" />
                            <h3 className="text-xl font-bold">Publicatie & Dossier</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Je ervaring wordt geanonimiseerd toegevoegd aan de publieke lijst (alleen stad, bedrag, maand en korte samenvatting).
                            Je naam en contactgegevens blijven <strong>strikt geheim</strong> en veilig versleuteld in onze database.
                        </p>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="font-bold text-primary">4</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <Scale className="h-6 w-6 text-red-500" />
                            <h3 className="text-xl font-bold">Collectieve Actie</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Door alle meldingen te bundelen, bouwen we een dossier op dat niet genegeerd kan worden door politie, justitie of curatoren.
                            Samen staan we sterker dan alleen.
                        </p>
                    </div>
                </div>

            </div>

            <div className="mt-16 text-center">
                <Button asChild size="lg" className="glow-accent">
                    <Link href="/meld-je-ervaring">
                        Start je melding
                    </Link>
                </Button>
            </div>

        </div>
    )
}
