// These are placeholder exports for deployment compatibility
// The actual database operations use raw SQL via @neondatabase/serverless

export const reports = {
  name: "reports",
} as const

export const reportFiles = {
  name: "report_files",
} as const

// Re-export types from index for convenience
export type { Report, ReportFile, ReportStatus, Settings } from "./index"
