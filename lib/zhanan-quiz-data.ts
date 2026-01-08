// 渣男辨别力测试 - 完整题目数据
// 来源: https://www.arealme.com/zhananquiz/cn/

export interface ZhananAnswer {
    text: string;
    score: number;
    jumpTo?: number; // 跳转到指定题目
    isZhanan?: boolean; // 多选题中是否为渣男行为
}

export interface ZhananQuestion {
    id: number;
    question: string;
    isMultiSelect: boolean;
    answers: ZhananAnswer[];
    correctAnswer?: string;  // 多选题正确答案，如 "110100"
    fullScore?: number;      // 多选题满分，如 10
}

export interface ZhananResult {
    minScore: number;
    title: string;
    description: string;
}

// 7个结果等级
export const zhananResults: ZhananResult[] = [
    { minScore: 100, title: "渣男毁灭者", description: "渣男见到你唯恐避之不及，你的存在是他们的噩梦" },
    { minScore: 90, title: "渣男氪金眼", description: "任何渣男都逃不过你的法眼，他们在你眼里无处遁形" },
    { minScore: 80, title: "渣男躲避机", description: "你能轻松识别大多数渣男的套路，但极偶尔会被渣男套路" },
    { minScore: 70, title: "渣男摇摆人", description: "你会对渣男的行为有所怀疑，但又不敢100%确定，有时容易陷入渣男的套路" },
    { minScore: 60, title: "清纯小可爱", description: "你的感情经历中一半是渣男，但你的单纯善良有时候会让渣男不忍下手" },
    { minScore: 50, title: "渣男收割机", description: "你的感情经历几乎都是被渣男套路的故事，你深受渣男伤害却又无可奈何" },
    { minScore: -Infinity, title: "懵懂傻白甜", description: "你根本无力辨别渣男的套路，只能默默忍受他们的玩弄" },
];

// 获取结果
export function getZhananResult(score: number): ZhananResult {
    for (const result of zhananResults) {
        if (score >= result.minScore) {
            return result;
        }
    }
    return zhananResults[zhananResults.length - 1];
}

