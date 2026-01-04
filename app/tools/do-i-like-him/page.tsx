"use client";

import { useState } from "react";
import { ResultScreen } from "@/components/ResultScreen";
import { doILikeHimResults } from "@/lib/quiz-data-do-i-like-him";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { XiaohongshuGenerator } from "@/components/XiaohongshuGenerator";

export default function DoILikeHimToolPage() {
    const { t, language } = useLanguage();
    const [score, setScore] = useState<number>(85);
    const [personName, setPersonName] = useState<string>("");
    const [gender, setGender] = useState<"male" | "female">("male");

    // Calculate result logic
    const result = doILikeHimResults.find((r) => score >= r.minScore && score <= r.maxScore) || doILikeHimResults[doILikeHimResults.length - 1];

    // Data for AI Copywriting
    const aiData = {
        score,
        resultTitle: language === "zh" ? result.titleZh : result.titleEn,
        personName,
        quizType: "do-i-like-him"
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row pt-20">
            {/* Control Panel */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-xl overflow-y-auto h-auto md:h-screen order-last md:order-none">
                <div className="mb-8">
                    <Link href="/tools" className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {t("tools.back_to_tools")}
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{language === "zh" ? "我喜欢他吗生成器" : "Do I Like Him Generator"}</h1>
                    <p className="text-xs text-gray-500 mt-1">{t("tools.adjust_values")}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">{language === "zh" ? "分数 (0-100)" : "Score (0-100)"}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={score}
                                onChange={(e) => setScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={score}
                            onChange={(e) => setScore(Number(e.target.value))}
                            className="w-full accent-blue-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">{language === "zh" ? "对方称呼/名字" : "Person Name"}</label>
                        <input
                            type="text"
                            value={personName}
                            onChange={(e) => setPersonName(e.target.value)}
                            placeholder={language === "zh" ? "可选" : "Optional"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">{language === "zh" ? "对方性别" : "Gender"}</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setGender("male")}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${gender === "male"
                                    ? "bg-blue-100 text-blue-700 border-blue-200 border"
                                    : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                                    }`}
                            >
                                {language === "zh" ? "男 (他)" : "Male"}
                            </button>
                            <button
                                onClick={() => setGender("female")}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${gender === "female"
                                    ? "bg-pink-100 text-pink-700 border-pink-200 border"
                                    : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                                    }`}
                            >
                                {language === "zh" ? "女 (她)" : "Female"}
                            </button>
                        </div>
                    </div>

                    {/* AI Copywriting Generator */}
                    <div className="pt-6 border-t border-gray-100">
                        <XiaohongshuGenerator
                            type="do-i-like-him"
                            data={aiData}
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t("tools.result_preview")}</h3>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Score:</span>
                                <span className="font-mono font-bold">{score}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Result:</span>
                                <span className="font-medium text-blue-600">
                                    {language === "zh" ? result.titleZh : result.titleEn}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Area - Seamless Design */}
            <div className="flex-1 relative flex flex-col md:h-full md:overflow-y-auto bg-gradient-to-br from-rose-50 via-white to-indigo-50">
                <div className="w-full min-h-full flex justify-center items-start">
                    {/* Desktop: Full-width seamless ResultScreen */}
                    <div className="hidden md:block w-full">
                        <ResultScreen
                            score={score}
                            result={{
                                minScore: result.minScore,
                                maxScore: result.maxScore,
                                titleZh: result.titleZh,
                                titleEn: result.titleEn,
                                descriptionZh: result.descriptionZh,
                                descriptionEn: result.descriptionEn,
                                adviceZh: "",
                                adviceEn: ""
                            }}
                            personName={personName}
                            gender={gender}
                            onRestart={() => { }}
                            quizType="do-i-like-him"
                        />
                    </div>

                    {/* Mobile: Show Full Screen directly */}
                    <div className="md:hidden w-full">
                        <ResultScreen
                            score={score}
                            result={{
                                minScore: result.minScore,
                                maxScore: result.maxScore,
                                titleZh: result.titleZh,
                                titleEn: result.titleEn,
                                descriptionZh: result.descriptionZh,
                                descriptionEn: result.descriptionEn,
                                adviceZh: "",
                                adviceEn: ""
                            }}
                            personName={personName}
                            gender={gender}
                            onRestart={() => { }}
                            quizType="do-i-like-him"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
