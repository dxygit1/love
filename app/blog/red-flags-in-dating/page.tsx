"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function RedFlagsInDatingPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="约会中的12个危险信号"
                titleEn="12 Red Flags to Watch for When Dating"
                date="2025-01-07"
                readTime="8"
            >
                <p>
                    First dates are exciting, but they're also when you should keep your eyes open.
                    Here are 12 warning signs that someone might not be right for you.
                </p>

                <h2>1. They're Rude to Service Staff</h2>
                <p>
                    How someone treats waiters, baristas, or drivers reveals their true character.
                    Rudeness to "lesser" people often predicts future treatment of you.
                </p>

                <h2>2. They Talk Only About Themselves</h2>
                <p>
                    If they don't ask you questions or show genuine curiosity about your life,
                    they're probably not interested in you as a person.
                </p>

                <h2>3. They Bad-mouth All Their Exes</h2>
                <p>
                    If every ex was "crazy" or terrible, consider: what's the common factor?
                    A pattern of blaming others suggests they lack self-awareness.
                </p>

                <h2>4. They Rush Physical Intimacy</h2>
                <p>
                    Pushing boundaries or not respecting your pace is a major red flag.
                    Someone who cares about you will respect your comfort level.
                </p>

                <h2>5. They're Constantly on Their Phone</h2>
                <p>
                    If they can't give you undivided attention on a date, imagine how it'll be
                    in a relationship-especially if they're texting someone else.
                </p>

                <h2>6. They're Evasive About Basic Questions</h2>
                <p>
                    Dodging simple questions about their job, living situation, or past suggests
                    they're hiding something-or multiple somethings.
                </p>

                <h2>7. They Move Too Fast</h2>
                <p>
                    Declarations of love on date two? Talk of moving in together after a week?
                    This intensity often masks controlling behavior.
                </p>

                <h2>8. They Make You Feel Bad About Yourself</h2>
                <p>
                    "Jokes" that sting, backhanded compliments, or pointing out your flaws-none
                    of this belongs on an early date (or any date).
                </p>

                <h2>9. They're Negative About Everything</h2>
                <p>
                    Constant complaining, cynicism, and pessimism are exhausting. You deserve
                    someone who brings positivity to your life.
                </p>

                <h2>10. Your Gut Says Something's Off</h2>
                <p>
                    Trust your instincts. If something feels wrong-even if you can't pinpoint
                    what-that feeling is worth listening to.
                </p>

                <h2>11. They Drink Too Much</h2>
                <p>
                    Getting excessively drunk on a first date shows poor judgment and may signal
                    deeper issues with alcohol.
                </p>

                <h2>12. They're Already Planning Your Life Together</h2>
                <p>
                    Mentioning how many kids you'll have or where you'll live together before
                    you've finished your appetizer? Run.
                </p>

                <blockquote>
                    <p>
                        "When someone shows you who they are, believe them."
                    </p>
                </blockquote>

                <p>
                    Want to test your red flag radar? Check out our{" "}
                    <Link href="/zhanan-test" className="text-rose-600 hover:underline font-medium">
                        Toxic Partner Detection Quiz
                    </Link>.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="约会中的12个危险信号"
            titleEn="12 Red Flags to Watch for When Dating"
            date="2025-01-07"
            readTime="8"
        >
            <p>
                第一次约会让人兴奋，但也是你该睁大眼睛的时候。这里有12个警告信号，
                说明对方可能不适合你。
            </p>

            <h2>1. 对服务人员态度恶劣</h2>
            <p>
                一个人怎么对待服务员、咖啡师、司机，暴露了ta真正的性格。
                对"下等人"粗鲁的人，以后也可能这样对你。
            </p>

            <h2>2. 只谈自己</h2>
            <p>
                如果ta不问你问题，对你的生活没有真正的好奇心，ta很可能对你这个人并没有兴趣，
                只是需要一个听众。
            </p>

            <h2>3. 把所有前任都说得一无是处</h2>
            <p>
                如果每个前任都是"疯子"或渣人，想一想：共同因素是什么？
                不停责怪别人的模式说明ta缺乏自我反省的能力。
            </p>

            <h2>4. 急于亲密接触</h2>
            <p>
                不尊重你的节奏、不断试探你的边界是重大危险信号。
                真正在乎你的人会尊重你的舒适度。
            </p>

            <h2>5. 一直看手机</h2>
            <p>
                约会时都不能全神贯注，想想以后在一起会怎样——尤其如果ta在给别人发消息。
            </p>

            <h2>6. 对基本问题含糊其辞</h2>
            <p>
                回避关于工作、住处、过去的简单问题，说明ta在隐瞒什么——或者很多什么。
            </p>

            <h2>7. 推进太快</h2>
            <p>
                第二次约会就表白爱情？认识一周就谈同居？这种强度往往掩盖着控制欲。
            </p>

            <h2>8. 让你感觉糟糕</h2>
            <p>
                刺痛人的"玩笑"、拐弯抹角的贬低、指出你的缺点——这些都不该出现在约会中。
            </p>

            <h2>9. 对所有事情都很负面</h2>
            <p>
                不停抱怨、愤世嫉俗、悲观消极……让人精疲力竭。你值得一个给你的生活带来积极能量的人。
            </p>

            <h2>10. 你的直觉说有问题</h2>
            <p>
                相信你的直觉。如果感觉有什么不对——即使说不清楚是什么——这种感觉值得认真对待。
            </p>

            <h2>11. 喝太多酒</h2>
            <p>
                第一次约会就喝醉说明判断力有问题，也可能暗示着更深层的酒精依赖问题。
            </p>

            <h2>12. 已经在规划你们的未来</h2>
            <p>
                开胃菜还没吃完就在说要生几个孩子、住在哪里？快跑。
            </p>

            <blockquote>
                <p>
                    "当一个人向你展示ta是什么样的人时，相信ta。"
                </p>
            </blockquote>

            <p>
                想测试一下你的危险信号识别能力？试试我们的
                <Link href="/zhanan-test" className="text-rose-600 hover:underline font-medium">
                    渣男辨别力测试
                </Link>。
            </p>
        </BlogLayout>
    );
}
