"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function LoveMistakesPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="恋爱中的5个常见误区"
                titleEn="5 Common Mistakes in Relationships"
                date="2025-01-09"
                readTime="6"
            >
                <p>
                    Love is complicated, and many of us learn through trial and error. However, some mistakes are so
                    common that recognizing them early can save you heartache and help build healthier relationships.
                </p>

                <h2>Mistake 1: Thinking Love Is Enough</h2>
                <p>
                    "Love conquers all" is a romantic notion, but not a practical one. While love is essential,
                    successful relationships also require compatibility, shared values, effective communication,
                    and mutual effort. Love is the foundation, but you need more than just a foundation to build a house.
                </p>
                <p>
                    <strong>The truth:</strong> Lasting relationships are built on love PLUS respect, trust, and
                    daily effort from both partners.
                </p>

                <h2>Mistake 2: Trying to Change Your Partner</h2>
                <p>
                    Entering a relationship hoping to "fix" or change the other person is a recipe for disappointment.
                    People can grow and change, but only when they choose to—not because you want them to.
                </p>
                <p>
                    <strong>The truth:</strong> Accept your partner as they are today. If their current self
                    isn't compatible with you, it may not be the right match.
                </p>

                <h2>Mistake 3: Neglecting Your Own Identity</h2>
                <p>
                    It's easy to get so wrapped up in a relationship that you forget who you were before it.
                    Abandoning your hobbies, friends, and personal goals for a partner may feel romantic initially,
                    but it leads to resentment and codependency.
                </p>
                <p>
                    <strong>The truth:</strong> Healthy relationships involve two complete individuals who enhance
                    each other's lives, not two halves trying to make a whole.
                </p>

                <h2>Mistake 4: Poor Communication</h2>
                <p>
                    Many people expect their partners to read their minds. When expectations aren't met, resentment
                    builds. Others avoid difficult conversations entirely, letting small issues snowball into
                    major problems.
                </p>
                <p>
                    <strong>The truth:</strong> Open, honest, and regular communication is the lifeblood of any
                    healthy relationship. Say what you mean, and listen to understand.
                </p>

                <h2>Mistake 5: Keeping Score</h2>
                <p>
                    "I did the dishes last time, so you should do them this time." Relationships aren't
                    transactions. Keeping mental tallies of who did what leads to petty arguments and
                    undermines the partnership.
                </p>
                <p>
                    <strong>The truth:</strong> Give without expecting equal return. Focus on teamwork, not fairness.
                </p>

                <h2>Moving Forward</h2>
                <p>
                    Recognizing these patterns in yourself isn't something to be ashamed of—it's the first step
                    toward growth. Every relationship teaches us something. The key is to learn from mistakes
                    rather than repeat them.
                </p>

                <p>
                    Curious about your relationship patterns? Check out our{" "}
                    <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                        Love Quiz
                    </Link>{" "}
                    to discover more about yourself.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="恋爱中的5个常见误区"
            titleEn="5 Common Mistakes in Relationships"
            date="2025-01-09"
            readTime="6"
        >
            <p>
                恋爱是门学问，很多人都是在跌跌撞撞中学会的。有些误区太过常见，如果能早点认识到，
                可以少走很多弯路，让感情更加健康长久。看看下面这5个恋爱误区，你中了几个？
            </p>

            <h2>误区一：以为有爱就够了</h2>
            <p>
                "爱情可以战胜一切"听起来很浪漫，但现实却不是这样。爱情固然重要，但成功的感情还需要
                三观契合、有效沟通和共同努力。爱情是地基，但光有地基建不成房子。
            </p>
            <p>
                <strong>真相：</strong>持久的感情是建立在爱情＋尊重＋信任＋双方日常努力的基础上的。
                光靠心动和激情，走不远。
            </p>

            <h2>误区二：想要改变对方</h2>
            <p>
                带着"ta以后会改的"的期望进入一段感情，注定会失望。人确实可以成长和改变，
                但只有当ta自己想改变时才可能——不是因为你希望ta改变。
            </p>
            <p>
                <strong>真相：</strong>接受对方现在的样子。如果现在的ta和你不合适，那可能就是不合适。
                别抱着"ta以后会变"的幻想。
            </p>

            <h2>误区三：为了爱情丢失自我</h2>
            <p>
                太容易陷入感情中，忘记恋爱前的自己是什么样。为了对方放弃自己的爱好、朋友和目标，
                刚开始可能觉得很浪漫，但长期下来会产生怨气和依赖。
            </p>
            <p>
                <strong>真相：</strong>健康的感情是两个完整的人互相成就，不是两个残缺的人拼凑成一个整体。
                恋爱可以让你变得更好，但不应该让你失去自己。
            </p>

            <h2>误区四：不好好沟通</h2>
            <p>
                很多人希望对方能读心术，"ta应该知道我在想什么"。当期望没有被满足时，就积攒怨气。
                还有人害怕冲突，有话不说，让小问题滚雪球成大矛盾。
            </p>
            <p>
                <strong>真相：</strong>开放、诚实、定期的沟通是感情的命脉。有话直说，也要用心去听。
                不要让"你应该懂我"成为吵架的借口。
            </p>

            <h2>误区五：斤斤计较</h2>
            <p>
                "上次是我洗的碗，这次该你了。"感情不是账本，如果总在心里记着谁付出多少，
                就会陷入无休止的争吵，破坏恋爱中的美好。
            </p>
            <p>
                <strong>真相：</strong>付出的时候不要期待等价回报。把重点放在"我们"的团队精神上，
                而不是"公平不公平"。你们是队友，不是对手。
            </p>

            <blockquote>
                <p>
                    好的感情不是完美的两个人，而是两个不完美的人愿意一起努力变得更好。
                </p>
            </blockquote>

            <h2>如何做得更好</h2>
            <p>
                发现自己有这些问题不可耻，这是成长的第一步。每一段感情都教会我们一些东西，
                关键是从错误中学习，而不是不断重复。
            </p>

            <p>
                想更了解自己的恋爱模式吗？试试我们的
                <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                    恋爱测试
                </Link>
                ，发现更多关于自己的秘密。
            </p>
        </BlogLayout>
    );
}
