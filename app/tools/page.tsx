"use client";

import Link from "next/link";
import { Brain, Heart, ArrowRight, Search, Sparkles } from "lucide-react";
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
            icon: Sparkles,
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
            icon: Heart,
            color: "from-sky-500 to-blue-600",
            badge: "TOOL"
        },
        {
            id: "does-she-like-me",
            href: "/tools/does-she-like-me",
            titleEn: "Does She Like Me Generator",
            titleZh: "她喜欢我吗生成器",
            descEn: "Reveal if she is into you.",
            descZh: "生成“她喜欢我吗”测试结果页。",
            icon: Sparkles,
            color: "from-pink-500 to-rose-400",
            badge: "NEW"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800 pt-20 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{t("tools.title")}</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">{t("tools.desc")}</p>
                </div>

                {/* AdUnit - Interstitial */}
                <div className="w-full flex justify-center mb-8">
                    <AdUnit slot="HOME_TOP_SLOT" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link key={tool.id} href={tool.href} className="group block h-full">
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
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
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                                        {language === "zh" ? tool.titleZh : tool.titleEn}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                                        {language === "zh" ? tool.descZh : tool.descEn}
                                    </p>

                                    <div className="flex items-center justify-end pt-4 border-t border-gray-50 mt-auto">
                                        <span className="text-rose-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            {language === "zh" ? "去生成" : "Create"} <ArrowRight className="w-4 h-4" />
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
