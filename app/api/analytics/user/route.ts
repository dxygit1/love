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

        // Get current month start
        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

        // Get user's profile for usage_limit
        const { data: profile } = await retry(async () => await supabase
            .from('profiles')
            .select('usage_limit')
            .eq('id', userId)
            .single())

        const monthlyLimit = profile?.usage_limit ?? 30

        // Count SUCCESSFUL AI usage logs for this month (matching admin API logic)
        const { count: totalCalls, error: countError } = await retry(async () => await supabase
            .from('ai_usage_logs')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('success', 'true')  // Only count successful calls
            .gte('created_at', monthStart.toISOString()))

        if (countError) {
            console.error('Error fetching usage count:', countError)
            return NextResponse.json({ error: "Failed to fetch usage data" }, { status: 500 })
        }

        const usageCount = totalCalls ?? 0

        // Get recent logs for display
        const { data: logs } = await retry(async () => await supabase
            .from('ai_usage_logs')
            .select('*')
            .eq('user_id', userId)
            .gte('created_at', monthStart.toISOString())
            .order('created_at', { ascending: false })
            .limit(10))

        // Calculate days until reset
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        const daysUntilReset = Math.ceil((nextMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        return NextResponse.json({
            totalCalls: usageCount,
            successfulCalls: usageCount,
            failedCalls: 0, // Not tracking failed separately anymore
            monthlyLimit,
            remaining: Math.max(0, monthlyLimit - usageCount),
            usagePercentage: monthlyLimit > 0 ? Math.round((usageCount / monthlyLimit) * 100) : 0,
            daysUntilReset,
            logs: logs || [],
        })
    } catch (error) {
        console.error("Analytics error:", error)
        // Return default "zero" state on error so dashboard doesn't crash
        return NextResponse.json({
            totalCalls: 0,
            successfulCalls: 0,
            failedCalls: 0,
            monthlyLimit: 30, // Default fallback
            remaining: 30,
            usagePercentage: 0,
            daysUntilReset: 30,
            logs: [],
            isUnavailable: true // Flag for frontend to show warning
        })
    }
}

async function retry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    try {
        return await fn()
    } catch (error) {
        if (retries <= 0) throw error
        await new Promise(resolve => setTimeout(resolve, delay))
        return retry(fn, retries - 1, delay * 2)
    }
}
