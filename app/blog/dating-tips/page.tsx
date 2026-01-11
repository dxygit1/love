"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function DatingTipsPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="约会时的注意事项"
                titleEn="Essential Dating Tips"
                date="2025-01-04"
                readTime="6"
            >
                <p>
                    Whether it's your first date or you're getting back into dating after a break, those
                    butterflies in your stomach are completely normal. Here are some tips to help you
                    navigate the dating world with confidence.
                </p>

                <h2>Before the Date</h2>

                <h3>Choose the Right Setting</h3>
                <p>
                    Pick somewhere you can actually talk—loud clubs or movie theaters make getting to know
                    each other difficult. Coffee shops, casual restaurants, or a walk in the park are
                    great first-date options.
                </p>

                <h3>Plan an Exit Strategy</h3>
                <p>
                    Have flexible plans. A coffee date can be extended if things are going well, or easily
                    wrapped up if they're not. Avoid committing to long activities like concerts for first dates.
                </p>

                <h3>Don't Overthink Your Outfit</h3>
                <p>
                    Wear something that makes you feel confident and comfortable. Don't dress drastically
                    different from your normal style—you want them to like the real you.
                </p>

                <h2>During the Date</h2>

                <h3>Be Present</h3>
                <p>
                    Put away your phone. Make eye contact. Listen actively. Being fully present shows
                    respect and creates connection.
                </p>

                <h3>Ask Questions (and Listen)</h3>
                <p>
                    Show genuine interest in their life, experiences, and perspectives. Ask follow-up
                    questions. People love talking about themselves—and they'll appreciate that you care.
                </p>

                <h3>Share About Yourself Too</h3>
                <p>
                    Dating is a two-way street. While you don't need to reveal your deepest secrets,
                    being open helps build connection. Balance curiosity about them with sharing about you.
                </p>

                <h3>Be Authentic</h3>
                <p>
                    Don't try to be someone you're not. Pretending is exhausting and unsustainable.
                    The goal is to find someone who likes the real you.
                </p>

                <h2>Red Flags to Watch For</h2>
                <ul>
                    <li>They're rude to service staff</li>
                    <li>They talk only about themselves</li>
                    <li>They make you feel uncomfortable</li>
                    <li>They push past your boundaries</li>
                    <li>They bad-mouth all their exes</li>
                </ul>

                <h2>After the Date</h2>

                <h3>Don't Play Games</h3>
                <p>
                    If you had a good time, say so. The "wait three days to text" rule is outdated.
                    Genuine interest is attractive; playing hard to get creates confusion.
                </p>

                <h3>Manage Expectations</h3>
                <p>
                    One good date doesn't mean you've found "the one." Take things one step at a time
                    and enjoy getting to know someone new.
                </p>

                <blockquote>
                    <p>
                        "The best first dates feel like catching up with an old friend—comfortable,
                        genuine, and full of good conversation."
                    </p>
                </blockquote>

                <p>
                    Nervous about whether they like you? After your date, try our{" "}
                    <Link href="/does-he-like-me" className="text-rose-600 hover:underline font-medium">
                        Does He Like Me Quiz
                    </Link>{" "}
                    to analyze the signs.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="约会时的注意事项"
            titleEn="Essential Dating Tips"
            date="2025-01-04"
            readTime="6"
        >
            <p>
                不管是第一次约会还是休息一段时间后重新开始约会，那种紧张又期待的感觉都是很正常的。
                这里有一些实用的约会技巧，帮你自信地应对各种情况。
            </p>

            <h2>约会前</h2>

            <h3>选择合适的地点</h3>
            <p>
                选一个能好好聊天的地方——太吵的酒吧或者电影院都不利于互相了解。
                咖啡店、休闲餐厅或者公园散步都是很好的第一次约会选择。
            </p>

            <h3>留有余地</h3>
            <p>
                第一次约会的安排要灵活。喝咖啡如果聊得来可以延长，聊不来也容易结束。
                避免第一次约会就安排很长的活动，比如演唱会。
            </p>

            <h3>穿搭不用太纠结</h3>
            <p>
                穿你觉得自信又舒服的衣服就好。不要穿得和平时风格差太多——
                你希望对方喜欢的是真实的你，而不是约会时"装"出来的你。
            </p>

            <h2>约会中</h2>

            <h3>保持专注</h3>
            <p>
                手机收起来。保持眼神交流。认真听对方说话。全身心投入约会表明你的尊重，也能更好地建立连接。
            </p>

            <h3>多问问题（并认真听）</h3>
            <p>
                对ta的生活、经历和观点表现出真诚的兴趣。问一些追问的问题。
                人们都喜欢谈论自己——他们会感激你的关心。
            </p>

            <h3>也要分享你自己</h3>
            <p>
                约会是双向的。虽然不需要第一次见面就透露最深的秘密，但适当的开放有助于建立连接。
                在对ta好奇的同时，也分享一些关于你自己的事情。
            </p>

            <h3>做真实的自己</h3>
            <p>
                不要假装成另外一个人。装来装去既累人又不可持续。
                约会的目标是找到喜欢真实的你的人。
            </p>

            <h2>需要警惕的危险信号</h2>
            <ul>
                <li>对服务员态度恶劣</li>
                <li>只谈论自己，对你毫无兴趣</li>
                <li>让你感到不舒服</li>
                <li>无视你的边界</li>
                <li>把所有前任都说得一无是处</li>
            </ul>

            <h2>约会后</h2>

            <h3>不要玩心理游戏</h3>
            <p>
                如果你玩得开心，就直说。"等三天再发消息"这种规则早过时了。
                真诚的兴趣很有吸引力；欲擒故纵只会制造困惑。
            </p>

            <h3>管理好期望</h3>
            <p>
                一次约会不错不代表就找到了"对的人"。一步一步来，享受认识新朋友的过程。
            </p>

            <blockquote>
                <p>
                    "最好的第一次约会感觉像是和老朋友叙旧——舒服、真诚、话题源源不断。"
                </p>
            </blockquote>

            <h3>小贴士清单</h3>
            <ul>
                <li>✅ 提前到达约会地点</li>
                <li>✅ 准备一些话题，但不要照本宣科</li>
                <li>✅ 保持微笑，展现你最好的一面</li>
                <li>✅ 约会结束后发个消息表示感谢</li>
                <li>❌ 不要说前任的坏话</li>
                <li>❌ 不要抱怨太多</li>
                <li>❌ 不要在第一次约会就谈结婚生子</li>
            </ul>

            <p>
                约会后想知道ta是不是喜欢你？试试我们的
                <Link href="/does-he-like-me" className="text-rose-600 hover:underline font-medium">
                    他喜欢我吗测试
                </Link>
                ，分析那些约会信号。
            </p>
        </BlogLayout>
    );
}
