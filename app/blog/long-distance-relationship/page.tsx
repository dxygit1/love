"use client";

import { BlogLayout } from "@/components/BlogLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function LongDistanceRelationshipPage() {
    const { language } = useLanguage();

    if (language === "en") {
        return (
            <BlogLayout
                title="异地恋怎么维持"
                titleEn="How to Make Long-Distance Relationships Work"
                date="2025-01-06"
                readTime="7"
            >
                <p>
                    Long-distance relationships are challenging but not impossible. With the right
                    strategies and commitment, you can maintain—and even strengthen—your bond
                    across the miles.
                </p>

                <h2>1. Establish Clear Communication Habits</h2>
                <p>
                    Set expectations for how often you'll talk. Daily good morning texts?
                    Weekly video calls? Find a rhythm that works for both of you without
                    feeling forced.
                </p>

                <h2>2. Share Your Daily Life</h2>
                <p>
                    Send photos of your lunch, voice messages about your day, updates about
                    random moments. The mundane details help you feel part of each other's lives.
                </p>

                <h2>3. Have End Dates in Mind</h2>
                <p>
                    Long-distance is sustainable when it's temporary. Discuss your future plans
                    and work toward closing the gap eventually.
                </p>

                <h2>4. Visit When Possible</h2>
                <p>
                    In-person time is precious. Plan visits in advance and make them special.
                    Having the next visit on the calendar gives you something to anticipate.
                </p>

                <h2>5. Watch Movies "Together"</h2>
                <p>
                    Screen-sharing platforms let you watch shows simultaneously. It's not the
                    same as cuddling on the couch, but it creates shared experiences.
                </p>

                <h2>6. Send Physical Things</h2>
                <p>
                    Care packages, handwritten letters, or small gifts in the mail add tangible
                    connection that digital communication can't replicate.
                </p>

                <h2>7. Trust Completely</h2>
                <p>
                    Without trust, long-distance is torture. If you can't trust your partner,
                    the distance isn't the real problem.
                </p>

                <h2>8. Have Your Own Life</h2>
                <p>
                    Don't put your life on hold waiting for calls. Maintain friendships, hobbies,
                    and goals. A fulfilled you is a better partner.
                </p>

                <blockquote>
                    <p>
                        "Distance means so little when someone means so much."
                    </p>
                </blockquote>

                <p>
                    Want to test your relationship strength? Try our{" "}
                    <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                        Love Quiz
                    </Link>{" "}
                    to see where you stand.
                </p>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout
            title="异地恋怎么维持"
            titleEn="How to Make Long-Distance Relationships Work"
            date="2025-01-06"
            readTime="7"
        >
            <p>
                异地恋很有挑战性，但不是不可能。用对方法，加上双方的投入，
                你们可以维持甚至加强跨越千里的感情。
            </p>

            <h2>1. 建立清晰的沟通习惯</h2>
            <p>
                约定好多久联系一次。每天说早安？每周视频通话？找到适合你们双方的节奏，
                不要让联系变成负担。
            </p>
            <p>
                <strong>建议：</strong>固定时间视频，但不要强迫每一秒都在聊天，
                像真正在一起那样自然就好。
            </p>

            <h2>2. 分享日常生活</h2>
            <p>
                发午餐的照片、今天遇到的事情的语音、随手拍的小视频……
                这些琐碎的细节让对方感觉参与了你的生活。
            </p>
            <p>
                <strong>建议：</strong>不用等到"有事"才联系，日常的小分享比偶尔的长聊更重要。
            </p>

            <h2>3. 有明确的结束时间</h2>
            <p>
                如果知道异地是暂时的，就更容易坚持下去。讨论你们的未来计划，
                朝着结束异地的目标努力。
            </p>
            <p>
                <strong>建议：</strong>一起规划什么时候可以在一起、谁搬去哪里、需要多久。
            </p>

            <h2>4. 尽可能见面</h2>
            <p>
                面对面的时间无比珍贵。提前计划见面，让每次相聚都很特别。
                日历上有下一次见面的日期会给你盼头。
            </p>
            <p>
                <strong>建议：</strong>每次分开前就定好下次见面的大概时间。
            </p>

            <h2>5. "一起"看电影</h2>
            <p>
                现在有很多可以同步观看视频的工具。虽然不能真的窝在沙发上，
                但可以创造共同的体验。
            </p>

            <h2>6. 寄实体的东西</h2>
            <p>
                关心包裹、手写信、小礼物……这些有形的连接是数字通讯无法代替的。
            </p>
            <p>
                <strong>建议：</strong>节日或随机地寄个惊喜，让对方知道你在想ta。
            </p>

            <h2>7. 完全信任</h2>
            <p>
                没有信任，异地就是折磨。如果你无法信任对方，距离不是真正的问题。
            </p>
            <p>
                <strong>建议：</strong>不要因为距离就变得多疑，相信你当初选择这个人的理由。
            </p>

            <h2>8. 有自己的生活</h2>
            <p>
                不要把生活暂停等对方的消息。保持自己的朋友、爱好和目标。
                一个充实的你是更好的伴侣。
            </p>

            <blockquote>
                <p>
                    "距离如此短暂，当一个人如此重要。"
                </p>
            </blockquote>

            <p>
                想测试你们的感情强度？试试我们的
                <Link href="/love-quiz" className="text-rose-600 hover:underline font-medium">
                    恋爱测试
                </Link>
                ，看看你们处于什么状态。
            </p>
        </BlogLayout>
    );
}
