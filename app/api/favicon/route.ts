import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get("url")

    if (!targetUrl) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    try {
        // 1. Fetch the HTML
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

        const response = await fetch(targetUrl, {
            signal: controller.signal,
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; BookmarkManager/1.0; +http://localhost:3000)",
            },
        })
        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`Failed to fetch ${targetUrl}: ${response.status}`)
        }

        const html = await response.text()

        // 2. Parse HTML with Regex (fallback since cheerio install failed)
        let faviconUrl: string | undefined

        // Regex to find link tags with rel containing icon
        // Matches <link ... rel="..." ... href="..." ...> or <link ... href="..." ... rel="..." ...>
        const linkRegex = /<link[^>]+?rel=["']?([^"'>]*icon[^"'>]*)["']?[^>]+?href=["']?([^"'>]+)["']?[^>]*>|<link[^>]+?href=["']?([^"'>]+)["']?[^>]+?rel=["']?([^"'>]*icon[^"'>]*)["']?[^>]*>/gi

        let match
        while ((match = linkRegex.exec(html)) !== null) {
            // Group 2 or 3 is href, Group 1 or 4 is rel
            const href = match[2] || match[3]
            const rel = match[1] || match[4]

            if (href && rel) {
                // Prioritize apple-touch-icon or icon
                faviconUrl = href
                if (rel.includes("apple-touch-icon") || rel === "icon") {
                    break
                }
            }
        }

        // 3. Resolve relative URLs
        if (faviconUrl) {
            try {
                faviconUrl = new URL(faviconUrl, targetUrl).href
            } catch (e) {
                console.warn("Failed to resolve favicon URL:", faviconUrl, e)
                faviconUrl = undefined
            }
        }

        // 4. Fallback to /favicon.ico if nothing found in HTML
        if (!faviconUrl) {
            try {
                const urlObj = new URL(targetUrl)
                faviconUrl = `${urlObj.protocol}//${urlObj.host}/favicon.ico`
            } catch (e) {
                // Invalid targetUrl
            }
        }

        if (faviconUrl) {
            return NextResponse.json({ url: faviconUrl })
        } else {
            return NextResponse.json({ error: "Favicon not found" }, { status: 404 })
        }

    } catch (error) {
        console.error("Error fetching favicon:", error)
        return NextResponse.json({ error: "Failed to fetch favicon" }, { status: 500 })
    }
}
