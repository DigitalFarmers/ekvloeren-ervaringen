import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
    title: "Veelgestelde Vragen | EK Vloeren Ervaringen",
    description: "Antwoorden op veelgestelde vragen over het melden van ervaringen met EK Vloeren.",
}

export default function FAQPage() {
    return (
        <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar home
                </Link>
            </Button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-full">
                    <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Veelgestelde Vragen</h1>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">

                <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Is mijn melding echt anoniem?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                        Ja. Op de website tonen we nooit je naam, e-mailadres of telefoonnummer. We tonen alleen algemene details zoals &quot;Gedupeerde uit Utrecht&quot;, de datum en het schadebedrag. Je persoonsgegevens zijn alleen zichtbaar voor ons verificatieteam.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Wat doen jullie met de bewijsstukken?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                        Bewijsstukken (zoals facturen en screenshots) worden versleuteld opgeslagen en uitsluitend gebruikt om te verifiëren dat je een echte klant was. Ze worden <strong>nooit</strong> gepubliceerd op de website.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Kan ik nog aangifte doen als ik hier meld?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                        Jazeker, dat raden we zelfs sterk aan! Dit platform vervangt de politie niet. Wel kan het helpen als je bij je aangifte vermeldt dat er vele andere slachtoffers bekend zijn via dit platform.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Wie zit er achter dit platform?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                        Dit is een initiatief van Digital Farmers, een collectief dat technologie inzet voor maatschappelijke transparantie. Wij hebben geen commercieel belang en zijn geen concurrent van EK Vloeren. Ons doel is consumentenbescherming.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Kan Erwin Kooistra dit laten verwijderen?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                        Nee. Vrijheid van meningsuiting en het waarschuwen van medeburgers is een groot recht. Zolang wij ons houden aan de feiten en geen smaad plegen (wat we streng bewaken), is dit platform volledig legaal.
                    </AccordionContent>
                </AccordionItem>

            </Accordion>

            <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
                <p className="font-semibold mb-4">Staat je vraag er niet tussen?</p>
                <Button asChild variant="outline">
                    <Link href="mailto:meld@ekvloeren-ervaringen.nl">
                        Mail ons gerust
                    </Link>
                </Button>
            </div>

        </div>
    )
}
