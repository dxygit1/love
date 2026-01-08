"use client";

import { useState } from "react";
import { ResultScreenZhanan } from "@/components/ResultScreenZhanan";
import { zhananResults, getZhananResult } from "@/lib/zhanan-quiz-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { XiaohongshuGenerator } from "@/components/XiaohongshuGenerator";

// 星级评分数组
const starRatings = [
    "★☆☆☆☆☆☆", "★★☆☆☆☆☆", "★★☆☆☆☆☆", "★★★☆☆☆☆",
    "★★★☆☆☆☆", "★★★★☆☆☆", "★★★★☆☆☆", "★★★★★☆☆",
    "★★★★★☆☆", "★★★★★★☆", "★★★★★★☆", "★★★★★★★",
    "★★★★★★★", "★★★★★★★"
];

function getStarRating(score: number): string {
    const index = Math.min(Math.floor((score / 100) * 13), 13);
    return starRatings[index];
}

export default function ZhananTestToolPage() {
    const { t, language } = useLanguage();
    const [score, setScore] = useState<number>(85);

    // 根据分数获取结果
    const result = getZhananResult(score);
    const stars = getStarRating(score);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row pt-20">
            {/* 控制面板 */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-xl overflow-y-auto h-auto md:h-screen order-last md:order-none">
                <div className="mb-8">
                    <Link href="/tools" className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {t("tools.back_to_tools")}
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{language === "zh" ? "渣男辨别力生成器" : "Toxic Partner Detection Generator"}</h1>
                    <p className="text-xs text-gray-500 mt-1">{language === "zh" ? "调整分数，生成你的渣男辨别力测试结果" : "Adjust score to generate your result"}</p>
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

                    {/* AI文案生成器 */}
                    <div className="pt-6 border-t border-gray-100">
                        <XiaohongshuGenerator
                            type="zhanan-test"
                            data={{
                                score,
                                resultTitle: result.title,
                                description: result.description
                            }}
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t("tools.result_preview")}</h3>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-gray-500">{language === "zh" ? "分数" : "Score"}:</span>
                                <span className="font-mono font-bold">{score}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">{language === "zh" ? "称号" : "Title"}:</span>
                                <span className="font-medium text-purple-600">
                                    {result.title}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">{language === "zh" ? "星级" : "Stars"}:</span>
                                <span className="font-medium">
                                    {stars}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 预览区域 */}
            <div className="flex-1 relative flex flex-col md:h-full md:overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <div className="w-full min-h-full flex justify-center items-start">
                    <div className="w-full">
                        <ResultScreenZhanan
                            score={score}
                            onRestart={() => { }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
