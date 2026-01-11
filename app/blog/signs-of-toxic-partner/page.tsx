"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function SignsOfToxicPartnerPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="如何识别渣男的10个信号"
                titleEn="10 Signs of a Toxic Partner"
                date="2025-01-10"
                readTime="8"
                coverImage="/blog-images/toxic-partner.png"
            >
                <p>
                    Toxic partners are masters of disguise. In the beginning, they may seem like the perfect match—charming,
                    attentive, and romantic. But over time, red flags start to emerge. Learning to recognize these warning
                    signs early can save you from emotional pain and wasted time.
                </p>

                <h2>1. Love Bombing</h2>
                <p>
                    They shower you with excessive attention, gifts, and declarations of love very early in the relationship.
                    While it feels flattering, this intensity often masks manipulative intentions. Healthy relationships
                    develop gradually, not at lightning speed.
                </p>

                <h2>2. Inconsistent Behavior</h2>
                <p>
                    One day they're incredibly sweet; the next, they're cold and distant. This hot-and-cold pattern keeps
                    you off-balance and constantly seeking their approval. Consistency is a hallmark of genuine love.
                </p>

                <h2>3. They Never Take Responsibility</h2>
                <p>
                    Nothing is ever their fault. They blame you, their ex, their parents, or circumstances for every
                    problem. A mature partner acknowledges their mistakes and works to improve.
                </p>

                <h2>4. Isolation Tactics</h2>
                <p>
                    They subtly discourage you from spending time with friends and family. They might say things like
                    "I just want you all to myself" or create conflicts when you make other plans.
                </p>

                <h2>5. Gaslighting</h2>
                <p>
                    They make you question your own reality. Phrases like "That never happened," "You're being too
                    sensitive," or "You're imagining things" are classic gaslighting techniques that undermine your
                    confidence and perception.
                </p>

                <h2>6. Moving Too Fast</h2>
                <p>
                    They push for commitment, exclusivity, or intimacy before you're ready. They might pressure you
                    to move in together, meet their family, or make major decisions before you've had time to truly
                    know each other.
                </p>

                <h2>7. Secretive About Their Life</h2>
                <p>
                    They're vague about their past relationships, their daily activities, or aspects of their life.
                    If you feel like you don't really know them despite spending significant time together, trust
                    your instincts.
                </p>

                <h2>8. They Put You Down</h2>
                <p>
                    Criticism disguised as "jokes" or "just being honest" chips away at your self-esteem. A loving
                    partner builds you up; they don't tear you down, even under the guise of humor.
                </p>

                <h2>9. They're Only Nice When They Want Something</h2>
                <p>
                    Pay attention to patterns. Are they sweet and romantic right before asking for a favor? Do they
                    become cold when you can't give them what they want? This transactional behavior reveals their
                    true priorities.
                </p>

                <h2>10. Your Gut Tells You Something's Wrong</h2>
                <p>
                    Never underestimate your intuition. If something feels off—even if you can't articulate why—pay
                    attention. Your subconscious often picks up on warning signs before your conscious mind does.
                </p>

                <blockquote>
                    <p>
                        "When someone shows you who they are, believe them the first time." — Maya Angelou
                    </p>
                </blockquote>

                <h2>What to Do If You Recognize These Signs</h2>
                <p>
                    If you recognize multiple signs in your relationship, consider reaching out to trusted friends,
                    family, or a professional counselor. Remember: leaving a toxic relationship isn't weakness—it's
                    strength. You deserve someone who treats you with genuine respect and love.
                </p>

                <p>
                    Want to test your ability to spot these red flags? Try our{" "}
                    <Link href="/zhanan-test" className="text-rose-600 hover:underline font-medium">
                        Toxic Partner Detection Quiz
                    </Link>{" "}
                    to see how well you can identify warning signs.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="如何识别渣男的10个信号"
            titleEn="10 Signs of a Toxic Partner"
            date="2025-01-10"
            readTime="8"
            coverImage="/blog-images/toxic-partner.png"
        >
            <p>
                渣男往往善于伪装，刚开始的时候可能表现得像是梦中情人——温柔、体贴、浪漫。但随着时间推移，
                各种危险信号会逐渐暴露。学会识别这些警告信号，可以帮你避免情感伤害，节省宝贵的时间和精力。
            </p>

            <h2>1. 爱情轰炸</h2>
            <p>
                他在恋爱初期就对你过度热情，疯狂送礼物、不停表白、一天发无数条消息。虽然这让人感觉被重视，
                但这种强度往往掩盖着操控意图。健康的感情是循序渐进的，不是火箭般的速度。
            </p>
            <p>
                <strong>典型表现：</strong>认识不到一周就说"我从没这样爱过一个人"，每天连环夺命call，
                恨不得24小时黏在一起。
            </p>

            <h2>2. 忽冷忽热</h2>
            <p>
                今天对你甜言蜜语、嘘寒问暖，明天就冷若冰霜、爱理不理。这种热一阵冷一阵的模式让你无所适从，
                总是在揣测他的心思，不断寻求他的认可。真正爱你的人，态度是稳定一致的。
            </p>
            <p>
                <strong>典型表现：</strong>几天不联系是常态，消息已读不回，但突然又热情似火。
            </p>

            <h2>3. 从不承担责任</h2>
            <p>
                什么事情都不是他的错。任何问题都怪你、怪前任、怪父母、怪环境。一个成熟的人会承认自己的错误，
                并努力改正。而渣男永远都是受害者的姿态。
            </p>
            <p>
                <strong>典型表现：</strong>"你太敏感了"、"都是你逼我的"、"我前女友害我变成这样"。
            </p>

            <h2>4. 孤立你的社交</h2>
            <p>
                他会委婉地阻止你和朋友、家人见面。可能会说"我只想和你单独在一起"，或者每次你和别人有约就制造矛盾。
                这样做的目的是让你越来越依赖他，失去其他支持系统。
            </p>
            <p>
                <strong>典型表现：</strong>吃你闺蜜的醋，说你朋友都是坏影响，你和朋友出去他就不高兴。
            </p>

            <h2>5. 精神操控（Gaslighting）</h2>
            <p>
                他让你怀疑自己的记忆和判断力。"这件事根本没发生过"、"你想太多了"、"你太敏感了"——
                这些都是经典的精神操控话术，目的是动摇你的自信和认知能力。
            </p>
            <p>
                <strong>典型表现：</strong>明明他做错了事，吵完架却变成你在道歉。你开始怀疑自己是不是真的有问题。
            </p>

            <h2>6. 推进过快</h2>
            <p>
                他会在你还没准备好的时候，push各种承诺、同居或者亲密关系。可能会催着你见家长、搬到一起住，
                或者在你们真正了解彼此之前就做出重大决定。
            </p>
            <p>
                <strong>典型表现：</strong>认识一个月就要你做他女朋友，三个月要同居，半年要结婚。
            </p>

            <h2>7. 对自己的生活很神秘</h2>
            <p>
                他对过去的感情、日常活动、生活的方方面面都含糊其辞。如果相处了很久你仍然觉得不太了解他，
                这种直觉往往是准确的。
            </p>
            <p>
                <strong>典型表现：</strong>手机永远不离手，从不让你看，社交媒体上对外说自己单身。
            </p>

            <h2>8. 打压贬低你</h2>
            <p>
                用"开玩笑"或"实话实说"的名义来批评你，一点点侵蚀你的自尊心。真正爱你的人会鼓励你、支持你，
                而不是打着幽默的旗号贬低你。
            </p>
            <p>
                <strong>典型表现：</strong>"你怎么连这个都不知道"、"你朋友都比你有眼光"、"我是为你好才说的"。
            </p>

            <h2>9. 只在有所求时才对你好</h2>
            <p>
                仔细观察规律。他是不是每次特别温柔体贴的时候，后面都跟着一个请求？当你无法满足他时，
                是不是立刻就变脸？这种交易型的行为暴露了他真正关心的是什么。
            </p>
            <p>
                <strong>典型表现：</strong>需要借钱的时候超级贴心，借完钱就消失；想要的时候嘴很甜，被拒绝就翻脸。
            </p>

            <h2>10. 你的直觉告诉你有问题</h2>
            <p>
                永远不要小看你的第六感。如果你感觉有什么不对——即使说不清楚为什么——请相信这种感觉。
                你的潜意识往往能在意识之前察觉到危险信号。
            </p>

            <blockquote>
                <p>
                    "当一个人向你展示他是什么样的人时，第一次就要相信他。" —— 玛雅·安杰洛
                </p>
            </blockquote>

            <h2>如果你发现这些信号怎么办？</h2>
            <p>
                如果你在感情中发现了多个危险信号，建议向信任的朋友、家人或专业心理咨询师寻求帮助。
                记住：离开一段有害的关系不是软弱，而是勇敢。你值得被真心对待、被真正爱护。
            </p>

            <p>
                想测试一下你识别渣男的能力吗？试试我们的
                <Link href="/zhanan-test" className="text-rose-600 hover:underline font-medium">
                    渣男辨别力测试
                </Link>
                ，看看你的防渣能力有多强！
            </p>
        </BlogLayout>
    );
}
