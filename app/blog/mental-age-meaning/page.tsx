"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function MentalAgeMeaningPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="心理年龄与真实年龄的关系"
                titleEn="The Relationship Between Mental Age and Chronological Age"
                date="2025-01-08"
                readTime="7"
            >
                <p>
                    Have you ever met someone who seems wise beyond their years, or someone who acts much younger
                    than their actual age? This discrepancy between chronological age and mental age is more common
                    than you might think—and it reveals fascinating insights about human development.
                </p>

                <h2>What Is Mental Age?</h2>
                <p>
                    Mental age refers to your psychological and emotional maturity level, which may differ significantly
                    from your birth age. It's influenced by life experiences, personality traits, environment, and
                    even genetics. Unlike chronological age, mental age isn't fixed—it can change throughout your life.
                </p>

                <h2>Factors That Influence Mental Age</h2>

                <h3>1. Life Experiences</h3>
                <p>
                    People who face significant challenges early in life—such as loss, responsibility, or hardship—often
                    develop maturity beyond their years. Conversely, those who've had a sheltered upbringing may
                    retain a more youthful outlook.
                </p>

                <h3>2. Personality Traits</h3>
                <p>
                    Natural curiosity, playfulness, and openness to new experiences can keep you mentally young.
                    Meanwhile, traits like responsibility, conscientiousness, and emotional stability are associated
                    with higher mental age.
                </p>

                <h3>3. Social Environment</h3>
                <p>
                    Growing up with older siblings or primarily adult company can accelerate mental development.
                    Spending time with younger people or maintaining playful relationships can help preserve
                    youthful thinking.
                </p>

                <h3>4. Learning and Growth Mindset</h3>
                <p>
                    Those who continuously learn, adapt, and challenge themselves tend to have a healthier relationship
                    with aging. Mental stagnation—refusing to grow or change—can age us psychologically.
                </p>

                <h2>Is Higher Mental Age Better?</h2>
                <p>
                    Not necessarily. Each has its advantages:
                </p>
                <ul>
                    <li><strong>Higher mental age:</strong> Better decision-making, emotional regulation, and responsibility</li>
                    <li><strong>Lower mental age:</strong> More creativity, spontaneity, openness, and joy</li>
                </ul>
                <p>
                    The ideal may be finding balance—maintaining the wisdom of experience while preserving the
                    wonder and openness of youth.
                </p>

                <h2>Can You Change Your Mental Age?</h2>
                <p>
                    Absolutely. Unlike your birth year, mental age is malleable. Here are some ways to influence it:
                </p>
                <ul>
                    <li>To feel younger: Play more, try new activities, spend time with children, cultivate curiosity</li>
                    <li>To feel more mature: Take on responsibilities, practice mindfulness, seek challenging experiences</li>
                </ul>

                <blockquote>
                    <p>
                        "Age is an issue of mind over matter. If you don't mind, it doesn't matter." — Mark Twain
                    </p>
                </blockquote>

                <p>
                    Curious about your mental age? Take our{" "}
                    <Link href="/mental-age" className="text-rose-600 hover:underline font-medium">
                        Mental Age Quiz
                    </Link>{" "}
                    to discover how old you really are inside.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="心理年龄与真实年龄的关系"
            titleEn="The Relationship Between Mental Age and Chronological Age"
            date="2025-01-08"
            readTime="7"
        >
            <p>
                你有没有遇到过那种看起来特别成熟老练的年轻人，或者心态像孩子一样的中年人？
                这种真实年龄和心理年龄的差异其实非常普遍，而且背后隐藏着关于人类发展的有趣秘密。
            </p>

            <h2>什么是心理年龄？</h2>
            <p>
                心理年龄指的是你在心理和情感层面的成熟程度，它可能和你的实际年龄有很大差异。
                心理年龄受生活经历、性格特点、成长环境甚至基因的影响。和身份证上的年龄不同，
                心理年龄不是固定的——它会随着人生经历而变化。
            </p>

            <h2>影响心理年龄的因素</h2>

            <h3>1. 人生经历</h3>
            <p>
                那些在年轻时就经历过重大变故——比如失去亲人、承担家庭责任或面对困境的人，
                往往会比同龄人更加成熟。相反，从小在温室里长大、没经历过什么风浪的人，
                可能会保持更年轻的心态。
            </p>

            <h3>2. 性格特点</h3>
            <p>
                天生好奇心强、爱玩、乐于接受新事物的人，心理年龄往往更年轻。而那些有责任心、
                做事认真、情绪稳定的人，通常心理年龄会更大一些。这不是好坏之分，只是不同的特点。
            </p>

            <h3>3. 社交环境</h3>
            <p>
                从小和哥哥姐姐、长辈待在一起的人，心理发展可能更快。而经常和比自己年轻的人相处、
                保持轻松玩乐的关系，可以帮助保持年轻的心态。
            </p>

            <h3>4. 学习和成长心态</h3>
            <p>
                那些不断学习、适应新事物、挑战自己的人，和年龄的关系往往更健康。而心理上的停滞不前——
                拒绝成长和改变——会让人在心理层面老得更快。
            </p>

            <h2>心理年龄越大越好吗？</h2>
            <p>
                不一定。两种情况各有优势：
            </p>
            <ul>
                <li><strong>心理年龄较大：</strong>决策能力更强、情绪调节更好、更有责任感</li>
                <li><strong>心理年龄较小：</strong>更有创造力、更自然随性、更开放、更快乐</li>
            </ul>
            <p>
                理想的状态可能是找到平衡——既保持经验带来的智慧，又不失去年轻时的好奇和开放。
            </p>

            <h2>心理年龄可以改变吗？</h2>
            <p>
                当然可以！不像你的出生年份，心理年龄是可以改变的。这里有一些方法：
            </p>
            <ul>
                <li><strong>想要更年轻：</strong>多玩耍、尝试新活动、和孩子相处、培养好奇心</li>
                <li><strong>想要更成熟：</strong>承担责任、练习正念冥想、寻找具有挑战性的经历</li>
            </ul>

            <blockquote>
                <p>
                    "年龄是心态问题。如果你不介意，年龄就不重要。" —— 马克·吐温
                </p>
            </blockquote>

            <h2>你的心理年龄是多少？</h2>
            <p>
                好奇自己的心理年龄是比实际年龄大还是小？来试试我们的
                <Link href="/mental-age" className="text-rose-600 hover:underline font-medium">
                    心理年龄测试
                </Link>
                ，发现你内心真正的年龄！
            </p>
        </BlogLayout>
    );
}
