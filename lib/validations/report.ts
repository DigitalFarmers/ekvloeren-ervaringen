import { z } from "zod"

export const reportSchema = z.object({
  name: z.string().optional(),
  contact: z
    .string()
    .min(1, "E-mail of telefoonnummer is verplicht")
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[+]?[\d\s-]{8,}$/
        return emailRegex.test(val) || phoneRegex.test(val)
      },
      { message: "Voer een geldig e-mailadres of telefoonnummer in" },
    ),
  city: z.string().optional(),
  dateOfIncident: z.string().optional(),
  amount: z.string().optional(),
  paymentMethod: z.string().optional(),
  defectCategory: z.string().min(1, "Selecteer een type gebrek"),
  defectDetails: z.string().optional(),
  description: z.string().min(10, "Beschrijving moet minimaal 10 karakters bevatten"),
  socialProfileUrl: z.string().url().optional().or(z.literal("")),
  consent: z.boolean().refine((val) => val === true, {
    message: "Je moet akkoord gaan met de voorwaarden",
  }),
  linkToOthers: z.boolean().optional(),
})

export const reportFormSchema = reportSchema

export type ReportFormData = z.infer<typeof reportSchema>

const THREAT_KEYWORDS = [
  "bedreig",
  "vermoord",
  "dood",
  "sla je",
  "pak je",
  "weet waar je woont",
  "kom langs",
  "zal je",
  "krijg je spijt",
  "opzoeken",
]

const INSULT_KEYWORDS = ["klootzak", "idioot", "mongool", "kanker", "tyfus", "tering", "hoer", "kut"]

// Dutch postal code pattern: 4 digits + 2 letters (e.g., 1234 AB)
const POSTAL_CODE_REGEX = /\b\d{4}\s*[A-Za-z]{2}\b/

// Full address pattern: street name + number + postal code
const ADDRESS_REGEX =
  /\b[A-Za-z]+(?:straat|laan|weg|plein|singel|gracht|kade|dreef|hof|steeg)\s+\d+[a-zA-Z]?\s*,?\s*\d{4}\s*[A-Za-z]{2}\b/i

export function checkForModeration(text: string): { shouldFlag: boolean; reason: string | null } {
  const lowerText = text.toLowerCase()

  // Check for threats
  for (const keyword of THREAT_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return { shouldFlag: true, reason: "Mogelijke bedreiging gedetecteerd" }
    }
  }

  // Check for insults
  for (const keyword of INSULT_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return { shouldFlag: true, reason: "Ongepast taalgebruik gedetecteerd" }
    }
  }

  // Check for full addresses
  if (ADDRESS_REGEX.test(text)) {
    return { shouldFlag: true, reason: "Volledig adres gedetecteerd" }
  }

  // Check for postal codes (less strict, just flag for review)
  if (POSTAL_CODE_REGEX.test(text)) {
    return { shouldFlag: true, reason: "Postcode gedetecteerd - privacycheck nodig" }
  }

  return { shouldFlag: false, reason: null }
}
