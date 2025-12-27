
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
你是一个小红书爆款文案专家。请根据以下心理年龄测试结果，写一篇吸引人的小红书笔记。

**测试数据：**
- 真实年龄：${data.realAge} 岁
- 测出的心理年龄：${data.mentalAge} 岁
- 评价/称号：${data.title}
- 性格侧写：${data.description}

**要求：**
1. **标题**：非常吸引眼球，制造反差感或好奇心，必须带有emoji，字数控制在20字以内。
2. **正文**：
   - 语气要人性化、真实、略带一点“文雅”或“扎心”，不要太像机器生成的。
   - 重点对比“真实年龄”和“心理年龄”的反差。
   - 包含适当的emoji。
   - 不要大段说教，要像是用户自己测完后的真实感慨。
   - **不要**包含任何违规、敏感词汇，确保安全合规。
   - 篇幅要**短小精悍**，控制在80-120字之间，不要废话。
   - 结尾可以引导互动（如“你们测出来是多少？”）。

请直接返回JSON格式，包含 title 和 content 两个字段。
`;
    } else {
        // Love Quiz / Relationship types
        prompt = `
你是一个小红书情感文案专家。请根据以下恋爱/情感测试结果，写一篇唯美、走心的小红书笔记。

**测试数据：**
- 测试类型：${data.quizName}
- 得分：${data.score} 分 (满分100)
- 评价/结果：${data.resultTitle}
- 对方名字/代号：${data.partnerName || "TA"}

**要求：**
1. **标题**：文艺、甚至有点“emo”或者“清醒”，吸引点击，带emoji，20字以内。
2. **正文**：
   - 参考风格：“这份淡淡的喜欢，到底该不该再坚持... 43分的喜欢，是藏在心底的暧昧...”
   - 语气要温柔、细腻、触动人心。
   - 如果分数低，侧重于“清醒”、“放下”；如果分数高，侧重于“甜蜜”、“珍惜”。
   - 结合分数进行解读，例如“${data.score}分的喜欢，代表了...”。
   - **绝对禁止**出现“他”、“她”、“男”、“女”等性别特定词汇。
   - **必须**统一使用“TA”、“对方”或“那个人”来指代对象。
   - 即使测试题目或结果中包含性别词汇，你在写文案时也**必须自动替换**为中性词。
   - 篇幅要**短小精悍**，控制在80-120字之间，适合快速阅读。

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
                    { role: "system", content: "You are a helpful assistant that generates social media content. Always respond in valid JSON format with 'title' and 'content' keys." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
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
