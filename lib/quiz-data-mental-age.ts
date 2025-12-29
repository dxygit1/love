export interface Option {
    id: string;
    textEn: string;
    textZh: string;
    value: number; // This is actually the "usage percentage" used as weight in the original code
    weight: number;
}

export interface Question {
    id: number;
    textEn: string;
    textZh: string;
    options: Option[];
}

export interface ResultCategory {
    minDiff: number; // mentalAge - realAge
    maxDiff: number;
    titleEn: string;
    titleZh: string;
    descriptionEn: string;
    descriptionZh: string;
    analysisEn: string;
    analysisZh: string;
    color: string;
    bgGradient: string;
}

export const questions: Question[] = [
    {
        id: 1,
        textEn: "I have my principles.",
        textZh: "我有我自己的原则。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 755, weight: 0 },
            { id: "b", textEn: "False", textZh: "不是", value: 66, weight: 0 },
            { id: "c", textEn: "Neither", textZh: "不确定", value: 0, weight: 0 }
        ]
    },
    {
        id: 2,
        textEn: "I don't want to think about complicated things.",
        textZh: "我不想思考复杂的事情。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 395, weight: 0 },
            { id: "b", textEn: "False", textZh: "不是", value: 441, weight: 0 }
        ]
    },
    {
        id: 3,
        textEn: "I spend most of my time on ___________.",
        textZh: "我把大部分时间花在 ___________ 上。",
        options: [
            { id: "a", textEn: "Instagram", textZh: "小红书", value: 154, weight: 0 },
            { id: "b", textEn: "Twitter", textZh: "微博", value: 18, weight: 0 },
            { id: "c", textEn: "Youtube", textZh: "B站", value: 53, weight: 0 },
            { id: "d", textEn: "WhatsApp", textZh: "微信", value: 37, weight: 0 },
            { id: "e", textEn: "Facebook", textZh: "Facebook", value: 13, weight: 0 },
            { id: "f", textEn: "Snapchat", textZh: "QQ", value: 66, weight: 0 },
            { id: "g", textEn: "Reddit", textZh: "知乎", value: 3, weight: 0 },
            { id: "h", textEn: "Messenger", textZh: "Messenger", value: 10, weight: 0 },
            { id: "i", textEn: "TikTok", textZh: "抖音", value: 550, weight: 0 },
            { id: "j", textEn: "Roblox", textZh: "游戏", value: 14, weight: 0 },
            { id: "k", textEn: "Other", textZh: "其他", value: 53, weight: 0 }
        ]
    },
    {
        id: 4,
        textEn: "Tears come to my eyes very often.",
        textZh: "我经常热泪盈眶。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 525, weight: 0 },
            { id: "b", textEn: "No", textZh: "不是", value: 330, weight: 0 }
        ]
    },
    {
        id: 5,
        textEn: "Some people tell me: 'You are like a middle-aged person' recently.",
        textZh: "最近有人说我“像个中年人一样”。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 388, weight: 0 },
            { id: "b", textEn: "False", textZh: "没有", value: 449, weight: 0 }
        ]
    },
    {
        id: 6,
        textEn: "I get angry quite often.",
        textZh: "我经常生气。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 661, weight: 0 },
            { id: "b", textEn: "No", textZh: "不是", value: 227, weight: 0 }
        ]
    },
    {
        id: 7,
        textEn: "I like to be friends with those older than me.",
        textZh: "我喜欢和比我年长的人交朋友。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 583, weight: 0 },
            { id: "b", textEn: "No", textZh: "不是", value: 196, weight: 0 }
        ]
    },
    {
        id: 8,
        textEn: "I do not like to get up early in the morning.",
        textZh: "我不喜欢早起。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 609, weight: 0 },
            { id: "b", textEn: "False", textZh: "不是", value: 234, weight: 0 }
        ]
    },
    {
        id: 9,
        textEn: "I care about my clothes and hair-style.",
        textZh: "我很在意我的穿着和发型。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 818, weight: 0 },
            { id: "b", textEn: "False", textZh: "不在意", value: 101, weight: 0 }
        ]
    },
    {
        id: 10,
        textEn: "I often say 'Come on!' or similar colloquialisms.",
        textZh: "我经常说“拜托/Come on”或者类似的口头禅。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 178, weight: 0 },
            { id: "b", textEn: "False", textZh: "从不", value: 690, weight: 0 }
        ]
    },
    {
        id: 11,
        textEn: "I think 'All reality is a phantom, and all phantoms are real'.",
        textZh: "我认为“一切现实皆是幻影，一切幻影皆是真实”。",
        options: [
            { id: "a", textEn: "True", textZh: "是的，有同感", value: 232, weight: 0 },
            { id: "b", textEn: "False", textZh: "看不懂/不同意", value: 610, weight: 0 }
        ]
    },
    {
        id: 12,
        textEn: "I always act before thinking.",
        textZh: "我做事总是先行动后思考。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 355, weight: 0 },
            { id: "b", textEn: "False", textZh: "不是", value: 441, weight: 0 }
        ]
    },
    {
        id: 13,
        textEn: "I will be sleepless before a long journey.",
        textZh: "长途旅行前我会兴奋得睡不着。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 517, weight: 0 },
            { id: "b", textEn: "False", textZh: "不是", value: 329, weight: 0 }
        ]
    },
    {
        id: 14,
        textEn: "I don't know what's popular among young people.",
        textZh: "我不知道现在的年轻人流行什么。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 182, weight: 0 },
            { id: "b", textEn: "False", textZh: "我知道", value: 705, weight: 0 }
        ]
    },
    {
        id: 15,
        textEn: "I have a dream.",
        textZh: "我有一个梦想。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 787, weight: 0 },
            { id: "b", textEn: "False", textZh: "没有", value: 126, weight: 0 }
        ]
    },
    {
        id: 16,
        textEn: "I have had some hard times in my life.",
        textZh: "我经历过人生的一些艰难时刻。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 917, weight: 0 },
            { id: "b", textEn: "False", textZh: "没有", value: 41, weight: 0 }
        ]
    },
    {
        id: 17,
        textEn: "(Recently) I sometimes waste time, money or food.",
        textZh: "（最近）我有时会浪费时间、金钱或食物。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 733, weight: 0 },
            { id: "b", textEn: "No", textZh: "没有", value: 181, weight: 0 }
        ]
    },
    {
        id: 18,
        textEn: "I can hit a cockroach with a book.",
        textZh: "我敢用书拍死蟑螂。",
        options: [
            { id: "a", textEn: "Yes", textZh: "敢", value: 453, weight: 0 },
            { id: "b", textEn: "No", textZh: "不敢", value: 436, weight: 0 }
        ]
    },
    {
        id: 19,
        textEn: "I don't want to live alone.",
        textZh: "我不想一个人生活。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 510, weight: 0 },
            { id: "b", textEn: "False", textZh: "我可以独居", value: 358, weight: 0 }
        ]
    },
    {
        id: 20,
        textEn: "I want to grow old.",
        textZh: "我想快点长大（或变老）。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 374, weight: 0 },
            { id: "b", textEn: "No", textZh: "不想", value: 468, weight: 0 }
        ]
    },
    {
        id: 21,
        textEn: "I sometimes enjoy laughing at other people.",
        textZh: "我有时喜欢嘲笑别人。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 639, weight: 0 },
            { id: "b", textEn: "No", textZh: "从不", value: 233, weight: 0 }
        ]
    },
    {
        id: 22,
        textEn: "I'd prefer staying at home rather than going on a trip.",
        textZh: "比起去旅行，我更喜欢待在家里。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 356, weight: 0 },
            { id: "b", textEn: "No", textZh: "不是", value: 497, weight: 0 }
        ]
    },
    {
        id: 23,
        textEn: "I don't enjoy reading books.",
        textZh: "我不喜欢看书。",
        options: [
            { id: "a", textEn: "True", textZh: "是的", value: 366, weight: 0 },
            { id: "b", textEn: "False", textZh: "我喜欢", value: 499, weight: 0 }
        ]
    },
    {
        id: 24,
        textEn: "I have a plan for the future.",
        textZh: "我对未来有规划。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 640, weight: 0 },
            { id: "b", textEn: "No", textZh: "没有", value: 251, weight: 0 }
        ]
    },
    {
        id: 25,
        textEn: "I sometimes feel like singing.",
        textZh: "我有时会突然想唱歌。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 747, weight: 0 },
            { id: "b", textEn: "No", textZh: "没有", value: 192, weight: 0 }
        ]
    },
    {
        id: 26,
        textEn: "I'd rather live in the countryside rather than a huge metropolis.",
        textZh: "比起大城市，我更愿意住在乡下。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 395, weight: 0 },
            { id: "b", textEn: "No", textZh: "不是", value: 413, weight: 0 }
        ]
    },
    {
        id: 27,
        textEn: "I am often fooled by others.",
        textZh: "我经常被别人骗/忽悠。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 413, weight: 0 },
            { id: "b", textEn: "No", textZh: "不会", value: 422, weight: 0 }
        ]
    },
    {
        id: 28,
        textEn: "I am very emotional.",
        textZh: "我很容易情绪化。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 645, weight: 0 },
            { id: "b", textEn: "No", textZh: "不是", value: 234, weight: 0 }
        ]
    },
    {
        id: 29,
        textEn: "I can only be happy when I'm following my plan/everything is on track.",
        textZh: "只有事情按计划进行时，我才会感到开心。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 504, weight: 0 },
            { id: "b", textEn: "No", textZh: "不是", value: 330, weight: 0 }
        ]
    },
    {
        id: 30,
        textEn: "I will never miss a deadline.",
        textZh: "我从不会错过截止日期 (Deadline)。",
        options: [
            { id: "a", textEn: "Yes", textZh: "是的", value: 330, weight: 0 },
            { id: "b", textEn: "No", textZh: "偶尔会", value: 435, weight: 0 }
        ]
    },
    {
        id: 31,
        textEn: "My Gender:",
        textZh: "我的性别：",
        options: [
            { id: "a", textEn: "Male", textZh: "男性", value: 520, weight: 0 },
            { id: "b", textEn: "Female", textZh: "女性", value: 460, weight: 0 }
        ]
    }
];

