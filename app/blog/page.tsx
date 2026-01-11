"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Blog article data
const articles = [
    {
        slug: "signs-of-toxic-partner",
        titleZh: "如何识别渣男的10个信号",
        titleEn: "10 Signs of a Toxic Partner",
        descZh: "渣男往往善于伪装，但总有一些蛛丝马迹可以帮你识破他们的真面目。学会识别这10个危险信号，保护自己远离情感伤害。",
        descEn: "Toxic partners are often masters of disguise, but there are telltale signs that can help you see through their facade.",
        date: "2025-01-10",
        readTime: "8",
        category: "relationship",
        featured: true,
    },
    {
        slug: "love-mistakes",
        titleZh: "恋爱中的5个常见误区",
        titleEn: "5 Common Mistakes in Relationships",
        descZh: "很多人在恋爱中不知不觉就踩了坑，这5个常见的恋爱误区你中了几个？避开它们，让你的感情更加甜蜜长久。",
        descEn: "Many people unknowingly fall into these traps in relationships. How many of these 5 common mistakes have you made?",
        date: "2025-01-09",
        readTime: "6",
        category: "relationship",
    },
    {
        slug: "mental-age-meaning",
        titleZh: "心理年龄与真实年龄的关系",
        titleEn: "The Relationship Between Mental Age and Chronological Age",
        descZh: "为什么有的人看起来比实际年龄成熟，而有的人却像个长不大的孩子？心理年龄背后隐藏着怎样的秘密？",
        descEn: "Why do some people seem more mature than their age while others remain childlike? Discover the secrets behind mental age.",
        date: "2025-01-08",
        readTime: "7",
        category: "psychology",
    },
    {
        slug: "does-he-like-me-signs",
        titleZh: "如何判断他是否喜欢你",
        titleEn: "How to Know If He Likes You",
        descZh: "暗恋一个人最痛苦的就是不知道对方的心意。其实男生喜欢一个人时会有这些明显的表现，快来对照看看吧！",
        descEn: "The hardest part of having a crush is not knowing if they feel the same. Here are the signs that reveal his true feelings.",
        date: "2025-01-07",
        readTime: "9",
        category: "dating",
    },
    {
        slug: "healthy-relationship-traits",
        titleZh: "健康恋爱关系的7个特征",
        titleEn: "7 Traits of a Healthy Relationship",
        descZh: "什么样的恋爱关系才是健康的？这7个特征可以帮你判断你们的感情是否处于良好状态，快来自测一下吧！",
        descEn: "What makes a relationship healthy? These 7 traits can help you evaluate whether your relationship is in good shape.",
        date: "2025-01-06",
        readTime: "7",
        category: "relationship",
    },
    {
        slug: "moving-on-after-breakup",
        titleZh: "分手后如何快速走出来",
        titleEn: "How to Move On After a Breakup",
        descZh: "分手后的日子总是特别难熬，心像被掏空了一样。这篇文章分享一些实用的方法，帮你尽快走出失恋的阴影。",
        descEn: "The days after a breakup are always tough. Here are some practical tips to help you heal and move forward.",
        date: "2025-01-05",
        readTime: "8",
        category: "healing",
    },
    {
        slug: "dating-tips",
        titleZh: "约会时的注意事项",
        titleEn: "Essential Dating Tips",
        descZh: "第一次约会总是让人紧张又期待。掌握这些约会技巧，让你轻松应对各种场合，给对方留下美好的第一印象。",
        descEn: "First dates can be nerve-wracking but exciting. Master these dating tips to make a great first impression.",
        date: "2025-01-04",
        readTime: "6",
        category: "dating",
    },
];

export default function BlogPage() {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {language === "zh" ? "情感专栏" : "Love & Relationship Blog"}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {language === "zh"
                            ? "分享关于恋爱、心理、情感的实用文章，帮你更好地了解自己和他人"
                            : "Practical articles about love, psychology, and emotions to help you understand yourself and others better"}
                    </p>
                </div>

                {/* Article Grid */}
                <div className="space-y-6">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${article.slug}`} className="group block">
                                <article className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-rose-100 ${article.featured ? 'ring-2 ring-rose-100' : ''}`}>
                                    {article.featured && (
                                        <span className="inline-block bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded mb-3">
                                            {language === "zh" ? "精选" : "Featured"}
                                        </span>
                                    )}
                                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                                        {language === "zh" ? article.titleZh : article.titleEn}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {language === "zh" ? article.descZh : article.descEn}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {article.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {language === "zh" ? `${article.readTime}分钟` : `${article.readTime} min`}
                                            </span>
                                        </div>
                                        <span className="text-rose-500 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            {language === "zh" ? "阅读全文" : "Read More"}
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
