"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function LoveLanguagesPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="五种爱的语言：找到你的表达方式"
                titleEn="The 5 Love Languages: Discover How You Express Love"
                date="2025-01-09"
                readTime="7"
                coverImage="/blog-images/love-languages.png"
            >
                <p>
                    Why do some couples feel disconnected despite loving each other? Often, it's because
                    they speak different "love languages." Understanding these five languages can
                    transform your relationships.
                </p>

                <h2>1. Words of Affirmation</h2>
                <p>
                    For some people, spoken words of love and appreciation mean everything. Compliments,
                    "I love you," verbal encouragement—these fill their emotional tank.
                </p>
                <p>
                    <strong>How to love them:</strong> Text sweet messages, leave notes, verbalize your appreciation.
                </p>

                <h2>2. Quality Time</h2>
                <p>
                    Undivided attention speaks volumes to these individuals. It's not about being in the
                    same room—it's about being fully present, engaged, and focused on each other.
                </p>
                <p>
                    <strong>How to love them:</strong> Put down your phone, plan date nights, have meaningful conversations.
                </p>

                <h2>3. Receiving Gifts</h2>
                <p>
                    This isn't about materialism. For gift-lovers, it's the thought, effort, and symbolism
                    behind the gift that matters. The gift says "you were thinking about me."
                </p>
                <p>
                    <strong>How to love them:</strong> Remember special occasions, bring small surprises, make handmade gifts.
                </p>

                <h2>4. Acts of Service</h2>
                <p>
                    Actions speak louder than words for these people. Doing chores, helping with tasks,
                    or taking care of responsibilities shows love more than any verbal expression.
                </p>
                <p>
                    <strong>How to love them:</strong> Help without being asked, take things off their plate, follow through.
                </p>

                <h2>5. Physical Touch</h2>
                <p>
                    Physical affection—holding hands, hugs, kisses, cuddling—is the primary emotional
                    language for some. Physical presence and touch provide comfort and security.
                </p>
                <p>
                    <strong>How to love them:</strong> Hold hands, offer hugs, sit close, initiate physical affection.
                </p>

                <h2>Why This Matters</h2>
                <p>
                    Conflict often arises when partners have different primary love languages. You might
                    be giving gifts while they crave quality time. Neither person feels loved despite
                    genuine effort. Understanding each other's language bridges this gap.
                </p>

                <blockquote>
                    <p>
                        "Love is a choice. And to love well, we must learn to speak our partner's language."
                    </p>
                </blockquote>

                <p>
                    Discover more about your emotional patterns with our{" "}
                    <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                        Love Quiz
                    </Link>.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="五种爱的语言：找到你的表达方式"
            titleEn="The 5 Love Languages: Discover How You Express Love"
            date="2025-01-09"
            readTime="7"
            coverImage="/blog-images/love-languages.png"
        >
            <p>
                为什么有些情侣明明相爱却总觉得不被理解？很可能是因为你们说着不同的"爱的语言"。
                了解这五种爱的语言，可以彻底改变你们的关系。
            </p>

            <h2>1. 肯定的言语</h2>
            <p>
                对有些人来说，爱和欣赏的话语意味着一切。赞美、"我爱你"、言语鼓励——
                这些能填满他们的情感账户。
            </p>
            <p>
                <strong>如何爱他们：</strong>发甜蜜短信、留便签纸条、把你的感激说出来。
            </p>
            <p>
                <strong>典型需求：</strong>"你今天真好看"、"谢谢你为我做的一切"、经常说"我爱你"。
            </p>

            <h2>2. 精心时刻</h2>
            <p>
                专注的陪伴对这类人来说胜过一切。不是在同一个房间——而是全身心投入、专注于彼此。
            </p>
            <p>
                <strong>如何爱他们：</strong>放下手机、规划约会、进行有意义的对话。
            </p>
            <p>
                <strong>典型需求：</strong>一起吃饭时不看手机、周末专门安排"我们时间"、认真听对方说话。
            </p>

            <h2>3. 接受礼物</h2>
            <p>
                这不是物质主义。对礼物型的人来说，重要的是礼物背后的心意、努力和象征意义。
                礼物说的是"我在想你"。
            </p>
            <p>
                <strong>如何爱他们：</strong>记住特别的日子、带小惊喜、做手工礼物。
            </p>
            <p>
                <strong>典型需求：</strong>生日礼物、看到好东西会想到对方并买下来、不需要很贵但要用心。
            </p>

            <h2>4. 服务的行动</h2>
            <p>
                对这类人来说，行动比言语更有说服力。做家务、帮忙任务、分担责任——
                比任何口头表达都更能展示爱。
            </p>
            <p>
                <strong>如何爱他们：</strong>不用被要求就主动帮忙、替对方分担、说到做到。
            </p>
            <p>
                <strong>典型需求：</strong>ta累的时候主动做饭、帮忙处理ta不擅长的事、不嘴上说行动上不管。
            </p>

            <h2>5. 身体触碰</h2>
            <p>
                身体上的亲密——牵手、拥抱、亲吻、依偎——是某些人最主要的情感语言。
                身体接触给他们安全感和慰藉。
            </p>
            <p>
                <strong>如何爱他们：</strong>经常牵手、主动拥抱、坐在一起时靠近一点。
            </p>
            <p>
                <strong>典型需求：</strong>走路时想牵手、睡觉时想抱着、心情不好时一个拥抱胜过万语千言。
            </p>

            <h2>为什么这很重要</h2>
            <p>
                冲突常常发生在伴侣有着不同的主要爱语时。你可能在送礼物，而对方渴望的是陪伴。
                双方都真心付出，但都感觉不到爱。了解彼此的语言可以弥合这个鸿沟。
            </p>

            <blockquote>
                <p>
                    "爱是一种选择。要好好爱一个人，我们必须学会说对方的语言。"
                </p>
            </blockquote>

            <p>
                想更了解你的情感模式？试试我们的
                <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                    恋爱测试
                </Link>。
            </p>
        </BlogLayout>
    );
}
