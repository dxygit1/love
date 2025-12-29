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
        textEn: "Do you get nervous when you're around her?",
        textZh: "你在她身边时会感到紧张吗？",
        options: [
            { id: "a", textEn: "Yes, my heart races", textZh: "会，心跳加速，手足无措", weight: 5 },
            { id: "b", textEn: "A little, but I hide it", textZh: "有一点，但我会掩饰", weight: 3 },
            { id: "c", textEn: "Completely relaxed", textZh: "完全放松，像哥们一样", weight: 1 },
            { id: "d", textEn: "Annoyed", textZh: "觉得烦躁", weight: 0 },
        ],
    },
    {
        id: 2,
        textEn: "Do you stalk her social media profiles?",
        textZh: "你会悄悄翻看她的社交媒体吗？",
        options: [
            { id: "a", textEn: "Constantly, every update", textZh: "经常，每条动态都不放过", weight: 5 },
            { id: "b", textEn: "Sometimes, when bored", textZh: "偶尔，无聊时候看看", weight: 3 },
            { id: "c", textEn: "Rarely", textZh: "很少", weight: 1 },
            { id: "d", textEn: "Never/Unfollowed", textZh: "从不/已取关", weight: 0 },
        ],
    },
    {
        id: 3,
        textEn: "What attracts you most about her?",
        textZh: "她最吸引你的地方是什么？",
        options: [
            { id: "a", textEn: "Everything (her vibe, laugh, and looks)", textZh: "一切（她的笑容、性格，甚至小缺点）", weight: 5 },
            { id: "b", textEn: "Her personality/humor", textZh: "性格好，跟她在一起很开心", weight: 3 },
            { id: "c", textEn: "Just her body/face", textZh: "单纯是身材或脸蛋（馋她身子）", weight: 2 },
            { id: "d", textEn: "Nothing really", textZh: "没什么特别的", weight: 0 },
        ],
    },
    {
        id: 4,
        textEn: "Do you get jealous when she talks to other guys?",
        textZh: "看到她和其他男生聊天，你会吃醋吗？",
        options: [
            { id: "a", textEn: "Yes, it bothers me a lot", textZh: "会，心里很不舒服", weight: 5 },
            { id: "b", textEn: "A little bit", textZh: "稍微有一点点", weight: 3 },
            { id: "c", textEn: "Not at all", textZh: "完全不会", weight: 0 },
            { id: "d", textEn: "I encourage her", textZh: "我还帮她出谋划策", weight: 0 },
        ],
    },
    {
        id: 5,
        textEn: "How often do you think about her?",
        textZh: "你多久会想起她一次？",
        options: [
            { id: "a", textEn: "All day long", textZh: "整天都在想", weight: 5 },
            { id: "b", textEn: "A few times a day", textZh: "每天好几次", weight: 3 },
            { id: "c", textEn: "Only when I see her", textZh: "见到她的时候才想", weight: 1 },
            { id: "d", textEn: "Almost never", textZh: "几乎不想", weight: 0 },
        ],
    },
    {
        id: 6,
        textEn: "Do you try to impress her?",
        textZh: "你会刻意在她面前表现自己吗？",
        options: [
            { id: "a", textEn: "Yes, focused on looking cool", textZh: "会，时刻注意形象，想耍帅", weight: 5 },
            { id: "b", textEn: "Sometimes", textZh: "有时候会", weight: 3 },
            { id: "c", textEn: "I'm just myself", textZh: "做真实的自己", weight: 1 },
            { id: "d", textEn: "I don't care", textZh: "完全不在意", weight: 0 },
        ],
    },
    {
        id: 7,
        textEn: "Do you remember small details she told you?",
        textZh: "你记得她随口说的小细节吗？",
        options: [
            { id: "a", textEn: "Yes, every little thing", textZh: "记得，连她喜欢吃什么都记得", weight: 5 },
            { id: "b", textEn: "The important stuff", textZh: "记得比较重要的事情", weight: 3 },
            { id: "c", textEn: "Vaguely", textZh: "模模糊糊", weight: 1 },
            { id: "d", textEn: "No, I forget easily", textZh: "不记得，左耳进右耳出", weight: 0 },
        ],
    },
    {
        id: 8,
        textEn: "Do you want to protect her?",
        textZh: "你有想要保护她的冲动吗？",
        options: [
            { id: "a", textEn: "Strong instinct to protect/help", textZh: "非常强烈，总想帮她解决麻烦，不想看她受委屈", weight: 5 },
            { id: "b", textEn: "If she's in real trouble", textZh: "如果她遇到真正的困难会帮", weight: 3 },
            { id: "c", textEn: "She's tough, she's fine", textZh: "她很独立，自己能搞定", weight: 1 },
            { id: "d", textEn: "Not my problem", textZh: "不关我事", weight: 0 },
        ],
    },
    {
        id: 9,
        textEn: "Have you imagined a future with her?",
        textZh: "我想象过和她在一起的未来吗？",
        options: [
            { id: "a", textEn: "Yes, even marriage/kids", textZh: "想过，甚至想到了结婚", weight: 5 },
            { id: "b", textEn: "Briefly dating scenarios", textZh: "想过在一起恋爱的场景", weight: 3 },
            { id: "c", textEn: "No, just present moment", textZh: "没想过，只关注现在", weight: 1 },
            { id: "d", textEn: "Definitely not", textZh: "绝对不可能", weight: 0 },
        ],
    },
    {
        id: 10,
        textEn: "Do you text her just to say hi?",
        textZh: "你会没事找事发消息给她吗？",
        options: [
            { id: "a", textEn: "Often, finding excuses", textZh: "经常，总想找理由聊几句", weight: 5 },
            { id: "b", textEn: "Sometimes", textZh: "偶尔", weight: 3 },
            { id: "c", textEn: "Only for logistics", textZh: "只有正事才找她", weight: 1 },
            { id: "d", textEn: "Never initiate", textZh: "从不主动找她", weight: 0 },
        ],
    },
    {
        id: 11,
        textEn: "Does she make you laugh?",
        textZh: "她能让你笑吗？",
        options: [
            { id: "a", textEn: "She's the funniest person", textZh: "她太有意思了，总能逗乐我", weight: 5 },
            { id: "b", textEn: "Usually yes", textZh: "通常都可以", weight: 3 },
            { id: "c", textEn: "Sometimes", textZh: "偶尔", weight: 1 },
            { id: "d", textEn: "Not really", textZh: "没什么感觉", weight: 0 },
        ],
    },
    {
        id: 12,
        textEn: "Do you prioritize her over friends?",
        textZh: "你会为了她推掉朋友的聚会吗？",
        options: [
            { id: "a", textEn: "Yes, without hesitation", textZh: "会，只要她找我，兄弟局可以推", weight: 5 },
            { id: "b", textEn: "Depends on the plan", textZh: "看情况，重要的兄弟聚会还是会去", weight: 3 },
            { id: "c", textEn: "Rarely", textZh: "很少", weight: 1 },
            { id: "d", textEn: "Bros before everyone", textZh: "即使是她，也不能耽误我打游戏/陪兄弟", weight: 0 },
        ],
    },
    {
        id: 13,
        textEn: "Do you check your phone hoping it's her?",
        textZh: "你会盯着手机期待她的消息吗？",
        options: [
            { id: "a", textEn: "Always", textZh: "总是在等", weight: 5 },
            { id: "b", textEn: "Sometimes", textZh: "有时候", weight: 3 },
            { id: "c", textEn: "No", textZh: "不会", weight: 0 },
            { id: "d", textEn: "I ignore her texts", textZh: "我甚至忽略她的消息", weight: 0 },
        ],
    },
    {
        id: 14,
        textEn: "Do you notice when she changes her hair/clothes?",
        textZh: "她换发型或衣服你会注意吗？",
        options: [
            { id: "a", textEn: "Instantly and I compliment", textZh: "立刻发现并夸奖", weight: 5 },
            { id: "b", textEn: "Usually notice", textZh: "通常会注意到", weight: 3 },
            { id: "c", textEn: "If it's obvious", textZh: "如果变化很大的话", weight: 1 },
            { id: "d", textEn: "Never notice", textZh: "完全注意不到", weight: 0 },
        ],
    },
    {
        id: 15,
        textEn: "Do you feel like you can be yourself around her?",
        textZh: "在她面前你能做真实的自己吗？",
        options: [
            { id: "a", textEn: "Yes, completely comfortable", textZh: "可以，非常放松和舒服", weight: 5 },
            { id: "b", textEn: "Mostly", textZh: "大部分时候", weight: 3 },
            { id: "c", textEn: "I hide my flaws", textZh: "我会隐藏缺点", weight: 1 },
            { id: "d", textEn: "I put on an act", textZh: "我在演戏", weight: 0 },
        ],
    },
    {
        id: 16,
        textEn: "Do you save her photos?",
        textZh: "你会保存她的照片吗？",
        options: [
            { id: "a", textEn: "Yes, have a collection", textZh: "会，存了不少", weight: 5 },
            { id: "b", textEn: "Maybe one or two", textZh: "存过一两张", weight: 3 },
            { id: "c", textEn: "No", textZh: "不会", weight: 0 },
            { id: "d", textEn: "Why would I?", textZh: "我为什么要存？", weight: 0 },
        ],
    },
    {
        id: 17,
        textEn: "Do your friends tease you about her?",
        textZh: "你的朋友会拿她开你玩笑吗？",
        options: [
            { id: "a", textEn: "Yes, they know I like her", textZh: "经常，他们都知道我喜欢她", weight: 5 },
            { id: "b", textEn: "Sometimes", textZh: "有时候会", weight: 3 },
            { id: "c", textEn: "They don't know her", textZh: "他们不认识她", weight: 1 },
            { id: "d", textEn: "No", textZh: "没有", weight: 0 },
        ],
    },
    {
        id: 18,
        textEn: "Would you be upset if she got a boyfriend?",
        textZh: "如果她交了男朋友，你会难过吗？",
        options: [
            { id: "a", textEn: "Like a punch in the gut", textZh: "像胸口被打了一拳，非常难受/嫉妒", weight: 5 },
            { id: "b", textEn: "A bit disappointed/regretful", textZh: "有点失落，觉得错过了", weight: 3 },
            { id: "c", textEn: "Happy for her, honestly", textZh: "真心为她高兴（纯友谊）", weight: 0 },
            { id: "d", textEn: "Don't care at all", textZh: "完全无所谓", weight: 0 },
        ],
    },
    {
        id: 19,
        textEn: "Do you try to make physical contact?",
        textZh: "你会尝试和她有肢体接触吗？",
        options: [
            { id: "a", textEn: "Yes, look for opportunities", textZh: "会，寻找机会接触", weight: 5 },
            { id: "b", textEn: "If it happens naturally", textZh: "顺其自然", weight: 3 },
            { id: "c", textEn: "Avoid it", textZh: "尽量避免", weight: 0 },
            { id: "d", textEn: "No interest", textZh: "没兴趣", weight: 0 },
        ],
    },
    {
        id: 20,
        textEn: "What is your gut feeling?",
        textZh: "你的直觉告诉你什么？",
        options: [
            { id: "a", textEn: "I'm definitely in love", textZh: "我绝对喜欢上她了", weight: 5 },
            { id: "b", textEn: "I think I like her", textZh: "我觉得我是喜欢的", weight: 3 },
            { id: "c", textEn: "Just physical attraction", textZh: "只是身体吸引", weight: 2 },
            { id: "d", textEn: "Just friends", textZh: "只是朋友", weight: 0 },
        ],
    }
];

