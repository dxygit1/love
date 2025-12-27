"use client";

import { motion } from "framer-motion";
import { RefreshCw, Camera, Link2, Share2 } from "lucide-react";
import type { ResultCategory } from "@/lib/quiz-data-mental-age";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdUnit } from "@/components/AdUnit";
import { translations } from "@/lib/translations";

interface ResultScreenMentalAgeProps {
    mentalAge: number;
    realAge: number;
    result: ResultCategory;
    onRestart: () => void;
}

export function ResultScreenMentalAge({ mentalAge, realAge, result, onRestart }: ResultScreenMentalAgeProps) {
    const resultRef = useRef<HTMLDivElement>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const { language, t } = useLanguage();
    // const t used to be translations[language], now using t() function

    const diff = mentalAge - realAge;
    const diffText = diff > 0
        ? (language === 'zh' ? `${diff} 岁` : `${diff} years older`)
        : (language === 'zh' ? `${Math.abs(diff)} 岁` : `${Math.abs(diff)} years younger`);
    const diffLabel = diff > 0
        ? (language === 'zh' ? "比实际年龄大" : "than your actual age")
        : (language === 'zh' ? "比实际年龄小" : "than your actual age");

    // Exact match
    const isSame = diff === 0;

    const handleEnterPreview = () => {
        setIsPreviewMode(true);
    };

    const handleCaptureAndClose = () => {
        setIsPreviewMode(false);
    };

    const displayColor = result.color;

    return (
        <>
            {isPreviewMode && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
                    onClick={handleCaptureAndClose}
                >
                    <p className="fixed top-8 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-pulse">
                        Click anywhere to close
                    </p>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`min-h-screen flex flex-col items-center pt-0 pb-8 md:pt-20 md:pb-16 px-0 md:px-6 bg-gradient-to-br from-green-50 via-white to-teal-50 ${isPreviewMode ? 'fixed inset-0 z-[60] overflow-y-auto cursor-pointer justify-start pt-0' : ''}`}
                onClick={isPreviewMode ? handleCaptureAndClose : undefined}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-5xl text-center"
                >
                    <div
                        ref={resultRef}
                        className={`
                            mx-auto max-w-5xl rounded-none bg-white
                            pt-32 pb-4 px-4
                            md:p-12 md:rounded-[2rem] md:shadow-xl md:border md:border-gray-100 md:min-h-0
                            ${isPreviewMode ? '!pt-36 !pb-20 w-full' : ''}
                        `}
                    >
                        {!isPreviewMode && (
                            <div className="w-full mb-6 min-h-[0px]">
                                {/* Ad moved to mid-page */}
                            </div>
                        )}

                        <p className="mb-6 text-sm md:text-lg text-gray-500 uppercase tracking-widest font-semibold">
                            {t("common.mental_age_title")} Result
                        </p>

                        {/* Main Score Display */}
                        <div className="mb-10 relative inline-block">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                                className="relative z-10"
                            >
                                <span className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter" style={{ color: displayColor }}>
                                    {mentalAge}
                                </span>
                                <span className="text-xl md:text-3xl font-bold ml-2 text-gray-400 absolute top-4 -right-8 md:-right-12">
                                    {t("common.unit_age")}
                                </span>
                            </motion.div>

                            {/* Decorative Background Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-50 rounded-full blur-3xl -z-0 opacity-50"></div>
                        </div>

                        {/* Comparison Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-white font-medium shadow-md"
                            style={{ background: displayColor }}
                        >
                            {isSame ? (
                                <span>{language === 'zh' ? "与实际年龄完全一致" : "Matches your Real Age"}</span>
                            ) : (
                                <>
                                    <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-white">{diffText}</span>
                                    <span className="opacity-90">{diffLabel}</span>
                                </>
                            )}
                        </motion.div>

                        {/* Title & Gradient Bar */}
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                {language === "zh" ? result.titleZh : result.titleEn}
                            </h2>
                            <div className="h-2 w-24 md:w-32 mx-auto rounded-full" style={{ background: result.bgGradient }} />
                        </div>

                        {!isPreviewMode && (
                            <div className="w-full mb-8">
                                <AdUnit slot="RESULT_TOP_SLOT" />
                            </div>
                        )}

                        <p className="text-gray-400 text-sm mb-8">
                            Real Age: {realAge}
                        </p>

                        {/* Detailed Analysis Section */}
                        <div className="text-left bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                                {language === 'zh' ? "性格侧写" : "Personality Profile"}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {language === "zh" ? result.descriptionZh : result.descriptionEn}
                            </p>

                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                                {language === 'zh' ? "深度分析" : "Deep Analysis"}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {language === "zh" ? result.analysisZh : result.analysisEn}
                            </p>
                        </div>



                    </div>

                    {!isPreviewMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 }}
                            className="flex flex-row gap-4 px-4 mt-8 w-full max-w-5xl mx-auto"
                        >
                            <motion.button
                                onClick={handleEnterPreview}
                                className="flex-1 py-5 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-2xl font-bold text-lg md:text-xl flex items-center justify-between px-6 hover:opacity-95 transition-all shadow-xl disabled:opacity-70"
                                whileTap={{ scale: 0.98 }}
                            >
                                <Camera className="w-6 h-6" />
                                <span>{t("common.share")}</span>
                                <Share2 className="w-6 h-6" />
                            </motion.button>

                            <motion.button
                                onClick={onRestart}
                                className="py-5 px-6 bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
                                whileTap={{ scale: 0.98 }}
                            >
                                <RefreshCw className="w-5 h-5" />
                                {t("result.restart")}
                            </motion.button>
                        </motion.div>
                    )}

                    {/* About Mental Age - SEO / Educational Content - Moved Here */}
                    {!isPreviewMode && (
                        <div className="w-full max-w-5xl mx-auto mt-12 mb-16 px-4">
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 text-left">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                                    {t("common.mental_age_about_title")}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-wrap">
                                    {t("common.mental_age_about_content")}
                                </p>

                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span>🧠</span> {t("common.mental_age_brain_title")}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                    {t("common.mental_age_brain_content")}
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div >
        </>
    );
}

