// 欲望组成图测试 - 来自 arealme.com 的真实数据
// 12道题目，选项数量3-7个不等
// 8个维度：食物(A)、色性(B)、自由(C)、金钱(D)、感情(E)、名望(F)、权力(G)、外貌(H)

export type DesireDimension = 'food' | 'sex' | 'freedom' | 'money' | 'emotion' | 'fame' | 'power' | 'appearance';

export interface DesireOption {
    id: string;
    textZh: string;
    textEn: string;
    dimension: DesireDimension;
    score: number;
}

export interface DesireQuestion {
    id: number;
    textZh: string;
    textEn: string;
    options: DesireOption[];
}

export interface DimensionInfo {
    key: DesireDimension;
    nameZh: string;
    nameEn: string;
    color: string;
    emoji: string;
    descriptionZh: string;
    descriptionEn: string;
    adviceZh: string;
    adviceEn: string;
}

// 维度信息定义 - 8个维度（颜色来自原网站）
export const dimensionInfos: DimensionInfo[] = [
    {
        key: 'food',
        nameZh: '食物',
        nameEn: 'Food',
        color: '#9BC53D', // A - 绿色
        emoji: '🍔',
        descriptionZh: '你是一个懂得享受生活的美食家。对你来说，美食不仅仅是填饱肚子，更是生活中不可或缺的幸福来源。你相信"民以食为天"，一顿美味的饭菜能治愈一切烦恼。',
        descriptionEn: 'You are a foodie who truly knows how to enjoy life. For you, food is not just about filling your stomach, but an essential source of happiness.',
        adviceZh: '享受美食的同时也要注意健康哦，毕竟好的身体才能吃更多美食！',
        adviceEn: 'While enjoying food, remember to stay healthy - after all, a healthy body can enjoy more delicious food!'
    },
    {
        key: 'sex',
        nameZh: '色性',
        nameEn: 'Passion',
        color: '#70C1B3', // B - 青色
        emoji: '💋',
        descriptionZh: '你对亲密关系和身体接触有着强烈的渴望。这是人类最原始的本能之一，你能够坦然面对自己的生理需求，追求身心合一的愉悦体验。',
        descriptionEn: 'You have a strong desire for intimate relationships and physical contact. This is one of the most primal human instincts.',
        adviceZh: '在追求亲密关系时，也要注重情感连接和相互尊重。',
        adviceEn: 'While pursuing intimacy, also focus on emotional connection and mutual respect.'
    },
    {
        key: 'freedom',
        nameZh: '自由',
        nameEn: 'Freedom',
        color: '#F25F5C', // C - 红色
        emoji: '🕊️',
        descriptionZh: '你渴望独立与自主，不受外界约束。你享受属于自己的空间和时间，喜欢按自己的节奏生活。对你来说，自由比什么都重要。',
        descriptionEn: 'You crave independence and autonomy, free from external constraints. You enjoy your own space and time, living at your own pace.',
        adviceZh: '自由固然可贵，但适当的责任和承诺也能带来安全感。',
        adviceEn: 'While freedom is precious, appropriate responsibilities and commitments can also bring security.'
    },
    {
        key: 'money',
        nameZh: '金钱',
        nameEn: 'Money',
        color: '#FFE066', // D - 黄色
        emoji: '💰',
        descriptionZh: '你是一个务实、有经济头脑的人。你深知金钱的重要性，它代表着安全感和选择的自由。你不是拜金，而是清醒地认识到：很多问题确实可以用钱解决。',
        descriptionEn: 'You are a practical person with financial acumen. You understand the importance of money - it represents security and freedom of choice.',
        adviceZh: '追求财富的同时，别忘了生活中还有很多金钱买不到的美好。',
        adviceEn: 'While pursuing wealth, don\'t forget the many beautiful things in life that money can\'t buy.'
    },
    {
        key: 'emotion',
        nameZh: '感情',
        nameEn: 'Emotion',
        color: '#247BA0', // E - 蓝色
        emoji: '💕',
        descriptionZh: '你非常重视人际关系和情感连接。朋友的陪伴、爱人的关怀、家人的温暖对你来说比什么都重要。你是一个感性的人，懂得用心经营每一段关系。',
        descriptionEn: 'You highly value interpersonal relationships and emotional connections. Companionship, care, and warmth from loved ones matter most to you.',
        adviceZh: '珍惜身边的人，但也别忘了留一些时间给自己。',
        adviceEn: 'Cherish the people around you, but don\'t forget to save some time for yourself.'
    },
    {
        key: 'fame',
        nameZh: '名望',
        nameEn: 'Fame',
        color: '#FE938C', // F - 粉色
        emoji: '⭐',
        descriptionZh: '你渴望被认可、被关注、被崇拜。你享受成为焦点的感觉，希望自己的才华和成就能够得到大众的认可。你有着强烈的表现欲和成就动机。',
        descriptionEn: 'You crave recognition, attention, and admiration. You enjoy being the center of attention and want your talents and achievements to be recognized.',
        adviceZh: '在追求名望时，保持初心，不要被虚名所累。',
        adviceEn: 'While pursuing fame, stay true to yourself and don\'t be burdened by vanity.'
    },
    {
        key: 'power',
        nameZh: '权力',
        nameEn: 'Power',
        color: '#50514F', // G - 灰色
        emoji: '👑',
        descriptionZh: '你是一个有野心、渴望掌控的领导者。你天生具有领导气质，喜欢主导局面而不是被动接受。你享受那种运筹帷幄、一切尽在掌握的感觉。',
        descriptionEn: 'You are an ambitious leader who craves control. You have natural leadership qualities and prefer to take charge rather than follow.',
        adviceZh: '权力带来责任，在追求影响力的同时也要学会倾听和包容。',
        adviceEn: 'Power brings responsibility. While pursuing influence, learn to listen and be inclusive.'
    },
    {
        key: 'appearance',
        nameZh: '外貌',
        nameEn: 'Appearance',
        color: '#F37736', // H - 橙色
        emoji: '✨',
        descriptionZh: '你是一个注重形象、追求美的人。你相信"爱美之心人皆有之"，并且身体力行。外表不仅是给别人看的，更是你自信的来源。',
        descriptionEn: 'You are someone who values image and pursues beauty. Appearance is not just for others - it\'s a source of your confidence.',
        adviceZh: '外在美固然重要，但内在的修养和气质才是持久的魅力。',
        adviceEn: 'While outer beauty matters, inner cultivation and temperament are the lasting charm.'
    }
];

