import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Contact | EK Vloeren Ervaringen",
    description: "Neem contact op met EK Vloeren Ervaringen.",
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact</h1>
                    <p className="mt-4 text-muted-foreground text-lg">
                        Heb je vragen over dit platform of wil je in contact komen?
                    </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-2">Stuur ons een e-mail</h2>
                            <p className="text-muted-foreground mb-4">
                                We proberen zo snel mogelijk te reageren op alle berichten.
                            </p>
                            <a
                                href="mailto:meld@ekvloeren-ervaringen.nl"
                                className="text-lg font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4"
                            >
                                meld@ekvloeren-ervaringen.nl
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button asChild variant="ghost">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Terug naar home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
