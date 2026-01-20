import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Updates & Tijdlijn | EK Vloeren Ervaringen",
    description: "Recente ontwikkelingen en updates rondom EK Vloeren en meldingen.",
}

// Mock data - in a real app this would come from a database or CMS
const updates = [
    {
        date: "20 Januari 2026",
        title: "Lancering vernieuwd meldpunt",
        type: "info",
        content: "Vanwege aanhoudende nieuwe meldingen is het platform gemoderniseerd om dossiers beter en veiliger vast te leggen."
    },
    {
        date: "15 Januari 2026",
        title: "Toename meldingen regio Utrecht",
        type: "alert",
        content: "We zien een opvallende stijging in meldingen vanuit de provincie Utrecht. We roepen gedupeerden in deze regio op zich te melden."
    },
    {
        date: "10 Januari 2026",
        title: "Bevestigde EK Vloeren faillissement geruchten onjuist",
        type: "info",
        content: "Er gaan geruchten over een faillissement. Vooralsnog blijkt uit het KVK-register dat de onderneming actief is onder KVK 88945685."
    },
]

export default function UpdatesPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar home
                </Link>
            </Button>

            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Updates & Tijdlijn</h1>
                <p className="text-xl text-muted-foreground">
                    Recente ontwikkelingen en nieuws rondom het dossier.
                </p>
            </div>

            <div className="relative border-l border-border ml-3 max-w-2xl">
                {updates.map((update, index) => (
                    <div key={index} className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-background rounded-full -left-3 ring-8 ring-background">
                            {update.type === 'alert' ? (
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            ) : (
                                <Clock className="w-4 h-4 text-primary" />
                            )}
                        </span>
                        <div className="p-6 bg-card border border-border rounded-lg shadow-sm">
                            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                                {update.date}
                            </time>
                            <h3 className="text-lg font-semibold text-foreground mt-2">
                                {update.title}
                            </h3>
                            <p className="mb-4 text-base font-normal text-muted-foreground mt-2">
                                {update.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-muted/30 rounded-lg max-w-2xl">
                <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold mb-1">Heb je nieuws?</h4>
                        <p className="text-sm text-muted-foreground">
                            Heb je officiële documenten (zoals een faillissementsuitspraak of uitspraak van een rechter) die relevant zijn voor iedereen?
                            <Link href="/contact" className="text-primary underline ml-1">
                                Laat het ons weten.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