// 获取维度信息
export const getDimensionInfo = (key: DesireDimension): DimensionInfo => {
    return dimensionInfos.find(d => d.key === key) || dimensionInfos[0];
};

// 12道测试题目 - 来自 arealme 真实数据（已校准维度和分值）
export const questions: DesireQuestion[] = [
    {
        id: 1,
        textZh: '如果要你用一种水果形容自己，你会选择：',
        textEn: 'If you were to describe yourself as a fruit, you would choose:',
        options: [
            { id: 'a', textZh: '西瓜', textEn: 'Watermelon', dimension: 'food', score: 2 },      // A2
            { id: 'b', textZh: '榴莲', textEn: 'Durian', dimension: 'money', score: 2 },         // D2
            { id: 'c', textZh: '香蕉', textEn: 'Banana', dimension: 'sex', score: 2 },           // B2
            { id: 'd', textZh: '草莓', textEn: 'Strawberry', dimension: 'emotion', score: 2 },   // E2
            { id: 'e', textZh: '水蜜桃', textEn: 'Peach', dimension: 'appearance', score: 2 },   // H2
            { id: 'f', textZh: '山竹', textEn: 'Mangosteen', dimension: 'fame', score: 2 },      // F2
            { id: 'g', textZh: '樱桃', textEn: 'Cherry', dimension: 'power', score: 2 }          // G2
        ]
    },
    {
        id: 2,
        textZh: '周末放假，你一般喜欢怎样度过？',
        textEn: 'How do you usually spend your weekends?',
        options: [
            { id: 'a', textZh: '宅在家，休息看视频打游戏', textEn: 'Stay home, rest, watch videos, play games', dimension: 'freedom', score: 1 },  // C1
            { id: 'b', textZh: '去喜欢的餐厅大吃一顿', textEn: 'Have a feast at favorite restaurant', dimension: 'food', score: 2 },               // A2
            { id: 'c', textZh: '去购物中心逛街，欣赏新款服饰和奢侈品', textEn: 'Go shopping, admire new clothes and luxury items', dimension: 'money', score: 2 },  // D2
            { id: 'd', textZh: '约朋友聚聚，一起聊聊天', textEn: 'Meet friends for a chat', dimension: 'emotion', score: 2 }                       // E2
        ]
    },
    {
        id: 3,
        textZh: '你受朋友邀请参加一个晚会，现场会有很多优秀的人，但是你大部分都不认识，你会选择？',
        textEn: 'You\'re invited to a party with many excellent people you don\'t know. You would:',
        options: [
            { id: 'a', textZh: '尽量跟不认识的人交流，扩展人脉资源', textEn: 'Try to network with strangers, expand connections', dimension: 'fame', score: 2 },     // F2
            { id: 'b', textZh: '请求让自己以司仪的角色参与，掌握晚会的流程', textEn: 'Ask to be the MC, control the party flow', dimension: 'power', score: 2 },    // G2
            { id: 'c', textZh: '整晚只跟熟悉的朋友一起', textEn: 'Stay with familiar friends all night', dimension: 'emotion', score: 2 },                          // E2
            { id: 'd', textZh: '孤身一人在角落徘徊，独享安静', textEn: 'Wander alone in a corner, enjoy solitude', dimension: 'freedom', score: 1 },                 // C1
            { id: 'e', textZh: '搭讪心仪的异性嘉宾，来一场浪漫的艳遇', textEn: 'Chat up attractive guests, seek romance', dimension: 'sex', score: 2 }               // B2
        ]
    },
    {
        id: 4,
        textZh: '你做饭的时候发现调料不够，需要外出购买，你会选择？',
        textEn: 'While cooking, you find you need more seasonings. You would:',
        options: [
            { id: 'a', textZh: '梳洗换衣服，打扮精致再出门', textEn: 'Freshen up and dress nicely before going out', dimension: 'appearance', score: 4 },  // H4
            { id: 'b', textZh: '简单整理仪容，换上外出的衣服出去', textEn: 'Quick tidy up, change clothes and go', dimension: 'appearance', score: 2 },     // H2
            { id: 'c', textZh: '直接以居家形象外出示人', textEn: 'Go out in home clothes as is', dimension: 'freedom', score: 1 }                           // C1
        ]
    },
    {
        id: 5,
        textZh: '你跟恋人同时竞争一个升职岗位，你会选择？',
        textEn: 'You and your partner are competing for the same promotion. You would:',
        options: [
            { id: 'a', textZh: '人前人后都拼尽全力，绝不退让', textEn: 'Give it your all, never back down', dimension: 'power', score: 4 },                        // G4
            { id: 'b', textZh: '表面用甜言蜜语安抚恋人，背地里暗暗努力', textEn: 'Sweet talk partner, secretly work hard', dimension: 'sex', score: 2 },            // B2
            { id: 'c', textZh: '认为两人很亲密，谁竞争成功都一样', textEn: 'Think we\'re close, whoever wins is fine', dimension: 'emotion', score: 2 },            // E2
            { id: 'd', textZh: '放弃私人准备时间，去帮助恋人提升，事后向同事宣扬', textEn: 'Give up prep time to help partner, brag to colleagues later', dimension: 'fame', score: 2 },  // F2
            { id: 'e', textZh: '对压力大的高职位不感兴趣，消极竞争', textEn: 'Not interested in high-pressure positions, compete passively', dimension: 'freedom', score: 2 }            // C2
        ]
    },
    {
        id: 6,
        textZh: '如果可以选择以下副业赚取可观数额的外快，你会选择从事哪一个？',
        textEn: 'If you could choose a side job for extra income, which would you pick?',
        options: [
            { id: 'a', textZh: '美食博主', textEn: 'Food blogger', dimension: 'food', score: 2 },                    // A2
            { id: 'b', textZh: '游戏主播', textEn: 'Gaming streamer', dimension: 'money', score: 2 },                // D2
            { id: 'c', textZh: '美妆试色博主', textEn: 'Beauty/makeup blogger', dimension: 'appearance', score: 2 }, // H2
            { id: 'd', textZh: '搞笑风视频解说员', textEn: 'Comedy video commentator', dimension: 'freedom', score: 1 },  // C1
            { id: 'e', textZh: '心灵鸡汤达人', textEn: 'Inspirational content creator', dimension: 'emotion', score: 2 }  // E2
        ]
    },
    {
        id: 7,
        textZh: '你的同学们决定组织一场旅行聚会，你会选择负责哪部分？',
        textEn: 'Your classmates are organizing a trip. Which part would you take charge of?',
        options: [
            { id: 'a', textZh: '领导组织整个行程，确定最终安排', textEn: 'Lead and organize the entire trip', dimension: 'power', score: 2 },                    // G2
            { id: 'b', textZh: '负责跟同学联系沟通，进行参与意愿和建议的收集', textEn: 'Contact classmates, collect participation wishes', dimension: 'fame', score: 2 },  // F2
            { id: 'c', textZh: '搜罗当地美食和住宿攻略', textEn: 'Research local food and accommodation', dimension: 'food', score: 2 },                         // A2
            { id: 'd', textZh: '根据资金情况，计划景点行程', textEn: 'Plan itinerary based on budget', dimension: 'money', score: 1 },                           // D1
            { id: 'e', textZh: '别人叫到就随缘参与，不会主动加入策划', textEn: 'Only join when called, won\'t actively participate', dimension: 'freedom', score: 2 }  // C2
        ]
    },
    {
        id: 8,
        textZh: '你获得一张万能电影票，可以观看一部目前上映的电影，你会选择看哪一部？',
        textEn: 'With a magic movie ticket, which movie would you choose?',
        options: [
            { id: 'a', textZh: '有尺度系数的激情文艺片', textEn: 'An artistic film with passionate scenes', dimension: 'sex', score: 4 },                     // B4
            { id: 'b', textZh: '以美食为主题的温馨故事片', textEn: 'A heartwarming food-themed movie', dimension: 'food', score: 2 },                          // A2
            { id: 'c', textZh: '不同阵营开展利益争夺的动作片', textEn: 'Action film about factions fighting for interests', dimension: 'money', score: 1 },    // D1
            { id: 'd', textZh: '关注知名作家成名史的故事片', textEn: 'Story about a famous author\'s rise to fame', dimension: 'fame', score: 2 },             // F2
            { id: 'e', textZh: '魔法王子成长为国王的动画片', textEn: 'Animation about a prince becoming king', dimension: 'power', score: 2 },                 // G2
            { id: 'f', textZh: '高颜值明星云集的大IP改编电影', textEn: 'A big IP movie with many good-looking stars', dimension: 'appearance', score: 2 }      // H2
        ]
    },
    {
        id: 9,
        textZh: '如果可以选择，你希望从事一份怎样的职业？',
        textEn: 'If you could choose, what kind of job would you prefer?',
        options: [
            { id: 'a', textZh: '事少离家近，但工资不高', textEn: 'Easy job, close to home, but low salary', dimension: 'freedom', score: 2 },           // C2
            { id: 'b', textZh: '天天加班全年无休，但收入可观', textEn: 'Overtime every day, no rest, but good income', dimension: 'money', score: 2 },  // D2
            { id: 'c', textZh: '月薪波动较大，但有很多粉丝跟支持者', textEn: 'Variable salary, but many fans and supporters', dimension: 'fame', score: 2 }  // F2
        ]
    },
    {
        id: 10,
        textZh: '如果你需要进入酒吧夜店等场所消费，你认为是什么原因？',
        textEn: 'If you need to go to bars or clubs, what would be the reason?',
        options: [
            { id: 'a', textZh: '生理需求，期待午夜的邂逅', textEn: 'Physical needs, hoping for a midnight encounter', dimension: 'sex', score: 2 },                // B2
            { id: 'b', textZh: '那里的音乐跟环境，能够让你感到快乐', textEn: 'The music and atmosphere make you happy', dimension: 'emotion', score: 2 },          // E2
            { id: 'c', textZh: '被朋友同事等人邀请，盛情难却', textEn: 'Invited by friends/colleagues, hard to refuse', dimension: 'fame', score: 2 },              // F2
            { id: 'd', textZh: '客户有特殊的环境喜好，在那里谈生意更容易成功', textEn: 'Clients prefer that environment for business', dimension: 'power', score: 2 },  // G2
            { id: 'e', textZh: '根本不可能出入，自己不喜欢的地方不会为任何东西妥协', textEn: 'Would never go, won\'t compromise for places I dislike', dimension: 'freedom', score: 2 }  // C2
        ]
    },
    {
        id: 11,
        textZh: '你认为，怎样的人最能够吸引你？',
        textEn: 'What kind of person attracts you the most?',
        options: [
            { id: 'a', textZh: '颜值高，身材好', textEn: 'Good-looking with great figure', dimension: 'appearance', score: 2 },             // H2
            { id: 'b', textZh: '性格好，易相处', textEn: 'Good personality, easy to get along with', dimension: 'emotion', score: 2 },      // E2
            { id: 'c', textZh: '很富有，资产丰厚', textEn: 'Very wealthy', dimension: 'money', score: 2 },                                   // D2
            { id: 'd', textZh: '技术好，经常创造生命大和谐', textEn: 'Skilled, often creates great harmony', dimension: 'sex', score: 2 },  // B2
            { id: 'e', textZh: '会洗衣服做饭，打理各种生活琐事', textEn: 'Can cook, clean, handle daily chores', dimension: 'food', score: 2 }  // A2
        ]
    },
    {
        id: 12,
        textZh: '有一个坚持一个月原生态素食，就能获得奖金的真人秀节目邀请你，你会去参加吗？',
        textEn: 'A reality show offers a prize for eating raw vegetarian food for a month. Would you join?',
        options: [
            { id: 'a', textZh: '会，因为有奖金', textEn: 'Yes, for the prize money', dimension: 'money', score: 2 },                          // D2
            { id: 'b', textZh: '会，因为能顺便减肥', textEn: 'Yes, can lose weight too', dimension: 'appearance', score: 2 },                 // H2
            { id: 'c', textZh: '不会，没肉吃受不了', textEn: 'No, can\'t live without meat', dimension: 'food', score: 2 },                   // A2
            { id: 'd', textZh: '不会，不喜欢把生活细节暴露给观众看', textEn: 'No, don\'t want to expose private life to viewers', dimension: 'freedom', score: 2 }  // C2
        ]
    }
];
