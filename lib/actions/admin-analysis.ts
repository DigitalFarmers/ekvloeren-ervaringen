"use server"

import { sql } from "@/lib/db"
import { getAdminSession } from "./admin-auth"

export interface DefectStat {
    defect_category: string
    count: number
    total_amount: number
}

export interface TrendStat {
    month: string
    count: number
}

export async function getAnalysisData() {
    const session = await getAdminSession()
    if (!session) return null

    try {
        // Count by category
        const categoryResult = await sql`
        SELECT 
            COALESCE(defect_category, 'Onbekend') as label, 
            COUNT(*) as count, 
            COALESCE(SUM(amount), 0) as total_amount
        FROM reports
        WHERE status NOT IN ('rejected', 'duplicate')
        GROUP BY COALESCE(defect_category, 'Onbekend')
        ORDER BY count DESC
    `

        // Recent trend (last 6 months)
        const trendResult = await sql`
        SELECT
            month,
            COUNT(*) as count
        FROM (
            SELECT TO_CHAR(created_at, 'YYYY-MM') as month, status
            FROM reports
            WHERE created_at > NOW() - INTERVAL '1 year'
        ) sub
        WHERE status NOT IN ('rejected', 'duplicate')
        GROUP BY month
        ORDER BY month ASC
    `

        // Map to clean types
        const categoryStats: DefectStat[] = categoryResult.map((r) => ({
            defect_category: r.label as string,
            count: Number(r.count),
            total_amount: Number(r.total_amount),
        }))

        const trendStats: TrendStat[] = trendResult.map((r) => ({
            month: r.month as string,
            count: Number(r.count),
        }))

        // Total count regardless of status for debugging/context
        const totalReportsCountResult = await sql`SELECT COUNT(*) as count FROM reports`
        const totalReportsCount = Number(totalReportsCountResult[0]?.count || 0)

        return { categoryStats, trendStats, totalReportsCount }
    } catch (error) {
        console.error("Error fetching analysis data:", error)
        return { categoryStats: [], trendStats: [], totalReportsCount: 0 }
    }
}