// 完整的20道题目
export const zhananQuestions: ZhananQuestion[] = [
    {
        id: 1,
        question: "在众多追求你的男生中，你选择了阿豪为男朋友，和他正式在一起了，他最有可能是：",
        isMultiSelect: false,
        answers: [
            { text: "虽然颜值不算高还有点笨手笨脚，但对你温柔体贴，无微不至", score: 6 },
            { text: "高富帅，社团和学生会的风云人物，在整个年级甚至全校都小有名气", score: 1 },
            { text: "文艺男，不仅会很多乐器，唱歌还非常好听，非常吸引你", score: 2 },
        ],
    },
    {
        id: 2,
        question: "你和阿豪在一起一个多月后的某一天，你正在上晚课，他突然发微信说特别想你，想马上见到你，他会：",
        isMultiSelect: false,
        answers: [
            { text: "直接来教室里和你一起上课", score: 6 },
            { text: "到教室外等你，直到你下课", score: 0 },
            { text: "请求你翘课和他见面", score: 1 },
        ],
    },
    {
        id: 3,
        question: "见到阿豪后，他意外的送了你一个礼物，这个礼物最有可能是：",
        isMultiSelect: false,
        answers: [
            { text: "他连续做好几晚才完成的手作", score: 2 },
            { text: "你很久之前无意提起想要的某个小物件", score: 1 },
            { text: "他攒钱很久给你买的包包", score: 6 },
        ],
    },
    {
        id: 4,
        question: "你收下了阿豪的礼物，此时他提出一起去学校门口的清吧坐坐，他的目的是：",
        isMultiSelect: false,
        answers: [
            { text: "想和你单独相处", score: 0 },
            { text: "想拖延时间在外面住", score: 6 },
            { text: "探探口风，看是不是可以更进一步，然后随机应变", score: 1 },
        ],
    },
    {
        id: 5,
        question: "在清吧，你觉得阿豪会跟你聊些什么？",
        isMultiSelect: true,
        correctAnswer: "110100",  // 选中1,2,4
        fullScore: 10,
        answers: [
            { text: "他曾经伤害过别的女孩", score: 1, isZhanan: true },
            { text: "袒露他的家庭背景", score: 1, isZhanan: true },
            { text: "吐槽前女友是个渣女", score: 0, isZhanan: false },
            { text: "表达他对你深深的爱", score: 1, isZhanan: true },
            { text: "自己大学期间的计划", score: 0, isZhanan: false },
            { text: "他最近看的某部电影或某本书", score: 0, isZhanan: false },
        ],
    },
    {
        id: 6,
        question: "阿豪突然提出不想回宿舍了，想和你一起去附近的酒店住，你会：",
        isMultiSelect: false,
        answers: [
            { text: "勉强同意，既然都已经是男女朋友了，好像不应该拒绝", score: 2, jumpTo: 7 },
            { text: "借口拒绝，虽然都是男女朋友了，但还是有点太快了", score: 4, jumpTo: 9 },
        ],
    },
    {
        id: 7,
        question: "跟阿豪一起去酒店后，你觉得他会？",
        isMultiSelect: false,
        answers: [
            { text: "循序渐进，慢慢入戏", score: 2 },
            { text: "一把推倒，霸道总裁", score: 0 },
            { text: "顺其自然，不会强求", score: 6 },
        ],
    },
    {
        id: 8,
        question: "第二天一早，你们各自回去了，在此之后，你觉得阿豪会以什么态度对待你?",
        isMultiSelect: true,
        correctAnswer: "1111011",  // 选中1,2,3,4,6,7
        fullScore: 10,
        answers: [
            { text: "态度还是一如既往的温柔体贴", score: 1, isZhanan: true },
            { text: "有事不像以往那么招之即来了", score: 1, isZhanan: true },
            { text: "约会地点变成了日租房和酒店", score: 1, isZhanan: true },
            { text: "情话变少了", score: 1, isZhanan: true },
            { text: "态度突然变冷漠了", score: 0, isZhanan: false },
            { text: "回微信的时间变长了", score: 1, isZhanan: true },
            { text: "有时会给其他女生的朋友圈点赞", score: 1, isZhanan: true },
        ],
    },
    {
        id: 9,
        question: "一段时间以后，你渐渐发现阿豪没有当初那么热情了，很少主动联系，也很少约你出去玩了，你问他为什么会这样，他的回答是：",
        isMultiSelect: false,
        answers: [
            { text: "宝贝对不起，我最近只是社团比较忙，冷落了你", score: 0 },
            { text: "最近我遇到点烦心的事情", score: 1 },
            { text: "我觉得我们之间出了点问题", score: 6 },
        ],
    },
    {
        id: 10,
        question: "你提到是不是因为上次被你拒绝的事情，阿豪的回答可能会是：",
        isMultiSelect: true,
        correctAnswer: "001111",  // 选中3,4,5,6
        fullScore: 10,
        answers: [
            { text: "不是啊，我对那件事并不是很介意", score: 0, isZhanan: false },
            { text: "爱不应该遮遮掩掩", score: 0, isZhanan: false },
            { text: "我觉得你不肯给说明你对我并不真心", score: 1, isZhanan: true },
            { text: "没有，我只是觉得是自己太冒失了", score: 1, isZhanan: true },
            { text: "我不是只想和你去酒店，但我觉得相爱就要把自己的全部给对方", score: 1, isZhanan: true },
            { text: "我太爱你了，有时候会控制不住我自己", score: 1, isZhanan: true },
        ],
    },
    {
        id: 11,
        question: "经过深入交流，你们的关系有所恢复，但某天一起吃饭的时候，你瞟到舍友阿青的头像出现在阿豪的微信聊天页面，你问他在跟谁聊天，他会：",
        isMultiSelect: false,
        answers: [
            { text: "遮遮掩掩，避重就轻", score: 0 },
            { text: "告诉你没谁，你别多想", score: 2 },
            { text: "拿手机给你看，甩锅给阿青", score: 6 },
        ],
    },
    {
        id: 12,
        question: "鉴于阿豪的这种行为，你决定和他先分开一段时间好好想想，你觉得这段时间他会：",
        isMultiSelect: false,
        answers: [
            { text: "基本不联系，偶尔发一两条微信", score: 1 },
            { text: "分开两三天后就来找你，想要复合", score: 6 },
            { text: "彻底失联，不闻不问", score: 0 },
        ],
    },
    {
        id: 13,
        question: "你在宿舍和阿青诉苦，想要通过她侧面了解阿豪的情况，但你她正在和阿豪聊微信，阿豪最有可能跟阿青说的话是：",
        isMultiSelect: false,
        answers: [
            { text: "她只是长得好看的花瓶而已，你才是我想要的有趣的灵魂", score: 1 },
            { text: "我从来都没有真正喜欢过她", score: 1 },
            { text: "她根本满足不了我", score: 6 },
        ],
    },
    {
        id: 14,
        question: "阿豪的舍友阿P突然加你微信，你觉得他的目的会是：",
        isMultiSelect: false,
        answers: [
            { text: "想要帮阿豪挽回你", score: 0 },
            { text: "看你和阿豪闹别扭，想要见缝插针", score: 6 },
            { text: "跟阿豪要来你的微信，想要通过你追求另一个舍友阿薇", score: 1 },
        ],
    },
    {
        id: 15,
        question: "你通过了阿P的好友申请，他跟你说阿豪这两天身体不舒服，打算下午要去医院看看，劝你去医院陪陪他，你去了医院，看到了下面哪个场景：",
        isMultiSelect: false,
        answers: [
            { text: "阿豪一只手搂着阿青，在陪阿青挂号", score: 4, jumpTo: 16 },
            { text: "阿P独自在挂号机前排队，神情恍惚", score: 2, jumpTo: 18 },
        ],
    },
    {
        id: 16,
        question: "你冲上前去质问阿豪，阿豪会是什么反应?",
        isMultiSelect: false,
        answers: [
            { text: "抓着你跟你解释他们只是偶遇，他只是帮助阿青挂号而已", score: 1 },
            { text: "让你冷静一下，告诉你他其实喜欢的是阿青", score: 6 },
        ],
    },
    {
        id: 17,
        question: "你无论如何都无法接受眼前这一幕，愤然提出分手，你觉得阿豪会怎么做？",
        isMultiSelect: false,
        answers: [
            { text: "淡淡的回复：好", score: 6, jumpTo: 20 },
            { text: "泪如雨下，跪求原谅", score: 0, jumpTo: 20 },
            { text: "不同意分手，让你回去先冷静一下", score: 1, jumpTo: 20 },
        ],
    },
    {
        id: 18,
        question: "你走上前去询问阿P什么情况，阿P的回答是：",
        isMultiSelect: false,
        answers: [
            { text: "阿豪是个渣男，他对你根本不是真的，我才是真正喜欢你的人", score: 6 },
            { text: "看到你和阿豪分手了，我想要追求你才找借口约你出来", score: 1 },
        ],
    },
    {
        id: 19,
        question: "面对阿P的追求，你犹豫了，你觉得阿豪不可能不知道这事，事情的真相可能是：",
        isMultiSelect: false,
        answers: [
            { text: "阿豪对你没感觉了，而阿P一直喜欢你，阿豪正好借坡下驴", score: 1, jumpTo: 20 },
            { text: "阿豪从来没有真心喜欢过你，只是想帮助内向的阿P了解你", score: 6, jumpTo: 20 },
            { text: "阿豪迫于阿P的压力与你分手", score: 0, jumpTo: 20 },
        ],
    },
    {
        id: 20,
        question: "回想起过往的甜蜜和阿豪的温柔，你还是无法释怀，主动约阿豪出来聊聊，你觉得他会说：",
        isMultiSelect: false,
        answers: [
            { text: "过去这段时间是我做的不好，但我还是喜欢你", score: 2 },
            { text: "告诉你我们都不是过去的我们了，再也回不去了", score: 1 },
            { text: "一起回忆你们的过往，告诉你他一直都没有变", score: 6 },
        ],
    },
];

