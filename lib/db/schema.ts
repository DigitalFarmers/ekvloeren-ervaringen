import { pgTable, text, timestamp, uuid, decimal, boolean } from "drizzle-orm/pg-core"

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: text("name"),
  contact: text("contact").notNull(),
  city: text("city"),
  dateOfIncident: text("date_of_incident"),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  paymentMethod: text("payment_method"),
  description: text("description").notNull(),
  consent: boolean("consent").notNull().default(false),
})

export const reportFiles = pgTable("report_files", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  reportId: uuid("report_id")
    .notNull()
    .references(() => reports.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: decimal("file_size"),
  fileType: text("file_type"),
})

export type Report = typeof reports.$inferSelect
export type NewReport = typeof reports.$inferInsert
export type ReportFile = typeof reportFiles.$inferSelect
export type NewReportFile = typeof reportFiles.$inferInsert
