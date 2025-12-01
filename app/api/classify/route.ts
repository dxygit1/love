import { type NextRequest, NextResponse } from "next/server"
import { AI_CONFIG, KNOWN_SITES } from "@/lib/ai-config"

interface ClassifyResponse {
  category: string
  site_info: string
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const hostname = new URL(url).hostname

    if (KNOWN_SITES[hostname]) {
      return NextResponse.json({
        category: KNOWN_SITES[hostname],
        site_info: hostname,
      })
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
    const systemPrompt = `你是一个网页分类专员。你的任务是根据网页信息判断其类型。


仅输出一个分类名称，不要输出任何解释。`

    const userPrompt = `网页标题: ${title || "未知"}
网页描述: ${description || "无描述"}
网址: ${url}
看一下这个是 什么网站 我需要做一个归类。例如： 视频 搜索引擎。等等`

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
      throw new Error("AI classification failed")
    }

    const llmData = await llmResponse.json()
    const category = llmData.choices?.[0]?.message?.content?.trim() || "其他"

    const response: ClassifyResponse = {
      category,
      site_info: title || hostname,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Classification error:", error)
    return NextResponse.json({ error: "分类失败，请稍后重试" }, { status: 500 })
  }
}
