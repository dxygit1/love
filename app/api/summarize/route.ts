import { type NextRequest, NextResponse } from "next/server"
import { AI_CONFIG } from "@/lib/ai-config"

interface SummarizeRequest {
    url: string
    title: string
    description: string
    locale: 'zh' | 'en'
}

export async function POST(request: NextRequest) {
    try {
        const { url, title, description, locale = 'zh' }: SummarizeRequest = await request.json()

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        const hostname = new URL(url).hostname
        const isChinese = locale === 'zh'

        // Construct prompt for summary generation - ultra concise
        const systemPrompt = isChinese
            ? `你是一个网站内容分析助手。请用最简洁的一句话（10-20个字）描述这个网站是干什么的。
要求：
- 只说核心功能，不要多余的描述
- 不要包含"网站"、"平台"等词
- 例如："在线翻译工具"、"前端部署服务"、"视频分享社区"`
            : `You are a website analyzer. Describe what this website does in ONE ultra-concise phrase (5-10 words).
Requirements:
- Only core functionality
- No words like "website", "platform"
- Examples: "Online translation tool", "Frontend deployment service", "Video sharing community"`

        const userPrompt = isChinese
            ? `网站名称：${title || hostname}
网站描述：${description || "无"}
网址：${url}

请生成摘要。`
            : `Website Name: ${title || hostname}
Description: ${description || "None"}
URL: ${url}

Generate summary.`

        // Call LLM API
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
                max_tokens: 150,
                temperature: AI_CONFIG.temperature,
            }),
        })

        if (!llmResponse.ok) {
            const errorData = await llmResponse.text()
            console.error("LLM API error:", errorData)
            throw new Error("Summary generation failed")
        }

        const llmData = await llmResponse.json()
        const summary = llmData.choices?.[0]?.message?.content?.trim() || ""

        return NextResponse.json({ summary })
    } catch (error) {
        console.error("Summarize error:", error)
        return NextResponse.json(
            { error: "Failed to generate summary" },
            { status: 500 }
        )
    }
}
