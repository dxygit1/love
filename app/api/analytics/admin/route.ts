import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Admin email check
const ADMIN_EMAIL = 'dxysy1@gmail.com'

export async function GET(request: NextRequest) {
    try {
        // Get user email from query parameters
        const { searchParams } = new URL(request.url)
        const requestingUserEmail = searchParams.get('email')

        if (!requestingUserEmail) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }

        // Check if user is admin
        if (requestingUserEmail !== ADMIN_EMAIL) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }

        // Get current month start and end
        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        // Get all AI usage logs
        const { data: allLogs, error: logsError } = await supabase
            .from('ai_usage_logs')
            .select('*')
            .order('created_at', { ascending: false })

        if (logsError) {
            console.error('Error fetching logs:', logsError)
            return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
        }

        // Get all users
        const { data: users, error: usersError } = await supabase
            .from('profiles')
            .select('id, email, full_name')

        if (usersError) {
            console.error('Error fetching users:', usersError)
        }

        // Calculate statistics
        const totalUsers = users?.length || 0
        const callsToday = allLogs?.filter(log => new Date(log.created_at) >= todayStart).length || 0
        const callsThisMonth = allLogs?.filter(log => new Date(log.created_at) >= monthStart).length || 0
        const totalCalls = allLogs?.length || 0

        // Active users (made a call in last 7 days)
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const activeUserIds = new Set(
            allLogs?.filter(log => new Date(log.created_at) >= sevenDaysAgo).map(log => log.user_id)
        )
        const activeUsers = activeUserIds.size

        // Top users by usage this month
        const monthLogs = allLogs?.filter(log => new Date(log.created_at) >= monthStart) || []
        const userCallCounts = monthLogs.reduce((acc: Record<string, number>, log) => {
            acc[log.user_id] = (acc[log.user_id] || 0) + 1
            return acc
        }, {})

        const topUsers = Object.entries(userCallCounts)
            .map(([userId, count]) => ({
                userId,
                email: users?.find(u => u.id === userId)?.email || 'Unknown',
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)

        // Daily usage for last 30 days
        const dailyUsage = []
        for (let i = 29; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)

            const count = allLogs?.filter(log => {
                const logDate = new Date(log.created_at)
                return logDate >= dayStart && logDate <= dayEnd
            }).length || 0

            dailyUsage.push({
                date: dayStart.toISOString().split('T')[0],
                count,
            })
        }

        return NextResponse.json({
            overview: {
                totalUsers,
                activeUsers,
                callsToday,
                callsThisMonth,
                totalCalls,
            },
            topUsers,
            dailyUsage,
        })
    } catch (error) {
        console.error("Admin analytics error:", error)
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }
}
