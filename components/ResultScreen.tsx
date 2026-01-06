"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Camera, Link2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import type { ResultCategory } from "@/lib/quiz-data";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdUnit } from "@/components/AdUnit";

interface ResultScreenProps {
    score: number;
    result: ResultCategory;
    onRestart: () => void;
    personName?: string;
    gender?: "male" | "female";
    quizType?: "love-quiz" | "does-he-like-me" | "do-i-like-her" | "do-i-like-him";
}

// Arealme.com score configuration - score ranges and colors
const scoreConfig = [
    { range: [90, 100], label: "永生挚爱", labelEn: "Love", color: "#6488C1" },
    { range: [65, 90], label: "绝对理想型", labelEn: "Ideal", color: "#BCD4E6" },
    { range: [40, 65], label: "小鹿乱撞", labelEn: "Crush", color: "#D0CBCB" },
    { range: [18, 40], label: "云淡风轻", labelEn: "Friends", color: "#CD5C5D" },
    { range: [0, 18], label: "一时脑热", labelEn: "Impulse", color: "#B33C3C" },
];

// Get theme color based on score (arealme.com logic)
const getScoreConfig = (score: number) => {
    for (const config of scoreConfig) {
        if (score >= config.range[0]) {
            return config;
        }
    }
    return scoreConfig[scoreConfig.length - 1]; // Default to lowest
};

