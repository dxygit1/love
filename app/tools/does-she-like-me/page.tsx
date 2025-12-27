"use client";

import { useState } from "react";
import { ResultScreen } from "@/components/ResultScreen";
import { XiaohongshuGenerator } from "@/components/XiaohongshuGenerator";
import { results } from "@/lib/quiz-data-does-she-like-me";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DoesSheLikeMeToolPage() {
    const { t, language } = useLanguage();
    const [score, setScore] = useState(60);
    const [personName, setPersonName] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male"); // User is male asking about female

    const getResult = (score: number) => {
        return results.find(r => score >= r.minScore && score <= r.maxScore) || results[results.length - 1];
    };

    const result = getResult(score);

    return (
        <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-gray-50">
            {/* Control Panel - Left Side */}
            <div className="w-full md:w-1/3 min-w-[320px] bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-lg md:shadow-none md:overflow-y-auto relative shrink-0">
                <div className="mb-6">
                    <Link href="/tools" className="inline-flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {t("tools.back_to_tools")}
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{t("tools.does_she_like_me_title")}</h1>
                    <p className="text-gray-500 text-sm mt-1">{t("tools.does_she_like_me_desc")}</p>
                </div>

                <div className="space-y-8 flex-1">
                    {/* Score Slider */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("tools.score_label")}: <span className="text-purple-600 font-bold text-lg">{score}</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={score}
                            onChange={(e) => setScore(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0</span>
                            <span>100</span>
                        </div>
                    </div>

                    {/* Person Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("tools.partner_name_label")}
                        </label>
                        <input
                            type="text"
                            value={personName}
                            onChange={(e) => setPersonName(e.target.value)}
                            placeholder={t("tools.partner_name_placeholder")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <XiaohongshuGenerator
                            type="does-she-like-me"
                            data={{
                                quizName: "心动测试", // Neutral name
                                score,
                                resultTitle: result.titleZh,
                                partnerName: personName || "TA"
                            }}
                        />
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 flex items-center justify-center w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-medium transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {t("tools.reset_defaults")}
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-gray-50 relative flex flex-col md:h-full md:overflow-y-auto">
                <div className="p-4 md:p-0 flex-1 md:absolute md:inset-0">
                    <ResultScreen
                        score={score}
                        result={result}
                        personName={personName}
                        gender={gender}
                        onRestart={() => { }} // No-op for tool
                    />
                </div>
            </div>
        </div>
    );
}
