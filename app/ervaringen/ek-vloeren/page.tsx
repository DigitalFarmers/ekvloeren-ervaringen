import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldAlert, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReportCard } from "@/components/report-card"
import { getReports } from "@/lib/actions/submit-report"
import type { Report } from "@/lib/db"

export const metadata: Metadata = {
    title: "Ervaringen met EK Vloeren | Klachten & Meldingen",
    description: "Lees geverifieerde ervaringen en klachten over EK Vloeren en Erwin Kooistra. Bekijk het dossier en meld uw eigen ervaring.",
}

// Revalidate every hour
export const revalidate = 3600

export default async function EkVloerenPage() {
    const reports = await getReports("approved") as Report[]

    // Filter specifically for this brand if we had multiple, but for now it's just one.
    // In a multi-brand future, we'd filter here.
    const brandReports = reports

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Ervaringen met EK Vloeren",
        "description": "Dossier en ervaringen met EK Vloeren / Erwin Kooistra.",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": brandReports.map((report, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Review",
                    "reviewRating": { "@type": "Rating", "ratingValue": "1" },
                    "author": { "@type": "Person", "name": "Gedupeerde" },
                    "reviewBody": report.description ? report.description.substring(0, 140) : "Melding"
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
                <Link href="/ervaringen">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar alle ervaringen
                </Link>
            </Button>

            <div className="grid lg:grid-cols-3 gap-12 mb-16">
                {/* Brand Info Column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="p-6 bg-card border border-border rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                                <ShieldAlert className="w-8 h-8 text-red-600" />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">EK Vloeren</h1>
                            <p className="text-muted-foreground mb-4">
                                Ook bekend als: <br />
                                <span className="font-semibold text-foreground">Erwin Kooistra</span>
                            </p>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">KVK Nummer</span>
                                    <span className="font-mono">88945685</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="text-red-600 font-semibold">Meerdere meldingen</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Actief sinds</span>
                                    <span>Minstens 2023</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
                            <h3 className="font-bold flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400">
                                <TrendingUp className="w-4 h-4" />
                                Dossier Status
                            </h3>
                            <p className="text-sm text-blue-800 dark:text-blue-300 mb-4">
                                Dit dossier groeit actief. We ontvangen wekelijks nieuwe meldingen uit heel Nederland.
                            </p>
                            <Button asChild size="sm" variant="secondary" className="w-full">
                                <Link href="/updates">Bekijk tijdlijn</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Reports List Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Geverifieerde Meldingen</h2>
                        <p className="text-muted-foreground">
                            Onderstaande verhalen zijn door onze moderatoren gecontroleerd op echtheid.
                        </p>
                    </div>

                    {brandReports.length === 0 ? (
                        <div className="text-center py-12 bg-muted/20 rounded-lg border border-border border-dashed">
                            <p className="text-muted-foreground">Nog geen publieke meldingen zichtbaar voor deze entiteit.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {brandReports.map((report) => (
                                <ReportCard key={report.id} report={report} />
                            ))}
                        </div>
                    )}

                    <div className="p-8 bg-card border border-border rounded-lg text-center mt-12">
                        <h3 className="text-xl font-bold mb-3">Zelf gedupeerd door EK Vloeren?</h3>
                        <p className="text-muted-foreground mb-6">
                            Meld uw ervaring veilig en vertrouwelijk. Uw melding helpt anderen en bouwt het juridische dossier op.
                        </p>
                        <Button asChild size="lg" className="glow-accent">
                            <Link href="/meld-je-ervaring">
                                Meld nu uw ervaring
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
