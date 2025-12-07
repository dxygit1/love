import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get("url")

    if (!targetUrl) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Helper function to get Google's faviconV2 API URL (better quality)
    const getGstaticFaviconUrl = (url: string): string | null => {
        try {
            return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(url)}&size=64`
        } catch {
            return null
        }
    }

    // Helper function to get fallback favicon URL
    const getFallbackFaviconUrl = (url: string): string | null => {
        try {
            const urlObj = new URL(url)
            return `${urlObj.protocol}//${urlObj.host}/favicon.ico`
        } catch {
            return null
        }
    }

    try {
        // 1. Fetch the HTML
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

        const response = await fetch(targetUrl, {
            signal: controller.signal,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
            },
        })
        clearTimeout(timeoutId)

        if (!response.ok) {
            // If we can't fetch the HTML, return fallback favicon.ico
            const fallback = getFallbackFaviconUrl(targetUrl)
            if (fallback) {
                return NextResponse.json({ url: fallback })
            }
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

        // 4. Fallback to gstatic faviconV2 API if nothing found in HTML (better quality)
        if (!faviconUrl) {
            const gstaticFallback = getGstaticFaviconUrl(targetUrl)
            if (gstaticFallback) {
                faviconUrl = gstaticFallback
            }
        }

        if (faviconUrl) {
            return NextResponse.json({ url: faviconUrl })
        } else {
            return NextResponse.json({ error: "Favicon not found" }, { status: 404 })
        }

    } catch (error) {
        console.error("Error fetching favicon:", error)
        // Try to return gstatic favicon URL on error (better quality)
        const gstaticFallback = getGstaticFaviconUrl(targetUrl)
        if (gstaticFallback) {
            return NextResponse.json({ url: gstaticFallback })
        }
        return NextResponse.json({ error: "Failed to fetch favicon" }, { status: 500 })
    }
}