export const results: ResultCategory[] = [
    {
        minDiff: 20,
        maxDiff: 1000,
        titleEn: "Sophisticated",
        titleZh: "非常成熟（饱经沧桑）",
        descriptionEn: "Your mental age is significantly higher than your physical age. You possess a wisdom that usually comes from a lifetime of experience.",
        descriptionZh: "你的心理年龄远超实际年龄，展现出通常需要多年人生阅历才能积累的深沉智慧。发展心理学研究表明，这种早熟的心态可能源于你人生中的某些重要经历——也许是早年的挫折让你比同龄人更早学会了独立思考，也许是家庭环境培养了你超前的责任感。你看待世界的方式深刻而透彻，往往能洞察事物的本质，但也可能因此承担了不属于这个年龄的沉重感。",
        analysisEn: "You may feel like an 'old soul'. You tend to worry about the future and prefer stability over risk. While you are reliable and wise, don't forget to let loose sometimes.",
        analysisZh: "你可能经常觉得自己是个老灵魂，和同龄人聊不到一起，反而更喜欢和长辈交流。你倾向于未雨绸缪，比起冒险更看重稳定和安全感。虽然你非常可靠的特质让周围人都愿意信赖你、依靠你，但这也可能意味着你承担了太多不属于自己的压力。心理学建议：试着放下一些担子，允许自己偶尔不成熟一下，找回那份久违的冲动与热情。生活不只有责任，还需要一些浪漫和随性。",
        color: "#8B4A8B",
        bgGradient: "linear-gradient(135deg, #8B4A8B, #A569BD)"
    },
    {
        minDiff: 15,
        maxDiff: 20,
        titleEn: "Sophisticated",
        titleZh: "成熟稳重",
        descriptionEn: "You are mature beyond your years. You handle situations with a calmness and steadiness that others admire.",
        descriptionZh: "你的心理成熟度超越了同龄人。你处理问题时表现出的冷静和稳重让人信赖，周围人遇到困难时往往会寻求你的建议。",
        analysisEn: "People see you as a pillar of support. You value tradition and rationality. Just ensure you aren't suppressing your own emotional needs for the sake of others.",
        analysisZh: "大家把你看作是中流砥柱。你重视规则与理性，做事有条不紊。但请确保不要为了照顾大局而过度压抑自己内心的真实情感需求，偶尔任性一下也是可以的。",
        color: "#6A4C93",
        bgGradient: "linear-gradient(135deg, #6A4C93, #8B5FBF)"
    },
    {
        minDiff: 10,
        maxDiff: 15,
        titleEn: "Over Worried",
        titleZh: "有点操心过度",
        descriptionEn: "You tend to carry the weight of the world on your shoulders. Your mental age shows a tendency towards anxiety and over-planning.",
        descriptionZh: "你稍微有点“操心命”。你的心理年龄显示你倾向于过度思考和规划，总是试图掌控生活中的每一个细节。",
        analysisEn: "Your attention to detail is a strength, but it can be exhausting. Try to trust that things will work out even if you don't control every aspect.",
        analysisZh: "你对他人的关怀无微不至，对细节的把控也是你的强项，这让你在工作和生活中都表现优秀。但心理学研究表明，过度的控制欲往往源于内心的不安全感。试着相信车到山前必有路，练习把一些事情交给时间和运气来解决。你不需要完美地掌控一切，适当放手不仅能减轻自己的负担，也能给身边的人更多成长的空间。记住：世界不会因为你松手片刻就崩塌。",
        color: "#D2691E",
        bgGradient: "linear-gradient(135deg, #D2691E, #FF8C42)"
    },
    {
        minDiff: 5,
        maxDiff: 10,
        titleEn: "Very Mature",
        titleZh: "比较成熟",
        descriptionEn: "You strike a good balance, but lean towards maturity. You are responsible and grounded.",
        descriptionZh: "你在成熟与活力之间保持着不错的平衡，但总体偏向成熟。你是个脚踏实地的人，富有责任感。",
        analysisEn: "You are likely the 'voice of reason' in your friend group. You know when to have fun and when to work. Keep this healthy balance.",
        analysisZh: "你很可能是朋友圈里的“理智担当”。你很清楚什么时候该玩乐，什么时候该认真工作。保持这种健康的平衡，你是最让周围人感到舒适的存在。",
        color: "#2E86AB",
        bgGradient: "linear-gradient(135deg, #2E86AB, #4A90E2)"
    },
    {
        minDiff: 2,
        maxDiff: 5,
        titleEn: "Average",
        titleZh: "略显成熟",
        descriptionEn: "Your mental age is slightly above your physical age, giving you an edge in understanding complex situations.",
        descriptionZh: "你的心理年龄略高于实际年龄，这让你在理解复杂人际关系时比同龄人更有优势。",
        analysisEn: "You fit in well with your peers but often have deeper insights. You are adaptable and understanding.",
        analysisZh: "你既能和同龄人玩到一起，又常常能给出更深刻的见解。你的适应能力很强，是一个很好的倾听者和理解者。",
        color: "#5A7C8B",
        bgGradient: "linear-gradient(135deg, #5A7C8B, #7B9AAB)"
    },
    {
        minDiff: -2,
        maxDiff: 2,
        titleEn: "Average",
        titleZh: "与年龄相符",
        descriptionEn: "Your mind and body are in perfect sync. You experience life exactly as you should for your age.",
        descriptionZh: "你的身心状态完美同步。你正以最适合当下的心态去体验生活。",
        analysisEn: "This is a great state! You aren't rushing to grow up, nor are you stuck in the past. You live in the present moment.",
        analysisZh: "这是心理健康的黄金状态！发展心理学认为，每个年龄段都有其独特的任务和意义。你既没有急着长大去承担不该有的压力，也没有沉溺过去拒绝成长。你活在当下，享受着这个年纪该有的一切喜怒哀乐。这种平衡感非常珍贵——它意味着你的心理发展是健康的、自然的。保持这份当下的觉知，继续用开放的心态去体验生活的每一个阶段吧。",
        color: "#6C757D",
        bgGradient: "linear-gradient(135deg, #6C757D, #8A9BA8)"
    },
    {
        minDiff: -5,
        maxDiff: -2,
        titleEn: "Carefree",
        titleZh: "无忧无虑",
        descriptionEn: "You have a youthful spirit. You don't let stress bog you down and you keep a positive outlook.",
        descriptionZh: "你拥有一颗年轻的心。生活中的压力似乎很难击垮你，你总是能保持乐观向上的心态。",
        analysisEn: "Your optimism is infectious. You prioritize happiness and freedom. While some call it naive, it's actually a superpower to stay happy.",
        analysisZh: "你的乐观极具感染力，和你在一起的人都会感到轻松愉快。你把快乐和自由看得比什么都重要，不愿意被世俗的条条框框所束缚。虽然有人可能觉得这种态度有点天真，但积极心理学告诉我们：在压力重重的成年人世界里，能够保持发自内心的快乐其实是一种稀缺的能力。这份乐观是你抵御生活风浪的护盾，好好珍惜它。",
        color: "#4A7C59",
        bgGradient: "linear-gradient(135deg, #4A7C59, #5FB3CC)"
    },
    {
        minDiff: -10,
        maxDiff: -5,
        titleEn: "Young Heart",
        titleZh: "童心未泯",
        descriptionEn: "Your soul is much younger than your body. You are full of curiosity, energy, and a sense of wonder.",
        descriptionZh: "你的灵魂比肉体要年轻得多。你对世界充满了好奇心、活力和想象力，像个永远长不大的孩子。",
        analysisEn: "You refuse to let the world jade you. You are creative and fun-loving. Keep that spark alive!",
        analysisZh: "你拒绝让这个世界把你变得世故圆滑。你保留了孩童时期的好奇心和创造力，是朋友圈里的开心果。心理学研究表明，好奇心是保持大脑年轻和活力的关键因素之一。请务必保护好这份珍贵的纯真和热情，不要让它被平庸的日常生活所磨灭。这份童心是你最宝贵的财富，它让你的人生比大多数人都要丰富多彩。",
        color: "#27AE60",
        bgGradient: "linear-gradient(135deg, #27AE60, #58D68D)"
    },
    {
        minDiff: -15,
        maxDiff: -10,
        titleEn: "Back to Future",
        titleZh: "极其年轻的心态",
        descriptionEn: "You are incredibly young at heart, possibly bordering on rebellious or extremely energetic.",
        descriptionZh: "你的心态极其年轻，甚至带有一点叛逆和无限的精力。规则对你来说就是用来打破的。",
        analysisEn: "You live life on your own terms. Your energy is boundless. You might be impulsive, but it makes your life an adventure.",
        analysisZh: "你完全按照自己的意愿生活，不在乎别人的眼光和世俗的标准。你的精力似乎无穷无尽，对新鲜事物永远保持着探索的热情。可能有时候会显得有些冲动，让周围人为你捏一把汗，但正是这种敢想敢做的冲劲让你的生活充满了一次又一次的冒险和惊喜。心理学家认为，这种敢于打破常规的勇气，往往能带来意想不到的人生机遇。勇敢地做自己！",
        color: "#16A085",
        bgGradient: "linear-gradient(135deg, #16A085, #48C9B0)"
    },
    {
        minDiff: -1000,
        maxDiff: -15,
        titleEn: "Back to Future",
        titleZh: "返老还童",
        descriptionEn: "A miracle! Your mind is as pure and energetic as a child's, regardless of your real age.",
        descriptionZh: "奇迹！无论你的实际年龄多大，你的内心依然像孩子一样纯真、直接且充满活力。",
        analysisEn: "You possess a rare purity. The complexities of the adult world haven't tainted your spirit. You see the world with fresh eyes every day.",
        analysisZh: "你拥有极为罕见的纯真与直接。成年人世界的复杂与尔虞我诈似乎完全没有污染你的精神世界。你每天都用全新的眼光去看待这个世界，对生活充满了热情和期待。心理学家荣格曾说：每个成年人的内心都住着一个孩子。而你，是把这个内在小孩完好保护起来的人。这份纯真是你最特别的礼物，让你能够看到别人看不到的美好，感受到别人感受不到的快乐。永远不要失去它！",
        color: "#E74C3C",
        bgGradient: "linear-gradient(135deg, #E74C3C, #FF6B6B)"
    }
];
