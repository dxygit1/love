import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
    try {
        // Get user ID from query parameters
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 })
        }

        // Get current month start and end
        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

        // Get user's AI usage logs for this month
        const { data: logs, error } = await supabase
            .from('ai_usage_logs')
            .select('*')
            .eq('user_id', userId)
            .gte('created_at', monthStart.toISOString())
            .lte('created_at', monthEnd.toISOString())
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching usage logs:', error)
            return NextResponse.json({ error: "Failed to fetch usage data" }, { status: 500 })
        }

        // Get user metadata (monthly limit)
        const { data: metadata } = await supabase
            .from('user_metadata')
            .select('monthly_ai_limit')
            .eq('user_id', userId)
            .single()

        const monthlyLimit = metadata?.monthly_ai_limit ? parseInt(metadata.monthly_ai_limit) : 30

        // Calculate statistics
        const totalCalls = logs?.length || 0
        const successfulCalls = logs?.filter(log => log.success === 'true').length || 0
        const failedCalls = logs?.filter(log => log.success === 'false').length || 0

        // Calculate days until reset
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        const daysUntilReset = Math.ceil((nextMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        return NextResponse.json({
            totalCalls,
            successfulCalls,
            failedCalls,
            monthlyLimit,
            remaining: Math.max(0, monthlyLimit - totalCalls),
            usagePercentage: monthlyLimit > 0 ? Math.round((totalCalls / monthlyLimit) * 100) : 0,
            daysUntilReset,
            logs: logs?.slice(0, 10), // Return only last 10 logs
        })
    } catch (error) {
        console.error("Analytics error:", error)
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }
}