// 获取下一题ID（考虑分支逻辑）
// 原网站流程:
// Q1→Q2→Q3→Q4→Q5(多选)→Q6
//   Q6选1→Q7→Q8(多选)→Q11
//   Q6选2→Q9→Q10(多选)→Q11
// Q11→Q12→Q13→Q14→Q15
//   Q15选1→Q16→Q17→Q20
//   Q15选2→Q18→Q19→Q20
export function getNextQuestionId(currentId: number, selectedAnswer?: ZhananAnswer): number | null {
    // 如果选项有jumpTo，直接跳转
    if (selectedAnswer?.jumpTo) {
        return selectedAnswer.jumpTo;
    }

    // 正常流程
    const currentQuestion = zhananQuestions.find(q => q.id === currentId);
    if (!currentQuestion) return null;

    // 多选题跳转处理
    // Q8 (多选) → Q11
    if (currentId === 8) {
        return 11;
    }

    // Q10 (多选) → Q11
    if (currentId === 10) {
        return 11;
    }

    // 最后一题
    if (currentId === 20) {
        return null;
    }

    // 默认下一题
    const nextId = currentId + 1;
    const nextQuestion = zhananQuestions.find(q => q.id === nextId);
    return nextQuestion ? nextId : null;
}

// 获取题目总数（用于进度条，不包括跳过的题目）
export function getQuestionCount(): number {
    return zhananQuestions.length;
}
