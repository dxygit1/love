// 测测你到底有多喜欢他 - Quiz Data
// Source: arealme.com/do-i-like-him

export interface DoILikeHimOption {
    text: string;
    textEn: string;
    score: number;
    jumpTo?: number; // 跳转到指定题目
}

export interface DoILikeHimQuestion {
    id: number;
    question: string;
    questionEn: string;
    options: DoILikeHimOption[];
}

export interface DoILikeHimResult {
    minScore: number;
    maxScore: number;
    titleZh: string;
    titleEn: string;
    descriptionZh: string;
    descriptionEn: string;
}

export const doILikeHimQuestions: DoILikeHimQuestion[] = [
    {
        id: 1,
        question: "你为什么来做这个测试呢？",
        questionEn: "Why are you taking this quiz?",
        options: [
            { text: "看到这个测试立马就想起那个人了", textEn: "I immediately thought of someone", score: 9, jumpTo: 3 },
            { text: "想起了若干个人，思考后决定先测这个人", textEn: "Thought of several people, decided to test this one first", score: 6, jumpTo: 3 },
            { text: "我想先来看看这个测试是什么样的", textEn: "I want to see what this quiz is like first", score: 3 }
        ]
    },
    {
        id: 2,
        question: "请在脑海中想出具体的一个他，再继续测试。",
        questionEn: "Please think of a specific person before continuing.",
        options: [
            { text: "好了，继续", textEn: "Ready, continue", score: 0 }
        ]
    },
    {
        id: 3,
        question: "你在现实生活中和他有任何行为交集吗（当面交谈、参加活动等）？",
        questionEn: "Do you have any real-life interactions with him?",
        options: [
            { text: "有，很多", textEn: "Yes, a lot", score: 6 },
            { text: "有，但很偶尔（一次也算）", textEn: "Yes, but rarely", score: 3 },
            { text: "没有", textEn: "No", score: 0 }
        ]
    },
    {
        id: 4,
        question: "你们有共同的朋友吗？",
        questionEn: "Do you have mutual friends?",
        options: [
            { text: "有", textEn: "Yes", score: 6 },
            { text: "没有", textEn: "No", score: 0 }
        ]
    },
    {
        id: 5,
        question: "你有他的私人联络方式（手机、微信等）吗？",
        questionEn: "Do you have his private contact info?",
        options: [
            { text: "有", textEn: "Yes", score: 6 },
            { text: "没有", textEn: "No", score: 0 }
        ]
    },
    {
        id: 6,
        question: "你会怎么备注他的名字呢？",
        questionEn: "How do you save his name in your contacts?",
        options: [
            { text: "真实姓名", textEn: "Real name", score: 3 },
            { text: "就用他账号的用户名", textEn: "His username", score: 0 },
            { text: "给他起一个昵称，只有我自己知道的那种", textEn: "A nickname only I know", score: 10 },
            { text: "朋友们都喊的外号", textEn: "A nickname everyone uses", score: 6 }
        ]
    },
    {
        id: 7,
        question: "你们不见面的时候有用通讯工具聊天过吗？",
        questionEn: "Do you chat with him when you're not together?",
        options: [
            { text: "没有闲聊，只有正事沟通", textEn: "Only for important matters", score: 0 },
            { text: "有，偶尔有一搭没一搭的聊", textEn: "Yes, occasionally", score: 5 },
            { text: "有，经常聊天，各种内容", textEn: "Yes, often chat about everything", score: 8 }
        ]
    },
    {
        id: 8,
        question: "你们一起讨论过喜欢的书影音作品吗？",
        questionEn: "Have you discussed favorite books, movies or music together?",
        options: [
            { text: "有", textEn: "Yes", score: 6 },
            { text: "没有", textEn: "No", score: 0 }
        ]
    },
    {
        id: 9,
        question: "你尝试过约他出来一起玩吗？",
        questionEn: "Have you tried to ask him out?",
        options: [
            { text: "有，单独出来的", textEn: "Yes, just the two of us", score: 10 },
            { text: "有，大家聚会时候约的", textEn: "Yes, at group gatherings", score: 6 },
            { text: "没有，不敢", textEn: "No, too scared", score: 0 },
            { text: "没有，还没机会，酝酿中", textEn: "No, still planning", score: 3 }
        ]
    },
    {
        id: 10,
        question: "他怎么称呼你的？",
        questionEn: "How does he call you?",
        options: [
            { text: "全名", textEn: "Full name", score: 3 },
            { text: "朋友之间通用的昵称", textEn: "Common nickname among friends", score: 6 },
            { text: "给我单独起的'外号'", textEn: "A special nickname just for me", score: 10 },
            { text: "没有特别清晰的印象", textEn: "Not sure", score: 0 }
        ]
    },
    {
        id: 11,
        question: "你有想象过和他以恋人关系在一起后的画面吗？",
        questionEn: "Have you imagined being in a relationship with him?",
        options: [
            { text: "有，经常", textEn: "Yes, often", score: 6 },
            { text: "没有，不敢想", textEn: "No, I don't dare", score: 0 },
            { text: "偶尔有一两次，然后马上打消念头了，觉得不太可能", textEn: "Once or twice, then dismissed it", score: 3 }
        ]
    },
    {
        id: 12,
        question: "你觉得和他未来最有可能的关系是什么？",
        questionEn: "What do you think your future relationship will be?",
        options: [
            { text: "婚姻伴侣", textEn: "Marriage partner", score: 10 },
            { text: "恋人", textEn: "Lovers", score: 6 },
            { text: "挚友", textEn: "Close friends", score: 3 },
            { text: "普通朋友", textEn: "Regular friends", score: 3 },
            { text: "陌生人", textEn: "Strangers", score: 0 },
            { text: "现实生活没交集的网友", textEn: "Online friends with no real-life contact", score: 2 }
        ]
    },
    {
        id: 13,
        question: "他突然跑来告诉你他有喜欢的人了，你第一反应是？",
        questionEn: "If he suddenly told you he likes someone, your first reaction?",
        options: [
            { text: "忐忑，不知道他为什么告诉我，难道是想对我表白吗？", textEn: "Nervous, wondering if he's confessing to me", score: 6 },
            { text: "惊讶又失落，有种失恋的感觉", textEn: "Surprised and disappointed, feeling heartbroken", score: 3 },
            { text: "意料之中，大方祝他幸福吧", textEn: "Expected, I'd wish him well", score: 1 }
        ]
    },
    {
        id: 14,
        question: "你每天起床挑选衣物时候，会考虑怎么打扮会更吸引他注意吗？",
        questionEn: "When choosing outfits, do you consider how to attract his attention?",
        options: [
            { text: "没有，我都不知道他喜欢什么风格", textEn: "No, I don't know his preferences", score: 1 },
            { text: "会，有刻意穿他喜欢的风格", textEn: "Yes, I deliberately dress in his favorite style", score: 6 },
            { text: "偶尔，比如确定今天能见到他的情况", textEn: "Sometimes, when I know I'll see him", score: 3 }
        ]
    },
    {
        id: 15,
        question: "你有和你最好的朋友谈起过他吗？",
        questionEn: "Have you talked about him to your best friend?",
        options: [
            { text: "经常，都知道我对他的爱慕", textEn: "Often, they all know I adore him", score: 10 },
            { text: "偶尔，但不想多说", textEn: "Sometimes, but don't want to say much", score: 5 },
            { text: "从未提起，怕被人知道我的心情", textEn: "Never, afraid others will know my feelings", score: 3 }
        ]
    }
];

