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
}

export const testPageContents: Record<string, TestPageContentData> = {
    "love-quiz": {
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
