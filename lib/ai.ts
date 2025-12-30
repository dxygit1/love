
const AI_CONFIG = {
    apiKey: 'sk-a60892f196f306697fbe06c2def38d9a',
    baseUrl: 'https://apis.iflow.cn/v1',
    model: 'tstars2.0'
};

export interface XiaohongshuResult {
    title: string;
    content: string;
}

export async function generateXiaohongshuCopy(type: 'mental-age' | 'love-quiz' | 'does-he-like-me' | 'do-i-like-her', data: any): Promise<XiaohongshuResult> {
    let prompt = "";

    if (type === 'mental-age') {
        prompt = `
你是一个擅长写唯美文案的诗人。请根据以下心理年龄测试结果，写一篇有诗意的小红书笔记。

**测试数据：**
- 真实年龄：${data.realAge} 岁
- 测出的心理年龄：${data.mentalAge} 岁
- 评价/称号：${data.title}
- 性格侧写：${data.description}

**要求：**
1. **标题**：
   - 要有诗意、新意，像是从心底流淌出的话语。
   - 禁止出现任何具体数字（如年龄、分数）。
   - 带有emoji，20字以内。

2. **正文**：
   - 语气温柔、细腻、富有诗意，像是写给自己的日记。
   - 可以对比"真实年龄"和"心理年龄"的反差，但不要直接写出数字。
   - 篇幅80-120字，短小精悍。
   - 结尾可以引导互动。

请直接返回JSON格式，包含 title 和 content 两个字段。
`;
    } else {
        // Love Quiz / Relationship types
        prompt = `
你是一个擅长写唯美情感文案的诗人。请根据以下恋爱/情感测试结果，写一篇有诗意、触动人心的小红书笔记。

**测试数据：**
- 评价/结果：${data.resultTitle}
- 对方名字/代号：${data.partnerName || "TA"}

**要求：**
1. **标题**：
   - 要有诗意、新意，像是从心底流淌出的话语。
   - 可以是一句扎心的感慨、一个浪漫的比喻、或一个引人深思的问句。
   - 禁止出现任何数字或分数。
   - 带有emoji，20字以内。

2. **正文**：
   - 语气温柔、细腻、富有诗意，像是写给自己的情书或日记。
   - 禁止出现任何具体分数、数字、百分比。
   - 统一使用"TA"或"那个人"来指代对象，禁止使用性别词汇（他/她/男/女）。
   - 篇幅80-120字，短小精悍。

请直接返回JSON格式，包含 title 和 content 两个字段。
`;
    }

    try {
        const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    { role: "system", content: "你是一个诗意的文案作家，擅长用优美的语言触动人心。回复时直接返回JSON格式，包含title和content两个字段。" },
                    { role: "user", content: prompt }
                ],
                temperature: 0.9
            })
        });

        const json = await response.json();
        const contentText = json.choices[0].message.content;

        // Try to parse JSON from the response text (it might be wrapped in markdown code blocks)
        try {
            const cleanJson = contentText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (e) {
            // Fallback if not valid JSON
            return {
                title: "文案生成成功",
                content: contentText
            };
        }

    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate content");
    }
}
