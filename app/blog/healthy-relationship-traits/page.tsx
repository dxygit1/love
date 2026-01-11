"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function HealthyRelationshipTraitsPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="健康恋爱关系的7个特征"
                titleEn="7 Traits of a Healthy Relationship"
                date="2025-01-06"
                readTime="7"
            >
                <p>
                    What does a healthy relationship actually look like? With so many dysfunctional dynamics
                    normalized in media and society, it can be hard to know. Here are seven characteristics
                    that distinguish thriving relationships from struggling ones.
                </p>

                <h2>1. Mutual Respect</h2>
                <p>
                    Respect is the foundation of any healthy relationship. This means valuing each other's
                    opinions, boundaries, time, and individuality—even when you disagree. Partners who
                    respect each other don't belittle, mock, or dismiss one another.
                </p>

                <h2>2. Open and Honest Communication</h2>
                <p>
                    Healthy couples can talk about anything—good news, problems, fears, and dreams. They
                    express their needs clearly and listen actively. Importantly, they can disagree
                    without it turning into a fight.
                </p>

                <h2>3. Trust and Security</h2>
                <p>
                    Trust isn't just about fidelity. It's about feeling secure that your partner has your
                    best interests at heart, that they'll follow through on commitments, and that you can
                    be vulnerable without fear.
                </p>

                <h2>4. Maintained Individuality</h2>
                <p>
                    Healthy couples don't merge into one identity. Each person maintains their own friends,
                    hobbies, goals, and sense of self. The relationship enhances their lives without
                    consuming them.
                </p>

                <h2>5. Equal Partnership</h2>
                <p>
                    Decision-making is shared. Neither person dominates or controls. There's give-and-take,
                    and both partners' voices carry equal weight. Power imbalances are red flags.
                </p>

                <h2>6. Constructive Conflict Resolution</h2>
                <p>
                    All couples disagree. What matters is how they handle it. Healthy couples fight fair—no
                    name-calling, stonewalling, or bringing up old grievances. They focus on solving the
                    problem, not winning the argument.
                </p>

                <h2>7. Genuine Support</h2>
                <p>
                    Partners in healthy relationships champion each other's success. They're your biggest
                    fans, offering encouragement during challenges and celebrating your wins as if they
                    were their own.
                </p>

                <blockquote>
                    <p>
                        "A great relationship is about two things: first, appreciating the similarities,
                        and second, respecting the differences."
                    </p>
                </blockquote>

                <h2>Self-Check: How Does Your Relationship Measure Up?</h2>
                <p>
                    If your relationship lacks several of these traits, it's worth having an honest
                    conversation with your partner. Many issues can be worked on together, especially
                    with effort and sometimes professional guidance.
                </p>

                <p>
                    Want to explore your relationship dynamics? Try our{" "}
                    <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                        Love Compatibility Quiz
                    </Link>{" "}
                    for more insights.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="健康恋爱关系的7个特征"
            titleEn="7 Traits of a Healthy Relationship"
            date="2025-01-06"
            readTime="7"
        >
            <p>
                健康的恋爱关系到底是什么样的？在很多不健康的相处模式被影视剧和社会"正常化"的今天，
                很多人其实并不清楚。这7个特征可以帮你判断你们的感情是否处于良好状态。
            </p>

            <h2>1. 相互尊重</h2>
            <p>
                尊重是健康关系的基石。这意味着重视对方的意见、边界、时间和个性——即使你们意见不同。
                互相尊重的伴侣不会贬低、嘲笑或无视对方。
            </p>
            <p>
                <strong>表现：</strong>即使吵架也不会人身攻击，尊重对方的决定和空间，认真听对方说话。
            </p>

            <h2>2. 开放诚实的沟通</h2>
            <p>
                健康的情侣什么都能聊——好消息、问题、恐惧、梦想。他们能清楚地表达自己的需求，
                也能积极地倾听对方。重要的是，意见不同时不会演变成争吵。
            </p>
            <p>
                <strong>表现：</strong>有话直说不憋着，能够讨论敏感话题，会说"我需要…"而不是指责对方。
            </p>

            <h2>3. 信任和安全感</h2>
            <p>
                信任不仅仅是关于忠诚。它还关乎你是否相信对方会考虑你的利益、会兑现承诺、
                能让你安心地展示脆弱而不用担心被伤害。
            </p>
            <p>
                <strong>表现：</strong>不需要查手机，可以安心分开，相信对方说的话。
            </p>

            <h2>4. 保持独立性</h2>
            <p>
                健康的情侣不会融合成一个人。每个人都保持自己的朋友圈、爱好、目标和自我意识。
                恋爱关系丰富了他们的生活，但不会吞噬他们。
            </p>
            <p>
                <strong>表现：</strong>有各自的朋友和活动，支持对方的个人发展，不是"我们"取代了"我"。
            </p>

            <h2>5. 平等的伙伴关系</h2>
            <p>
                决策是共同做出的。没有一方主导或控制一切。有付出也有收获，两个人的声音同等重要。
                权力失衡是危险信号。
            </p>
            <p>
                <strong>表现：</strong>大事一起商量，不会有人"说了算"，经济和家务等责任合理分担。
            </p>

            <h2>6. 建设性地解决冲突</h2>
            <p>
                再恩爱的情侣也会有分歧。关键是怎么处理。健康的情侣吵架有底线——不人身攻击、
                不冷暴力、不翻旧账。他们专注于解决问题，而不是赢得争吵。
            </p>
            <p>
                <strong>表现：</strong>吵完架能和好，会道歉也会原谅，问题能得到真正解决。
            </p>

            <h2>7. 真诚的支持</h2>
            <p>
                健康关系中的伴侣会为对方的成功欢呼。他们是你最大的粉丝，在困难时给你鼓励，
                在你成功时像自己成功一样开心。
            </p>
            <p>
                <strong>表现：</strong>分享喜悦和困难，为对方的成就骄傲，在低谷时不离不弃。
            </p>

            <blockquote>
                <p>
                    "好的关系有两个关键：一是欣赏相似之处，二是尊重不同之处。"
                </p>
            </blockquote>

            <h2>自我检测：你的感情符合多少条？</h2>
            <p>
                如果你的感情缺少好几条特征，值得和对方进行一次坦诚的对话。很多问题是可以一起努力改善的，
                必要时可以寻求专业咨询帮助。
            </p>

            <p>
                想探索你们的感情状态？试试我们的
                <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                    恋爱测试
                </Link>
                ，获得更多洞察。
            </p>
        </BlogLayout>
    );
}
