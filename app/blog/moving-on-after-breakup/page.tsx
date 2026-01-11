"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function MovingOnAfterBreakupPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="分手后如何快速走出来"
                titleEn="How to Move On After a Breakup"
                date="2025-01-05"
                readTime="8"
            >
                <p>
                    Breakups hurt. Whether the relationship lasted months or years, ending it leaves a void
                    that can feel impossible to fill. But here's the truth: you will get through this.
                    Here are some practical strategies to help you heal.
                </p>

                <h2>Phase 1: Allow Yourself to Grieve</h2>

                <h3>Feel Your Feelings</h3>
                <p>
                    Don't suppress your emotions or pretend you're fine. Cry if you need to. Be angry if
                    that's what you feel. Grief is part of healing, and the only way out is through.
                </p>

                <h3>Set a Grieving Timeline</h3>
                <p>
                    While you shouldn't rush healing, giving yourself a rough timeline can help. Allow
                    yourself to wallow for a few days or a week, then commit to taking active steps forward.
                </p>

                <h2>Phase 2: Cut Off Contact</h2>

                <h3>The No Contact Rule</h3>
                <p>
                    This is crucial. Stop texting, calling, and checking their social media. Every interaction
                    reopens the wound. You need distance to heal. Consider unfollowing or muting them online.
                </p>

                <h3>Remove Reminders</h3>
                <p>
                    You don't have to throw everything away, but put photos, gifts, and mementos somewhere
                    out of sight. You can revisit them later when they don't hurt as much.
                </p>

                <h2>Phase 3: Focus on Yourself</h2>

                <h3>Physical Self-Care</h3>
                <p>
                    Exercise releases endorphins. Eating well supports mental health. Getting enough sleep
                    helps emotional regulation. These basics matter more than ever during heartbreak.
                </p>

                <h3>Reconnect with Your Identity</h3>
                <p>
                    What did you love before the relationship? What did you give up while you were together?
                    Now's the time to rediscover your hobbies, passions, and sense of self.
                </p>

                <h3>Lean on Your Support System</h3>
                <p>
                    Friends and family can provide comfort, distraction, and perspective. Don't isolate—let
                    people who love you help you through this.
                </p>

                <h2>Phase 4: Find Meaning</h2>

                <h3>Reflect, Don't Ruminate</h3>
                <p>
                    There's a difference between learning from the relationship and obsessing over what
                    went wrong. Ask yourself what you learned and how you've grown, then move forward.
                </p>

                <h3>Embrace the Future</h3>
                <p>
                    Every ending is a beginning. This breakup opens space for new experiences, growth, and
                    eventually, a relationship that's right for you.
                </p>

                <blockquote>
                    <p>
                        "The only way to heal is to feel. Give yourself permission to grieve,
                        then give yourself permission to move on."
                    </p>
                </blockquote>

                <h2>How Long Does Healing Take?</h2>
                <p>
                    There's no set timeline. Some say it takes half the length of the relationship; others
                    heal faster or slower. What matters is that you're making progress, even if it's slow.
                </p>

                <p>
                    Ready to understand your heart better? Our quizzes can help you process and reflect.
                    Try the{" "}
                    <Link href="/do-i-like-him" className="text-rose-600 hover:underline font-medium">
                        Do I Still Like Him Quiz
                    </Link>{" "}
                    to explore your feelings.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="分手后如何快速走出来"
            titleEn="How to Move On After a Breakup"
            date="2025-01-05"
            readTime="8"
        >
            <p>
                分手真的很痛。不管这段感情持续了几个月还是几年，结束它都会留下一个似乎无法填补的空洞。
                但真相是：你会走出来的。这里有一些实用的方法帮你度过这段艰难时期。
            </p>

            <h2>第一阶段：允许自己悲伤</h2>

            <h3>让情绪释放出来</h3>
            <p>
                不要压抑情绪或假装自己没事。想哭就哭，想发火就发火。悲伤是愈合的一部分，
                唯一的出路就是让它流过你。憋着只会让痛苦更持久。
            </p>

            <h3>给自己设个期限</h3>
            <p>
                虽然不应该催自己快点好起来，但给自己一个大概的时间表是有帮助的。
                允许自己消沉几天或一周，然后承诺开始采取行动向前走。
            </p>

            <h2>第二阶段：切断联系</h2>

            <h3>断联法则</h3>
            <p>
                这一点非常重要。停止发消息、打电话、刷ta的社交媒体。每一次互动都会让伤口重新裂开。
                你需要距离才能愈合。考虑取消关注或设置成不看ta的动态。
            </p>

            <h3>移走那些提醒物</h3>
            <p>
                你不需要把什么都扔掉，但可以把照片、礼物和纪念品收到看不见的地方。
                等以后不那么痛了，再去面对它们。
            </p>

            <h2>第三阶段：专注自己</h2>

            <h3>身体上的自我关爱</h3>
            <p>
                运动能释放内啡肽。健康饮食能支持心理健康。充足的睡眠有助于情绪调节。
                这些基础的事情在心碎时期比以往任何时候都重要。
            </p>

            <h3>重新找回自我</h3>
            <p>
                谈恋爱之前你喜欢什么？在一起的时候你放弃了什么？
                现在是重新发现你的爱好、热情和自我认同的时候了。
            </p>

            <h3>依靠你的支持系统</h3>
            <p>
                朋友和家人能提供安慰、分散注意力，也能给你不同的视角。
                不要把自己封闭起来——让爱你的人帮你度过这一关。
            </p>

            <h2>第四阶段：寻找意义</h2>

            <h3>反思而不是反刍</h3>
            <p>
                从这段感情中学习和不停纠结哪里出了问题是不一样的。
                问问自己学到了什么、成长了多少，然后向前走。
            </p>

            <h3>拥抱未来</h3>
            <p>
                每一个结束都是新的开始。这次分手为新的体验、成长和最终找到对的人腾出了空间。
            </p>

            <blockquote>
                <p>
                    "治愈的唯一方式是去感受。允许自己悲伤，然后也允许自己向前走。"
                </p>
            </blockquote>

            <h2>愈合需要多长时间？</h2>
            <p>
                没有固定的时间表。有人说需要感情持续时间的一半；有人恢复得更快或更慢。
                重要的是你在进步，即使很慢。
            </p>

            <h3>一些具体的小建议</h3>
            <ul>
                <li><strong>第一周：</strong>允许自己崩溃，找朋友倾诉，该哭就哭</li>
                <li><strong>第二周：</strong>开始恢复正常作息，出门走走，做点运动</li>
                <li><strong>第三周：</strong>尝试一个新活动，见见很久没见的朋友</li>
                <li><strong>一个月后：</strong>如果还是很难受，考虑找心理咨询师聊聊</li>
            </ul>

            <p>
                想更了解自己的心吗？我们的测试可以帮你梳理和反思。试试
                <Link href="/do-i-like-him" className="text-rose-600 hover:underline font-medium">
                    我还喜欢他吗测试
                </Link>
                ，探索你真实的感受。
            </p>
        </BlogLayout>
    );
}
