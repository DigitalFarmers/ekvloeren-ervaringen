import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Target, Eye, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Over dit platform | EK Vloeren Ervaringen",
    description: "Waarom Digital Farmers dit platform heeft opgezet: transparantie, feiten en bescherming.",
}

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar home
                </Link>
            </Button>

            <div className="max-w-3xl">
                <h1 className="text-4xl font-bold mb-6">Over dit platform</h1>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                    Dit is geen haatsite. Dit is een noodzakelijk antwoord op een aanhoudend probleem.
                    Wij geloven dat consumenten recht hebben op transparante informatie om zichzelf te beschermen.
                </p>

                <div className="grid gap-8 md:grid-cols-3 mb-16">
                    <div className="p-6 bg-card border border-border rounded-lg">
                        <Target className="h-8 w-8 text-red-500 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Missie</h3>
                        <p className="text-sm text-muted-foreground">
                            Het stoppen van de stroom aan gedupeerden door feitelijke informatie vindbaar te maken.
                        </p>
                    </div>
                    <div className="p-6 bg-card border border-border rounded-lg">
                        <Eye className="h-8 w-8 text-blue-500 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Transparantie</h3>
                        <p className="text-sm text-muted-foreground">
                            Alles wat we publiceren is geverifieerd. Geen anonieme moddergooierij, maar gedocumenteerde feiten.
                        </p>
                    </div>
                    <div className="p-6 bg-card border border-border rounded-lg">
                        <HeartHandshake className="h-8 w-8 text-green-500 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Pro Bono</h3>
                        <p className="text-sm text-muted-foreground">
                            Dit initiatief wordt kosteloos beheerd door vrijwilligers en Digital Farmers. Wij verdienen hier niets aan.
                        </p>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none">
                    <h3>Wie zijn wij?</h3>
                    <p>
                        Dit platform is opgezet door <strong>Digital Farmers</strong>, een collectief van IT-professionals en data-experts.
                        Wij zetten technologie in om onrecht zichtbaar te maken.
                        Vaak is juridische strijd voor individuen te duur of te complex. Door technologie te gebruiken, bundelen we krachten en maken we patronen zichtbaar die anders verborgen blijven.
                    </p>

                    <h3>Waarom EK Vloeren?</h3>
                    <p>
                        Wij ontvingen diverse verzoeken van wanhopige consumenten die vastliepen in het juridische systeem.
                        Politie neemt geen aangifte op ("civiele zaak"), rechtszaken kosten meer dan de schade, en de ondernemer gaat door.
                        Door dit platform te bouwen, geven we deze mensen een stem en creëren we een dossier dat niet meer genegeerd kan worden.
                    </p>

                    <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="font-bold text-lg mb-2">Start small, Grow Big 🌱</p>
                        <p className="italic">
                            Dat is ons motto. We beginnen met één case, één dossier, één waarheid.
                            Samen zorgen we voor eerlijkheid in de digitale wereld.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
