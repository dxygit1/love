export interface Option {
    id: string;
    textEn: string;
    textZh: string;
    weight: number; // 0-5 score
}

export interface Question {
    id: number;
    textEn: string;
    textZh: string;
    options: Option[];
}

export interface ResultCategory {
    minScore: number;
    maxScore: number;
    titleEn: string;
    titleZh: string;
    descriptionEn: string;
    descriptionZh: string;
    adviceEn: string;
    adviceZh: string;
}

// 20 questions, max score 100 (5 pts each max)
export const questions: Question[] = [
    {
        id: 1,
        textEn: "How quickly does he reply to your texts?",
        textZh: "他回你消息的速度怎么样？",
        options: [
            { id: "a", textEn: "Almost instantly, keeps the convo going", textZh: "几乎秒回，而且会主动延续话题", weight: 5 },
            { id: "b", textEn: "Within a reasonable time", textZh: "正常回复，不快不慢", weight: 3 },
            { id: "c", textEn: "Hot and cold (fast then slow)", textZh: "忽冷忽热，有时候秒回，有时候消失", weight: 2 },
            { id: "d", textEn: "Often ignores me or forgets", textZh: "经常轮回，或者已读不回", weight: 0 },
        ],
    },
    {
        id: 2,
        textEn: "Does he initial conversations or plans?",
        textZh: "他会主动找你聊天或约你吗？",
        options: [
            { id: "a", textEn: "Yes, frequently", textZh: "经常主动找我", weight: 5 },
            { id: "b", textEn: "Sometimes, it's 50/50", textZh: "有时候，大概一半一半吧", weight: 3 },
            { id: "c", textEn: "Rarely, mostly I start it", textZh: "很少，基本都是我主动", weight: 1 },
            { id: "d", textEn: "Never", textZh: "从来没有", weight: 0 },
        ],
    },
    {
        id: 3,
        textEn: "How about his eye contact when you talk?",
        textZh: "和你说话时，他的眼神是怎样的？",
        options: [
            { id: "a", textEn: "Intense, lingers a bit too long", textZh: "专注且深情，对视时间比普通人长", weight: 5 },
            { id: "b", textEn: "Normal, polite eye contact", textZh: "正常的礼貌对视", weight: 3 },
            { id: "c", textEn: "Shy, looks away when caught", textZh: "害羞，和我对视会不自然地躲开", weight: 4 }, // Shyness is a sign!
            { id: "d", textEn: "Looks around, distracted", textZh: "眼神游离，心不在焉", weight: 0 },
        ],
    },
    {
        id: 4,
        textEn: "Does he remember small details about you?",
        textZh: "他记得你随口提起的小事吗？",
        options: [
            { id: "a", textEn: "Yes, even things I forgot", textZh: "记得，连我自己忘的都记得", weight: 5 },
            { id: "b", textEn: "Remembers important stuff", textZh: "记得比较重要的事情", weight: 3 },
            { id: "c", textEn: "Vaguely remembers", textZh: "模模糊糊有点印象", weight: 1 },
            { id: "d", textEn: "No, he forgets everything", textZh: "不记得，什么都忘", weight: 0 },
        ],
    },
    {
        id: 5,
        textEn: "How does he act when you are with other guys?",
        textZh: "当你和其他男生在一起时，他有什么反应？",
        options: [
            { id: "a", textEn: "Gets quiet or acts 'cool'", textZh: "突然变沉默，或者装作不在意（吃醋）", weight: 5 },
            { id: "b", textEn: "Curious, asks who he is", textZh: "好奇打听对方是谁", weight: 3 },
            { id: "c", textEn: "Totally indifferent", textZh: "完全无所谓，依然谈笑风生", weight: 0 },
            { id: "d", textEn: "Encourages acts like a 'wingman'", textZh: "甚至还要帮我撮合", weight: 0 },
        ],
    },
    {
        id: 6,
        textEn: "Has he introduced you to his friends?",
        textZh: "他把你介绍给他的朋友了吗？",
        options: [
            { id: "a", textEn: "Yes, to his inner circle", textZh: "介绍过，带进了核心圈子", weight: 5 },
            { id: "b", textEn: "Met a few casually", textZh: "见过几个普通朋友", weight: 3 },
            { id: "c", textEn: "No, but he mentions them", textZh: "没见过，但他提过", weight: 1 },
            { id: "d", textEn: "I'm a secret to them", textZh: "没见过，像是在藏着我", weight: 0 },
        ],
    },
    {
        id: 7,
        textEn: "Does he tease you playfully?",
        textZh: "他会经常开玩笑逗你吗？",
        options: [
            { id: "a", textEn: "Yes, teasing is our thing", textZh: "经常，打闹逗趣是日常", weight: 5 },
            { id: "b", textEn: "Sometimes he jokes around", textZh: "偶尔会开开玩笑", weight: 3 },
            { id: "c", textEn: "Very serious, rarely jokes", textZh: "很正经，很少开玩笑", weight: 1 },
            { id: "d", textEn: "No, never", textZh: "从不", weight: 0 },
        ],
    },
    {
        id: 8,
        textEn: "Does he compliment you?",
        textZh: "他会夸奖你吗？",
        options: [
            { id: "a", textEn: "Often, on looks and personality", textZh: "经常，夸外貌也夸性格", weight: 5 },
            { id: "b", textEn: "Usually about my achievements", textZh: "通常是夸我的能力或成绩", weight: 3 },
            { id: "c", textEn: "Rarely", textZh: "很少", weight: 1 },
            { id: "d", textEn: "Never or sarcasm only", textZh: "从不，或者只是挖苦", weight: 0 },
        ],
    },
    {
        id: 9,
        textEn: "How close does he stand to you physically?",
        textZh: "站在一起时，你们的身体距离？",
        options: [
            { id: "a", textEn: "Very close, almost touching", textZh: "很近，几乎要挨到了", weight: 5 },
            { id: "b", textEn: "Comfortable personal space", textZh: "正常的社交距离", weight: 3 },
            { id: "c", textEn: "Keeps a distance", textZh: "保持一定距离", weight: 1 },
            { id: "d", textEn: "Moves away if I get close", textZh: "我靠近一点他就会躲", weight: 0 },
        ],
    },
    {
        id: 10,
        textEn: "Does he find excuses to touch you?",
        textZh: "他会找借口和你进行肢体接触吗？",
        options: [
            { id: "a", textEn: "Yes, like fixing hair or patting back", textZh: "会，比如整理头发、拍拍背等", weight: 5 },
            { id: "b", textEn: "Only accidental touches", textZh: "只有偶然碰到", weight: 3 },
            { id: "c", textEn: "Very rare", textZh: "非常少", weight: 1 },
            { id: "d", textEn: "Never touches me", textZh: "完全没有肢体接触", weight: 0 },
        ],
    },
    {
        id: 11,
        textEn: "Does he share personal secrets with you?",
        textZh: "他会和你分享个人的秘密吗？",
        options: [
            { id: "a", textEn: "Yes, deep personal things", textZh: "会，分享很多内心深处的秘密", weight: 5 },
            { id: "b", textEn: "Shares some life struggles", textZh: "会聊一些生活烦恼", weight: 3 },
            { id: "c", textEn: "Only superficial stuff", textZh: "只聊表面话题", weight: 1 },
            { id: "d", textEn: "Closed book", textZh: "完全不聊私事", weight: 0 },
        ],
    },
    {
        id: 12,
        textEn: "Does he change his plans for you?",
        textZh: "他愿意为你改变原本的计划吗？",
        options: [
            { id: "a", textEn: "Yes, he prioritizes me", textZh: "愿意，他把我放第一位", weight: 5 },
            { id: "b", textEn: "If it's convenient", textZh: "如果方便的话会改", weight: 3 },
            { id: "c", textEn: "Rarely changes plans", textZh: "很少改变", weight: 1 },
            { id: "d", textEn: "Never, his schedule is fixed", textZh: "从不，他的行程雷打不动", weight: 0 },
        ],
    },
    {
        id: 13,
        textEn: "Does he try to make you laugh?",
        textZh: "他会努力逗你开心吗？",
        options: [
            { id: "a", textEn: "Always tries to involve me", textZh: "总是想方设法逗我笑", weight: 5 },
            { id: "b", textEn: "If the mood is right", textZh: "气氛好的时候会", weight: 3 },
            { id: "c", textEn: "Not specifically for me", textZh: "不会特意为我", weight: 1 },
            { id: "d", textEn: "He is serious around me", textZh: "在我面前很严肃", weight: 0 },
        ],
    },
    {
        id: 14,
        textEn: "Does he subtly brag to impress you?",
        textZh: "他会在你面前有意无意地炫耀强项吗？",
        options: [
            { id: "a", textEn: "Yes, clearly wants to impress", textZh: "会，明显想让我崇拜他", weight: 5 },
            { id: "b", textEn: "Sometimes mentions achievements", textZh: "偶尔提到自己的成就", weight: 3 },
            { id: "c", textEn: "He is very humble", textZh: "他很谦虚", weight: 1 },
            { id: "d", textEn: "No, or self-deprecating", textZh: "不，甚至会自黑", weight: 0 },
        ],
    },
    {
        id: 15,
        textEn: "Does he mirror your actions?",
        textZh: "他会模仿你的动作或语言吗？",
        options: [
            { id: "a", textEn: "Yes, same gestures/phrases", textZh: "会，经常做一样的动作或口头禅", weight: 5 },
            { id: "b", textEn: "Maybe subconsciously", textZh: "可能无意识中有一些", weight: 3 },
            { id: "c", textEn: "Haven't noticed", textZh: "没注意", weight: 1 },
            { id: "d", textEn: "No", textZh: "没有", weight: 0 },
        ],
    },
    {
        id: 16,
        textEn: "Does he ask about your relationship status?",
        textZh: "他打听过你的感情状况吗？",
        options: [
            { id: "a", textEn: "Yes, explicitly asked", textZh: "直接问过我有没有对象", weight: 5 },
            { id: "b", textEn: "Joked about it", textZh: "开玩笑试探过", weight: 3 },
            { id: "c", textEn: "Asked friends about me", textZh: "问过我也朋友圈", weight: 1 },
            { id: "d", textEn: "Never mentioned it", textZh: "从来没提过", weight: 0 },
        ],
    },
    {
        id: 17,
        textEn: "Does he follow you on social media?",
        textZh: "他关注你的社交账号并互动吗？",
        options: [
            { id: "a", textEn: "Likes and comments everything", textZh: "每条都赞，经常评论", weight: 5 },
            { id: "b", textEn: "Watches stories, likes sometimes", textZh: "会看Story，偶尔点赞", weight: 3 },
            { id: "c", textEn: "Follows but ghosts", textZh: "关注了但不互动", weight: 1 },
            { id: "d", textEn: "Not following", textZh: "没关注", weight: 0 },
        ],
    },
    {
        id: 18,
        textEn: "How does he say goodbye?",
        textZh: "道别的时候他是什么样的？",
        options: [
            { id: "a", textEn: "Reluctant, waits till I leave", textZh: "依依不舍，目送我离开", weight: 5 },
            { id: "b", textEn: "Warm 'See you later'", textZh: "热情的“下次见”", weight: 3 },
            { id: "c", textEn: "Quick 'Bye'", textZh: "匆匆一句拜拜", weight: 1 },
            { id: "d", textEn: "Just leaves", textZh: "转身就走", weight: 0 },
        ],
    },
    {
        id: 19,
        textEn: "Does he notice when you change your look?",
        textZh: "你换了发型或衣服他会发现吗？",
        options: [
            { id: "a", textEn: "Instantly notices and compliments", textZh: "一眼就看出来并夸奖", weight: 5 },
            { id: "b", textEn: "Notices after a while", textZh: "过一会会发现", weight: 3 },
            { id: "c", textEn: "If I point it out", textZh: "我说他才知道", weight: 1 },
            { id: "d", textEn: "Totally blind to it", textZh: "完全看不出来", weight: 0 },
        ],
    },
    {
        id: 20,
        textEn: "What is your gut feeling?",
        textZh: "你的直觉告诉你什么？",
        options: [
            { id: "a", textEn: "He definitely likes me", textZh: "他绝对喜欢我", weight: 5 },
            { id: "b", textEn: "There is something there", textZh: "感觉有点猫腻", weight: 3 },
            { id: "c", textEn: "I'm confused", textZh: "我很困惑", weight: 1 },
            { id: "d", textEn: "He sees me as a friend", textZh: "他只当我是朋友", weight: 0 },
        ],
    }
];

