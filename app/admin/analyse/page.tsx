import { Suspense } from "react"
import { getAnalysisData } from "@/lib/actions/admin-analysis"
import { AdminAnalysisCharts } from "@/components/admin-analysis-charts"
import { AdminLogin } from "@/components/admin-login"
import { getAdminSession } from "@/lib/actions/admin-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
    title: "Diepe Analyse | EK Vloeren Admin",
}

export default async function AnalysisPage() {
    const session = await getAdminSession()
    if (!session) return <AdminLogin />

    const data = await getAnalysisData()

    if (!data) {
        return <div className="p-8 text-white">Geen data beschikbaar of database error.</div>
    }

    return (
        <div className="min-h-screen bg-black text-zinc-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" className="text-zinc-400 hover:text-white">
                            <Link href="/admin">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Terug naar Dashboard
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold">Diepe Analyse & Gebreken</h1>
                    </div>
                    <div className="text-sm text-zinc-500">
                        Realtime data uit {data.categoryStats.reduce((a, b) => a + b.count, 0)} dossiers
                    </div>
                </div>

                {data.totalReportsCount === 0 ? (
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-900 p-12 text-center">
                        <p className="text-zinc-500">Er zijn nog geen meldingen in de database om te analyseren.</p>
                    </div>
                ) : data.categoryStats.length === 0 ? (
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-900 p-12 text-center">
                        <p className="text-zinc-500">Er zijn {data.totalReportsCount} meldingen, maar geen enkele heeft een status die wordt meegenomen in de analyse (bijv. alle zijn afgewezen of duplicaten).</p>
                    </div>
                ) : (
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-900 p-6">
                        <Suspense fallback={<div className="text-zinc-500">Laden van grafieken...</div>}>
                            <AdminAnalysisCharts categoryStats={data.categoryStats} trendStats={data.trendStats} />
                        </Suspense>
                    </div>
                )}
            </div>
        </div>
    )
}
