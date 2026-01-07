// 每个测试页面的 FAQ 和心理学背景数据

export interface FAQItem {
    question: string;
    questionEn: string;
    answer: string;
    answerEn: string;
}

export interface TestPageContentData {
    faqs: FAQItem[];
    psychologyTitle: string;
    psychologyTitleEn: string;
    psychologyContent: string;
    psychologyContentEn: string;
    // 新增：测试介绍
    introduction?: string;
    introductionEn?: string;
    // 新增：测试方法论
    methodology?: string;
    methodologyEn?: string;
}

export const testPageContents: Record<string, TestPageContentData> = {
    "love-quiz": {
        introduction: `你是否曾在深夜辗转难眠，脑海中不断浮现他的身影？是否会因为他的一条消息而心跳加速，因为他的冷淡而失落不已？在这个信息爆炸的时代，我们每天都在接收大量的情感刺激，有时候连自己都分不清，这到底是真正的喜欢，还是仅仅是一时的心动。

"测测你到底有多喜欢他"是一个基于心理学理论设计的情感测试工具。通过15道精心设计的题目，我们将帮助你从不同维度分析你对他的感情：包括情感依恋程度、浪漫幻想频率、互动期待值等多个方面。

无论你是正处于暗恋的迷茫期，还是在一段关系中想要更清楚地认识自己的感受，这个测试都能为你提供一个参考视角。记住，测试结果只是一个起点——真正了解自己内心的人，永远是你自己。`,
        introductionEn: `Have you ever lain awake at night, unable to stop thinking about him? Does your heart race at his messages, and does his silence leave you feeling lost? In this age of information overload, we receive countless emotional stimuli daily, and sometimes it's hard to tell if what we're feeling is genuine love or just a momentary flutter.

"How Much Do You Like Him" is an emotional assessment tool designed based on psychological theory. Through 15 carefully crafted questions, we'll help you analyze your feelings from multiple dimensions: emotional attachment level, romantic fantasy frequency, interaction expectations, and more.

Whether you're in the midst of a secret crush or want to better understand your feelings in an existing relationship, this test can offer you a reference perspective. Remember, the test result is just a starting point—the person who truly understands your heart is always you.`,
        methodology: `本测试采用心理学家Robert Sternberg提出的爱情三角理论（Triangular Theory of Love）作为理论框架。该理论认为爱情由三个核心要素组成：亲密（Intimacy）、激情（Passion）和承诺（Commitment）。

我们的题目设计覆盖了情感依恋、浪漫幻想、日常关注、互动期待等多个维度，通过你的回答来综合评估你对对方的喜欢程度。每道题目都经过精心设计，旨在捕捉你在无意识状态下的真实情感反应。

评分系统会根据你的回答生成0-100的喜欢程度分数，并提供相应的结果解读和情感建议。`,
        methodologyEn: `This test uses psychologist Robert Sternberg's Triangular Theory of Love as its theoretical framework. This theory suggests that love consists of three core elements: Intimacy, Passion, and Commitment.

Our questions cover multiple dimensions including emotional attachment, romantic fantasies, daily attention, and interaction expectations, comprehensively evaluating your level of affection through your responses. Each question is carefully designed to capture your genuine emotional reactions.

The scoring system generates a 0-100 affection score based on your answers, along with corresponding interpretations and emotional advice.`,
        faqs: [
            {
                question: "这个测试准确吗？",
                questionEn: "Is this test accurate?",
                answer: "本测试基于心理学家Robert Sternberg的爱情三角理论设计，具有一定的心理学依据。但每段感情都是独特的，测试结果仅供参考。",
                answerEn: "This test is based on psychologist Robert Sternberg's Triangular Theory of Love. While it has psychological foundations, every relationship is unique, so results are for reference only."
            },
            {
                question: "测试结果能决定我的感情吗？",
                questionEn: "Can the test results determine my relationship?",
                answer: "不能。测试只是帮助你更好地了解自己的感受，真正的感情需要双方真诚的沟通和相互理解。",
                answerEn: "No. The test only helps you understand your feelings better. Real relationships require honest communication and mutual understanding."
            },
            {
                question: "我可以重复测试吗？",
                questionEn: "Can I take the test multiple times?",
                answer: "当然可以。感情会随时间变化，不同时期做测试可能会得到不同的结果，这是正常的。",
                answerEn: "Of course. Feelings change over time, and it's normal to get different results at different times."
            }
        ],
        psychologyTitle: "斯腾伯格爱情三角理论",
        psychologyTitleEn: "Sternberg's Triangular Theory of Love",
        psychologyContent: "心理学家Robert Sternberg提出的爱情三角理论认为，完整的爱情由三个要素组成：亲密（Intimacy）——情感上的亲近和连接；激情（Passion）——浪漫和身体上的吸引力；承诺（Commitment）——决定维持关系的意愿。不同类型的爱情是这三种元素的不同组合。",
        psychologyContentEn: "Psychologist Robert Sternberg's Triangular Theory of Love suggests that complete love consists of three components: Intimacy (emotional closeness), Passion (romantic and physical attraction), and Commitment (the decision to maintain the relationship). Different types of love are different combinations of these elements."
    },
    "does-he-like-me": {
        introduction: `"他到底喜不喜欢我？"——这可能是每个暗恋中的女孩问过自己无数次的问题。他的一个眼神、一句话、一条消息，都会让你反复揣摩其中的含义。

这个测试将帮助你从客观的角度分析他对你的态度。通过15道情境题目，我们将评估他在日常互动中展现出的信号：包括主动程度、关注细节、肢体语言暗示等多个维度。

无论结果如何，请记住：了解对方的感受只是第一步，真正的感情需要勇敢地迈出下一步。`,
        introductionEn: `"Does he really like me?" - This is probably a question every girl with a crush has asked herself countless times. His glances, words, and messages can be endlessly analyzed for hidden meanings.

This test will help you objectively analyze his attitude towards you. Through 15 situational questions, we'll evaluate the signals he displays in daily interactions: including initiative level, attention to detail, body language cues, and more.

Whatever the result, remember: understanding someone's feelings is just the first step. Real relationships require the courage to take the next step.`,
        methodology: `本测试基于非语言沟通研究和社会心理学的信号识别理论设计。研究表明，当一个人对另一个人有好感时，会表现出特定的行为模式：包括更多的眼神接触、身体靠近、主动沟通等。

我们的题目涵盖了日常互动的多个场景，通过你对他行为的观察和描述，来综合判断他对你的好感程度。`,
        methodologyEn: `This test is designed based on non-verbal communication research and signal recognition theory in social psychology. Studies show that when someone is attracted to another person, they exhibit specific behavioral patterns: including more eye contact, physical proximity, and proactive communication.

Our questions cover multiple daily interaction scenarios, comprehensively assessing his level of interest based on your observations of his behavior.`,
        faqs: [
            {
                question: "如何判断他是喜欢还是只是友好？",
                questionEn: "How to tell if he likes me or is just being friendly?",
                answer: "观察他的肢体语言和眼神。喜欢一个人时，往往会不自觉地靠近对方、眼神接触更多、记住你说过的小事。如果他对你有'特殊对待'，可能就是喜欢。",
                answerEn: "Observe his body language and eye contact. When someone likes you, they tend to lean in, maintain more eye contact, and remember small things you said. Special treatment might indicate genuine interest."
            },
            {
                question: "他不主动联系我是不喜欢吗？",
                questionEn: "Does him not reaching out first mean he doesn't like me?",
                answer: "不一定。有些人性格内敛或不善于表达，即使喜欢也可能不主动。关键是看他回复你时的态度和热情程度。",
                answerEn: "Not necessarily. Some people are introverted or not expressive. The key is to observe his attitude and enthusiasm when he does respond."
            },
            {
                question: "暧昧期应该怎么做？",
                questionEn: "What should I do during the ambiguous phase?",
                answer: "保持自然，不要刻意讨好。多创造自然的接触机会，观察他的反应。如果暧昧太久没进展，适时表达自己的心意也是一种勇敢。",
                answerEn: "Stay natural and don't try too hard. Create opportunities to interact and observe his reactions. If the ambiguous phase drags on, expressing your feelings can also be a form of courage."
            }
        ],
        psychologyTitle: "微表情与肢体语言",
        psychologyTitleEn: "Micro-expressions and Body Language",
        psychologyContent: "研究表明，人类的非语言沟通占交流的60%以上。当一个人对你有好感时，会表现出特定的微表情和肢体语言：瞳孔放大、身体朝向你、频繁的眼神接触、不自觉的微笑、模仿你的动作等。这些信号往往比语言更真实。",
        psychologyContentEn: "Research shows that non-verbal communication accounts for over 60% of human interaction. When someone likes you, they display specific micro-expressions: dilated pupils, body orientation towards you, frequent eye contact, unconscious smiling, and mirroring your actions. These signals are often more genuine than words."
    },
    "does-she-like-me": {
        introduction: `女生的心思往往更加细腻，她们表达好感的方式也更加含蓄。一个关心的问候、一个不经意的微笑、一次主动的接近......这些信号你能读懂吗？

"测测她有多喜欢你"帮助你解读她的情感信号。通过分析她在日常互动中的行为表现，我们将为你提供一个客观的参考。

当然，每个人表达感情的方式不同，测试结果只是一个参考。如果你真的喜欢她，最好的方式还是真诚地去了解她、关心她。`,
        introductionEn: `Girls' thoughts are often more subtle, and their ways of expressing affection are more reserved. A caring greeting, an unintentional smile, a proactive approach... Can you read these signals?

"Does She Like Me" helps you decode her emotional signals. By analyzing her behavioral patterns in daily interactions, we'll provide you with an objective reference.

Of course, everyone expresses feelings differently, and test results are just references. If you truly like her, the best approach is to genuinely understand and care for her.`,
        methodology: `本测试参考了女性恋爱心理学研究和情感表达模式分析。女性在表达好感时往往更加间接，可能通过关心、倾听、分享等方式来传递情感信号。

题目设计覆盖了语言交流、肢体语言、日常关注等多个维度，帮助你更全面地理解她的态度。`,
        methodologyEn: `This test references female love psychology research and emotional expression pattern analysis. Women often express affection more indirectly, potentially conveying emotional signals through caring, listening, and sharing.

The questions cover multiple dimensions including verbal communication, body language, and daily attention, helping you understand her attitude more comprehensively.`,
        faqs: [
            {
                question: "女生喜欢一个人会有什么表现？",
                questionEn: "How does a girl act when she likes someone?",
                answer: "通常会有更多的眼神接触、主动找话题聊天、关心你的生活细节、在你面前变得害羞或者特别活泼。她可能还会记得你说过的小事，并在之后提起。",
                answerEn: "She typically makes more eye contact, initiates conversations, cares about your daily life, and may become shy or extra lively around you. She might also remember small things you mentioned."
            },
            {
                question: "她对我好是喜欢还是姐弟情？",
                questionEn: "Is her kindness romantic interest or sisterly affection?",
                answer: "关键在于是否有'特殊对待'。如果她对所有人都这样热情友好，可能只是性格。但如果她对你有明显不同的态度和关注，很可能是喜欢。",
                answerEn: "The key is whether there's 'special treatment'. If she's equally warm to everyone, it might just be her personality. But if her attention to you is notably different, it could indicate romantic interest."
            },
            {
                question: "她忽冷忽热是什么意思？",
                questionEn: "What does her hot-and-cold behavior mean?",
                answer: "可能她正在试探你的态度，或者自己也在纠结。也可能是害怕被拒绝而保持距离。这种情况下，你可以主动一点，给她安全感。",
                answerEn: "She might be testing your interest or feeling conflicted herself. She could also be keeping distance out of fear of rejection. In this case, being more proactive can help her feel secure."
            }
        ],
        psychologyTitle: "女性恋爱心理学",
        psychologyTitleEn: "Female Psychology in Love",
        psychologyContent: "女性在恋爱中往往更注重情感连接和安全感。研究表明，女性更善于解读情感信号，也更倾向于通过语言和情感交流来建立亲密关系。她们可能用间接的方式表达好感，如关心、帮助、分享等，而不是直接表白。",
        psychologyContentEn: "Women in love often prioritize emotional connection and security. Research shows women are better at reading emotional signals and prefer building intimacy through verbal and emotional communication. They may express interest indirectly through caring, helping, and sharing rather than direct confession."
    },
    "do-i-like-her": {
        introduction: `你是否发现自己不自觉地关注着她的一举一动？是否会在看到她和别人说笑时感到一丝酸涩？是否会期待每一次和她相遇的机会？

有时候，喜欢一个人的感觉来得太自然，以至于我们自己都没有意识到。"我喜欢她吗"帮助你审视自己的内心，通过15道问题来评估你对她的真实感受。

无论结果是确认了你的感觉还是让你重新思考，这都是一次宝贵的自我探索之旅。`,
        introductionEn: `Do you find yourself unconsciously paying attention to her every move? Do you feel a twinge of jealousy when you see her laughing with others? Do you look forward to every chance encounter?

Sometimes, the feeling of liking someone comes so naturally that we don't even realize it ourselves. "Do I Like Her" helps you examine your heart, assessing your true feelings through 15 questions.

Whether the result confirms your feelings or makes you reconsider, this is a valuable journey of self-exploration.`,
        methodology: `本测试基于多巴胺反应理论和情感依恋研究设计。当我们喜欢一个人时，大脑会产生特定的化学反应，导致一系列生理和心理表现。

题目设计关注你在日常生活中对她的注意力分配、情绪反应和行为倾向，帮助你判断这是真正的喜欢还是其他类型的好感。`,
        methodologyEn: `This test is designed based on dopamine response theory and emotional attachment research. When we like someone, our brain produces specific chemical reactions, leading to a series of physiological and psychological manifestations.

The questions focus on your attention distribution, emotional responses, and behavioral tendencies towards her in daily life, helping you determine if this is genuine romantic interest or other types of affection.`,
        faqs: [
            {
                question: "怎么区分喜欢和习惯？",
                questionEn: "How to distinguish between liking and habit?",
                answer: "喜欢会让你心跳加速，想看到她会感到期待和兴奋。习惯只是舒适和熟悉感。问问自己：如果她突然消失，你会感到失落还是只是不方便？",
                answerEn: "Liking makes your heart race and fills you with anticipation. Habit is just comfort and familiarity. Ask yourself: if she suddenly disappeared, would you feel lost or just inconvenienced?"
            },
            {
                question: "我是真的喜欢还是只是寂寞？",
                questionEn: "Do I really like her or am I just lonely?",
                answer: "想想当你和朋友在一起玩得很开心时，是否还会想起她？如果是真的喜欢，无论你多忙多开心，她都会不时出现在你脑海里。",
                answerEn: "Think about whether you still think of her when you're having fun with friends. True feelings mean she'll pop into your mind regardless of how busy or happy you are."
            },
            {
                question: "暗恋很久要不要表白？",
                questionEn: "Should I confess after a long crush?",
                answer: "不表白永远不知道结果。表白需要勇气，但无论结果如何，至少你给了自己一个答案，不会留下遗憾。选择一个合适的时机，真诚地表达你的心意。",
                answerEn: "You'll never know without confessing. It takes courage, but regardless of the outcome, at least you'll have an answer and no regrets. Choose the right moment and express your feelings sincerely."
            }
        ],
        psychologyTitle: "多巴胺与恋爱",
        psychologyTitleEn: "Dopamine and Love",
        psychologyContent: "当我们爱上一个人时，大脑会释放大量的多巴胺——这种'快乐荷尔蒙'会让我们感到兴奋和愉悦。这也是为什么恋爱初期我们会有心跳加速、失眠、食欲变化等反应。这种化学反应是人类进化的产物，帮助我们建立亲密关系。",
        psychologyContentEn: "When we fall in love, our brain releases dopamine—this 'happiness hormone' makes us feel excited and joyful. This explains why early love brings rapid heartbeat, insomnia, and appetite changes. This chemical reaction is an evolutionary mechanism that helps us form intimate bonds."
    },
    "do-i-like-him": {
        introduction: `每当他出现，你的心是否会不由自主地加速？是否会翻看他的社交动态，想象你们在一起的样子？是否会因为他的一句话而反复揣摩他的心意？

这些可能都是喜欢的信号，但有时候我们也会把好感、崇拜甚至习惯性的依赖误认为是喜欢。"我喜欢他吗"将帮助你厘清这些复杂的情感。

通过15道精心设计的问题，我们将从情感依恋、浪漫幻想、日常关注等多个角度分析你对他的真实感受。`,
        introductionEn: `Does your heart race whenever he appears? Do you browse his social media, imagining what it would be like to be together? Do you analyze his every word, trying to understand his feelings?

These could all be signs of liking someone, but sometimes we mistake fondness, admiration, or habitual dependence for romantic feelings. "Do I Like Him" will help you clarify these complex emotions.

Through 15 carefully designed questions, we'll analyze your true feelings from multiple angles including emotional attachment, romantic fantasies, and daily attention.`,
        methodology: `本测试采用依恋理论（Attachment Theory）和情感心理学研究作为理论基础。我们通过评估你对他的情感反应模式，来判断这种感觉是真正的浪漫喜欢，还是其他类型的情感。

题目涵盖了日常生活中的各种场景，每道题目都旨在捕捉你最真实的内心反应。`,
        methodologyEn: `This test uses Attachment Theory and emotional psychology research as its theoretical foundation. We assess your emotional response patterns towards him to determine if these feelings are genuine romantic interest or other types of emotions.

The questions cover various scenarios in daily life, with each question designed to capture your most authentic inner reactions.`,
        faqs: [
            {
                question: "心动的感觉是什么样的？",
                questionEn: "What does it feel like to have a crush?",
                answer: "见到他会不自觉地紧张，想知道他的一切，会因为他的一句话开心一整天。你会关注他的社交动态，记住他说过的每一句话。简单来说，他占据了你很多的心思。",
                answerEn: "You get nervous around him, want to know everything about him, and a single word from him can make your day. You follow his social media and remember everything he says. Simply put, he occupies much of your thoughts."
            },
            {
                question: "他不是我的理想型但我喜欢他？",
                questionEn: "I like him even though he's not my ideal type?",
                answer: "这很正常。真正的喜欢往往超越了理性的条件筛选。'理想型'只是一个想象，真正遇到让你心动的人时，那些条件都不重要了。",
                answerEn: "This is normal. True feelings often transcend rational criteria. 'Ideal type' is just imagination—when you meet someone who truly moves you, those conditions become irrelevant."
            },
            {
                question: "喜欢的人不喜欢我怎么办？",
                questionEn: "What if my crush doesn't like me back?",
                answer: "首先接受这个事实，允许自己难过一段时间。但要记住，一个人不喜欢你不代表你不够好，只是不合适而已。把这份感情当作成长的经历，相信你会遇到更适合你的人。",
                answerEn: "First, accept the reality and allow yourself time to feel sad. But remember, someone not liking you doesn't mean you're not good enough—just that you weren't compatible. Treat this as a growth experience and trust that you'll find someone more suitable."
            }
        ],
        psychologyTitle: "依恋理论",
        psychologyTitleEn: "Attachment Theory",
        psychologyContent: "心理学家John Bowlby提出的依恋理论认为，我们在亲密关系中的行为模式与童年时期的依恋经历有关。主要有三种类型：安全型（容易信任他人）、焦虑型（担心被抛弃）、回避型（害怕亲密）。了解自己的依恋类型，可以帮助你更好地处理感情中的困惑。",
        psychologyContentEn: "Psychologist John Bowlby's Attachment Theory suggests that our behavior in intimate relationships relates to childhood attachment experiences. There are three main types: secure (easily trusts others), anxious (fears abandonment), and avoidant (fears intimacy). Understanding your attachment style can help you navigate relationship challenges."
    },
    "mental-age": {
        introduction: `你是否曾觉得自己的想法比同龄人更成熟？或者发现自己在某些方面还保持着孩子般的天真？心理年龄和实际年龄并不总是一致的，而了解自己的心理年龄可以帮助你更好地认识自己。

这个测试将通过30道问题，从思维方式、情绪管理、社交适应和生活态度等多个维度来评估你的心理成熟度。

请记住：心理年龄没有好坏之分，重要的是了解自己，在保持成熟智慧的同时，也不失对生活的热情。`,
        introductionEn: `Have you ever felt that your thoughts are more mature than your peers? Or noticed that you still maintain childlike innocence in certain ways? Mental age and biological age don't always match, and understanding your mental age can help you know yourself better.

This test will evaluate your psychological maturity through 30 questions, covering thinking patterns, emotional management, social adaptation, and life attitudes.

Remember: there's no good or bad mental age. What matters is understanding yourself—maintaining mature wisdom while keeping your passion for life.`,
        methodology: `本测试基于发展心理学研究，结合了皮亚杰的认知发展理论和埃里克森的心理社会发展理论。我们从以下几个维度评估心理年龄：

• 思维抽象程度和问题解决能力
• 情绪管理和自我调节能力
• 社会关系处理和责任感
• 价值观和生活态度`,
        methodologyEn: `This test is based on developmental psychology research, combining Piaget's cognitive development theory and Erikson's psychosocial development theory. We evaluate mental age across several dimensions:

• Level of abstract thinking and problem-solving ability
• Emotional management and self-regulation skills
• Social relationship handling and sense of responsibility
• Values and life attitudes`,
        faqs: [
            {
                question: "心理年龄和实际年龄差很多正常吗？",
                questionEn: "Is it normal for mental age to differ greatly from actual age?",
                answer: "完全正常。心理年龄受个人经历、教育背景、生活环境等多种因素影响。有些人经历丰富，心智成熟较早；有些人保持童心，心理年龄偏小。这都是正常的个体差异。",
                answerEn: "Completely normal. Mental age is influenced by personal experiences, education, and environment. Some people mature early due to rich experiences; others maintain a youthful spirit. These are normal individual differences."
            },
            {
                question: "心理年龄可以改变吗？",
                questionEn: "Can mental age change?",
                answer: "可以。心理年龄不是固定的，会随着人生经历、学习成长而变化。面对挑战、承担责任、学习新技能都可能让你的心理更加成熟。",
                answerEn: "Yes. Mental age isn't fixed and changes with life experiences and personal growth. Facing challenges, taking responsibility, and learning new skills can all lead to greater mental maturity."
            },
            {
                question: "心理年龄大好还是小好？",
                questionEn: "Is a higher or lower mental age better?",
                answer: "没有绝对的好坏之分。心理年龄大意味着成熟稳重，善于处理问题；心理年龄小则保持了活力和好奇心。最理想的状态是保持内心的平衡：既有成熟的智慧，又不失孩子般的热情。",
                answerEn: "There's no absolute better or worse. Higher mental age means maturity and problem-solving skills; lower means vitality and curiosity. The ideal state is balance: mature wisdom combined with childlike enthusiasm."
            }
        ],
        psychologyTitle: "什么是心理年龄",
        psychologyTitleEn: "What is Mental Age?",
        psychologyContent: "心理年龄（Psychological Age）是指一个人心理成熟程度所对应的年龄。它与生理年龄不同，主要反映一个人的思维方式、情绪管理能力、社交技能和生活态度。心理年龄受到遗传、环境、教育和个人经历等多方面因素的影响。",
        psychologyContentEn: "Psychological age refers to the age that corresponds to one's mental maturity level. Unlike biological age, it mainly reflects thinking patterns, emotional management, social skills, and life attitudes. It's influenced by genetics, environment, education, and personal experiences."
    },
    "desire-test": {
        introduction: `你心中最渴望的是什么？是物质财富带来的安全感，还是权力地位带来的满足感？是浪漫爱情的甘蜜，还是自由不羁的生活？

这个测试将帮助你探索内心深处的欲望组成。通过分析你在不同情境下的选择，我们将绘制出你独特的"欲望组成图"，展示你在某些追求、爱情、金钱、名望、权力、健康、自由、家庭等八大维度上的比例。

了解自己的欲望，告诉自己什么才是你人生中最重要的东西。`,
        introductionEn: `What do you desire most? Is it the security that material wealth brings, or the satisfaction of power and status? The sweetness of romantic love, or a life of freedom and independence?

This test will help you explore the composition of desires deep within your heart. By analyzing your choices in different scenarios, we'll create your unique "Desire Composition Chart," showing your proportions across eight dimensions: pursuit, love, money, fame, power, health, freedom, and family.

Understanding your desires tells you what matters most in your life.`,
        methodology: `本测试基于心理学家Abraham Maslow的需求层次理论，并结合现代动机心理学研究。我们设计了八个欲望维度来全面覆盖人类的核心追求。

通过各种情境化的题目，我们分析你在面对不同选择时的内心倾向，从而生成个性化的欲望分布图。`,
        methodologyEn: `This test is based on psychologist Abraham Maslow's Hierarchy of Needs, combined with modern motivation psychology research. We designed eight desire dimensions to comprehensively cover core human pursuits.

Through various scenario-based questions, we analyze your inner tendencies when facing different choices, generating a personalized desire distribution chart.`,
        faqs: [
            {
                question: "欲望测试结果说明什么？",
                questionEn: "What does the desire test result mean?",
                answer: "测试结果展示了你潜意识中最看重的价值观和需求。每个人的欲望组成都是独特的，没有对错之分。了解自己的欲望可以帮助你做出更符合内心的选择。",
                answerEn: "The result shows your subconscious values and needs. Everyone's desire composition is unique—there's no right or wrong. Understanding your desires can help you make choices aligned with your heart."
            },
            {
                question: "结果会随时间变化吗？",
                questionEn: "Will results change over time?",
                answer: "会的。人的需求和价值观会随着年龄、经历和环境而变化。年轻时可能更追求激情和冒险，成熟后可能更看重稳定和家庭。定期做测试可以观察自己的变化。",
                answerEn: "Yes. Human needs and values change with age, experiences, and environment. Youth might prioritize passion and adventure; maturity might value stability and family. Regular testing can track your changes."
            },
            {
                question: "某个欲望比例很高正常吗？",
                questionEn: "Is it normal to have one desire dominating?",
                answer: "完全正常。每个人都有主导欲望，这是你人格的一部分。关键是了解这一点后，如何在生活中找到平衡，既满足主导需求，也不忽视其他方面。",
                answerEn: "Completely normal. Everyone has dominant desires—it's part of your personality. The key is finding balance after understanding this: satisfy your main needs while not neglecting other aspects."
            }
        ],
        psychologyTitle: "马斯洛需求层次理论",
        psychologyTitleEn: "Maslow's Hierarchy of Needs",
        psychologyContent: "心理学家Abraham Maslow提出的需求层次理论认为，人类的需求从低到高分为五个层次：生理需求、安全需求、社交需求、尊重需求和自我实现需求。只有当低层次的需求得到满足后，人们才会追求更高层次的需求。这个测试帮助你了解当前最重要的需求是什么。",
        psychologyContentEn: "Psychologist Abraham Maslow's Hierarchy of Needs suggests human needs exist in five levels: physiological, safety, social, esteem, and self-actualization. People pursue higher needs only after lower ones are met. This test helps you understand your current most important needs."
    },
    "gay-test": {
        introduction: `性取向是一个复杂且很私人的话题。许多人在成长过程中可能会对自己的性取向产生疑问，而这种探索是完全正常且健康的。

这个测试基于性学先驱Alfred Kinsey提出的金赛量表设计，将性取向视为一个连续的光谱而非简单的二元对立。通过一系列情境题目，我们将帮助你更好地了解自己。

请放心：所有测试数据都在你的设备本地处理，不会上传到任何服务器。无论你处于光谱的哪个位置，都是完全正常且值得被尊重的。`,
        introductionEn: `Sexual orientation is a complex and deeply personal topic. Many people may question their sexual orientation during their journey of self-discovery, and this exploration is completely normal and healthy.

This test is designed based on Alfred Kinsey's Kinsey Scale, viewing sexual orientation as a continuous spectrum rather than a simple binary. Through a series of situational questions, we'll help you better understand yourself.

Rest assured: all test data is processed locally on your device and is never uploaded to any server. Wherever you are on the spectrum, you are completely normal and deserving of respect.`,
        methodology: `本测试基于1948年性学研究先驱Alfred Kinsey提出的金赛量表。该量表将性取向分为0-6的连续光谱，打破了传统的二元对立观念。

我们的题目涵盖了人际吸引、情感向往、性意念等多个维度，旨在帮助你全面地了解自己的取向側向。请注意，这只是自我探索的工具，不是定论。`,
        methodologyEn: `This test is based on the Kinsey Scale proposed by sexology pioneer Alfred Kinsey in 1948. The scale divides sexual orientation into a 0-6 continuous spectrum, breaking traditional binary concepts.

Our questions cover multiple dimensions including interpersonal attraction, emotional connection, and sexual ideation, designed to help you comprehensively understand your orientation tendencies. Please note: this is merely a tool for self-exploration, not a definitive conclusion.`,
        faqs: [
            {
                question: "性取向可以通过测试确定吗？",
                questionEn: "Can sexual orientation be determined by a test?",
                answer: "测试只是帮助自我探索的工具，不是定论。性取向是复杂的，可能需要时间和经历来理解自己。这个测试提供一个参考视角，但最了解自己的人还是你自己。",
                answerEn: "Tests are tools for self-exploration, not definitive answers. Sexual orientation is complex and may take time and experience to understand. This test offers a reference perspective, but you know yourself best."
            },
            {
                question: "我的结果和我想的不一样？",
                questionEn: "My result is different from what I expected?",
                answer: "这很常见。人的性取向是一个连续的光谱，而不是非黑即白。你可能在某些情境下有不同的倾向。重要的是接纳真实的自己，无论你处于光谱的哪个位置。",
                answerEn: "This is common. Human sexuality exists on a continuous spectrum, not as black or white. You might have different tendencies in different contexts. The important thing is accepting your true self, wherever you are on the spectrum."
            },
            {
                question: "测试结果会保密吗？",
                questionEn: "Are test results kept private?",
                answer: "所有测试数据都在你的设备本地处理，不会上传到任何服务器。你的隐私完全受到保护，可以放心使用。",
                answerEn: "All test data is processed locally on your device and is never uploaded to any server. Your privacy is completely protected."
            }
        ],
        psychologyTitle: "金赛量表",
        psychologyTitleEn: "Kinsey Scale",
        psychologyContent: "1948年，性学研究先驱Alfred Kinsey提出了著名的金赛量表，将性取向分为0-6的连续光谱：0代表完全异性恋，6代表完全同性恋，中间数值代表不同程度的双性恋倾向。这一理论打破了性取向非此即彼的传统观念，强调了人类性取向的多样性和流动性。",
        psychologyContentEn: "In 1948, sexology pioneer Alfred Kinsey introduced the Kinsey Scale, representing sexual orientation on a 0-6 spectrum: 0 for exclusively heterosexual, 6 for exclusively homosexual, with middle values representing varying degrees of bisexuality. This theory broke the traditional binary view of sexuality, emphasizing diversity and fluidity in human sexual orientation."
    }
};
