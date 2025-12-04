import { type NextRequest, NextResponse } from "next/server"
import { AI_CONFIG, KNOWN_SITES } from "@/lib/ai-config"
import { supabase } from "@/lib/supabase"

interface ClassifyResponse {
  category: string
  site_info: string
}

// Helper function to log AI usage
async function logAiUsage(userId: string, endpoint: string, success: boolean, errorMessage?: string) {
  try {
    await supabase
      .from('ai_usage_logs')
      .insert({
        user_id: userId,
        endpoint,
        success: success ? 'true' : 'false',
        error_message: errorMessage || null,
        tokens_used: null, // Can be populated if API returns token count
      })
  } catch (error) {
    console.error('Failed to log AI usage:', error)
  }
}

export async function POST(request: NextRequest) {
  let userId: string | null = null

  try {
    const {
      url,
      locale = 'zh',
      userId: userIdFromBody,
      smartGrouping = false,  // NEW: Enable smart grouping mode
      summary = ''  // NEW: Pre-generated summary for smart grouping
    } = await request.json()

    // Get userId (from request body for now)
    userId = userIdFromBody

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const hostname = new URL(url).hostname

    // Known sites don't consume AI quota
    if (KNOWN_SITES[hostname]) {
      return NextResponse.json({
        category: KNOWN_SITES[hostname],
        site_info: hostname,
      })
    }

    // Check quota
    if (userId) {
      // Get user profile for limit
      const { data: profile } = await supabase
        .from('profiles')
        .select('usage_limit')
        .eq('id', userId)
        .single()

      const limit = profile?.usage_limit ?? 30 // Default to 30 if not set

      // Count usage this month
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count } = await supabase
        .from('ai_usage_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('success', 'true') // Only count successful usage
        .gte('created_at', startOfMonth.toISOString())

      if (count !== null && count >= limit) {
        return NextResponse.json({
          error: "Monthly AI quota exceeded. Please upgrade your plan.",
          code: "QUOTA_EXCEEDED",
          limit,
          usage: count
        }, { status: 403 })
      }
    }

    // Step 1: Fetch the webpage with timeout
    let title = ""
    let description = ""

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const pageResponse = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      })
      clearTimeout(timeoutId)

      const html = await pageResponse.text()

      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      title = titleMatch ? titleMatch[1].trim() : ""

      const descMatch =
        html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i)
      description = descMatch ? descMatch[1].trim() : ""
    } catch (fetchError) {
      console.error("Failed to fetch URL:", fetchError)
      title = hostname
    }

    // SMART GROUPING MODE: Match with existing bookmarks based on summary
    if (smartGrouping && summary && userId) {
      // Fetch all existing bookmarks with tags for this user
      const { data: existingBookmarks } = await supabase
        .from('bookmarks')
        .select(`
          id,
          title,
          description,
          bookmark_tags (
            tags (
              name
            )
          )
        `)
        .eq('user_id', userId)
        .not('description', 'is', null)
        .limit(50) // Limit to avoid too large prompt

      if (existingBookmarks && existingBookmarks.length > 0) {
        // Group bookmarks by tag
        const groupedByTag: Record<string, string[]> = {}

        existingBookmarks.forEach((bm: any) => {
          const tagName = bm.bookmark_tags?.[0]?.tags?.name
          if (tagName && bm.description) {
            if (!groupedByTag[tagName]) {
              groupedByTag[tagName] = []
            }
            groupedByTag[tagName].push(bm.description)
          }
        })

        // Build prompt for AI to match similar group
        const isChinese = locale === 'zh'
        const groupMatchPrompt = isChinese
          ? `新网站的摘要：
"${summary}"

用户已有的书签分组及其摘要：
${Object.entries(groupedByTag).map(([tag, summaries]) =>
            `- 分组"${tag}"：\n${summaries.slice(0, 3).map(s => `  • ${s}`).join('\n')}`
          ).join('\n\n')}

请判断新网站应该归入哪个分组。如果没有非常相似的分组，返回一个新的合适分组名。
只返回分组名（1-4个字），不要解释。`
          : `New website summary:
"${summary}"

User's existing bookmark groups and their summaries:
${Object.entries(groupedByTag).map(([tag, summaries]) =>
            `- Group "${tag}":\n${summaries.slice(0, 3).map(s => `  • ${s}`).join('\n')}`
          ).join('\n\n')}

Determine which group this new website should belong to. If no highly similar group exists, return a new appropriate group name.
Return only the group name (1-2 words), no explanation.`

        const matchResponse = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AI_CONFIG.apiKey}`,
          },
          body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: [
              { role: "user", content: groupMatchPrompt },
            ],
            max_tokens: 50,
            temperature: 0.3, // Lower temperature for more consistent matching
          }),
        })

        if (matchResponse.ok) {
          const matchData = await matchResponse.json()
          const matchedCategory = matchData.choices?.[0]?.message?.content?.trim()

          if (matchedCategory) {
            // Log successful AI usage
            if (userId) {
              await logAiUsage(userId, 'classify_smart', true)
            }

            return NextResponse.json({
              category: matchedCategory,
              site_info: title || hostname,
            })
          }
        }
      }
    }

    // Step 2: Call LLM API for classification using config
    console.log('Received locale:', locale, 'isChinese:', locale === 'zh')
    const isChinese = locale === 'zh'

    const systemPrompt = isChinese
      ? `你需要分析网站并返回两个信息：
1. 分类：简短的网站类别（1-4个字），例如：视频、搜索、翻译、新闻、社交、购物等
2. 网站名：简洁的网站名称（去掉营销语、副标题等无用信息）

必须以 JSON 格式返回，格式如下：
{"category": "分类名", "siteName": "网站名"}

例如：
- 标题："百度翻译-您的超级翻译伙伴（文本、文档翻译）" → {"category": "翻译", "siteName": "百度翻译"}
- 标题："bilibili_哔哩哔哩_你感兴趣的视频都在B站" → {"category": "视频", "siteName": "哔哩哔哩"}

只返回 JSON，不要有任何其他文字。`
      : `You need to analyze the website and return two pieces of information:
1. Category: A concise category (1-2 words), e.g.: Video, Search, Translation, News, Social, Shopping, etc.
2. Site Name: A clean site name (remove marketing language, subtitles, and unnecessary information)

You MUST return in JSON format:
{"category": "Category", "siteName": "Site Name"}

Examples:
- Title: "Google Translate - The World's Best Translation Tool" → {"category": "Translation", "siteName": "Google Translate"}
- Title: "YouTube - Broadcast Yourself" → {"category": "Video", "siteName": "YouTube"}

Return ONLY the JSON, no other text.`

    const userPrompt = isChinese
      ? `网页标题: ${title || hostname}
网页描述: ${description || "无"}
网址: ${url}

请分析并返回 JSON。`
      : `Title: ${title || hostname}
Description: ${description || "None"}
URL: ${url}

Analyze and return JSON.`

    const llmResponse = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature,
      }),
    })

    if (!llmResponse.ok) {
      const errorData = await llmResponse.text()
      console.error("LLM API error:", errorData)

      // Log failed AI usage
      if (userId) {
        await logAiUsage(userId, 'classify', false, 'LLM API error')
      }

      throw new Error("AI classification failed")
    }

    const llmData = await llmResponse.json()
    const rawContent = llmData.choices?.[0]?.message?.content?.trim() || "{}"

    // Parse JSON response
    let category = "其他"
    let siteName = title || hostname

    try {
      const parsed = JSON.parse(rawContent)
      category = parsed.category || "其他"
      siteName = parsed.siteName || title || hostname
    } catch (e) {
      console.error("Failed to parse LLM JSON response:", rawContent)
      // Fallback: try to extract category from non-JSON response
      category = rawContent || "其他"
    }

    // Log successful AI usage
    if (userId) {
      await logAiUsage(userId, 'classify', true)
    }

    const response: ClassifyResponse = {
      category,
      site_info: siteName, // Use AI-extracted concise name
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Classification error:", error)

    // Log failed AI usage
    if (userId) {
      await logAiUsage(userId, 'classify', false, String(error))
    }

    return NextResponse.json({ error: "分类失败，请稍后重试" }, { status: 500 })
  }
}
