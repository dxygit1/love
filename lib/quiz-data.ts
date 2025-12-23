export interface Option {
  id: string;
  textEn: string;
  textZh: string;
  weight: number; // 0-7 score contribution, max total = 100
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

// 20道题，满分100分，每题最高分5分
export const questions: Question[] = [
  {
    id: 1,
    textEn: "How often do you think about him?",
    textZh: "你会经常想起他吗？",
    options: [
      { id: "a", textEn: "Constantly, every hour", textZh: "无时无刻，每小时都会", weight: 5 },
      { id: "b", textEn: "Frequently, several times a day", textZh: "经常，每天好几次", weight: 3 },
      { id: "c", textEn: "Occasionally, when reminded", textZh: "偶尔，看到相关事物时", weight: 1 },
      { id: "d", textEn: "Rarely", textZh: "很少", weight: 0 },
    ],
  },
  {
    id: 2,
    textEn: "How do you feel when you receive a message from him?",
    textZh: "收到他的消息时，你会有什么感觉？",
    options: [
      { id: "a", textEn: "My heart skips a beat! Excited!", textZh: "心跳加速！超级兴奋！", weight: 5 },
      { id: "b", textEn: "Happy, I check it immediately", textZh: "开心，会立刻查看", weight: 3 },
      { id: "c", textEn: "Neutral, I reply when free", textZh: "平常心，有空再回", weight: 1 },
      { id: "d", textEn: "Annoyed or indifferent", textZh: "烦躁或无感", weight: 0 },
    ],
  },
  {
    id: 3,
    textEn: "Do you re-read his old messages?",
    textZh: "你会重读以前的聊天记录吗？",
    options: [
      { id: "a", textEn: "Yes, and I smile like a fool", textZh: "会，而且会傻笑", weight: 5 },
      { id: "b", textEn: "Sometimes, to check details", textZh: "有时候，为了确认信息", weight: 3 },
      { id: "c", textEn: "Only if I need to find something", textZh: "只有在找东西的时候", weight: 1 },
      { id: "d", textEn: "Never", textZh: "从来不会", weight: 0 },
    ],
  },
  {
    id: 4,
    textEn: "Do you get jealous if he talks to other girls?",
    textZh: "如果他和别的女生说话，你会吃醋吗？",
    options: [
      { id: "a", textEn: "Yes, very jealous and upset", textZh: "会，非常吃醋，不开心", weight: 5 },
      { id: "b", textEn: "A little bit uncomfortable", textZh: "有一点点不舒服", weight: 3 },
      { id: "c", textEn: "Curious, but not really jealous", textZh: "好奇，但算不上吃醋", weight: 1 },
      { id: "d", textEn: "Not at all", textZh: "完全不会", weight: 0 },
    ],
  },
  {
    id: 5,
    textEn: "Do you dress up specifically when you know you'll see him?",
    textZh: "知道要见他时，你会特意打扮吗？",
    options: [
      { id: "a", textEn: "Yes, carefully select outfit and makeup", textZh: "会，精心挑选衣服和化妆", weight: 5 },
      { id: "b", textEn: "I check the mirror a few more times", textZh: "会多照几下镜子", weight: 3 },
      { id: "c", textEn: "Just normal grooming", textZh: "正常整理一下", weight: 1 },
      { id: "d", textEn: "No change", textZh: "没什么变化", weight: 0 },
    ],
  },
  {
    id: 6,
    textEn: "Have you stalked his social media?",
    textZh: "你翻看过他的社交媒体动态吗？",
    options: [
      { id: "a", textEn: "I've seen everything, even old posts", textZh: "全都看过，连很久以前的都翻了", weight: 5 },
      { id: "b", textEn: "Yes, I follow his recent updates", textZh: "有，关注他最近的动态", weight: 3 },
      { id: "c", textEn: "If it pops up on my feed", textZh: "如果刷到了会看", weight: 1 },
      { id: "d", textEn: "No interest", textZh: "没兴趣", weight: 0 },
    ],
  },
  {
    id: 7,
    textEn: "Do you talk about him to your friends?",
    textZh: "你会和朋友提到他吗？",
    options: [
      { id: "a", textEn: "All the time, they are annoyed!", textZh: "一直在说，朋友都烦了！", weight: 5 },
      { id: "b", textEn: "When asked or relevant", textZh: "被问起或者话题相关时", weight: 3 },
      { id: "c", textEn: "Rarely mention him", textZh: "很少提到", weight: 1 },
      { id: "d", textEn: "Never", textZh: "从不", weight: 0 },
    ],
  },
  {
    id: 8,
    textEn: "Do you try to find shared interests with him?",
    textZh: "你会努力寻找和他的共同兴趣吗？",
    options: [
      { id: "a", textEn: "Yes, even learned new things for him", textZh: "会，甚至为了他去学新东西", weight: 5 },
      { id: "b", textEn: "I emphasize what we already share", textZh: "我会强调我们已有的共同点", weight: 3 },
      { id: "c", textEn: "If it happens naturally", textZh: "顺其自然", weight: 1 },
      { id: "d", textEn: "No need", textZh: "没必要", weight: 0 },
    ],
  },
  {
    id: 9,
    textEn: "Do you imagine a future with him?",
    textZh: "你有幻想过和他的未来吗？",
    options: [
      { id: "a", textEn: "Yes, dating, marriage, everything", textZh: "有，恋爱、结婚，什么都想过", weight: 5 },
      { id: "b", textEn: "I've imagined us dating", textZh: "想过我们在一起的样子", weight: 3 },
      { id: "c", textEn: "Maybe fleetingly", textZh: "可能一闪而过", weight: 1 },
      { id: "d", textEn: "No, live in the moment", textZh: "没有，活在当下", weight: 0 },
    ],
  },
  {
    id: 10,
    textEn: "How do you feel if he doesn't reply for a long time?",
    textZh: "如果有很长时间没回消息，你会？",
    options: [
      { id: "a", textEn: "Anxious, checking phone constantly", textZh: "焦虑，不停看手机", weight: 5 },
      { id: "b", textEn: "A bit worried", textZh: "有点担心", weight: 3 },
      { id: "c", textEn: "Think he's just busy", textZh: "觉得他只是忙", weight: 1 },
      { id: "d", textEn: "Don't really notice", textZh: "没太注意", weight: 0 },
    ],
  },
  {
    id: 11,
    textEn: "Do you remember small details he said?",
    textZh: "你能记住他说过的小细节吗？",
    options: [
      { id: "a", textEn: "Every single word", textZh: "每一句话都记得", weight: 5 },
      { id: "b", textEn: "Most important things", textZh: "记得大部分重要的事", weight: 3 },
      { id: "c", textEn: "Only the main points", textZh: "只记得大概", weight: 1 },
      { id: "d", textEn: "I have a bad memory", textZh: "记性不太好", weight: 0 },
    ],
  },
  {
    id: 12,
    textEn: "Do you want to know his schedule?",
    textZh: "你想知道他的日程安排吗？",
    options: [
      { id: "a", textEn: "Yes, complete control!", textZh: "想，了如指掌！", weight: 5 },
      { id: "b", textEn: "Curious so I can meet him", textZh: "好奇，这样可以偶遇", weight: 3 },
      { id: "c", textEn: "Only to avoid disturbing him", textZh: "只是为了不打扰他", weight: 1 },
      { id: "d", textEn: "It's his privacy", textZh: "那是他的隐私", weight: 0 },
    ],
  },
  {
    id: 13,
    textEn: "Does looking at him make you nervous?",
    textZh: "看着他的时候你会紧张吗？",
    options: [
      { id: "a", textEn: "Butterflies in my stomach!", textZh: "心里小鹿乱撞！", weight: 5 },
      { id: "b", textEn: "A little shy", textZh: "有点害羞", weight: 3 },
      { id: "c", textEn: "Comfortable", textZh: "很自在", weight: 1 },
      { id: "d", textEn: "No feeling", textZh: "没感觉", weight: 0 },
    ],
  },
  {
    id: 14,
    textEn: "Do you prioritize him over other plans?",
    textZh: "你会为了他推掉其他安排吗？",
    options: [
      { id: "a", textEn: "Always, he is priority", textZh: "总是，他是第一位", weight: 5 },
      { id: "b", textEn: "If it's not super important", textZh: "如果原本的事不重要的话", weight: 3 },
      { id: "c", textEn: "Depends on my mood", textZh: "看心情", weight: 1 },
      { id: "d", textEn: "No, plans are plans", textZh: "不会，计划就是计划", weight: 0 },
    ],
  },
  {
    id: 15,
    textEn: "In a group setting, is your attention on him?",
    textZh: "在一群人中，你的注意力会在他身上吗？",
    options: [
      { id: "a", textEn: "I always know where he is", textZh: "我永远知道他在哪", weight: 5 },
      { id: "b", textEn: "I glance at him often", textZh: "经常看他", weight: 3 },
      { id: "c", textEn: "Same as everyone else", textZh: "和其他人一样", weight: 1 },
      { id: "d", textEn: "Barely notice him", textZh: "几乎没注意他", weight: 0 },
    ],
  },
  {
    id: 16,
    textEn: "When something funny happens, who do you want to tell first?",
    textZh: "遇到好笑的事情，你第一个想告诉谁？",
    options: [
      { id: "a", textEn: "Him, immediately!", textZh: "他！立刻发消息告诉他", weight: 5 },
      { id: "b", textEn: "He is one of the people I share with", textZh: "他是分享对象之一", weight: 3 },
      { id: "c", textEn: "My best friend", textZh: "我的闺蜜/死党", weight: 1 },
      { id: "d", textEn: "Whoever is next to me", textZh: "旁边是谁就告诉谁", weight: 0 },
    ],
  },
  {
    id: 17,
    textEn: "If he needs help late at night, would you go?",
    textZh: "如果他深夜需要帮助，你会去吗？",
    options: [
      { id: "a", textEn: "Yes, without hesitation", textZh: "会，毫不犹豫", weight: 5 },
      { id: "b", textEn: "I'd try to help remotely", textZh: "会，但会先问清楚情况", weight: 3 },
      { id: "c", textEn: "Only if it's an emergency", textZh: "除非是非常紧急的情况", weight: 1 },
      { id: "d", textEn: "No, I'm sleeping", textZh: "不会，我要睡觉", weight: 0 },
    ],
  },
  {
    id: 18,
    textEn: "How do you react to accidental physical contact?",
    textZh: "如果不小心和他有了肢体接触，你的反应是？",
    options: [
      { id: "a", textEn: "Electricity! I secretly like it", textZh: "像触电一样！心里暗暗开心", weight: 5 },
      { id: "b", textEn: "A bit flustered but okay", textZh: "有点不好意思，但不反感", weight: 3 },
      { id: "c", textEn: "Apologize politely", textZh: "礼貌道歉", weight: 1 },
      { id: "d", textEn: "Pull away immediately", textZh: "立刻躲开", weight: 0 },
    ],
  },
  {
    id: 19,
    textEn: "Can his mood affect your whole day?",
    textZh: "他的情绪会影响你的一整天吗？",
    options: [
      { id: "a", textEn: "Totally, if he is sad, I am sad", textZh: "完全会，他开心我就开心，他难过我也难过", weight: 5 },
      { id: "b", textEn: "Somewhat affect my mood", textZh: "会有一点影响", weight: 3 },
      { id: "c", textEn: "I care, but won't ruin my day", textZh: "会关心一下，但不至于影响我", weight: 1 },
      { id: "d", textEn: "No, his mood is his business", textZh: "不会，各过各的", weight: 0 },
    ],
  },
  {
    id: 20,
    textEn: "Do you remember his birthday and special dates?",
    textZh: "你记得他的生日和重要日子吗？",
    options: [
      { id: "a", textEn: "Yes, and prepared a surprise long ago", textZh: "记得，而且早就准备了惊喜", weight: 5 },
      { id: "b", textEn: "I remember the date", textZh: "记得日期", weight: 3 },
      { id: "c", textEn: "If Facebook/calendar reminds me", textZh: "如果有提醒的话会记得", weight: 1 },
      { id: "d", textEn: "No idea", textZh: "完全不知道", weight: 0 },
    ],
  }
];

// 满分100分的结果分类
export const results: ResultCategory[] = [
  {
    minScore: 87,
    maxScore: 100,
    titleEn: "Soulmate Connection",
    titleZh: "灵魂共振",
    descriptionEn: "Deep spiritual connection.",
    descriptionZh: "这已超越了简单的'喜欢'，而是一种罕见的深度共鸣。在心理学视角下，你的潜意识已经完全接纳他进入你的'核心安全区'。你对他不仅有强烈的激情（Passion），更建立了极高的亲密感（Intimacy）和排他性承诺（Commitment）。这种三维度的饱满情感，正是斯腾伯格笔下的“完美之爱”雏形。你不仅爱着他的闪光点，似乎也准备好了包容他的不完美。",
    adviceEn: "Cherish this rare bond.",
    adviceZh: "这种强烈的连接感往往伴随着'害怕失去'的焦虑，这是深爱的副作用。但请记住：最好的爱不是“因为需要所以爱”，而是“因为爱所以需要”。在全情投入的同时，保持适度的自我独立性，会让这段关系更有韧性。去拥抱这份幸运吧，它是生命馈赠的珍贵礼物。"
  },
  {
    minScore: 67,
    maxScore: 86,
    titleEn: "Deep Affection",
    titleZh: "绝对理想型",
    descriptionEn: "Strong feelings and high compatibility.",
    descriptionZh: "在你眼中，他几乎精准地击中了你对伴侣的'理想化投射'。数据表明，你对他有着极高的精神依恋度。这种吸引力不仅源于荷尔蒙的冲动，更源于他在性格或价值观上满足了你的深层需求。想起他时，你的大脑会分泌大量的多巴胺，这种愉悦感让你觉得世界都变得明亮。你们之间，只差最后那层窗户纸。",
    adviceEn: "Time to express your feelings.",
    adviceZh: "如果说喜欢是放肆，那么爱就是克制。你可能还在犹豫要不要跨出那一步，担心破坏现有的平衡。但心理学研究显示，'未完成事件'往往会让人遗憾终生。不如试着给彼此一个机会，不要让过多的理性分析阻碍了感性的自然流动。愿你们能从'我'变成'我们'。"
  },
  {
    minScore: 47,
    maxScore: 66,
    titleEn: "Sweet Crush",
    titleZh: "小鹿乱撞",
    descriptionEn: "Typical early stage crush.",
    descriptionZh: "你正处于最迷人也最折磨人的“暧昧期”。这种患得患失的感觉，源于“间歇性强化”——他偶尔的回应给你希望，偶尔的沉默又让你焦虑。你在潜意识里已经给了他特殊的优先权，每一次手机震动，你都期待是他的名字。这种朦胧的好感充满了张力，是爱情萌芽时最原本的样子。",
    adviceEn: "Enjoy the uncertainty.",
    adviceZh: "不必急着给这段关系下定义。当下的焦虑和兴奋，其实都是一种心理能量的释放。试着把关注点从“他喜不喜欢我”转移到“我和他在一起快不快乐”上。多创造一些线下的真实互动，去验证这到底是真实的灵魂吸引，还是一场短暂的荷尔蒙狂欢。时间会给你最诚实的答案。"
  },
  {
    minScore: 27,
    maxScore: 46,
    titleEn: "Friendly Zone",
    titleZh: "云淡风轻",
    descriptionEn: "Maybe just friends.",
    descriptionZh: "你对他有好感，但这更像是一种基于欣赏的“伴侣式友谊”，而非激情的恋爱。你的理智大脑明显占据了上风，你能够客观地评价他，也能自如地控制自己的情绪。这种关系舒适且安全，但缺乏那种让人冲动想要占有的张力。也许在你的潜意识里，他更适合做一个长久的朋友，而不是恋人。",
    adviceEn: "Analysis suggests friendship.",
    adviceZh: "不要为了恋爱而恋爱。有时候，我们容易混淆“不讨厌”和“喜欢”的界限。这种淡淡的关系其实非常珍贵，进可攻退可守。如果没有感受到那种生理性的冲动和强烈的独占欲，不妨就维持在舒适区。毕竟，一个懂你的朋友，有时比一个不合适的恋人更难得。"
  },
  {
    minScore: 0,
    maxScore: 26,
    titleEn: "Not Interested",
    titleZh: "一时幻觉",
    descriptionEn: "Likely just impulse.",
    descriptionZh: "与其说你喜欢他，不如说你喜欢的是“被爱”的感觉，或者是对他身上某个光环的短暂迷恋。心理学将其称为“晕轮效应”——你可能因为一点好感而美化了他的全部。但当冷静下来审视，你们之间缺乏深层的情感连接。你现在的焦虑，可能更多是源于孤独或自尊心，而非对那个人的真实依恋。",
    adviceEn: "Focus on yourself.",
    adviceZh: "清醒地面对自己的内心，是一种了不起的能力。不要因为周围人的起哄或深夜的寂寞，就勉强自己投入一段不对等的关系。真正的喜欢是藏不住的，更是持续的。现在的你，不如把那份期待收回来好好爱自己。提升自己的磁场，那个真正让灵魂同频的人，正在赶来见你的路上。"
  }
];