export function ResultScreen({ score, result, onRestart, personName, gender = "male", quizType = "love-quiz" }: ResultScreenProps) {
    const resultRef = useRef<HTMLDivElement>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [showAdvice, setShowAdvice] = useState(false);
    const [isAdviceLoading, setIsAdviceLoading] = useState(false);
    const { t, language } = useLanguage();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const maxScore = 100;
    const displayScore = Math.min(score, maxScore);
    const percentage = Math.round((displayScore / maxScore) * 100);

    // Get dynamic theme color based on score (arealme.com style)
    const currentConfig = getScoreConfig(displayScore);
    const themeColor = currentConfig.color; // Dynamic color based on score level

    // Dynamic text replacement
    const getFinalText = (text: string) => {
        if (!text) return "";
        let newText = text;

        if (personName && personName.trim()) {
            newText = newText.replaceAll("他", personName.trim());
        }

        if (gender === "female") {
            newText = newText.replaceAll("他", "她");
        }

        return newText;
    };

    const handleEnterPreview = () => {
        setIsPreviewMode(true);
    };

    const handleCaptureAndClose = () => {
        setIsPreviewMode(false);
    };

    const handleToggleAdvice = () => {
        if (showAdvice) {
            // Hide advice immediately
            setShowAdvice(false);
        } else {
            // Show loading first, then show content
            setIsAdviceLoading(true);
            setTimeout(() => {
                setIsAdviceLoading(false);
                setShowAdvice(true);
            }, 1500); // 1.5 seconds loading animation
        }
    };

    const size = 140;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <>
            {isPreviewMode && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
                    onClick={handleCaptureAndClose}
                >
                    <p className="fixed top-8 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-pulse">
                        点击任意位置退出预览
                    </p>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`min-h-screen flex flex-col items-center pt-20 pb-8 md:pt-24 md:pb-16 px-4 md:px-6 bg-gradient-to-br from-rose-50 via-white to-indigo-50 ${isPreviewMode ? 'fixed inset-0 z-[60] overflow-y-auto cursor-pointer justify-start pt-0 !px-0 !bg-white' : ''}`}
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
                            pt-16 pb-4 px-4
                            md:px-12 md:pb-12 md:pt-12 md:rounded-[2rem] md:shadow-xl md:border md:border-gray-100 md:min-h-0
                            ${isPreviewMode ? '!pt-56 !pb-20 w-full' : ''}
                        `}
                        style={{ backgroundColor: "#ffffff" }}
                    >
                        {!isPreviewMode && (
                            <div className="w-full mb-6 min-h-[0px]">
                                {/* Ad moved to mid-page */}
                            </div>
                        )}

                        <p className="mb-3 text-sm md:text-lg" style={{ color: "#6b7280" }}>
                            {quizType === "does-he-like-me" ? (
                                // "Does He Like Me" quiz - show HIS feelings for YOU
                                language === "zh" ? (
                                    <>经测试，<span className="font-bold" style={{ color: "#1f2937" }}>{personName || (gender === "female" ? "她" : "他")}对你的喜欢程度</span> 位于：</>
                                ) : (
                                    <><span className="font-bold" style={{ color: "#1f2937" }}>{personName || (gender === "female" ? "Her" : "His")}</span> love level for you is:</>
                                )
                            ) : (
                                // "Love Quiz" / "Do I Like Her" - show YOUR feelings for THEM
                                language === "zh" ? (
                                    <>你对 <span className="font-bold" style={{ color: "#1f2937" }}>{personName || (gender === "female" ? "她" : "他")}的喜欢程度</span> 位于：</>
                                ) : (
                                    <>Your love level for <span className="font-bold" style={{ color: "#1f2937" }}>{personName || (gender === "female" ? "Her" : "Him")}</span> is:</>
                                )
                            )}
                        </p>

                        {/* Score Circle - Double Ring Style */}
                        <div className="relative mx-auto mb-8" style={{ width: size, height: size }}>
                            {/* Background Ring */}
                            <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke="#e5e7eb"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                {/* Progress Ring - Dynamic Color */}
                                <motion.circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke={themeColor}
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={{
                                        strokeDasharray: `${(percentage / 100) * circumference} ${circumference}`,
                                    }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                                />
                                {/* Inner Thin Border Ring (Cosmetic) */}
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius - strokeWidth + 2}
                                    stroke={themeColor}
                                    strokeWidth="1"
                                    fill="none"
                                    opacity="0.5"
                                />
                            </svg>
                            {/* Score Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    className="leading-none"
                                    style={{
                                        fontSize: "43px",
                                        fontWeight: 400,
                                        color: themeColor,
                                        fontFamily: "system-ui, 'Helvetica Neue', Helvetica, arial, sans-serif"
                                    }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                >
                                    {displayScore}
                                </motion.span>
                                <div className="w-12 h-[1px] bg-blue-200 my-1"></div>
                                <span style={{ fontSize: "14.4px", color: "#999999" }}>100</span>
                            </div>
                        </div>

                        {/* Result Scale Container - SVG Progress Bar (arealme.com style) */}
                        <div className="relative w-full mb-6 scale-[0.99] sm:scale-75 md:scale-100 origin-top">
                            <svg
                                viewBox="-10 0 520 74"
                                width="100%"
                                preserveAspectRatio="none"
                                style={{ overflow: 'visible' }}
                            >
                                {/* Bar segments with correct proportions based on score ranges */}
                                {/* 永生挚爱 90-100: x=450, width=50 */}
                                <rect x="450" y="31" width="50" height="10" fill="#6488C1" />
                                {/* 绝对理想型 65-90: x=325, width=125 */}
                                <rect x="325" y="31" width="125" height="10" fill="#BCD4E6" />
                                {/* 小鹿乱撞 40-65: x=200, width=125 */}
                                <rect x="200" y="31" width="125" height="10" fill="#D0CBCB" />
                                {/* 云淡风轻 18-40: x=90, width=110 */}
                                <rect x="90" y="31" width="110" height="10" fill="#CD5C5D" />
                                {/* 一时脑热 0-18: x=0, width=90 */}
                                <rect x="0" y="31" width="90" height="10" fill="#B33C3C" />

                                {/* Labels - alternating top (y=15) and bottom (y=65) */}
                                {/* 永生挚爱 - top right */}
                                <text>
                                    <tspan x="500" y="15" textAnchor="end" fontWeight="bold" fontSize="12" fill="#6488C1">
                                        {language === "zh" ? "永生挚爱" : "Love"}
                                    </tspan>
                                </text>
                                {/* 绝对理想型 - bottom center */}
                                <text>
                                    <tspan x="387.5" y="65" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#BCD4E6">
                                        {language === "zh" ? "绝对理想型" : "Ideal"}
                                    </tspan>
                                </text>
                                {/* 小鹿乱撞 - top center */}
                                <text>
                                    <tspan x="262.5" y="15" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#D0CBCB">
                                        {language === "zh" ? "小鹿乱撞" : "Crush"}
                                    </tspan>
                                </text>
                                {/* 云淡风轻 - bottom center */}
                                <text>
                                    <tspan x="145" y="65" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#CD5C5D">
                                        {language === "zh" ? "云淡风轻" : "Friends"}
                                    </tspan>
                                </text>
                                {/* 一时脑热 - top left */}
                                <text>
                                    <tspan x="0" y="15" textAnchor="start" fontWeight="bold" fontSize="12" fill="#B33C3C">
                                        {language === "zh" ? "一时脑热" : "Impulse"}
                                    </tspan>
                                </text>

                                {/* Yellow Indicator Arrow - position based on score */}
                                <g
                                    id="indicator_mc"
                                    transform={`translate(${displayScore * 5 - 4}, 31)`}
                                >
                                    <polygon
                                        points="0,-2 8,-2 8,8 4,13 0,8"
                                        fill="#FACC15"
                                        stroke="#000"
                                        strokeWidth="1.1"
                                    />
                                </g>
                            </svg>
                        </div>

                        <div className="w-full mx-auto space-y-2 scale-[0.99] sm:scale-75 md:scale-100 origin-top">
                            {/* Analysis Section - Minimalist */}
                            <div className="w-full mx-auto">
                                <p
                                    className="leading-relaxed text-left"
                                    style={{
                                        fontSize: "17.6px",
                                        fontWeight: 700,
                                        color: themeColor,
                                        fontFamily: "system-ui, 'Helvetica Neue', Helvetica, arial, sans-serif",
                                        paddingLeft: "1.92%",
                                        paddingRight: "1.92%"
                                    }}
                                >
                                    {getFinalText(language === "zh" ? result.descriptionZh : result.descriptionEn)}
                                </p>
                            </div>

                            {!isPreviewMode && (
                                <div className="w-full mt-4">
                                    <AdUnit slot="RESULT_TOP_SLOT" />
                                </div>
                            )}

                            {/* Advice Section - Toggleable with Loading Animation */}
                            <AnimatePresence>
                                {(showAdvice || isAdviceLoading) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden w-full max-w-4xl mx-auto mt-6"
                                    >
                                        {isAdviceLoading ? (
                                            /* Loading Animation */
                                            <div className="bg-indigo-50/50 rounded-2xl p-8 border border-indigo-100 relative overflow-hidden">
                                                <div className="flex flex-col items-center justify-center space-y-4">
                                                    {/* Spinning Sparkles */}
                                                    <div className="relative w-16 h-16">
                                                        <Sparkles className="absolute inset-0 w-full h-full text-indigo-300 animate-pulse" />
                                                        <Sparkles
                                                            className="absolute inset-0 w-full h-full text-indigo-500"
                                                            style={{
                                                                animation: 'spin 2s linear infinite',
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Loading Text */}
                                                    <p className="text-lg font-bold text-indigo-700 animate-pulse">
                                                        ✨ AI 正在分析中...
                                                    </p>

                                                    {/* Bouncing Dots */}
                                                    <div className="flex space-x-2">
                                                        <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                        <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                        <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Advice Content */
                                            <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 text-left relative">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400 rounded-l-2xl" />
                                                <h3 className="flex items-center gap-2 font-bold text-indigo-900 text-lg mb-3">
                                                    <Sparkles className="w-5 h-5 text-indigo-500" />
                                                    {language === "zh" ? "AI 情感建议" : "AI Relationship Advice"}
                                                </h3>
                                                <p className="text-slate-800 font-bold leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                                                    {getFinalText(language === "zh" ? result.adviceZh || result.descriptionZh : result.adviceEn || result.descriptionEn)}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!isPreviewMode && (
                            <div className="w-full max-w-5xl mx-auto px-1 mt-4">
                                {/* Bottom ad slot removed due to lack of ID */}
                            </div>
                        )}
                    </div>

                    {!isPreviewMode && (
                        <div className="w-full max-w-5xl mx-auto px-4 mt-8 pb-8 space-y-5">
                            {/* Primary Actions Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="flex flex-col md:flex-row gap-4"
                            >
                                {/* AI Advice Button */}
                                <motion.button
                                    onClick={handleToggleAdvice}
                                    disabled={isAdviceLoading}
                                    className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-sm border-2 ${(showAdvice || isAdviceLoading)
                                        ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                                        : "bg-white text-indigo-600 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50"
                                        } ${isAdviceLoading ? "cursor-wait" : ""}`}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Sparkles className={`w-5 h-5 ${(showAdvice || isAdviceLoading) ? "animate-pulse" : ""}`} />
                                    <span>
                                        {isAdviceLoading
                                            ? (language === "zh" ? "AI 分析中..." : "AI Analyzing...")
                                            : (language === "zh" ? (showAdvice ? "收起建议" : "查看 AI 建议") : (showAdvice ? "Hide Advice" : "View Advice"))
                                        }
                                    </span>
                                    {!isAdviceLoading && (showAdvice ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />)}
                                </motion.button>

                                {/* Capture Button */}
                                <motion.button
                                    onClick={handleEnterPreview}
                                    className="flex-1 py-4 px-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all shadow-md active:scale-95"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Camera className="w-6 h-6" />
                                    <span>{t("common.share")}</span>
                                </motion.button>
                            </motion.div>

                            {/* Secondary Action: Restart */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                                onClick={onRestart}
                                className="w-full py-4 text-gray-500 hover:text-gray-800 text-lg font-bold flex items-center justify-center gap-2 transition-colors border border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50/50"
                            >
                                <RefreshCw className="w-5 h-5" />
                                {t("result.restart")}
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
}
