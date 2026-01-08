
const AI_CONFIG = {
    apiKey: 'sk-f8828de5beb25a364ccd874866470543',
    baseUrl: 'https://apis.iflow.cn/v1',
    model: 'deepseek-v3'
};

export interface XiaohongshuResult {
    title: string;
    content: string;
}

export async function generateXiaohongshuCopy(type: 'mental-age' | 'love-quiz' | 'does-he-like-me' | 'do-i-like-her' | 'gay-test' | 'do-i-like-him' | 'zhanan-test', data: any): Promise<XiaohongshuResult> {
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
   - **禁止使用任何符号和emoji表情**，只用纯汉字。
   - **至少8个汉字**，20字以内。

2. **正文**：
   - 语气温柔、细腻、富有诗意，像是写给自己的日记。
   - 可以对比"真实年龄"和"心理年龄"的反差，但不要直接写出数字。
   - 篇幅80-120字，短小精悍。
   - 结尾可以引导互动。

请直接返回JSON格式，包含 title 和 content 两个字段。
`;
    } else if (type === 'gay-test') {
        // 性取向测试专用prompt - 避免敏感词汇，确保平台合规
        prompt = `
你是一个擅长写唯美、有趣文案的小红书博主。请根据以下"心之所向"测试结果，写一篇吸引人的小红书笔记。

**测试主题：** 探索内心深处的情感倾向

**重要合规要求（必须严格遵守）：**
- **绝对禁止**出现以下词汇：同性恋、异性恋、双性恋、gay、lesbian、LGBT、性取向、取向、彩虹旗
- **绝对禁止**出现任何数字、百分比、分数
- **绝对禁止**出现"TA"、"他"、"她"等人称代词
- 使用**委婉、诗意的方式**表达情感倾向，例如"心之所向"、"灵魂的颜色"、"内心的风景"

**要求：**
1. **标题**：
   - 要有诗意、神秘感，引发好奇心。
   - **禁止使用任何符号和emoji表情**，只用纯汉字。
   - **至少8个汉字**，20字以内。
   - 绝对不要出现敏感词汇！

2. **正文**：
   - 语气温柔、诗意，像是写给自己的心灵日记。
   - 用比喻和意象来表达，例如"像是找到了灵魂深处那片隐秘的花园"。
   - 不要提及任何具体的情感类型或取向。
   - 可以表达自我发现的喜悦和接纳。
   - 篇幅80-120字，短小精悍。
   - 结尾引导互动："你是什么颜色？"或"你内心的风景是什么样的？"

请直接返回JSON格式，包含 title 和 content 两个字段。
`;
    } else if (type === 'zhanan-test') {
        // 渣男辨别力测试专用prompt
        prompt = `
你是一个擅长写唯美、有趣文案的小红书博主。请根据以下"渣男辨别力测试"结果，写一篇吸引人的小红书笔记。

**测试数据：**
- 称号：${data.resultTitle}
- 描述：${data.description}

**要求：**
1. **标题**：
   - 要有趣、吸引人，能引发共鸣。
   - **禁止使用任何符号和emoji表情**，只用纯汉字。
   - **至少8个汉字**，20字以内。
   - 禁止出现任何数字或分数。

2. **正文**：
   - 语气可以幽默、自嘲，也可以是有感悟的。
   - 可以结合"渣男"的话题写一些有趣的感悟。
   - 禁止出现任何具体分数、数字、百分比。
   - 篇幅80-120字，短小精悍。
   - 结尾引导互动：问问读者的辨别力如何。

请直接返回JSON格式，包含 title 和 content 两个字段。
`;
    } else {
        // Love Quiz / Relationship types - 避免敏感词汇
        prompt = `
你是一个擅长写唯美情感文案的诗人。请根据以下恋爱/情感测试结果，写一篇有诗意、触动人心的小红书笔记。

**测试数据：**
- 评价/结果：${data.resultTitle}

**重要合规要求（必须严格遵守）：**
- **绝对禁止**出现任何数字、百分比、分数
- **绝对禁止**出现"TA"、"他"、"她"、"男"、"女"等人称代词和性别词汇
- 使用**委婉的表达**，如"那个人"、"心里的那个人"、"某个人"

**要求：**
1. **标题**：
   - 要有诗意、新意，像是从心底流淌出的话语。
   - 可以是一句扎心的感慨、一个浪漫的比喻、或一个引人深思的问句。
   - **禁止使用任何符号和emoji表情**，只用纯汉字。
   - **至少8个汉字**，20字以内。

2. **正文**：
   - 语气温柔、细腻、富有诗意，像是写给自己的情书或日记。
   - 禁止出现任何具体分数、数字、百分比。
   - 使用"那个人"或"心里的某个人"来指代对象。
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
