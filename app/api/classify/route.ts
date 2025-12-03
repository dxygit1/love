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
    const { url, locale = 'zh', userId: userIdFromBody } = await request.json()

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

    // Step 2: Call LLM API for classification using config
    console.log('Received locale:', locale, 'isChinese:', locale === 'zh')
    const isChinese = locale === 'zh'

    const systemPrompt = isChinese
      ? `看一下这个是什么网站，我需要做一个归类。例如：视频、搜索、翻译、新闻等等。只返回一个简短的分类名称（1-4个字），不要输出任何解释。`
      : `I need to classify this website. For example: Video, Search, Translation, News, etc. You MUST respond in English only. Return only a concise category name (1-2 words), do not output any explanation.`

    const userPrompt = isChinese
      ? `网页标题: ${title || "未知"}
网页描述: ${description || "无描述"}
网址: ${url}

请对这个网页进行分类。`
      : `Title: ${title || "Unknown"}
Description: ${description || "No description"}
URL: ${url}

Classify this webpage.`

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
    const category = llmData.choices?.[0]?.message?.content?.trim() || "其他"

    // Log successful AI usage
    if (userId) {
      await logAiUsage(userId, 'classify', true)
    }

    const response: ClassifyResponse = {
      category,
      site_info: title || hostname,
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
