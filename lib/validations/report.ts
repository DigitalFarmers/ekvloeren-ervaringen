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
  description: z.string().min(10, "Beschrijving moet minimaal 10 karakters bevatten"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Je moet akkoord gaan met de voorwaarden",
  }),
})

export type ReportFormData = z.infer<typeof reportSchema>
