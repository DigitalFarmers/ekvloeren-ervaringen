import { MapPin, Calendar, CreditCard, CheckCircle2, ShieldCheck, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Report } from "@/lib/db"
import { format } from "date-fns"
import { nl } from "date-fns/locale"

interface ReportCardProps {
    report: Report
}

export function ReportCard({ report }: ReportCardProps) {
    // Format amount safely
    const formattedAmount = report.amount
        ? new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(Number(report.amount))
        : "Onbekend"

    // Format date safely
    const formattedDate = report.date_of_incident
        ? format(new Date(report.date_of_incident), "MMMM yyyy", { locale: nl })
        : "Datum onbekend"

    const reportIdShort = report.id.substring(0, 8)

    return (
        <Card className="hover:shadow-md transition-shadow duration-300 border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <span className="font-mono text-muted-foreground text-sm">#{reportIdShort}</span>
                            <Badge variant="outline" className="flex items-center gap-1 font-normal">
                                <MapPin className="w-3 h-3" />
                                {report.city || "Onbekend"}
                            </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                        </CardDescription>
                    </div>

                    <Badge
                        variant={"default"}
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800 flex items-center gap-1 shrink-0"
                    >
                        {report.status === "approved" ? (
                            <>
                                <ShieldCheck className="w-3 h-3" />
                                Geverifieerd
                            </>
                        ) : (
                            <>
                                <Clock className="w-3 h-3" />
                                In behandeling
                            </>
                        )}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex items-center gap-2 mb-4 font-semibold text-red-600 dark:text-red-400">
                    <CreditCard className="w-4 h-4" />
                    <span>Schade: {formattedAmount}</span>
                </div>

                <blockquote className="border-l-2 border-primary/30 pl-4 py-1 text-sm text-muted-foreground italic">
                    &quot;{report.description.length > 200 ? report.description.substring(0, 200) + "..." : report.description}&quot;
                </blockquote>

                {report.payment_method && (
                    <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                        <span className="font-semibold">Betaalmethode:</span> {report.payment_method}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
