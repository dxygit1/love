import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"


// GET - Fetch all users with their usage info
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    // Check admin role
    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { data: adminCheck } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

    if (adminCheck?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    try {
        // Get all profiles
        const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('id, email, usage_limit, role')
            .order('email')

        if (profilesError) throw profilesError

        // Get current month's start date
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        // Get usage counts for each user this month
        const usersWithUsage = await Promise.all(
            (profiles || []).map(async (profile) => {
                const { count } = await supabase
                    .from('ai_usage_logs')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', profile.id)
                    .eq('success', 'true')
                    .gte('created_at', startOfMonth.toISOString())

                return {
                    id: profile.id,
                    email: profile.email || 'Unknown',
                    usage_limit: profile.usage_limit ?? 30,
                    current_usage: count ?? 0,
                    role: profile.role || 'user'
                }
            })
        )

        return NextResponse.json({ users: usersWithUsage })
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

// PUT - Update user's usage limit or role
export async function PUT(request: NextRequest) {
    try {
        const { adminUserId, userId, usageLimit, role } = await request.json()

        // Check admin role
        const { data: adminCheck } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', adminUserId)
            .single()

        if (adminCheck?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        if (!userId) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        }

        // Build update object
        const updateData: { usage_limit?: number; role?: string } = {}
        if (typeof usageLimit === 'number') {
            updateData.usage_limit = usageLimit
        }
        if (role === 'admin' || role === 'user') {
            updateData.role = role
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
        }

        // Update the user
        const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}

// DELETE - Delete a user
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const adminUserId = searchParams.get('adminUserId')
        const userId = searchParams.get('userId')

        console.log('[Delete User] Request:', { adminUserId, userId })

        // Check admin role
        if (!adminUserId) {
            return NextResponse.json({ error: 'Admin user ID required' }, { status: 400 })
        }

        const { data: adminCheck, error: adminCheckError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', adminUserId)
            .single()

        console.log('[Delete User] Admin check:', { adminCheck, adminCheckError })

        if (adminCheck?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 })
        }

        // Prevent deleting yourself
        if (adminUserId === userId) {
            return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
        }

        // Delete related data first (cascade)
        console.log('[Delete User] Deleting related data for user:', userId)

        // 1. Delete bookmark_tags for user's bookmarks
        const { data: userBookmarks } = await supabase
            .from('bookmarks')
            .select('id')
            .eq('user_id', userId)

        if (userBookmarks && userBookmarks.length > 0) {
            const bookmarkIds = userBookmarks.map(b => b.id)
            console.log('[Delete User] Deleting bookmark_tags for:', bookmarkIds.length, 'bookmarks')
            await supabase.from('bookmark_tags').delete().in('bookmark_id', bookmarkIds)
        }

        // 2. Delete bookmarks
        const { error: bookmarksError } = await supabase.from('bookmarks').delete().eq('user_id', userId)
        console.log('[Delete User] Bookmarks delete result:', bookmarksError || 'success')

        // 3. Delete tags
        const { error: tagsError } = await supabase.from('tags').delete().eq('user_id', userId)
        console.log('[Delete User] Tags delete result:', tagsError || 'success')

        // 4. Delete AI usage logs
        const { error: logsError } = await supabase.from('ai_usage_logs').delete().eq('user_id', userId)
        console.log('[Delete User] Logs delete result:', logsError || 'success')

        // 5. Delete profile
        const { error: profileError } = await supabase.from('profiles').delete().eq('id', userId)
        console.log('[Delete User] Profile delete result:', profileError || 'success')

        if (profileError) throw profileError

        console.log('[Delete User] Successfully deleted user:', userId)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting user:', error)
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}
