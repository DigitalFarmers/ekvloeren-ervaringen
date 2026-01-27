import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

export const db = sql

export type ReportStatus = "pending" | "approved" | "rejected" | "needs_info" | "duplicate"

export interface Report {
  id: string
  created_at: Date
  status: ReportStatus
  name: string | null
  contact: string
  city: string | null
  date_of_incident: string | null
  amount: string | null
  payment_method: string | null
  description: string
  social_profile_url: string | null
  consent: boolean
  link_to_others: boolean
  link_to_report_id: string | null
  internal_notes: string | null
  admin_id: string | null
}

export type AdminRole = "admin" | "superadmin"

export interface User {
  id: string
  username: string
  password_hash: string
  full_name: string
  role: AdminRole
  created_at: Date
}

export interface ReportFile {
  id: string
  created_at: Date
  report_id: string
  file_name: string
  file_url: string
  file_size: string | null
  file_type: string | null
}

export interface Settings {
  id: string
  key: string
  value: string
  updated_at: Date
}