export const results: ResultCategory[] = [
    {
        minScore: 85,
        maxScore: 100,
        titleEn: "He Loves You!",
        titleZh: "命中注定喜欢你！",
        descriptionEn: "All signs point to YES! He is definitely into you. His attention, care, and efforts to be close to you are clear indicators of deep affection. He might just be waiting for the right moment (or a clear sign from you) to make a move. You are his special one.",
        descriptionZh: "所有的迹象都表明：YES！他喜欢你！他对你的关注、关心以及渴望靠近你的表现，都是深爱的证明。他可能只是在等待一个完美的时机，或者在等待你给他一个明确的信号。在你的心里，你是独一无二的例外。",
        adviceEn: "Don't wait! The chemistry is undeniable. Subtle hints are no longer needed—you can be bold. Give him a specific opportunity to ask you out, or just ask him!",
        adviceZh: "别再猜了，他对你的喜欢已经藏不住了！这种“双向奔赴”的化学反应非常难得。试着如果你给他一个明确的“窗口”（比如：周末想看电影但没人陪），他一定会接住的！"
    },
    {
        minScore: 65,
        maxScore: 84,
        titleEn: "He likes you a lot",
        titleZh: "他对你有很大好感",
        descriptionEn: "He enjoys your company and treats you differently from others. While he might not be head over heels in love yet, the potential is huge. He is definitely attracted to you and interested in getting to know you better.",
        descriptionZh: "他很喜欢和你在一起，对你也比对别人更特别。虽然可能还没到非你不可的程度，但发展的潜力非常大。他对你绝对有吸引力，也想更深入地了解你。",
        adviceEn: "Keep the momentum going. Deepen your conversations and spend more quality time together. Show him your unique charm to turn this 'like' into 'love'.",
        adviceZh: "保持住这个势头。多和他进行深度的聊天，增加相处的质量。展示你独特的魅力，把这份“好感”升级为“喜欢”吧。"
    },
    {
        minScore: 45,
        maxScore: 64,
        titleEn: "Maybe? It's Ambiguous",
        titleZh: "有点暧昧，仍在通过中",
        descriptionEn: "There are some mixed signals. Sometimes he seems interested, other times distant. He might be seeing you as a close friend with potential, or he is unsure of his own feelings. You are in the 'Friend Zone' danger area but can get out.",
        descriptionZh: "信号有点混杂。有时候觉得他喜欢你，有时候又觉得有距离感。他可能把你当成有发展潜力的好朋友，或者他自己也没想清楚。你目前处于“友谊区”的边缘，有机会，但也有风险。",
        adviceEn: "Don't overinvest yet. Match his effort. Try to pull back a little to see if he chases, or flirt subtly to test his reaction.",
        adviceZh: "先别投入太多。观察一下他的反应，试着稍微冷淡一点点看他会不会主动，或者用开玩笑的方式试探一下他的心意。"
    },
    {
        minScore: 25,
        maxScore: 44,
        titleEn: "Just Friends (For Now)",
        titleZh: "目前只是朋友",
        descriptionEn: "He sees you as a buddy. He is comfortable around you but lacks the romantic spark. He values your friendship but hasn't shown clear signs of wanting more.",
        descriptionZh: "他把你当哥们/朋友。和你在一起他很放松，但缺乏那种恋爱的火花。他很珍惜这友谊，但目前没有表现出想进一步的迹象。",
        adviceEn: "If you want change, you need to shift the dynamic. Change your style, flirt more openly, or shock him out of the 'friend' view. Or, accept the friendship.",
        adviceZh: "如果想改变现状，由于需要打破“朋友”的固有印象。试着换个风格，或者更直白地释放一些女性魅力的信号，让他意识到你是一个异性，而不只是朋友。"
    },
    {
        minScore: 0,
        maxScore: 24,
        titleEn: "Not Interested",
        titleZh: "对他没感觉",
        descriptionEn: "Sorry, it seems he doesn't see you in a romantic way at all. His behavior indicates he treats you strictly as an acquaintance or distant friend.",
        descriptionZh: "很遗憾，看来他对你完全没有那方面的意思。他的行为表明他只把你当普通熟人，甚至保持着礼貌距离。",
        adviceEn: "Time to move on. Don't waste your precious feelings on someone who doesn't see your worth. There are plenty of fish in the sea!",
        adviceZh: "是时候放下了。不要把珍贵的感情浪费在一个不在意你的人身上。天涯何处无芳草，更好的在后面等着你！"
    }
];
