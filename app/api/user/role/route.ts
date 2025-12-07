import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    try {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single()

        if (error) {
            console.error('Error fetching user role:', error)
            return NextResponse.json({ role: 'user' })
        }

        return NextResponse.json({ role: profile?.role || 'user' })
    } catch (error) {
        console.error('Error fetching user role:', error)
        return NextResponse.json({ role: 'user' })
    }
}
