"use client";

import { useState } from "react";
import { ResultScreen } from "@/components/ResultScreen";
import { XiaohongshuGenerator } from "@/components/XiaohongshuGenerator";
import { results } from "@/lib/quiz-data-do-i-like-her";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DoILikeHerToolPage() {
    const { t } = useLanguage();
    const [score, setScore] = useState<number>(85);
    const [personName, setPersonName] = useState<string>("");
    const [gender, setGender] = useState<"male" | "female">("female");

    // Calculate result logic
    const result = results.find((r) => score >= r.minScore && score <= r.maxScore) || results[0];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row pt-20 md:pt-0">
            {/* Control Panel */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-xl overflow-y-auto h-auto md:h-screen">
                <div className="mb-8">
                    <Link href="/tools" className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {t("tools.back_to_tools")}
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{t("tools.do_i_like_her_title")}</h1>
                    <p className="text-xs text-gray-500 mt-1">{t("tools.adjust_values")}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Score (0-100)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={score}
                                onChange={(e) => setScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={score}
                            onChange={(e) => setScore(Number(e.target.value))}
                            className="w-full accent-purple-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Partner Name</label>
                        <input
                            type="text"
                            value={personName}
                            onChange={(e) => setPersonName(e.target.value)}
                            placeholder="Optional"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Target Gender</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setGender("male")}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${gender === "male"
                                    ? "bg-blue-100 text-blue-700 border-blue-200 border"
                                    : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                                    }`}
                            >
                                Male (He)
                            </button>
                            <button
                                onClick={() => setGender("female")}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${gender === "female"
                                    ? "bg-pink-100 text-pink-700 border-pink-200 border"
                                    : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                                    }`}
                            >
                                Female (She)
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t("tools.result_preview")}</h3>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Score:</span>
                                <span className="font-mono font-bold">{score}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Category:</span>
                                <span className="font-bold text-purple-600 text-right">{result.titleEn}</span>
                            </div>
                        </div>
                    </div>


                    <div className="pt-6 border-t border-gray-100">
                        <XiaohongshuGenerator
                            type="do-i-like-her"
                            data={{
                                quizName: "心动测试", // Neutral name for AI
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
            <div className="flex-1 bg-gray-50 relative h-auto md:h-full md:overflow-y-auto">
                <div className="relative md:absolute md:inset-0 p-4 md:p-0">
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
