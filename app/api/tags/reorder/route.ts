import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
    try {
        const { userId, tagOrder } = await request.json()

        if (!userId || !Array.isArray(tagOrder)) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 })
        }

        // Update each tag's sort_order
        const updates = tagOrder.map((tagName: string, index: number) => {
            return supabase
                .from("tags")
                .update({ sort_order: String(index) })
                .eq("user_id", userId)
                .eq("name", tagName)
        })

        await Promise.all(updates)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error reordering tags:", error)
        return NextResponse.json({ error: "Failed to reorder tags" }, { status: 500 })
    }
}
