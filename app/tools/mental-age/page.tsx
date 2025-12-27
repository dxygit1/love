"use client";

import { useState } from "react";
import { ResultScreenMentalAge } from "@/components/ResultScreenMentalAge";
import { XiaohongshuGenerator } from "@/components/XiaohongshuGenerator";
import { results } from "@/lib/quiz-data-mental-age";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MentalAgeToolPage() {
    const { t } = useLanguage();
    const [realAge, setRealAge] = useState<number>(25);
    const [mentalAge, setMentalAge] = useState<number>(45);

    // Calculate result logic (same as useQuizMentalAge)
    const diff = mentalAge - realAge;
    const result = results.find(r => diff >= r.minDiff && diff <= r.maxDiff) || results[0];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row pt-20 md:pt-0">
            {/* Control Panel */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-xl overflow-y-auto h-auto md:h-screen">
                <div className="mb-8">
                    <Link href="/tools" className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {t("tools.back_to_tools")}
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{t("tools.mental_age_title")}</h1>
                    <p className="text-xs text-gray-500 mt-1">{t("tools.adjust_values")}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Real Age</label>
                        <input
                            type="number"
                            value={realAge}
                            onChange={(e) => setRealAge(Number(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Mental Age</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={mentalAge}
                                onChange={(e) => setMentalAge(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={mentalAge}
                            onChange={(e) => setMentalAge(Number(e.target.value))}
                            className="w-full accent-green-600"
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t("tools.result_preview")}</h3>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Diff:</span>
                                <span className="font-mono font-bold">{diff}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Category:</span>
                                <span className="font-bold text-green-600 text-right">{result.titleEn}</span>
                            </div>
                        </div>
                    </div>


                    <div className="pt-6 border-t border-gray-100">
                        <XiaohongshuGenerator
                            type="mental-age"
                            data={{
                                realAge,
                                mentalAge,
                                title: t("common.mental_age_title"),
                                description: result.descriptionZh // Prefer Chinese if available, or fetch current Lang
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
                <div className="w-full min-h-full p-4 md:p-0">
                    <ResultScreenMentalAge
                        mentalAge={mentalAge}
                        realAge={realAge}
                        result={result}
                        onRestart={() => { }} // No-op for tool
                    />
                </div>
            </div>
        </div>
    );
}
