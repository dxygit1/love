"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function DoesHeLikeMeSignsPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="如何判断他是否喜欢你"
                titleEn="How to Know If He Likes You"
                date="2025-01-07"
                readTime="9"
            >
                <p>
                    The uncertainty of not knowing someone's feelings can be agonizing. Does he like you as more
                    than a friend, or are you reading too much into things? While everyone expresses interest
                    differently, there are some reliable signs that can help you decode his feelings.
                </p>

                <h2>Physical Signs</h2>

                <h3>1. He Makes Eye Contact</h3>
                <p>
                    When someone likes you, they naturally want to look at you. If you catch him looking at you
                    often, especially when you're not talking directly to him, it's a strong indicator of interest.
                    Bonus points if he holds eye contact a bit longer than normal.
                </p>

                <h3>2. Body Language Speaks Volumes</h3>
                <p>
                    Watch for these physical cues:
                </p>
                <ul>
                    <li>Leaning in when you talk</li>
                    <li>Facing you with his body (feet pointed toward you)</li>
                    <li>Finding excuses to touch you (brushing your arm, etc.)</li>
                    <li>Mirroring your gestures and expressions</li>
                </ul>

                <h3>3. He Gets Nervous Around You</h3>
                <p>
                    Fidgeting, stumbling over words, or seeming slightly awkward can actually be good signs.
                    When we're around someone we like, our nervous system goes into overdrive.
                </p>

                <h2>Behavioral Signs</h2>

                <h3>4. He Initiates Contact</h3>
                <p>
                    Does he text first? Make plans to see you? Reach out just to chat? When someone actively
                    initiates contact regularly, they're showing that you're on their mind.
                </p>

                <h3>5. He Remembers Details</h3>
                <p>
                    Mentioning something you told him weeks ago, remembering your coffee order, or bringing
                    up an inside joke shows he pays attention to you specifically.
                </p>

                <h3>6. He Makes Time for You</h3>
                <p>
                    No matter how busy someone is, they make time for their priorities. If he rearranges
                    his schedule or cancels other plans to see you, you matter to him.
                </p>

                <h3>7. He Introduces You to His Friends</h3>
                <p>
                    Bringing you into his social circle is a significant step. It shows he's proud to be
                    associated with you and wants you to be part of his life.
                </p>

                <h2>Communication Signs</h2>

                <h3>8. He Asks Questions About Your Life</h3>
                <p>
                    Someone interested in you wants to know you better. If he asks about your day, your
                    dreams, your past—and truly listens to the answers—he cares.
                </p>

                <h3>9. He Compliments You Genuinely</h3>
                <p>
                    Not just "you look nice" but specific, thoughtful compliments that show he really sees you:
                    "I love how passionate you get when you talk about your work."
                </p>

                <h3>10. He Opens Up to You</h3>
                <p>
                    Sharing personal stories, fears, or dreams creates vulnerability. If he's letting you
                    see beyond his surface, he trusts you and wants a deeper connection.
                </p>

                <h2>The Most Important Sign</h2>
                <p>
                    While these signs are helpful, the most reliable indicator is consistency. Someone who
                    likes you won't just show one or two signs occasionally—they'll demonstrate genuine
                    interest through ongoing actions over time.
                </p>

                <blockquote>
                    <p>
                        "Actions speak louder than words. Pay attention to what someone does, not just what they say."
                    </p>
                </blockquote>

                <p>
                    Still unsure? Try our{" "}
                    <Link href="/does-he-like-me" className="text-rose-600 hover:underline font-medium">
                        Does He Like Me Quiz
                    </Link>{" "}
                    for more insights into his feelings.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="如何判断他是否喜欢你"
            titleEn="How to Know If He Likes You"
            date="2025-01-07"
            readTime="9"
        >
            <p>
                暗恋一个人最痛苦的事情，就是不知道对方是不是也喜欢自己。他对你是真的有意思，
                还是你想太多了？虽然每个人表达感情的方式不同，但有一些靠谱的信号可以帮你解读他的心意。
            </p>

            <h2>肢体语言信号</h2>

            <h3>1. 他经常看你</h3>
            <p>
                当一个人喜欢你的时候，会忍不住想看你。如果你经常发现他在看你——尤其是你们不在说话的时候——
                这是一个很强的喜欢信号。如果他看到你发现他在看你，却没有马上移开目光，那就更说明问题了。
            </p>

            <h3>2. 身体语言会"出卖"他</h3>
            <p>
                注意观察这些肢体信号：
            </p>
            <ul>
                <li>和你说话时身体前倾</li>
                <li>用身体面对着你（脚尖也朝向你）</li>
                <li>找机会碰触你（轻碰你的手臂等）</li>
                <li>不自觉地模仿你的动作和表情</li>
            </ul>

            <h3>3. 在你面前会紧张</h3>
            <p>
                坐立不安、说话结巴、表现得有点笨拙……这些其实可能是好现象。当我们在喜欢的人面前时，
                神经系统会高度紧张。如果平时挺酷的一个人在你面前变得有点"傻"，可能就是喜欢你。
            </p>

            <h2>行为信号</h2>

            <h3>4. 他会主动联系你</h3>
            <p>
                他会先发消息吗？会主动约你吗？没事也会找你聊天吗？当一个人经常主动联系你，
                说明他心里有你。如果总是你在主动，而他只是"回应"，那意义就不太一样了。
            </p>

            <h3>5. 他会记住细节</h3>
            <p>
                提起你几周前说过的话、记得你喜欢喝什么咖啡、还记得你们之间的小玩笑……
                这些都说明他特别关注你。一个不在乎的人不会费心记这些。
            </p>

            <h3>6. 他愿意为你腾出时间</h3>
            <p>
                不管一个人多忙，都会为重要的事情挤出时间。如果他愿意调整自己的日程、甚至取消其他安排来见你，
                说明你在他心里有分量。
            </p>

            <h3>7. 他介绍你认识他的朋友</h3>
            <p>
                把你带进他的社交圈是很重要的一步。这说明他以和你在一起为荣，想让你成为他生活的一部分。
            </p>

            <h2>沟通信号</h2>

            <h3>8. 他对你的生活很好奇</h3>
            <p>
                一个对你有兴趣的人会想更了解你。如果他问你的一天怎么样、你有什么梦想、你的过去是怎样的——
                而且真的在认真听你的回答——说明他在乎你。
            </p>

            <h3>9. 他发自内心地夸你</h3>
            <p>
                不是敷衍的"你今天挺好看"，而是具体的、用心的赞美，说明他真的在观察你：
                "我很喜欢你谈到工作时眼睛里的光。"
            </p>

            <h3>10. 他会对你敞开心扉</h3>
            <p>
                分享个人的故事、恐惧或梦想是很需要勇气的。如果他愿意让你看到他表面之下的东西，
                说明他信任你，想和你建立更深的联系。
            </p>

            <h2>最重要的信号</h2>
            <p>
                虽然这些信号都很有参考价值，但最可靠的判断标准是<strong>持续性</strong>。
                真正喜欢你的人不会偶尔展示一两个信号——他会通过持续的行动来表达真诚的兴趣。
            </p>

            <blockquote>
                <p>
                    "行动比语言更有说服力。注意一个人做了什么，而不只是说了什么。"
                </p>
            </blockquote>

            <p>
                还是不确定？试试我们的
                <Link href="/does-he-like-me" className="text-rose-600 hover:underline font-medium">
                    他喜欢我吗测试
                </Link>
                ，获得更多关于他心意的洞察。
            </p>
        </BlogLayout>
    );
}
