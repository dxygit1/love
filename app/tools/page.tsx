"use client";

import Link from "next/link";
import { Brain, Heart, ArrowRight, Search, Sparkles, Flame, Users, HelpCircle, HeartHandshake, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { AdUnit } from "@/components/AdUnit";

export default function ToolsPage() {
    const { t, language } = useLanguage();

    const tools = [
        {
            id: "mental-age",
            href: "/tools/mental-age",
            titleEn: "Mental Age Generator",
            titleZh: "心理年龄生成器",
            descEn: "Generate your mental age test result card instantly.",
            descZh: "一键生成你的心理年龄测试结果卡片，无需答题。",
            icon: Brain,
            color: "from-green-500 to-teal-600",
            badge: "TOOL"
        },
        {
            id: "love-quiz",
            href: "/tools/love-quiz",
            titleEn: "Love Quiz Generator",
            titleZh: "恋爱测试生成器",
            descEn: "Create a custom love compatibility score card.",
            descZh: "自定义生成“你到底有多喜欢他”测试结果完美截图。",
            icon: Heart,
            color: "from-rose-500 to-pink-600",
            badge: "HOT"
        },
        {
            id: "does-he-like-me",
            href: "/tools/does-he-like-me",
            titleEn: "Does He Like Me Generator",
            titleZh: "他喜欢我吗生成器",
            descEn: "Mock the result of 'Does he like me' quiz.",
            descZh: "生成“他喜欢我吗”测试结果页，朋友圈文案神器。",
            icon: HelpCircle,
            color: "from-indigo-500 to-violet-600",
            badge: "NEW"
        },
        {
            id: "do-i-like-her",
            href: "/tools/do-i-like-her",
            titleEn: "Do I Like Her Generator",
            titleZh: "我喜欢她吗生成器",
            descEn: "Visualize your feelings.",
            descZh: "生成“我喜欢她吗”测试结果，看清你的心意。",
            icon: HeartHandshake,
            color: "from-sky-500 to-blue-600",
            badge: "TOOL"
        },
        {
            id: "desire-test",
            href: "/tools/desire-test",
            titleEn: "Desire Chart Generator",
            titleZh: "欲望组成图生成器",
            descEn: "Generate your desire pie chart with custom percentages.",
            descZh: "自定义生成你的欲望比重饼图，朋友圈分享神器。",
            icon: Flame,
            color: "from-amber-500 to-orange-600",
            badge: "NEW"
        },
        {
            id: "gay-test",
            href: "/tools/gay-test",
            titleEn: "Sexual Orientation Generator",
            titleZh: "性取向测试生成器",
            descEn: "Generate your sexual orientation pie chart instantly.",
            descZh: "自定义生成性取向分布饼图，探索你的真实取向。",
            icon: Users,
            color: "from-pink-500 to-purple-600",
            badge: "NEW"
        },
        {
            id: "do-i-like-him",
            href: "/tools/do-i-like-him",
            titleEn: "Do I Like Him Generator",
            titleZh: "我喜欢他吗生成器",
            descEn: "Generate 'Do I Like Him' quiz result card.",
            descZh: "自定义生成“我喜欢他吗”测试结果卡片。",
            icon: Sparkles,
            color: "from-red-400 to-rose-500",
            badge: "NEW"
        },
        {
            id: "zhanan-test",
            href: "/tools/zhanan-test",
            titleEn: "Toxic Partner Detection",
            titleZh: "渣男辨别力测试",
            descEn: "Test your ability to detect toxic partners.",
            descZh: "测试你辨别渣男的能力，看看你的防渣能力有多强。",
            icon: Shield,
            color: "from-purple-500 to-pink-600",
            badge: "HOT"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800 pt-20 pb-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">{t("tools.title")}</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">{t("tools.desc")}</p>
                </div>

                {/* AdUnit - Interstitial */}
                <div className="w-full flex justify-center mb-8">
                    <AdUnit slot="HOME_TOP_SLOT" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <Link key={tool.id} href={tool.href} className="group block h-full">
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col group-hover:border-rose-100"
                            >
                                {/* Thumbnail Area */}
                                <div className={`h-40 relative bg-gradient-to-br ${tool.color} flex items-center justify-center overflow-hidden`}>
                                    {/* Decorative Circles */}
                                    <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                    <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-black/5 rounded-full blur-xl" />

                                    {/* Icon */}
                                    <tool.icon className="w-16 h-16 text-white drop-shadow-md transform group-hover:scale-110 transition-transform duration-500" />

                                    {/* Badge */}
                                    {tool.badge && (
                                        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs font-bold px-2 py-1 rounded shadow-sm">
                                            {tool.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                                        {language === "zh" ? tool.titleZh : tool.titleEn}
                                    </h3>
                                    <p className="text-gray-500 text-base leading-relaxed mb-6 flex-1">
                                        {language === "zh" ? tool.descZh : tool.descEn}
                                    </p>

                                    <div className="flex items-center justify-end pt-4 border-t border-gray-50 mt-auto">
                                        <span className="text-rose-500 font-bold text-sm md:text-base flex items-center gap-2 group-hover:gap-3 transition-all">
                                            {language === "zh" ? "去生成" : "Create"} <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
