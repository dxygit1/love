"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function AttachmentStylesPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="依恋类型：你是哪种恋爱模式"
                titleEn="Attachment Styles: Understanding Your Love Pattern"
                date="2025-01-08"
                readTime="9"
            >
                <p>
                    Why do some people feel secure in relationships while others constantly worry about
                    abandonment or feel suffocated by closeness? The answer often lies in attachment
                    theory—a framework that explains how we bond with romantic partners.
                </p>

                <h2>Secure Attachment (约50% of people)</h2>
                <p>
                    Securely attached individuals feel comfortable with intimacy and independence. They
                    trust their partners, communicate openly, and handle conflict constructively.
                </p>
                <p>
                    <strong>Characteristics:</strong> Comfortable expressing needs, accepts partner's imperfections,
                    doesn't play games, handles disagreements maturely.
                </p>

                <h2>Anxious Attachment (约20%)</h2>
                <p>
                    Those with anxious attachment crave closeness but constantly fear abandonment. They
                    may seem "clingy" or overly dependent, frequently seeking reassurance.
                </p>
                <p>
                    <strong>Characteristics:</strong> Overthinks texts and silences, needs constant validation,
                    fear-driven behavior, may become jealous easily.
                </p>

                <h2>Avoidant Attachment (约25%)</h2>
                <p>
                    Avoidantly attached individuals value independence over intimacy. They may seem
                    emotionally distant, have difficulty expressing feelings, and pull away when things
                    get too close.
                </p>
                <p>
                    <strong>Characteristics:</strong> Uncomfortable with emotional conversations, needs lots of
                    space, may seem cold or distant, prioritizes self-reliance.
                </p>

                <h2>Disorganized/Fearful (约5%)</h2>
                <p>
                    This rare style combines anxious and avoidant traits. These individuals want intimacy
                    but are also afraid of it, leading to confusing push-pull dynamics.
                </p>
                <p>
                    <strong>Characteristics:</strong> Hot and cold behavior, difficulty trusting, may sabotage
                    relationships, often stems from trauma.
                </p>

                <h2>Can Attachment Styles Change?</h2>
                <p>
                    Yes! While attachment patterns form in childhood, they're not fixed. Through
                    self-awareness, therapy, and relationships with secure partners, people can develop
                    more secure attachment over time.
                </p>

                <h2>Making It Work</h2>
                <p>
                    The key is understanding both your and your partner's styles. Anxious-avoidant pairings
                    are especially challenging but can work with awareness and effort.
                </p>

                <blockquote>
                    <p>
                        "Your attachment style is not your destiny—it's your starting point."
                    </p>
                </blockquote>

                <p>
                    Curious about your pattern? Explore more with our{" "}
                    <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                        Love Quiz
                    </Link>.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="依恋类型：你是哪种恋爱模式"
            titleEn="Attachment Styles: Understanding Your Love Pattern"
            date="2025-01-08"
            readTime="9"
        >
            <p>
                为什么有些人在恋爱中感觉安心，而有些人总是担心被抛弃或者感觉被亲密关系窒息？
                答案往往在于依恋理论——一个解释我们如何与爱人建立联结的框架。
            </p>

            <h2>安全型依恋（约50%的人）</h2>
            <p>
                安全型依恋的人在亲密和独立之间感到自在。他们信任伴侣，开放地沟通，
                能建设性地处理冲突。
            </p>
            <p>
                <strong>特征：</strong>能自在地表达需求、接受伴侣的不完美、不玩心理游戏、
                成熟地处理分歧。
            </p>
            <p>
                <strong>恋爱中的表现：</strong>信任对方、不会因为对方没及时回消息就焦虑、
                吵架后能好好谈、不卑不亢。
            </p>

            <h2>焦虑型依恋（约20%）</h2>
            <p>
                焦虑型依恋的人渴望亲密但总是害怕被抛弃。他们可能看起来"黏人"或过度依赖，
                频繁寻求确认。
            </p>
            <p>
                <strong>特征：</strong>过度解读消息和沉默、需要不停地确认、恐惧驱动的行为、
                容易吃醋。
            </p>
            <p>
                <strong>恋爱中的表现：</strong>消息不回就胡思乱想、需要经常听到"我爱你"、
                害怕对方变心、敏感多疑。
            </p>

            <h2>回避型依恋（约25%）</h2>
            <p>
                回避型依恋的人重视独立胜过亲密。他们可能看起来情感疏离，难以表达感情，
                当关系变得太亲近时会退缩。
            </p>
            <p>
                <strong>特征：</strong>不喜欢情感对话、需要很多个人空间、可能看起来冷漠、
                优先考虑自给自足。
            </p>
            <p>
                <strong>恋爱中的表现：</strong>不喜欢谈感情、觉得对方太黏人、需要独处时间、
                亲密关系让ta感到压力。
            </p>

            <h2>混乱型/恐惧型依恋（约5%）</h2>
            <p>
                这种罕见的类型结合了焦虑型和回避型的特点。他们想要亲密但同时害怕亲密，
                导致令人困惑的推拉动态。
            </p>
            <p>
                <strong>特征：</strong>忽冷忽热的行为、难以信任、可能破坏关系、
                通常源于童年创伤。
            </p>
            <p>
                <strong>恋爱中的表现：</strong>又想靠近又想逃、对方主动时退缩、对方冷淡时又追、
                自己也不知道要什么。
            </p>

            <h2>依恋类型可以改变吗？</h2>
            <p>
                可以！虽然依恋模式在童年形成，但不是固定不变的。通过自我觉察、心理咨询、
                以及和安全型伴侣的关系，人们可以随着时间发展出更安全的依恋模式。
            </p>

            <h2>让关系运作</h2>
            <p>
                关键是了解你和伴侣双方的类型。焦虑-回避的组合尤其具有挑战性，
                但通过觉察和努力是可以运作的。
            </p>

            <blockquote>
                <p>
                    "你的依恋类型不是你的命运——而是你的起点。"
                </p>
            </blockquote>

            <p>
                想了解你的模式？试试我们的
                <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                    恋爱测试
                </Link>
                来探索更多。
            </p>
        </BlogLayout>
    );
}
