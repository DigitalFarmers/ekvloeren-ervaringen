"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { DefectStat, TrendStat } from "@/lib/actions/admin-analysis"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

interface AdminAnalysisChartsProps {
    categoryStats: DefectStat[]
    trendStats: TrendStat[]
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"]

export function AdminAnalysisCharts({ categoryStats, trendStats }: AdminAnalysisChartsProps) {
    // Calculate top stats
    const totalDamage = categoryStats.reduce((acc, curr) => acc + curr.total_amount, 0)
    const totalReports = categoryStats.reduce((acc, curr) => acc + curr.count, 0)
    const averageDamage = totalReports > 0 ? totalDamage / totalReports : 0

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-zinc-400 text-sm font-medium">Totaal Gemeld</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalReports}</div>
                        <p className="text-xs text-zinc-500">Gevalideerde meldingen</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-zinc-400 text-sm font-medium">Totale Schade</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">€{totalDamage.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-zinc-500">Directe financiële schade</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-zinc-400 text-sm font-medium">Gemiddelde Schade</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">€{averageDamage.toLocaleString('nl-NL', { maximumFractionDigits: 0 })}</div>
                        <p className="text-xs text-zinc-500">Per gedupeerde</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Defect Distribution (Pie) */}
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Verdeling Type Gebreken</CardTitle>
                        <CardDescription className="text-zinc-400">Welke problemen komen het vaakst voor?</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="count"
                                    nameKey="defect_category"
                                >
                                    {categoryStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: 'white' }}
                                    itemStyle={{ color: 'white' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Financial Impact per Category (Bar) */}
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Financiële Impact per Categorie</CardTitle>
                        <CardDescription className="text-zinc-400">Totale schade per type gebrek</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryStats} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                                <XAxis type="number" stroke="#71717a" tickFormatter={(value) => `€${value / 1000}k`} />
                                <YAxis dataKey="defect_category" type="category" stroke="#a1a1aa" width={100} />
                                <Tooltip
                                    cursor={{ fill: '#27272a' }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: 'white' }}
                                    formatter={(value: number) => [`€${value.toLocaleString('nl-NL')}`, 'Schade']}
                                />
                                <Bar dataKey="total_amount" fill="#ef4444" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Trend Graph (Line/Bar) */}
                <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Meldingen per Maand</CardTitle>
                        <CardDescription className="text-zinc-400">Aantal nieuwe dossiers in de afgelopen 6 maanden</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="month" stroke="#71717a" />
                                <YAxis stroke="#71717a" allowDecimals={false} />
                                <Tooltip
                                    cursor={{ fill: '#27272a' }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: 'white' }}
                                />
                                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} name="Aantal Meldingen" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
