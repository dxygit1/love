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
        descriptionZh: "所有的迹象都表明：YES！他确实喜欢你！他对你的关注、关心以及渴望靠近你的种种表现，都是深深喜欢的证明。他会记住你随口提到的小事，找各种理由给你发消息，对你和对其他人的态度截然不同。当你们在一起时，他眼睛里的光芒是藏不住的温柔。他可能只是在等待一个完美的时机来表明心意。在他心里，你是真正特别的、无可替代的存在。",
        adviceEn: "Don't wait! The chemistry is undeniable. Subtle hints are no longer needed—you can be bold. Give him a specific opportunity to ask you out, or just ask him!",
        adviceZh: "别再猜了，他对你的喜欢已经藏不住了！这种“双向奔赴”的化学反应非常难得。试着如果你给他一个明确的“窗口”（比如：周末想看电影但没人陪），他一定会接住的！"
    },
    {
        minScore: 65,
        maxScore: 84,
        titleEn: "He likes you a lot",
        titleZh: "他对你有很大好感",
        descriptionEn: "He enjoys your company and treats you differently from others. While he might not be head over heels in love yet, the potential is huge. He is definitely attracted to you and interested in getting to know you better.",
        descriptionZh: "从心理学角度来看，他对你展现出了明显的好感信号：与你相处时他会更加投入、更加认真，对话时眼神交流更多，记忆力也会变得更好——这些都是潜意识吸引力的典型表现。他很喜欢和你在一起，对你也比对别人更特别，这种差异化的对待说明你在他心中已经有了一定的份量。虽然可能还没到那种非你不可的程度，但感情的种子已经埋下，发展的潜力非常大。",
        adviceEn: "Keep the momentum going. Deepen your conversations and spend more quality time together. Show him your unique charm to turn this 'like' into 'love'.",
        adviceZh: "保持住现在的势头！心理学研究表明，亲密感的培养需要两个关键要素：共同经历和情感分享。多和他进行深度的聊天，聊彼此的梦想、恐惧和童年回忆，这种情感上的亲近会迅速加深好感。同时，增加高质量的相处时间，一起做一些有挑战性或新鲜感的事情，共同经历会产生强烈的情感纽带。展示你独特的魅力，让他发现你更多的闪光点，把这份好感升级为真正的心动吧。"
    },
    {
        minScore: 45,
        maxScore: 64,
        titleEn: "Maybe? It's Ambiguous",
        titleZh: "有点暧昧，仍在通过中",
        descriptionEn: "There are some mixed signals. Sometimes he seems interested, other times distant. He might be seeing you as a close friend with potential, or he is unsure of his own feelings. You are in the 'Friend Zone' danger area but can get out.",
        descriptionZh: "这是一种典型的暧昧状态——信号混杂，让人捉摸不透。从依恋心理学的角度来看，他可能属于回避型依恋风格：有时候表现出对你的兴趣和关心，有时候又突然变得疏远和冷淡。这种热-冷交替的模式可能说明几件事：他对你有好感但害怕承诺、他自己还没想清楚内心的感觉、或者他正处于多个选择之间犹豫不决。你目前处于友情和爱情的灰色地带，有发展的可能性，但也存在被长期吊着的风险。关键在于观察这种暧昧状态是否在朝着更明确的方向发展。",
        adviceEn: "Don't overinvest yet. Match his effort. Try to pull back a little to see if he chases, or flirt subtly to test his reaction.",
        adviceZh: "暧昧期最重要的原则是：匹配付出，保护自己。心理学中有一个稀缺性原则——当你稍微减少主动的频率，反而可能激发他的追逐欲望。试着把自己的生活过得丰富精彩，不要把全部注意力都放在他身上。如果他真的对你有感觉，你的适度疏离会让他意识到失去你的可能性，从而更加主动。同时，可以用开玩笑的方式试探他的反应，观察他对你和其他异性交往时的态度。如果几个月过去了暧昧状态毫无进展，可能是时候认真考虑是否要继续等待了。"
    },
    {
        minScore: 25,
        maxScore: 44,
        titleEn: "Just Friends (For Now)",
        titleZh: "目前只是朋友",
        descriptionEn: "He sees you as a buddy. He is comfortable around you but lacks the romantic spark. He values your friendship but hasn't shown clear signs of wanting more.",
        descriptionZh: "他把你当哥们儿或者好朋友——和你在一起他很放松，但缺乏那种恋爱的悸动和火花。他对你的态度和对其他朋友差不多，随意、轻松，可能还会和你聊别的女生。他确实很珍惜你们的友谊，也喜欢和你一起玩，但目前并没有表现出想更进一步的迹象。这并不意味着他永远不可能对你产生感情，但现在来说，你是坚定地处于所谓的友谊区。爱情的化学反应需要的不仅仅是舒适的友情基础。",
        adviceEn: "If you want change, you need to shift the dynamic. Change your style, flirt more openly, or shock him out of the 'friend' view. Or, accept the friendship.",
        adviceZh: "如果你想改变现状，需要打破他对你只是朋友的固有认知。心理学研究表明，人们很难对熟悉的人产生新的印象，这就是为什么朋友区很难突破。但也不是完全没有办法：第一，尝试改变你的外在形象——新发型、新风格的穿搭，这种视觉上的反差可以让他重新审视你。第二，减少你一直以来的好朋友式的可得性，让他感受到你不只是随叫随到的伙伴。第三，在适当的场合释放一些暧昧的信号，让他意识到你是一个有魅力的异性。不过，也要问问自己：追求一个目前对你没感觉的人，是否值得这份努力？有时候，接受友情也是一种智慧的选择。"
    },
    {
        minScore: 0,
        maxScore: 24,
        titleEn: "Not Interested",
        titleZh: "对他没感觉",
        descriptionEn: "Sorry, it seems he doesn't see you in a romantic way at all. His behavior indicates he treats you strictly as an acquaintance or distant friend.",
        descriptionZh: "根据测试结果来看，他目前对你没有表现出任何浪漫方面的兴趣。他的行为模式显示他对你保持着普通社交礼仪的距离——不会主动联系你、不记得你说过的话、也不会特别在意你的感受。从心理学角度来说，当一个人对某人有好感时，会不自觉地表现出关注和亲近的欲望，而这些信号在他身上是缺失的。但请记住，这并不意味着你不够好——感情是一件双向的事情，频率对不上的两个人，勉强也不会幸福。有时候，温柔的拒绝比冷漠的坚持更值得感激。",
        adviceEn: "Time to move on. Don't waste your precious feelings on someone who doesn't see your worth. There are plenty of fish in the sea!",
        adviceZh: "是时候把目光从他身上移开了。心理学中有一个概念叫沉没成本谬误——我们常常因为已经付出了时间和感情，而不愿意放弃一段明显没有结果的追求。但真正的勇气是承认这段单方面的感情需要结束。把花在他身上的精力和注意力收回来，投资在自己身上——学习新技能、培养新爱好、认识新朋友。当你变得越来越好、越来越自信的时候，自然会吸引到欣赏你的人。记住：你值得拥有一个眼里有光、主动靠近、珍惜你的人。天涯何处无芳草，更好的在后面等着你！"
    }
];
