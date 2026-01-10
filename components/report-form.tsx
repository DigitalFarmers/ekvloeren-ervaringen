"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitReport, type SubmitReportResult } from "@/lib/actions/submit-report"
import { CheckCircle2, Upload, X, Loader2 } from "lucide-react"

export function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitReportResult | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [consent, setConsent] = useState(false)
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
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">Melding ontvangen</h2>
        <p className="mb-4 text-muted-foreground">Bedankt voor je melding. We hebben deze succesvol ontvangen.</p>
        {result.reportId && (
          <div className="mb-6 rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">Referentienummer:</p>
            <p className="font-mono text-sm font-medium text-foreground">{result.reportId}</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Als je een e-mailadres hebt opgegeven, ontvang je een bevestiging.
        </p>
        <Button
          className="mt-6 bg-transparent"
          variant="outline"
          onClick={() => {
            setResult(null)
            setFiles([])
            setConsent(false)
            formRef.current?.reset()
          }}
        >
          Nieuwe melding indienen
        </Button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {result && !result.success && (
        <div className="rounded-md bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-200">
          {result.message}
        </div>
      )}

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground">Contactgegevens</h3>

        <div className="space-y-2">
          <Label htmlFor="name">Naam (optioneel)</Label>
          <Input id="name" name="name" placeholder="Je naam" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">
            E-mail of telefoonnummer <span className="text-red-500">*</span>
          </Label>
          <Input id="contact" name="contact" placeholder="email@voorbeeld.nl of 06-12345678" required />
          <p className="text-xs text-muted-foreground">Minimaal 1 contactmogelijkheid is verplicht.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Woonplaats (optioneel)</Label>
          <Input id="city" name="city" placeholder="Je woonplaats" />
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground">Details van het incident</h3>

        <div className="space-y-2">
          <Label htmlFor="dateOfIncident">Datum eerste contact</Label>
          <Input id="dateOfIncident" name="dateOfIncident" type="date" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="amount">Betaald bedrag</Label>
            <Input id="amount" name="amount" type="number" step="0.01" placeholder="€ 0,00" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Betaalmethode</Label>
            <Select name="paymentMethod">
              <SelectTrigger>
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
          <Label htmlFor="description">
            Beschrijving <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Beschrijf wat er is gebeurd..."
            rows={5}
            required
            minLength={10}
          />
          <p className="text-xs text-muted-foreground">
            Minimaal 10 karakters. Beschrijf de situatie zo duidelijk mogelijk.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground">Bewijsmateriaal</h3>
        <p className="text-sm text-muted-foreground">
          Upload screenshots, PDF&apos;s of foto&apos;s ter ondersteuning van je melding.
        </p>

        <div
          className="cursor-pointer rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-muted-foreground/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Klik om bestanden te selecteren</p>
          <p className="text-xs text-muted-foreground">PNG, JPG, PDF (max. 10MB per bestand)</p>
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
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="truncate text-sm text-foreground">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-start space-x-3">
          <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} />
          <div className="space-y-1">
            <Label htmlFor="consent" className="cursor-pointer font-normal">
              Ik ga akkoord met de voorwaarden <span className="text-red-500">*</span>
            </Label>
            <p className="text-xs text-muted-foreground">
              Ik geef toestemming om contact met mij op te nemen en bevestig dat de informatie naar waarheid is
              ingevuld.
            </p>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !consent}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verzenden...
          </>
        ) : (
          "Melding versturen"
        )}
      </Button>
    </form>
  )
}
