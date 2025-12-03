"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "@/components/providers"
import { Activity, TrendingUp, Users, Zap } from "lucide-react"
import { redirect } from "next/navigation"

interface AdminStats {
    overview: {
        totalUsers: number
        activeUsers: number
        callsToday: number
        callsThisMonth: number
        totalCalls: number
    }
    topUsers: Array<{
        userId: string
        email: string
        count: number
    }>
    dailyUsage: Array<{
        date: string
        count: number
    }>
}

export default function AdminDashboard() {
    const { user } = useAppContext()
    const [stats, setStats] = useState<AdminStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        // Check if user is admin
        if (user.email !== 'dxysy1@gmail.com') {
            redirect('/dashboard')
            return
        }

        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/analytics/admin?email=${user.email}`)
                if (response.ok) {
                    const data = await response.json()
                    setStats(data)
                } else {
                    console.error('Failed to fetch admin stats')
                }
            } catch (error) {
                console.error('Error fetching admin stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [user])

    if (!user || user.email !== 'dxysy1@gmail.com') {
        return null
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">正在加载管理后台...</p>
                </div>
            </div>
        )
    }

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">无法加载统计数据</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">管理后台</h1>
                    <p className="text-muted-foreground">AI 书签管理器数据统计</p>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Users */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-muted-foreground">总用户数</h3>
                            <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold mb-1">{stats.overview.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.overview.activeUsers} 活跃用户 (近7天)
                        </p>
                    </div>

                    {/* AI Calls Today */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-muted-foreground">今日 AI 调用</h3>
                            <Zap className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold mb-1">{stats.overview.callsToday}</div>
                        <p className="text-xs text-muted-foreground">
                            本月共 {stats.overview.callsThisMonth} 次
                        </p>
                    </div>

                    {/* Total AI Calls */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-muted-foreground">累计 AI 调用</h3>
                            <Activity className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold mb-1">{stats.overview.totalCalls}</div>
                        <p className="text-xs text-muted-foreground">历史总计</p>
                    </div>

                    {/* Avg per User */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-muted-foreground">人均调用</h3>
                            <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold mb-1">
                            {stats.overview.totalUsers > 0
                                ? Math.round(stats.overview.callsThisMonth / stats.overview.totalUsers)
                                : 0}
                        </div>
                        <p className="text-xs text-muted-foreground">本月平均</p>
                    </div>
                </div>

                {/* Top Users */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-8">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-1">本月活跃用户 Top 10</h3>
                        <p className="text-sm text-muted-foreground">AI 调用次数最多的用户</p>
                    </div>
                    <div className="space-y-4">
                        {stats.topUsers.slice(0, 10).map((user, index) => (
                            <div key={user.userId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium">{user.email}</p>
                                        <p className="text-xs text-muted-foreground">{user.userId.slice(0, 8)}...</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold">{user.count}</p>
                                    <p className="text-xs text-muted-foreground">次调用</p>
                                </div>
                            </div>
                        ))}
                        {stats.topUsers.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">暂无数据</p>
                        )}
                    </div>
                </div>

                {/* Daily Usage Chart */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-1">每日 AI 调用趋势 (近30天)</h3>
                        <p className="text-sm text-muted-foreground">每日 AI 分类接口调用次数</p>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-1">
                        {stats.dailyUsage.map((day) => {
                            const maxCount = Math.max(...stats.dailyUsage.map(d => d.count), 1)
                            const height = (day.count / maxCount) * 100

                            return (
                                <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full bg-primary rounded-t transition-all hover:bg-primary/80 cursor-pointer"
                                        style={{ height: `${height}%`, minHeight: day.count > 0 ? '4px' : '0' }}
                                        title={`${day.date}: ${day.count} 次`}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground text-center">
                        {stats.dailyUsage[0]?.date} → {stats.dailyUsage[stats.dailyUsage.length - 1]?.date}
                    </div>
                </div>
            </div>
        </div>
    )
}
