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

        // Construct prompt for summary generation
        const systemPrompt = isChinese
            ? `你是一个网站内容分析助手。请根据提供的网站信息，生成一个简洁的摘要（1-2句话），描述这个网站的主要功能和用途。
摘要要求：
- 简洁明了，1-2句话
- 突出网站的核心功能
- 使用中文
- 不要包含营销语言`
            : `You are a website content analyzer. Based on the provided website information, generate a concise summary (1-2 sentences) describing the main purpose and functionality of this website.
Requirements:
- Concise and clear, 1-2 sentences
- Highlight core functionality
- In English
- No marketing language`

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