export const results: ResultCategory[] = [
    {
        minScore: 85,
        maxScore: 100,
        titleEn: "It's LOVE!",
        titleZh: "这是真爱啊！",
        descriptionEn: "You are head over heels for her. This isn't just a crush; you have deep romantic feelings. You care about her deeply, prioritizing her happiness and your connection. Stop hesitating!",
        descriptionZh: "根据你的回答，你对她的感情已经远远超越了普通的好感——这是真正的爱。从心理学角度来看，爱情有三个核心要素：亲密感、激情和承诺。而你对她三者兼具。你会不由自主地想起她，她的笑容能照亮你的一整天，你愿意为她付出、为她改变，想要保护她、让她快乐。这种深沉的情感羁绊是非常珍贵的。当一个人进入到这种状态时，说明对方已经在你心中占据了独一无二的位置，成为了你生命中的重要存在。",
        adviceEn: "Tell her how you feel! Life is short. Plan a special date and let her know she means the world to you.",
        adviceZh: "勇敢地向她表达你的心意吧！心理学研究表明，人们往往会后悔那些没有做的事情，而不是做过的事情。真正的爱情是稀有的，当你确认了自己的心意，就不要让犹豫和恐惧成为你们之间的障碍。找一个合适的时机，策划一次有意义的约会，在气氛到位的时候，真诚地告诉她：你在我心中有多特别。即使结果不如预期，至少你不会留下遗憾——而且，谁说她不是也在等你开口呢？"
    },
    {
        minScore: 65,
        maxScore: 84,
        titleEn: "Serious Crush",
        titleZh: "超级有好感",
        descriptionEn: "You definitely like her a lot. There's strong chemistry and you enjoy her company immensely. You are on the verge of falling in love.",
        descriptionZh: "你对她有很强烈的好感，已经处于心动的状态了。从你的回答来看，你们之间存在明显的化学反应：她的存在让你感到愉悦，和她相处的时光让你期待，她的消息能让你嘴角上扬。这种感觉说明你已经站在了爱情的门槛上，离坠入爱河只差一点点推动力。心理学中有一个曝光效应——随着相处时间的增加和了解的加深，这份好感很可能会升华为更深刻的情感连接。",
        adviceEn: "Spend more one-on-one time together. See if this connection deepens into something more serious. Flirt a little more openly.",
        adviceZh: "继续增加你们的互动质量和深度。心理学研究表明，情感的建立需要两个要素：共同经历和情感分享。多创造一些独处的机会——一起喝杯咖啡、看场电影、或者探索一个新地方。在聊天中分享更多真实的自我，包括你的梦想、恐惧和童年回忆。同时，可以尝试更明显一点的示好：真诚的赞美、细心的关注、或者一个有心的小礼物。观察她的反应，如果感觉是相互的，就大胆地表达你的心意吧。"
    },
    {
        minScore: 45,
        maxScore: 64,
        titleEn: "Interested / Curiosity",
        titleZh: "有点意思/好奇",
        descriptionEn: "You have some feelings, but it's not fully clear yet. It might be physical attraction or just enjoying the attention. You are interested but not committed.",
        descriptionZh: "你对她有一定的兴趣和好奇心，但感情还处于萌芽和探索阶段，不够明朗。这种状态很常见——可能是因为认识的时间还不够长，对她的了解还不够深入；也可能是你自己还没有想清楚自己到底想要什么样的感情。从心理学角度来看，这可能只是单纯的欣赏她的某些特质，或者享受被关注、被喜欢的感觉。需要更多时间和经历来确认这份感觉的本质。",
        adviceEn: "Give it time. Don't rush into anything. Get to know her better as a friend first to see if feelings grow.",
        adviceZh: "给自己一点时间来厘清内心的感受。不要因为孤单或者周围人的催促就急于开始一段关系——在感情不够明确的情况下贸然行动，可能会伤害到她，也会让自己陷入尴尬。建议先从朋友做起，通过更多的相处和交流来加深对她的了解。观察自己的情绪变化：见到她会开心吗？想到她会嘴角上扬吗？如果这些信号开始变强，那就是感情在生长；如果始终平淡，可能说明这只是一时的欣赏而已。"
    },
    {
        minScore: 25,
        maxScore: 44,
        titleEn: "Just Friends",
        titleZh: "只是朋友",
        descriptionEn: "You see her as a good friend. You care about her, but the romantic spark is missing. You are comfortable, but not excited in 'that' way.",
        descriptionZh: "从你的回答来看，你把她定位在朋友这个位置上。和她在一起你感到舒适、轻松，你们有不错的交流，但缺少那种让心跳加速的化学反应。在心理学中，这种状态被称为情感陪伴——你欣赏她、关心她，但并没有产生浪漫的欲望。这不是任何人的问题，只是感情的化学反应并不是可以强求的。有时候，一个真挚的异性好友反而比一段勉强的恋情更有价值。",
        adviceEn: "Value the friendship. Don't force a romance that isn't there. It's okay to just be platonic friends.",
        adviceZh: "珍惜这段友谊，但也要对彼此诚实。如果她对你有超越友情的期待，那么你有责任温柔但明确地表达你的真实想法，避免给她错误的希望。心理学研究表明，异性友谊是可以健康存在的——关键在于双方对关系的定位要一致。做一个尊重她感受的好朋友，而不是一个模糊关系边界的暧昧对象。有时候，最好的礼物不是勉强的爱情，而是真诚的友谊。"
    },
    {
        minScore: 0,
        maxScore: 24,
        titleEn: "No Romantic Interest",
        titleZh: "完全没感觉",
        descriptionEn: "You don't have romantic feelings for her. You might not even be that close as friends. Be honest with yourself.",
        descriptionZh: "根据你的回答，你对她确实没有任何超越普通关系的感觉。你可能只是把她当作一个认识的人、一个点头之交，甚至内心对她有些抵触。这是完全正常的——不是每个走进我们生活的人都会引起我们的情感波动。人与人之间的吸引力是复杂的化学反应，无法强求。诚实地面对自己的内心，是成熟的表现。",
        adviceEn: "Treat her with respect, but don't lead her on. Keep your distance if necessary.",
        adviceZh: "保持基本的尊重和礼貌，但不要让她产生任何误解。如果她对你有期待，最善意的做法是清楚地表明你的态度，而不是出于不想伤害她而模糊其辞——模糊的态度反而会造成更大的伤害。同时，如果可能的话，保持适当的距离，避免给她任何可能产生误会的信号。诚实和边界感不是冷漠，而是对双方的尊重。把你的时间和精力留给那些真正让你心动的人吧。"
    }
];
