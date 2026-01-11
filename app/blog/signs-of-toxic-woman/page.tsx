"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function SignsOfToxicWomanPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="如何识别渣女的8个信号"
                titleEn="8 Signs of a Toxic Girlfriend"
                date="2025-01-11"
                readTime="7"
            >
                <p>
                    Toxic behavior isn't exclusive to men. Women can be emotionally manipulative, dishonest,
                    or exploitative too. Recognizing these patterns early can protect you from heartbreak
                    and wasted emotional investment.
                </p>

                <h2>1. She's Only Sweet When She Wants Something</h2>
                <p>
                    Notice patterns. Is she exceptionally loving right before asking for favors, money, or
                    attention? Does her warmth disappear once she gets what she wants? This transactional
                    behavior reveals her priorities.
                </p>

                <h2>2. She Plays Mind Games</h2>
                <p>
                    Hot and cold behavior, making you jealous on purpose, giving silent treatment, or
                    testing you constantly—these are manipulation tactics. Healthy relationships don't
                    require you to solve puzzles to understand her feelings.
                </p>

                <h2>3. She's Never Wrong</h2>
                <p>
                    Every argument ends with you apologizing, even when you weren't at fault. She deflects
                    blame, plays the victim, or twists your words. Accountability is foreign to her.
                </p>

                <h2>4. She Isolates You</h2>
                <p>
                    She doesn't like your friends, criticizes your family, or makes you feel guilty for
                    spending time with others. Gradually, your world shrinks to just her.
                </p>

                <h2>5. She Keeps You on a Short Leash</h2>
                <p>
                    Constantly checking your phone, demanding to know your whereabouts, questioning every
                    female friend—extreme jealousy isn't love, it's control.
                </p>

                <h2>6. She Uses Tears as a Weapon</h2>
                <p>
                    Crying to avoid accountability or to guilt you into doing what she wants is emotional
                    manipulation. Genuine emotions are valid; weaponized tears are not.
                </p>

                <h2>7. She Compares You Negatively</h2>
                <p>
                    "My friend's boyfriend does this for her..." Constant comparisons designed to make you
                    feel inadequate are damaging and disrespectful.
                </p>

                <h2>8. You Feel Drained, Not Energized</h2>
                <p>
                    Healthy relationships lift you up. If you constantly feel exhausted, anxious, or
                    walking on eggshells, something is wrong.
                </p>

                <blockquote>
                    <p>
                        "The right person will make you feel at peace, not constantly confused."
                    </p>
                </blockquote>

                <p>
                    Trust your instincts. If multiple signs resonate, it may be time to reevaluate the
                    relationship.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="如何识别渣女的8个信号"
            titleEn="8 Signs of a Toxic Girlfriend"
            date="2025-01-11"
            readTime="7"
        >
            <p>
                渣不分男女。女生一样可能有情感操控、不诚实或利用对方的行为。
                学会识别这些信号，可以保护自己免受情感伤害。
            </p>

            <h2>1. 只有要东西时才对你好</h2>
            <p>
                注意规律。她是不是每次特别温柔的时候，后面都跟着要求？买东西、借钱、帮忙……
                得到之后就恢复冷淡？这种交易型行为暴露了她的真实目的。
            </p>
            <p>
                <strong>典型表现：</strong>需要你帮忙时各种撒娇，事情办完就消失；只在需要陪伴时才找你。
            </p>

            <h2>2. 玩心理游戏</h2>
            <p>
                忽冷忽热、故意让你吃醋、动不动冷战、不停"考验"你……这些都是操控手段。
                健康的感情不需要你猜谜语才能知道她在想什么。
            </p>
            <p>
                <strong>典型表现：</strong>"你自己想"、"你猜"、故意发和其他男生的合照试探你的反应。
            </p>

            <h2>3. 永远没有错</h2>
            <p>
                每次吵架最后都是你道歉，即使明明不是你的问题。她会推卸责任、装受害者、曲解你的话。
                承担责任这件事和她无关。
            </p>
            <p>
                <strong>典型表现：</strong>"都是因为你..."、吵着吵着变成你的错、从不主动道歉。
            </p>

            <h2>4. 孤立你的社交</h2>
            <p>
                她不喜欢你的朋友，批评你的家人，让你花时间和别人相处时有负罪感。
                慢慢地，你的世界只剩下她一个人。
            </p>
            <p>
                <strong>典型表现：</strong>"你兄弟都不靠谱"、"你妈太烦了"、你一出门就不高兴。
            </p>

            <h2>5. 控制欲极强</h2>
            <p>
                不停查你手机、要知道你的行踪、质疑你的每个女性朋友……
                极端的嫉妒不是爱，是控制。
            </p>
            <p>
                <strong>典型表现：</strong>要你微信密码、不让你和女同事单独说话、你多看一眼别的女生就发火。
            </p>

            <h2>6. 用眼泪当武器</h2>
            <p>
                用哭泣来逃避责任或让你妥协是情感操控。真实的情感表达是合理的，但武器化的眼泪不是。
            </p>
            <p>
                <strong>典型表现：</strong>一吵架就哭，哭完你不仅要道歉还要哄；用哭逼你做你不想做的事。
            </p>

            <h2>7. 经常拿你和别人比</h2>
            <p>
                "我闺蜜的男朋友都会这样……" 不停拿别人比较让你觉得自己不够好，这是伤害也是不尊重。
            </p>
            <p>
                <strong>典型表现：</strong>"人家男朋友都送XXX"、"你看看别人是怎么对老婆的"。
            </p>

            <h2>8. 和她在一起你感觉被消耗而不是充电</h2>
            <p>
                健康的感情让你更有活力。如果你总是感觉精疲力竭、焦虑不安、如履薄冰，那一定是哪里出了问题。
            </p>

            <blockquote>
                <p>
                    "对的人会让你感到平静，而不是一直困惑。"
                </p>
            </blockquote>

            <p>
                相信你的直觉。如果多个信号都中了，可能是时候重新评估这段关系了。
            </p>
        </BlogLayout>
    );
}
