import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReportCard } from "@/components/report-card"
import { getReports } from "@/lib/actions/submit-report"
import type { Report } from "@/lib/db"

export const metadata: Metadata = {
    title: "Geverifieerde Ervaringen | EK Vloeren",
    description: "Lijst van geverifieerde meldingen en ervaringen met EK Vloeren / Erwin Kooistra.",
}

// Revalidate every hour to keep list fresh but statically optimized
export const revalidate = 3600

export default async function ErvaringenPage() {
    // Fetch approved reports
    const reports = await getReports("approved") as Report[]

    // Calculate total damage
    const totalAmount = reports.reduce((acc, report) => {
        const amount = report.amount ? parseFloat(report.amount) : 0
        return acc + amount
    }, 0)

    const formattedTotal = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(totalAmount)

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Geverifieerde Ervaringen EK Vloeren",
        "description": "Overzicht van geverifieerde meldingen over EK Vloeren.",
        "url": "https://ekvloeren-ervaringen.nl/ervaringen",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": reports.map((report, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Review",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "1",
                        "bestRating": "5"
                    },
                    "author": {
                        "@type": "Person",
                        "name": "Gedupeerde"
                    },
                    "reviewBody": report.description.substring(0, 100) + "..."
                }
            }))
        }
    }

    return (
        <div className="container mx-auto max-w-6xl py-12 px-4 sm:px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar home
                </Link>
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-border pb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Geverifieerde Ervaringen</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Hieronder vind je een overzicht van meldingen die zijn gecontroleerd op basis van facturen, betaalbewijzen en correspondentie.
                    </p>
                </div>
                <div className="text-right bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                    <span className="block text-sm text-muted-foreground uppercase tracking-wider font-semibold">Geregistreerde Totaalschade</span>
                    <span className="block text-3xl font-bold text-red-600 dark:text-red-400">{formattedTotal}</span>
                    <span className="block text-xs text-muted-foreground mt-1">uit {reports.length} gecontroleerde dossiers</span>
                </div>
            </div>

            {reports.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Nog geen meldingen publiek gemaakt</h3>
                    <p className="text-muted-foreground mb-6">Er zijn meldingen in behandeling, maar deze zijn nog in het verificatieproces.</p>
                    <Button asChild>
                        <Link href="/meld-je-ervaring">
                            Zelf een ervaring melden
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reports.map((report) => (
                        <ReportCard key={report.id} report={report} />
                    ))}
                </div>
            )}

            <div className="mt-12 text-center border-t border-border pt-8">
                <h2 className="text-2xl font-bold mb-4">Sta je nog niet in de lijst?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Heb je ook een aanbetaling gedaan zonder levering? Jouw melding helpt het dossier sterker te maken.
                </p>
                <Button asChild size="lg" className="glow-accent">
                    <Link href="/meld-je-ervaring">
                        Meld nu je ervaring
                    </Link>
                </Button>
            </div>
        </div>
    )
}
