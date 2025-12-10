import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with service role for RLS bypass
function getSupabaseClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

// Extract user ID from custom auth token
// Format: "custom_{userId}_{timestamp}" or real Supabase JWT
async function getUserFromRequest(request: Request) {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
    }

    const token = authHeader.replace('Bearer ', '')

    // Check if it's our custom token format
    if (token.startsWith('custom_')) {
        const parts = token.split('_')
        if (parts.length >= 2) {
            const userId = parts[1]
            // Verify this user exists in profiles table
            const supabase = getSupabaseClient()
            const { data } = await supabase
                .from('profiles')
                .select('id, email')
                .eq('id', userId)
                .single()

            if (data) {
                return { id: data.id, email: data.email }
            }
        }
        return null
    }

    // Fallback: Try Supabase JWT verification (for future use)
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: authHeader } } }
        )
        const { data: { user } } = await supabase.auth.getUser()
        return user
    } catch {
        return null
    }
}

export async function GET(request: Request) {
    try {
        const user = await getUserFromRequest(request)
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = getSupabaseClient()

        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q')

        // Base select
        const selectFields = 'id, title, url, description, favicon_url, created_at'

        if (!query) {
            const { data, error } = await supabase
                .from('bookmarks')
                .select(selectFields)
                .is('deleted_at', null)
                .order('created_at', { ascending: false })
                .limit(20)

            if (error) throw error
            return NextResponse.json(data)
        }

        // 1. Text Search (Title, URL, Description)
        const { data: textMatches, error: textError } = await supabase
            .from('bookmarks')
            .select(selectFields)
            .is('deleted_at', null)
            .or(`title.ilike.%${query}%,url.ilike.%${query}%,description.ilike.%${query}%`)
            .limit(20)

        if (textError) {
            console.error("Text search error:", textError)
            throw textError
        }
        console.log(`[Search] Text matches for '${query}': ${textMatches?.length || 0}`)

        // 2. Tag Search
        // First find matching tags
        const searchPattern = `%${query}%`
        console.log(`[Search] Tag pattern: ${searchPattern}`)

        const { data: matchingTags, error: tagError } = await supabase
            .from('tags')
            .select('id, name')
            .ilike('name', searchPattern)

        if (tagError) console.error("Tag search error:", tagError)
        console.log(`[Search] Matching tags: ${matchingTags?.length || 0}`, matchingTags)

        let tagBookmarkMatches: any[] = []

        if (matchingTags && matchingTags.length > 0) {
            const tagIds = matchingTags.map(t => t.id)

            // Find bookmarks with these tags
            // Note: because we are authenticated, these queries automatically respect RLS for the user
            const { data: bookmarkTags, error: btError } = await supabase
                .from('bookmark_tags')
                .select('bookmark_id')
                .in('tag_id', tagIds)

            if (btError) console.error("Bookmark_tags error:", btError)
            console.log(`[Search] Matched bookmark_tags: ${bookmarkTags?.length || 0}`)

            if (bookmarkTags && bookmarkTags.length > 0) {
                const bookmarkIds = bookmarkTags.map(bt => bt.bookmark_id)

                // Fetch the actual bookmarks
                const { data: tagBookmarks, error: tbError } = await supabase
                    .from('bookmarks')
                    .select(selectFields)
                    .is('deleted_at', null)
                    .in('id', bookmarkIds)
                    .limit(20)

                if (tbError) console.error("Tag bookmarks fetch error:", tbError)

                if (tagBookmarks) {
                    tagBookmarkMatches = tagBookmarks
                    console.log(`[Search] Bookmarks from tags: ${tagBookmarks.length}`)
                }
            }
        }

        // 3. Combine and Deduplicate
        const allMatches = [...(textMatches || []), ...tagBookmarkMatches]
        const uniqueMatches = Array.from(new Map(allMatches.map(item => [item.id, item])).values())

        // Sort by created_at desc
        uniqueMatches.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        return NextResponse.json(uniqueMatches.slice(0, 20))

    } catch (error) {
        console.error("Bookmarks API GET Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const user = await getUserFromRequest(request)
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = getSupabaseClient()

        const body = await request.json()
        const { url, title, description, tags, favicon } = body

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        // 1. Insert Bookmark
        const { data: bookmark, error: insertError } = await supabase
            .from('bookmarks')
            .insert({
                user_id: user.id,
                url,
                title: title || url,
                description,
                favicon_url: favicon
            })
            .select()
            .single()

        if (insertError) throw insertError

        // 2. Handle Tags
        if (tags && Array.isArray(tags) && tags.length > 0) {
            for (const tagName of tags) {
                if (!tagName) continue

                // Find or create tag
                const { data: tag } = await supabase
                    .from('tags')
                    .upsert({ name: tagName, user_id: user.id }, { onConflict: 'user_id, name' })
                    .select()
                    .single()

                if (tag) {
                    await supabase
                        .from('bookmark_tags')
                        .insert({ bookmark_id: bookmark.id, tag_id: tag.id })
                }
            }
        }

        return NextResponse.json(bookmark)

    } catch (error) {
        console.error("Bookmarks API POST Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
