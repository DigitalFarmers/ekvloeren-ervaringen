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
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export function ReportFormEnhanced() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<SubmitReportResult | null>(null)
    const [files, setFiles] = useState<File[]>([])
    const [currentStep, setCurrentStep] = useState(1)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).slice(0, 5 - files.length)
            setFiles((prev) => [...prev, ...newFiles])
        }
    }

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitResult(null)

        const formData = new FormData(e.currentTarget)

        // Add files to formData
        files.forEach((file) => {
            formData.append("files", file)
        })

        try {
            const result = await submitReport(formData)
            setSubmitResult(result)

            if (result.success) {
                // Reset form
                ; (e.target as HTMLFormElement).reset()
                setFiles([])
                setCurrentStep(1)

                // Scroll to success message
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        } catch (error) {
            setSubmitResult({
                success: false,
                message: "Er is een onverwachte fout opgetreden. Probeer het later opnieuw.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Success state
    if (submitResult?.success) {
        return (
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 p-8 border border-emerald-200 dark:border-emerald-800">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-emerald-900 dark:text-emerald-100">
                        Bedankt voor je melding!
                    </h2>
                    <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                        {submitResult.message}
                    </p>
                    <Button
                        onClick={() => setSubmitResult(null)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        Nog een melding indienen
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {submitResult && !submitResult.success && (
                <div className="rounded-xl bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-800 dark:text-red-200">{submitResult.message}</p>
                </div>
            )}

            {/* Form Card */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">

                {/* Step 1: Basis informatie */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            1
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                            Basis Informatie
                        </h3>
                    </div>

                    <div className="grid gap-6">
                        {/* Name (Optional) */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                Naam <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">(optioneel, anoniem indienen kan ook)</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Bijv. Jan Jansen"
                                className="h-12 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                            />
                        </div>

                        {/* Contact (Required) */}
                        <div className="space-y-2">
                            <Label htmlFor="contact" className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                                E-mailadres <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="contact"
                                name="contact"
                                type="email"
                                required
                                placeholder="jouw@email.nl"
                                className="h-12 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                            />
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Voor eventuele vragen en updates over je melding
                            </p>
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-zinc-700 dark:text-zinc-300">
                                Woonplaats <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">(optioneel)</span>
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                placeholder="Bijv. Groningen"
                                className="h-12 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800"></div>

                {/* Step 2: Details van het incident */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            2
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                            Wat is er gebeurd?
                        </h3>
                    </div>

                    <div className="grid gap-6">
                        {/* Date of incident */}
                        <div className="space-y-2">
                            <Label htmlFor="date_of_incident" className="text-zinc-700 dark:text-zinc-300">
                                Wanneer gebeurde dit? <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">(bij benadering)</span>
                            </Label>
                            <Input
                                id="date_of_incident"
                                name="date_of_incident"
                                type="date"
                                className="h-12 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                            />
                        </div>

                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-zinc-700 dark:text-zinc-300">
                                Financiële schade <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">(indien van toepassing)</span>
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">€</span>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="text"
                                    placeholder="0,00"
                                    className="h-12 pl-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                                />
                            </div>
                        </div>

                        {/* Payment method */}
                        <div className="space-y-2">
                            <Label htmlFor="payment_method" className="text-zinc-700 dark:text-zinc-300">
                                Betaalmethode <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">(optioneel)</span>
                            </Label>
                            <Select name="payment_method">
                                <SelectTrigger className="h-12 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700">
                                    <SelectValue placeholder="Selecteer..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">Contant</SelectItem>
                                    <SelectItem value="bank_transfer">Bankoverschrijving</SelectItem>
                                    <SelectItem value="ideal">iDEAL</SelectItem>
                                    <SelectItem value="creditcard">Creditcard</SelectItem>
                                    <SelectItem value="other">Anders</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                                Jouw verhaal <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                rows={6}
                                placeholder="Beschrijf wat er gebeurd is... Hoe meer details, hoe beter we anderen kunnen helpen."
                                className="bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 resize-none"
                            />
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Tip: Vermeld concrete feiten, data en bedragen indien mogelijk
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800"></div>

                {/* Step 3: Bewijs (optioneel) */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                            Documenten <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">(optioneel)</span>
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Upload screenshots, foto's, contracten of andere documenten die je ervaring ondersteunen (max 5 bestanden)
                        </p>

                        <div className="space-y-3">
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*,.pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-14 border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all"
                                disabled={files.length >= 5}
                            >
                                <Upload className="w-5 h-5 mr-2" />
                                {files.length === 0 ? "Klik om bestanden te uploaden" : `${files.length}/5 bestanden geselecteerd`}
                            </Button>

                            {/* File list */}
                            {files.length > 0 && (
                                <div className="space-y-2">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                                        >
                                            {file.type.startsWith("image/") ? (
                                                <ImageIcon className="w-5 h-5 text-zinc-400" />
                                            ) : (
                                                <FileText className="w-5 h-5 text-zinc-400" />
                                            )}
                                            <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300 truncate">
                                                {file.name}
                                            </span>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {(file.size / 1024).toFixed(0)}KB
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeFile(index)}
                                                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-950/30"
                                            >
                                                <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800"></div>

                {/* Step 4: Toestemming */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            4
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                            Laatste stap
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {/* Social profile */}
                        <div className="space-y-2">
                            <Label htmlFor="social_profile_url" className="text-zinc-700 dark:text-zinc-300">
                                Link naar social media profiel <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">(optioneel, voor verificatie)</span>
                            </Label>
                            <Input
                                id="social_profile_url"
                                name="social_profile_url"
                                type="url"
                                placeholder="https://facebook.com/jouwnaam of https://linkedin.com/in/jouwnaam"
                                className="h-12 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                            />
                        </div>

                        {/* Consent checkbox */}
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                            <Checkbox id="consent" name="consent" required className="mt-1" />
                            <label htmlFor="consent" className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed cursor-pointer">
                                Ik bevestig dat de door mij verstrekte informatie naar waarheid is en ga akkoord met de{" "}
                                <a href="/voorwaarden" target="_blank" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                                    voorwaarden
                                </a>{" "}
                                en het{" "}
                                <a href="/privacy" target="_blank" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                                    privacybeleid
                                </a>
                                .
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <div className="p-8 pt-0">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-lg font-semibold shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Melding versturen...
                            </>
                        ) : (
                            "Melding versturen"
                        )}
                    </Button>
                    <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-4">
                        Je melding wordt vertrouwelijk behandeld en gecontroleerd voordat deze wordt gepubliceerd
                    </p>
                </div>
            </div>
        </form>
    )
}
