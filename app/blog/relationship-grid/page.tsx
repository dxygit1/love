"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function RelationshipGridPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="恋爱九宫格：你们属于哪种类型"
                titleEn="The 9 Types of Relationships: Which One Are You?"
                date="2025-01-10"
                readTime="8"
            >
                <p>
                    Based on psychology research, relationships can be categorized into nine distinct types
                    based on the balance of intimacy, passion, and commitment. Understanding your relationship
                    type can help you improve it.
                </p>

                <h2>1. Strangers (No Love)</h2>
                <p>
                    No intimacy, no passion, no commitment. This isn't a relationship—it's what exists
                    before any connection forms.
                </p>

                <h2>2. Friendship (Intimacy Only)</h2>
                <p>
                    High intimacy but no passion or commitment. You share deep conversations and trust,
                    but there's no romantic spark or future plans together.
                </p>

                <h2>3. Infatuation (Passion Only)</h2>
                <p>
                    Pure physical or emotional attraction without deeper connection or long-term plans.
                    Think love at first sight or intense crushes. It burns hot but fades fast.
                </p>

                <h2>4. Empty Love (Commitment Only)</h2>
                <p>
                    A relationship held together by obligation rather than genuine feeling. Common in
                    long-term relationships that have lost their spark. The form remains, but the
                    substance is gone.
                </p>

                <h2>5. Romantic Love (Intimacy + Passion)</h2>
                <p>
                    Deep emotional connection plus physical attraction, but no long-term commitment yet.
                    The honeymoon phase of many relationships—exciting but potentially unstable.
                </p>

                <h2>6. Companionate Love (Intimacy + Commitment)</h2>
                <p>
                    Strong friendship and dedication without physical passion. Common in long-term
                    marriages where passion has faded but deep affection remains.
                </p>

                <h2>7. Fatuous Love (Passion + Commitment)</h2>
                <p>
                    Whirlwind romances that lead to quick commitment without real intimacy. "Love" based
                    on attraction and excitement, but lacking true understanding of each other.
                </p>

                <h2>8. Consummate Love (All Three)</h2>
                <p>
                    The ideal—intimacy, passion, and commitment in balance. Rare and takes conscious
                    effort to maintain. This is what most people aspire to.
                </p>

                <h2>9. Transitional Love</h2>
                <p>
                    Moving between types is normal. Relationships evolve, and healthy couples actively
                    work to maintain balance among all three elements.
                </p>

                <blockquote>
                    <p>
                        "Love is not a noun to be defined, but a verb to be practiced."
                    </p>
                </blockquote>

                <p>
                    Where does your relationship fall? Understanding this can be the first step toward
                    building the love you want. Try our{" "}
                    <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                        Love Quiz
                    </Link>{" "}
                    for personalized insights.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="恋爱九宫格：你们属于哪种类型"
            titleEn="The 9 Types of Relationships: Which One Are You?"
            date="2025-01-10"
            readTime="8"
        >
            <p>
                根据心理学家斯腾伯格的爱情三角理论，恋爱关系可以根据亲密感、激情和承诺三个维度，
                分为九种不同类型。了解你们属于哪种类型，可以帮助你改善这段关系。
            </p>

            <h2>1. 陌生人（无爱）</h2>
            <p>
                没有亲密、没有激情、没有承诺。这其实不算关系——是任何连接形成之前的状态。
                认识但没有任何交集。
            </p>

            <h2>2. 友谊（只有亲密）</h2>
            <p>
                高度亲密但没有激情或承诺。你们可以深入交流、彼此信任，但没有浪漫的火花，
                也没有共同的未来计划。纯粹的好朋友。
            </p>

            <h2>3. 迷恋（只有激情）</h2>
            <p>
                纯粹的身体或情感吸引，没有更深的连接或长期打算。比如一见钟情或强烈的暗恋。
                燃烧得很热烈但消退得也快。
            </p>
            <p>
                <strong>特征：</strong>见到对方心跳加速，但其实并不真正了解对方。
            </p>

            <h2>4. 空洞的爱（只有承诺）</h2>
            <p>
                靠责任而不是真情维系的关系。常见于失去火花的长期关系。
                形式还在，但内涵已经消失。
            </p>
            <p>
                <strong>特征：</strong>"过日子"心态，为了孩子/房子/面子在一起。
            </p>

            <h2>5. 浪漫之爱（亲密+激情）</h2>
            <p>
                深厚的情感连接加上身体吸引，但还没有长期承诺。很多恋爱关系的蜜月期——
                令人兴奋但可能不稳定。
            </p>
            <p>
                <strong>特征：</strong>热恋期，觉得对方完美无缺，还没想那么远的事。
            </p>

            <h2>6. 伴侣之爱（亲密+承诺）</h2>
            <p>
                深厚的友谊和忠诚，但没有身体激情。常见于激情消退后的长期婚姻，
                深厚的感情依旧存在。
            </p>
            <p>
                <strong>特征：</strong>老夫老妻，不怎么亲热但彼此依赖、不可或缺。
            </p>

            <h2>7. 愚昧之爱（激情+承诺）</h2>
            <p>
                旋风般的恋情迅速走向承诺，但缺乏真正的亲密。基于吸引和兴奋的"爱"，
                但其实并不真正了解对方。
            </p>
            <p>
                <strong>特征：</strong>闪婚、快速同居但经常吵架，因为发现和想象的不一样。
            </p>

            <h2>8. 完整之爱（三者兼具）</h2>
            <p>
                理想状态——亲密、激情和承诺保持平衡。罕见且需要双方有意识地维护。
                这是大多数人向往的状态。
            </p>
            <p>
                <strong>特征：</strong>既是恋人也是朋友，有激情也有责任，这样的爱最持久。
            </p>

            <h2>9. 过渡中的爱</h2>
            <p>
                在不同类型之间转换是正常的。关系会演变，健康的情侣会主动努力维持三个元素的平衡。
            </p>

            <blockquote>
                <p>
                    "爱不是用来定义的名词，而是需要实践的动词。"
                </p>
            </blockquote>

            <p>
                你们的关系属于哪种类型？了解这一点可以是建立你想要的爱情的第一步。
                试试我们的
                <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                    恋爱测试
                </Link>
                ，获得个性化的洞察。
            </p>
        </BlogLayout>
    );
}
