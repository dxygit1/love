"use client";

import Link from "next/link";
import { Brain, Heart, ArrowRight, Search, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ToolsPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("tools.title")}</h1>
                <p className="text-gray-500 mb-8">{t("tools.desc")}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mental Age Tool Card */}
                    <Link href="/tools/mental-age" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{t("tools.mental_age_title")}</h2>
                            <p className="text-gray-500 text-sm">
                                {t("tools.mental_age_desc")}
                            </p>
                        </div>
                    </Link>

                    {/* Love Quiz Tool Card */}
                    <Link href="/tools/love-quiz" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-pink-300 transition-all h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500 transition-colors" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{t("tools.love_quiz_title")}</h2>
                            <p className="text-gray-500 text-sm">
                                {t("tools.love_quiz_desc")}
                            </p>
                        </div>
                    </Link>

                    {/* Does He Like Me Tool Card */}
                    <Link href="/tools/does-he-like-me" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Search className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{t("tools.does_he_like_me_title")}</h2>
                            <p className="text-gray-500 text-sm">
                                {t("tools.does_he_like_me_desc")}
                            </p>
                        </div>
                    </Link>

                    {/* Do I Like Her Tool Card */}
                    <Link href="/tools/do-i-like-her" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{t("tools.do_i_like_her_title")}</h2>
                            <p className="text-gray-500 text-sm">
                                {t("tools.do_i_like_her_desc")}
                            </p>
                        </div>
                    </Link>

                    {/* Does She Like Me Tool Card */}
                    <Link href="/tools/does-she-like-me" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-pink-300 transition-all h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500 transition-colors" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{t("tools.does_she_like_me_title")}</h2>
                            <p className="text-gray-500 text-sm">
                                {t("tools.does_she_like_me_desc")}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
