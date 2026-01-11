"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function FirstLovePage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="为什么初恋最难忘"
                titleEn="Why First Love Is So Unforgettable"
                date="2025-01-05"
                readTime="6"
            >
                <p>
                    Almost everyone remembers their first love with unusual clarity and emotion.
                    But why? Science and psychology offer fascinating explanations.
                </p>

                <h2>The Neurological Explanation</h2>
                <p>
                    First love triggers an unprecedented flood of dopamine, oxytocin, and adrenaline.
                    Your brain has never experienced these chemicals in this context before, making
                    every sensation feel amplified and extraordinary.
                </p>

                <h2>The Peak-End Rule</h2>
                <p>
                    Psychologist Daniel Kahneman found that we remember experiences by their emotional
                    peaks and endings. First love is all peaks—everything is new, intense, and
                    overwhelming.
                </p>

                <h2>Identity Formation</h2>
                <p>
                    First love often occurs during adolescence when we're forming our identities.
                    That person becomes woven into who we were becoming—inseparable from our sense
                    of self at that time.
                </p>

                <h2>No Reference Point</h2>
                <p>
                    You had nothing to compare it to. Every feeling was felt for the first time—jealousy,
                    longing, butterflies, heartbreak. These firsts leave permanent impressions.
                </p>

                <h2>The Rose-Colored Memory</h2>
                <p>
                    Over time, we tend to remember the good and forget the bad. First love becomes
                    idealized, a perfect memory of innocent, pure love—even if it wasn't really
                    like that.
                </p>

                <h2>Is It Healthy to Remember?</h2>
                <p>
                    Absolutely—as long as nostalgia doesn't prevent you from appreciating present
                    relationships. First love taught you about loving and being loved. Those lessons
                    shaped who you are today.
                </p>

                <blockquote>
                    <p>
                        "First love is a little foolish and a lot of curiosity."
                    </p>
                </blockquote>

                <p>
                    Explore your heart's patterns with our{" "}
                    <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                        Love Quiz
                    </Link>.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="为什么初恋最难忘"
            titleEn="Why First Love Is So Unforgettable"
            date="2025-01-05"
            readTime="6"
        >
            <p>
                几乎每个人都会异常清晰和深刻地记得自己的初恋。但这是为什么？
                科学和心理学提供了一些迷人的解释。
            </p>

            <h2>神经学解释</h2>
            <p>
                初恋触发了前所未有的多巴胺、催产素和肾上腺素的洪流。
                你的大脑以前从未在这种情境下体验过这些化学物质，所以每一种感觉都被放大了，
                变得异常强烈。
            </p>
            <p>
                <strong>就像：</strong>第一次喝咖啡的人会觉得特别提神，而经常喝的人就没那么敏感了。
            </p>

            <h2>峰终定律</h2>
            <p>
                心理学家丹尼尔·卡尼曼发现，我们通过情感的高峰和结尾来记忆体验。
                初恋全是高峰——一切都是新的、强烈的、overwhelming的。
            </p>

            <h2>身份认同形成</h2>
            <p>
                初恋通常发生在我们形成自我认同的青春期。那个人被编织进了我们正在成为的人——
                与那个时候的自我意识密不可分。
            </p>
            <p>
                <strong>换句话说：</strong>你不只是记得那个人，你记得的是当时的自己。
            </p>

            <h2>没有参照物</h2>
            <p>
                你没有任何可以比较的东西。每一种感觉都是第一次体验——嫉妒、渴望、心跳加速、心碎。
                这些"第一次"会留下永久的印记。
            </p>

            <h2>玫瑰色的记忆</h2>
            <p>
                随着时间推移，我们倾向于记住好的，忘记坏的。初恋变得理想化，
                成为纯真无瑕的美好记忆——即使实际上并不是那样。
            </p>

            <h2>记得初恋健康吗？</h2>
            <p>
                当然——只要怀旧不妨碍你欣赏现在的关系。初恋教会了你如何去爱和被爱。
                那些经验塑造了今天的你。
            </p>

            <blockquote>
                <p>
                    "初恋是一点傻气和很多好奇心。"
                </p>
            </blockquote>

            <p>
                想探索你的心灵模式？试试我们的
                <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                    恋爱测试
                </Link>。
            </p>
        </BlogLayout>
    );
}
