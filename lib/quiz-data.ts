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
    titleEn: "Eternal Love",
    titleZh: "永生挚爱",
    descriptionEn: "Congratulations! Your feelings for him have transcended a simple crush and reached a profound level of devotion. Every move he makes tugs at your heartstrings, and his smile is the highlight of your day. You are willing to change for him and give your all. This deep, unconditional love is a rare gem that many seek for a lifetime. In your heart, he is the one—your soulmate with whom you wish to share the rest of your journey.",
    descriptionZh: "恭喜你，你对他的感情已经超越了普通的喜欢，达到了刻骨铭心的程度。他的一举一动都牵动着你的心，他的笑容是你每天最期待的风景。你愿意为他改变自己，愿意为他付出一切。这种深沉的爱意，是很多人一辈子都难以遇到的。在你心里，他就是那个独一无二的人，是你想要携手共度余生的灵魂伴侣。",
    adviceEn: "Such a deep connection is precious, but remember: true love is reciprocal. While giving your whole heart, save some tenderness for yourself properly. If the timing feels right, be brave and take that leap of faith. If the response isn't immediate, trust that someone as wonderful as you deserves to be cherished equally.",
    adviceZh: "如此深厚的感情值得被珍惜，但也请记住：真正的爱是相互的。在全心付出的同时，也要留一些温柔给自己。如果缘分到了，不妨勇敢迈出那一步；如果暂时没有回应，也请相信，你这么美好的人，一定会遇到懂得珍惜你的人。"
  },
  {
    minScore: 67,
    maxScore: 86,
    titleEn: "Deeply Linked",
    titleZh: "绝对理想型",
    descriptionEn: "In your eyes, he perfectly fits your vision of a partner. You admire his personality, cherish the moments you spend together, and find yourself subconsciously planning a future with him. You miss him when he's away, and your world brightens the moment he appears. This attraction is real, intense, and it fills your daily life with a beautiful sense of anticipation.",
    descriptionZh: "在你心中，他几乎符合你对另一半的所有想象。你欣赏他的性格，喜欢和他在一起的感觉，甚至开始不自觉地幻想两个人的未来。当他不在身边的时候，你会想念；当他出现的时候，你的世界仿佛都明亮了起来。这份心动是真实而热烈的，它让你的生活都变得更加有期待感。",
    adviceEn: "Your feelings run deep and aren't just a fleeting impulse. If you're hesitating about confessing, why not start by creating more opportunities to be together? Let him feel your warmth. Sometimes destiny just needs a little courage to unfold. May you write a beautiful story together.",
    adviceZh: "你对他的喜欢程度已经相当深了，这种感觉不是一时冲动，而是经过了时间的沉淀。如果你还在犹豫要不要表白，不如先试着创造更多相处的机会，让他也能感受到你的心意。缘分有时候需要一点点勇气来推动，愿你们能有一个美好的故事。"
  },
  {
    minScore: 47,
    maxScore: 66,
    titleEn: "Crushing Hard",
    titleZh: "小鹿乱撞",
    descriptionEn: "Every time you see him, you get butterflies in your stomach. You can't help but check his social updates, a single message from him can make your day, and you catch yourself daydreaming about scenarios together. This sweet, nervous excitement is the hallmark of a budding romance. While you may not be 100% sure yet, he has undeniably claimed a special spot in your heart.",
    descriptionZh: "每次见到他，你的心就像有一只小鹿在乱撞。你会忍不住关注他的动态，会因为他的一条消息而开心一整天，也会偶尔幻想和他一起做很多事情。这种甜甜的心动感，就是恋爱最初萌芽的样子。虽然你可能还没有完全确定自己的心意，但毫无疑问，他在你心里已经占据了一个特别的位置。",
    adviceEn: "You are in the golden phase of a crush—enjoy the mystery and the thrill! There's no rush to define the relationship immediately. Chat more, get to know the real him, and see if your feelings deepen over time. If it's true love, time will give you the answer you seek.",
    adviceZh: "正处于心动阶段的你，拥有的是最美好的暧昧期感觉。不必着急确认关系，好好享受这种小鹿乱撞的感觉吧。多和他聊聊天，多了解他这个人，看看随着时间推移，你的感觉会不会越来越深。如果是真爱，时间会给你答案。"
  },
  {
    minScore: 27,
    maxScore: 46,
    titleEn: "Just Friends",
    titleZh: "云淡风轻",
    descriptionEn: "You think he's a great guy and you feel comfortable around him, but the spark of romance seems a bit dim. You might appreciate his qualities and think of him occasionally, but he hasn't truly unlocked your heart yet. It feels more like a fond friendship—somewhere in the gray area between platonic and romantic. One step forward is ambiguity, one step back is friendship.",
    descriptionZh: "你觉得他还不错，和他相处也挺舒服的，但要说心动，似乎还差那么一点火候。你可能会欣赏他的某些优点，偶尔也会想起他，但他还没有真正走进你的心里。这种感觉更像是一种淡淡的好感，介于朋友和恋人之间的灰色地带，进一步是暧昧，退一步是友情。",
    adviceEn: "No need to rush into labeling this connection. Some feelings take time to brew. If you're curious, keep interacting and see if a deeper bond forms. But if the spark never comes, that's okay too—you've gained a valuable friend. Let things flow naturally.",
    adviceZh: "不用着急给这段关系下定义，有些感情需要时间来培养。如果你对他有一点好奇心，不妨多接触看看，说不定深入了解之后会有不一样的感觉。但如果你发现他始终无法让你心动，那也没关系，至少你多了一个值得交往的朋友。感情的事情，顺其自然就好。"
  },
  {
    minScore: 0,
    maxScore: 26,
    titleEn: "Not Interested",
    titleZh: "一时脑热",
    descriptionEn: "Based on your answers, your interest in him seems to be a fleeting curiosity rather than deep affection. Perhaps a specific moment caught your eye, or peer pressure made you think you liked him. True love is a persistent, deep-seated care, not just a passing thought.",
    descriptionZh: "根据你的回答来看，你对他的感觉可能只是暂时的好奇或者欣赏，并没有达到真正心动的程度。也许是因为他某个瞬间吸引了你的注意，或者只是周围人的起哄让你产生了错觉。真正的喜欢应该是持续的、深入骨髓的牵挂，而不是偶尔闪过的念头。",
    adviceEn: "It's good to be clear about your feelings. Don't force yourself to like someone just because you're lonely or because others say you're a good match. When real love comes, you'll fall without trying. For now, focus on loving yourself and growing—the right person is worth the wait.",
    adviceZh: "能够清醒地认识到自己的感情状态，其实是一件好事。不要因为孤单就勉强自己喜欢一个人，也不要因为别人说你们很配就强迫自己心动。真正的爱情来临时，你会不由自主地沦陷。现在的你，不如把更多时间放在自己身上，提升自己，等待那个真正让你怦然心动的人出现。"
  }
];
