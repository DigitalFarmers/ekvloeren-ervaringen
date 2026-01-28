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
            COALESCE(defect_category, 'Onbekend') as defect_category, 
            COUNT(*) as count, 
            COALESCE(SUM(amount), 0) as total_amount
        FROM reports
        WHERE status != 'rejected'
        GROUP BY defect_category
        ORDER BY count DESC
    `

        // Recent trend (last 6 months)
        const trendResult = await sql`
        SELECT
            TO_CHAR(created_at, 'YYYY-MM') as month,
            COUNT(*) as count
        FROM reports
        WHERE status != 'rejected'
        AND created_at > NOW() - INTERVAL '6 months'
        GROUP BY month
        ORDER BY month ASC
    `

        // Map to clean types
        const categoryStats: DefectStat[] = categoryResult.map((r) => ({
            defect_category: r.defect_category as string,
            count: Number(r.count),
            total_amount: Number(r.total_amount),
        }))

        const trendStats: TrendStat[] = trendResult.map((r) => ({
            month: r.month as string,
            count: Number(r.count),
        }))

        return { categoryStats, trendStats }
    } catch (error) {
        console.error("Error fetching analysis data:", error)
        return { categoryStats: [], trendStats: [] }
    }
}
