import { type NextRequest, NextResponse } from "next/server"
import { AI_CONFIG, KNOWN_SITES } from "@/lib/ai-config"
import { supabase } from "@/lib/supabase"

interface ClassifyResponse {
  category: string
  site_info: string
  summary?: string  // NEW: optional summary field
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

    // Step 2: Call LLM API for classification (always runs first)
    console.log('Received locale:', locale, 'isChinese:', locale === 'zh')
    const isChinese = locale === 'zh'

    const systemPrompt = isChinese
      ? `你需要分析网站并返回三个信息：
1. 分类：简短的网站类别（1-4个字），例如：视频、搜索、翻译、新闻、社交、购物等
2. 网站名：简洁的网站名称（去掉营销语、副标题等无用信息）
3. 简介：一句话描述网站功能（10-20个字，不要包含"网站"、"平台"等词）

必须以 JSON 格式返回：
{"category": "分类名", "siteName": "网站名", "summary": "简介"}

例如：
- 标题："百度翻译-您的超级翻译伙伴" → {"category": "翻译", "siteName": "百度翻译", "summary": "多语言在线翻译工具"}
- 标题："bilibili_哔哩哔哩_你感兴趣的视频都在B站" → {"category": "视频", "siteName": "哔哩哔哩", "summary": "二次元视频分享社区"}
- 标题："Vercel: Build and deploy..." → {"category": "开发工具", "siteName": "Vercel", "summary": "前端应用部署服务"}

只返回 JSON，不要有任何其他文字。`
      : `Analyze the website and return THREE pieces of information:
1. Category: Concise category (1-2 words), e.g.: Video, Search, Translation, News, Social, Shopping
2. Site Name: Clean site name (remove marketing language, subtitles)
3. Summary: One phrase describing functionality (5-10 words, no "website", "platform")

Return in JSON format:
{"category": "Category", "siteName": "Site Name", "summary": "Summary"}

Examples:
- Title: "Google Translate - The World's Best Translation Tool" → {"category": "Translation", "siteName": "Google Translate", "summary": "Multi-language translation tool"}
- Title: "YouTube - Broadcast Yourself" → {"category": "Video", "siteName": "YouTube", "summary": "Video sharing community"}
- Title: "Vercel: Build and deploy..." → {"category": "Dev Tools", "siteName": "Vercel", "summary": "Frontend deployment service"}

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
    console.log('🤖 Raw LLM response:', rawContent)

    // Parse JSON response
    let category = "其他"
    let siteName = title || hostname
    let extractedSummary = ""

    try {
      // Try to clean up the JSON if it's malformed
      let cleanedContent = rawContent
      // Remove any text before the first {
      const jsonStart = rawContent.indexOf('{')
      if (jsonStart > 0) {
        cleanedContent = rawContent.substring(jsonStart)
      }
      // Try to fix incomplete JSON
      if (!cleanedContent.endsWith('}')) {
        cleanedContent = cleanedContent + '"}' // Add missing closing
      }

      const parsed = JSON.parse(cleanedContent)
      category = parsed.category || "其他"
      siteName = parsed.siteName || title || hostname
      extractedSummary = parsed.summary || ""
      console.log('✅ Parsed successfully:', { category, siteName, extractedSummary })
    } catch (e) {
      console.error("Failed to parse LLM JSON response:", rawContent)
      // Fallback: try regex extraction
      const categoryMatch = rawContent.match(/"category"\s*:\s*"([^"]+)"/)
      const siteNameMatch = rawContent.match(/"siteName"\s*:\s*"([^"]+)"/)
      const summaryMatch = rawContent.match(/"summary"\s*:\s*"([^"]+)"/)

      if (categoryMatch) category = categoryMatch[1]
      if (siteNameMatch) siteName = siteNameMatch[1]
      if (summaryMatch) extractedSummary = summaryMatch[1]

      console.log('🔧 Fallback regex extraction:', { category, siteName, extractedSummary })
    }

    // Log successful AI usage
    if (userId) {
      await logAiUsage(userId, 'classify', true)
    }

    // SMART GROUPING: If enabled, use generated summary to match with existing bookmarks
    if (smartGrouping && extractedSummary && userId) {
      const { data: existingBookmarks } = await supabase
        .from('bookmarks')
        .select(`
          id,
          description,
          bookmark_tags (
            tags (
              name
            )
          )
        `)
        .eq('user_id', userId)
        .not('description', 'is', null)
        .limit(50)

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

        // Only match if there are existing groups
        if (Object.keys(groupedByTag).length > 0) {
          const groupMatchPrompt = isChinese
            ? `新网站的摘要："${extractedSummary}"

用户已有的书签分组：
${Object.entries(groupedByTag).map(([tag, summaries]) =>
              `- "${tag}"：${summaries.slice(0, 2).join('、')}`
            ).join('\n')}

请判断新网站应该归入哪个分组。如果没有相似的，返回"${category}"。只返回分组名。`
            : `New website summary: "${extractedSummary}"

Existing groups:
${Object.entries(groupedByTag).map(([tag, summaries]) =>
              `- "${tag}": ${summaries.slice(0, 2).join(', ')}`
            ).join('\n')}

Match to existing group or return "${category}" if no match. Return only group name.`

          const matchResponse = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AI_CONFIG.apiKey}`,
            },
            body: JSON.stringify({
              model: AI_CONFIG.model,
              messages: [{ role: "user", content: groupMatchPrompt }],
              max_tokens: 30,
              temperature: 0.2,
            }),
          })

          if (matchResponse.ok) {
            const matchData = await matchResponse.json()
            const matchedCategory = matchData.choices?.[0]?.message?.content?.trim()
            if (matchedCategory) {
              category = matchedCategory
              await logAiUsage(userId, 'classify_smart', true)
            }
          }
        }
      }
    }

    const response: ClassifyResponse = {
      category,
      site_info: siteName, // Use AI-extracted concise name
      summary: extractedSummary, // NEW: Include summary in response
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
