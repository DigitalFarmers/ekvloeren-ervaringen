"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitReport, type SubmitReportResult } from "@/lib/actions/submit-report"
import {
  CheckCircle2,
  Upload,
  X,
  Loader2,
  User,
  Mail,
  MapPin,
  Calendar,
  Euro,
  CreditCard,
  ShieldCheck,
  FileText,
  ArrowRight,
  Info
} from "lucide-react"

export function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitReportResult | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [consent, setConsent] = useState(false)
  const [linkToOthers, setLinkToOthers] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.set("consent", consent.toString())
    formData.set("linkToOthers", linkToOthers.toString())

    // Add files to formData
    files.forEach((file) => {
      formData.append("files", file)
    })

    const submitResult = await submitReport(formData)
    setResult(submitResult)
    setIsSubmitting(false)
  }

  // Success screen
  if (result?.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 p-12 text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white">Melding ontvangen</h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Je hebt de eerste stap gezet. Je melding is veilig ontvangen en wordt zorgvuldig verwerkt.
        </p>
        {result.reportId && (
          <div className="mb-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 inline-block">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Referentienummer</p>
            <p className="font-mono text-lg font-medium text-zinc-900 dark:text-white">{result.reportId}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="h-12 px-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
            onClick={() => {
              setResult(null)
              setFiles([])
              setConsent(false)
              setLinkToOthers(false)
              formRef.current?.reset()
            }}
          >
            Nieuwe melding indienen
          </Button>
          <Button variant="outline" className="h-12 px-8" asChild>
            <a href="/">Terug naar home</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      {result && !result.success && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-300 flex items-center gap-3">
          <X className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{result.message}</p>
        </div>
      )}

      {/* Intro visual */}
      <div className="rounded-2xl bg-zinc-900 p-6 text-white overflow-hidden relative border border-white/5">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400 h-6 w-6" />
            Veilig en anoniem melden
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
            We verzamelen alleen wat nodig is om het patroon aan te tonen. Geen overbodige privégegevens, geen rompslomp.
          </p>
        </div>
        <ShieldCheck className="absolute -right-8 -bottom-8 h-48 w-48 text-white/5 z-0 rotate-12" />
      </div>

      {/* Step 1: Contact */}
      <div className="group relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-800 group-focus-within:bg-zinc-900 dark:group-focus-within:bg-zinc-100 transition-colors rounded-full" />
        <div className="space-y-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-bold">1</div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Contactgegevens</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-zinc-500" /> Naam <span className="text-xs text-zinc-400 font-normal">(Mag anoniem)</span>
              </Label>
              <Input id="name" name="name" placeholder="Je naam" className="h-11 bg-zinc-50 dark:bg-zinc-900" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-zinc-500" /> E-mail of telefoon <span className="text-red-500">*</span>
              </Label>
              <Input id="contact" name="contact" placeholder="Hoe bereiken we je?" required className="h-11 bg-zinc-50 dark:bg-zinc-900" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-zinc-500" /> Woonplaats
              </Label>
              <Input id="city" name="city" placeholder="Je stad" className="h-11 bg-zinc-50 dark:bg-zinc-900" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialProfileUrl" className="flex items-center gap-2 text-zinc-400">
                <Info className="h-4 w-4" /> Social media profiel <span className="text-xs font-normal">(Optioneel)</span>
              </Label>
              <Input id="socialProfileUrl" name="socialProfileUrl" type="url" placeholder="https://..." className="h-11 bg-zinc-50 dark:bg-zinc-900 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Details */}
      <div className="group relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-800 group-focus-within:bg-zinc-900 dark:group-focus-within:bg-zinc-100 transition-colors rounded-full" />
        <div className="space-y-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-bold">2</div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Het Incident</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dateOfIncident" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-500" /> Datum eerste contact
              </Label>
              <Input id="dateOfIncident" name="dateOfIncident" type="date" className="h-11 bg-zinc-50 dark:bg-zinc-900" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-zinc-500" /> Betaald bedrag
              </Label>
              <Input id="amount" name="amount" type="number" step="0.01" placeholder="€ 0,00" className="h-11 bg-zinc-50 dark:bg-zinc-900" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-zinc-500" /> Betaalmethode
              </Label>
              <Select name="paymentMethod">
                <SelectTrigger className="h-11 bg-zinc-50 dark:bg-zinc-900">
                  <SelectValue placeholder="Selecteer..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ideal">iDEAL</SelectItem>
                  <SelectItem value="overboeking">Overboeking</SelectItem>
                  <SelectItem value="contant">Contant</SelectItem>
                  <SelectItem value="tikkie">Tikkie</SelectItem>
                  <SelectItem value="anders">Anders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-zinc-500" /> Jouw verhaal <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Wat is er precies gebeurd? Hoe meer details, hoe sterker we staan."
              rows={6}
              required
              minLength={10}
              className="bg-zinc-50 dark:bg-zinc-900 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Evidence */}
      <div className="group relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-800 group-focus-within:bg-zinc-900 dark:group-focus-within:bg-zinc-100 transition-colors rounded-full" />
        <div className="space-y-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-bold">3</div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Bewijsmateriaal</h3>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Upload screenshots van gesprekken, betalingsbewijzen of de offerte. Dit helpt ons bij de verificatie.
          </p>

          <div
            className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-700"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Upload className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">Selecteer bestanden</p>
            <p className="text-xs text-zinc-500 mt-1">PNG, JPG, PDF (max. 10MB per bestand)</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {files.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-300">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-2 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Consent & Submit */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-6 md:p-8 space-y-5">
          <div className="flex items-start space-x-3">
            <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-1" />
            <div className="space-y-1">
              <Label htmlFor="consent" className="cursor-pointer font-bold text-zinc-900 dark:text-white">
                Akkoord met de voorwaarden <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Ik verklaar dat ik de informatie naar waarheid heb ingevuld en geef toestemming om mijn melding anoniem te verwerken in het collectieve dossier.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox id="linkToOthers" checked={linkToOthers} onCheckedChange={(checked) => setLinkToOthers(checked === true)} className="mt-1" />
            <div className="space-y-1">
              <Label htmlFor="linkToOthers" className="cursor-pointer font-bold text-zinc-900 dark:text-white">
                Breng mij in contact met andere melders
              </Label>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Optioneel. Als er meer melders in jouw regio of met hetzelfde verhaal zijn, kunnen we jullie anoniem koppelen voor collectieve actie.
              </p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg" size="lg" disabled={isSubmitting || !consent}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Melding wordt beveiligd verzonden...
            </>
          ) : (
            <>
              Melding definitief versturen
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
        <p className="text-center text-xs text-zinc-500 italic">
          Heb je vragen? Neem contact met ons op via meld@ekvloeren-ervaringen.nl
        </p>
      </div>
    </form>
  )
}
