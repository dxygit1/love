// 性取向测试题目数据
// 维度: A=同性恋, B=双性恋, C=异性恋
// 分数规则: 字母+数字，如A1表示同性恋+1分

export interface GayQuizOption {
    text: string;
    textEn: string;
    value: string;  // A1, B2, C3等
    dimension: 'A' | 'B' | 'C';
    score: number;
}

export interface GayQuizQuestion {
    id: number;
    question: string;
    questionEn: string;
    options: GayQuizOption[];
}

export interface GayDimension {
    key: string;
    name: string;
    nameEn: string;
    color: string;
    emoji: string;
}

export const gayDimensions: GayDimension[] = [
    { key: 'A', name: '同性恋', nameEn: 'Homosexual', color: '#EF6662', emoji: '🏳️‍🌈' },
    { key: 'B', name: '双性恋', nameEn: 'Bisexual', color: '#FFE53E', emoji: '💜' },
    { key: 'C', name: '异性恋', nameEn: 'Heterosexual', color: '#81BFCE', emoji: '💙' },
];

export const gayQuizQuestions: GayQuizQuestion[] = [
    {
        id: 1,
        question: '你为什么要做这个测试？',
        questionEn: 'Why are you taking this test?',
        options: [
            { text: '测测我有多"弯"', textEn: 'To see how "gay" I am', value: 'A1', dimension: 'A', score: 1 },
            { text: '确认我是"直"的', textEn: 'To confirm I\'m straight', value: 'B2', dimension: 'B', score: 2 },
            { text: '就是测着玩', textEn: 'Just for fun', value: 'C3', dimension: 'C', score: 3 },
            { text: '有时我确实对同性有些兴趣', textEn: 'Sometimes I\'m interested in same sex', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
    {
        id: 2,
        question: '你是否曾经盯着一个同性一直看，感觉到被TA吸引？',
        questionEn: 'Have you ever stared at someone of the same sex and felt attracted?',
        options: [
            { text: '是的，我所有的暗恋对象都是同性', textEn: 'Yes, all my crushes are same-sex', value: 'A1', dimension: 'A', score: 1 },
            { text: '有时候是，但我对异性同样充满兴趣', textEn: 'Sometimes, but I\'m equally interested in opposite sex', value: 'B2', dimension: 'B', score: 2 },
            { text: '从来没有，我根本不是同性恋', textEn: 'Never, I\'m not gay at all', value: 'C3', dimension: 'C', score: 3 },
            { text: '很少，但也有那么一两次我确实对同性产生了兴趣', textEn: 'Rarely, but once or twice I was interested', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
    {
        id: 3,
        question: '如果你最好的朋友向你坦白TA是同性恋，你会：',
        questionEn: 'If your best friend confesses they\'re gay, you would:',
        options: [
            { text: '非常高兴，告诉TA我们是一样的人', textEn: 'Very happy, tell them we\'re the same', value: 'A1', dimension: 'A', score: 1 },
            { text: '感到很兴奋，甚至想挑逗一下TA', textEn: 'Excited, even want to flirt with them', value: 'B2', dimension: 'B', score: 2 },
            { text: '跟TA说你别开玩笑了', textEn: 'Tell them to stop joking', value: 'C3', dimension: 'C', score: 3 },
            { text: '告诉TA你有时候也会被同性吸引', textEn: 'Tell them you\'re sometimes attracted to same sex too', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
    {
        id: 4,
        question: '你曾经穿过或者幻想过穿着异性的衣服吗？',
        questionEn: 'Have you ever worn or fantasized about wearing opposite sex clothes?',
        options: [
            { text: '一直都有', textEn: 'Always', value: 'A1', dimension: 'A', score: 1 },
            { text: '有时候会，但在公共场合绝对不会', textEn: 'Sometimes, but never in public', value: 'B2', dimension: 'B', score: 2 },
            { text: '从来没有', textEn: 'Never', value: 'C3', dimension: 'C', score: 3 },
            { text: '很少，但有时候我也会穿着另一半的衣服出去', textEn: 'Rarely, but sometimes I wear my partner\'s clothes', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
    {
        id: 5,
        question: '你针对同性的性幻想或性梦有多频繁？',
        questionEn: 'How often do you have same-sex fantasies or dreams?',
        options: [
            { text: '我所有的梦都与同性性幻想有关', textEn: 'All my dreams involve same-sex fantasies', value: 'A1', dimension: 'A', score: 1 },
            { text: '绝大多数都是', textEn: 'Most of them', value: 'B2', dimension: 'B', score: 2 },
            { text: '从来没有', textEn: 'Never', value: 'C3', dimension: 'C', score: 3 },
            { text: '很少', textEn: 'Rarely', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
    {
        id: 6,
        question: '如果世界上除了某个同性之外，所有人都消失了，你会：',
        questionEn: 'If everyone disappeared except one same-sex person, you would:',
        options: [
            { text: '感到很开心，因为再也没有人会跟我抢我的TA（同性）了', textEn: 'Feel happy, no one to compete for them', value: 'A1', dimension: 'A', score: 1 },
            { text: '感到很失落，因为再也没有另一半异性存在了', textEn: 'Feel sad, no opposite sex exists anymore', value: 'B2', dimension: 'B', score: 2 },
            { text: '感到绝望，因为再也没有办法拥有爱情了', textEn: 'Feel desperate, no way to have love anymore', value: 'C3', dimension: 'C', score: 3 },
        ],
    },
    {
        id: 7,
        question: '你曾经亲吻过别的同性吗?',
        questionEn: 'Have you ever kissed someone of the same sex?',
        options: [
            { text: '是的，有过很多很多次', textEn: 'Yes, many many times', value: 'A1', dimension: 'A', score: 1 },
            { text: '也就有过一两次', textEn: 'Just once or twice', value: 'B2', dimension: 'B', score: 2 },
            { text: '我根本不可能做这种事', textEn: 'I would never do that', value: 'C3', dimension: 'C', score: 3 },
            { text: '我只是喜欢亲吻他人，不论什么性别', textEn: 'I just like kissing people regardless of gender', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
    {
        id: 8,
        question: '你能接受和同性同床共枕吗？',
        questionEn: 'Can you accept sharing a bed with someone of the same sex?',
        options: [
            { text: '心中窃喜，当然可以', textEn: 'Secretly happy, of course', value: 'A1', dimension: 'A', score: 1 },
            { text: '虽然会感到一丝尴尬，但也不会排斥', textEn: 'A bit awkward, but not opposed', value: 'B2', dimension: 'B', score: 2 },
            { text: '绝不能接受，我只喜欢异性', textEn: 'Absolutely not, I only like opposite sex', value: 'C3', dimension: 'C', score: 3 },
            { text: '这件事上我并不是很在乎性别', textEn: 'I don\'t really care about gender in this matter', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
    {
        id: 9,
        question: '如果你有一个同事/同学是同性恋，并且疯狂暗示你，你会：',
        questionEn: 'If a gay colleague/classmate hints at you crazily, you would:',
        options: [
            { text: '太好乐，就喜欢这种暧昧的感觉', textEn: 'Love it, enjoy the ambiguous feeling', value: 'A1', dimension: 'A', score: 1 },
            { text: '可能会觉得很有意思，不过也得看情况', textEn: 'Might find it interesting, depends on situation', value: 'B2', dimension: 'B', score: 2 },
            { text: '我会感到尴尬不已', textEn: 'I would feel very awkward', value: 'C3', dimension: 'C', score: 3 },
        ],
    },
    {
        id: 10,
        question: '你的朋友决定去一个同性恋酒吧聚会，你会:',
        questionEn: 'If your friends decide to go to a gay bar, you would:',
        options: [
            { text: '欣然前往，开心不已', textEn: 'Gladly go, very happy', value: 'A1', dimension: 'A', score: 1 },
            { text: '因为能打卡一个新场所而感到兴奋', textEn: 'Excited to check out a new place', value: 'B2', dimension: 'B', score: 2 },
            { text: '感到尴尬且别扭', textEn: 'Feel awkward and uncomfortable', value: 'C3', dimension: 'C', score: 3 },
            { text: '暗暗窃喜，终于有人陪我一起去了', textEn: 'Secretly happy, finally someone to go with me', value: 'B2', dimension: 'B', score: 2 },
        ],
    },
];

// 计算维度分数
export function calculateGayScores(answers: number[]): Record<string, number> {
    const scores: Record<string, number> = { A: 0, B: 0, C: 0 };

    answers.forEach((answerIndex, questionIndex) => {
        if (questionIndex < gayQuizQuestions.length && answerIndex >= 0) {
            const question = gayQuizQuestions[questionIndex];
            if (answerIndex < question.options.length) {
                const option = question.options[answerIndex];
                scores[option.dimension] += option.score;
            }
        }
    });

    return scores;
}

// 获取主导取向
export function getDominantOrientation(scores: Record<string, number>): GayDimension {
    const maxKey = Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    return gayDimensions.find(d => d.key === maxKey) || gayDimensions[0];
}
