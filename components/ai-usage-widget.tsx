"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "./providers"
import { Activity, TrendingUp } from "lucide-react"

interface UsageStats {
    totalCalls: number
    monthlyLimit: number
    remaining: number
    usagePercentage: number
    daysUntilReset: number
}

export function AiUsageWidget() {
    const { user } = useAppContext()
    const [stats, setStats] = useState<UsageStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/analytics/user?userId=${user.id}`)
                if (response.ok) {
                    const data = await response.json()
                    setStats({
                        totalCalls: data.totalCalls,
                        monthlyLimit: data.monthlyLimit,
                        remaining: data.remaining,
                        usagePercentage: data.usagePercentage,
                        daysUntilReset: data.daysUntilReset,
                    })
                }
            } catch (error) {
                console.error('Failed to fetch usage stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [user])

    if (!user || loading || !stats) return null

    const getProgressColor = () => {
        if (stats.usagePercentage >= 90) return 'bg-red-500'
        if (stats.usagePercentage >= 70) return 'bg-yellow-500'
        return 'bg-primary'
    }

    const getTextColor = () => {
        if (stats.usagePercentage >= 90) return 'text-red-600'
        if (stats.usagePercentage >= 70) return 'text-yellow-600'
        return 'text-primary'
    }

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                    <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-base">AI Usage This Month</h3>
                    <p className="text-xs text-muted-foreground">Resets in {stats.daysUntilReset} days</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold ${getTextColor()}`}>
                        {stats.totalCalls} / {stats.monthlyLimit}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {stats.remaining} remaining
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor()}`}
                        style={{ width: `${Math.min(stats.usagePercentage, 100)}%` }}
                    />
                </div>

                {stats.usagePercentage >= 90 && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                        <TrendingUp className="w-4 h-4" />
                        <span>You're approaching your monthly limit!</span>
                    </div>
                )}
            </div>
        </div>
    )
}