export const doILikeHimResults: DoILikeHimResult[] = [
    {
        minScore: 90,
        maxScore: 100,
        titleZh: "永生挚爱",
        titleEn: "Eternal Love",
        descriptionZh: "你对他的感情绝对不是一时兴起，可能已经持续了好几个月甚至几年。你对他已经超越了爱慕的情绪，而是把他当作精神上的一种指引，让你一直渴望成为更好的人更配得上他的人。如果错过了他，对你而言应该是不小的打击。祝愿你能早日俘获他的心，和他一起走向幸福的大结局。",
        descriptionEn: "Your feelings for him are not just a passing fancy. You've transcended mere admiration—he's become a spiritual guide, inspiring you to become a better person worthy of him. Missing him would be a significant blow. May you capture his heart and walk towards a happy ending together."
    },
    {
        minScore: 65,
        maxScore: 89,
        titleZh: "绝对理想型",
        titleEn: "Absolute Ideal Type",
        descriptionZh: "你对理想型有较为清晰的形象描绘，而他恰恰好满足了你的大多数描述。在你心里，他有着致命的吸引力，让你时时刻刻想着念着。如果你们能走到一起，最后却不幸分开，你的心里也会一直为他保留一个位置，我想这大概就是'除却巫山不是云'吧。",
        descriptionEn: "He perfectly matches your ideal type. He has a fatal attraction that keeps you thinking about him constantly. Even if you were to part ways, he would always hold a special place in your heart."
    },
    {
        minScore: 40,
        maxScore: 64,
        titleZh: "小鹿乱撞",
        titleEn: "Heart Fluttering",
        descriptionZh: "你和他的关系还没有熟悉到可以亲密无间，无话不说的地步。你自己甚至有时候也会忍不住问问自己，到底对他是什么感觉。这种浅浅的喜欢和暧昧，有时候恰好该死的迷人呢。到底接下来你们要往前迈一步还是留在原地？你现在心里有答案了吗？",
        descriptionEn: "Your relationship hasn't reached the point of being completely open with each other. You sometimes can't help but ask yourself what exactly you feel for him. This subtle affection and ambiguity can be charmingly captivating. Will you take a step forward or stay where you are?"
    },
    {
        minScore: 18,
        maxScore: 39,
        titleZh: "云淡风轻",
        titleEn: "Calm and Light",
        descriptionZh: "你和他可能刚认识不久，或者生活中交际并不多导致交情尚浅。你偶尔会想起他，尤其是在朋友们讨论起恋爱和理想对象时候，脑中突然浮现出他的身影。对你而言，他只是个你欣赏的对象，并没有非要以恋人关系在一起的强烈冲动。",
        descriptionEn: "You might have just met him recently, or you don't interact much in daily life. You occasionally think of him, especially when friends discuss love. To you, he's someone you admire, but you don't feel a strong urge to be in a romantic relationship with him."
    },
    {
        minScore: 0,
        maxScore: 17,
        titleZh: "一时脑热",
        titleEn: "Just a Passing Thought",
        descriptionZh: "你从没想过和他要成为恋人关系，甚至在谈起喜欢的对象时候脑中第一个浮现的也未必是他的身影。对你而言他只是个路人甲，没有更多非分之想，甚至即使有可能发展成恋人，你也还是更希望和他以朋友的形式长久相处。",
        descriptionEn: "You've never really considered being in a romantic relationship with him. He's just a passerby in your life, and even if there were a possibility of romance, you'd prefer to remain friends long-term."
    }
];

// 计算总分（最高100分）
export function calculateDoILikeHimScore(answers: number[]): number {
    let score = 0;

    // 根据答案计算分数
    answers.forEach((answerIndex, questionIndex) => {
        const question = doILikeHimQuestions[questionIndex];
        if (question && question.options[answerIndex]) {
            score += question.options[answerIndex].score;
        }
    });

    // 分数上限100
    return Math.min(score, 100);
}

// 根据分数获取结果
export function getDoILikeHimResult(score: number): DoILikeHimResult {
    return doILikeHimResults.find(
        result => score >= result.minScore && score <= result.maxScore
    ) || doILikeHimResults[doILikeHimResults.length - 1];
}
