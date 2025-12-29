"use client";

import { motion } from "framer-motion";
import { RefreshCw, Camera, Link2 } from "lucide-react";
import type { ResultCategory } from "@/lib/quiz-data";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdUnit } from "@/components/AdUnit";

interface ResultScreenProps {
    score: number;
    result: ResultCategory;
    onRestart: () => void;
    personName?: string;
    gender?: "male" | "female";
}

// Result bar segments
const segments = [
    { label: "一时脑热", color: "bg-red-400", textColor: "text-red-500", hex: "#ef4444" },
    { label: "云淡风轻", color: "bg-orange-300", textColor: "text-orange-500", hex: "#f97316" }, // Corrected to Orange
    { label: "小鹿乱撞", color: "bg-gray-400", textColor: "text-gray-600", hex: "#4b5563" },
    { label: "绝对理想型", color: "bg-blue-300", textColor: "text-blue-500", hex: "#3b82f6" },
    { label: "永生挚爱", color: "bg-blue-600", textColor: "text-blue-700", hex: "#1d4ed8" },
];

export function ResultScreen({ score, result, onRestart, personName, gender = "male" }: ResultScreenProps) {
    const resultRef = useRef<HTMLDivElement>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const { t, language } = useLanguage();

    // Get color based on score (0-100)
    const getThemeColor = (s: number) => {
        if (s < 20) return segments[0];
        if (s < 40) return segments[1];
        if (s < 60) return segments[2];
        if (s < 80) return segments[3];
        return segments[4];
    };

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

    const maxScore = 100;
    const displayScore = Math.min(score, maxScore);
    const percentage = Math.round((displayScore / maxScore) * 100);
    const theme = getThemeColor(displayScore);

    const handleEnterPreview = () => {
        setIsPreviewMode(true);
    };

    const handleCaptureAndClose = () => {
        setIsPreviewMode(false);
    };

    const size = 96;
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
                className={`min-h-screen flex flex-col items-center pt-0 pb-8 md:pt-20 md:pb-16 px-0 md:px-6 bg-gradient-to-br from-rose-50 via-white to-indigo-50 ${isPreviewMode ? 'fixed inset-0 z-[60] overflow-y-auto cursor-pointer justify-start pt-0' : ''}`}
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
                        style={{ backgroundColor: "#ffffff" }}
                    >
                        {!isPreviewMode && (
                            <div className="w-full mb-6 min-h-[0px]">
                                {/* Ad moved to mid-page */}
                            </div>
                        )}

                        <p className="mb-3 text-sm md:text-lg md:mb-6" style={{ color: "#6b7280" }}>
                            {language === "zh" ? (
                                <>你对 <span className="font-bold" style={{ color: "#1f2937" }}>{personName || (gender === "female" ? "她" : "他")}的喜欢程度</span> 位于：</>
                            ) : (
                                <>Your love level for <span className="font-bold" style={{ color: "#1f2937" }}>{personName || (gender === "female" ? "Her" : "Him")}</span> is:</>
                            )}
                        </p>

                        <div className="relative mx-auto mb-6" style={{ width: size, height: size }}>
                            <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#93c5fd" />
                                        <stop offset="50%" stopColor="#60a5fa" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke="#e5e7eb"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                <motion.circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke="url(#scoreGradient)"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={{
                                        strokeDasharray: `${(percentage / 100) * circumference} ${circumference}`,
                                    }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    className="text-4xl font-bold leading-none"
                                    style={{
                                        color: "#3b82f6",
                                        fontFamily: "ui-sans-serif, system-ui, sans-serif"
                                    }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                >
                                    {displayScore}
                                </motion.span>
                                <div className="w-10 h-[1.5px] bg-gray-400 my-0.5"></div>
                                <span className="text-sm font-medium leading-none" style={{ color: "#9ca3af" }}>100</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 text-[10px] sm:text-xs md:text-base font-bold mb-1 px-0 tracking-tight whitespace-nowrap">
                            <div className="text-left" style={{ color: "#e11d48" }}>{language === "zh" ? "一时脑热" : "Impulse"}</div>
                            <div></div>
                            <div className="text-center" style={{ color: "#9ca3af" }}>{language === "zh" ? "小鹿乱撞" : "Crush"}</div>
                            <div></div>
                            <div className="text-right" style={{ color: "#2563eb" }}>{language === "zh" ? "永生挚爱" : "Love"}</div>
                        </div>

                        <div className="relative mb-1">
                            <div className="flex h-1.5 md:h-3 rounded-full overflow-hidden">
                                {segments.map((seg, i) => {
                                    let hexColor = "#d1d5db";
                                    if (seg.color.includes("red-400")) hexColor = "#f87171";
                                    if (seg.color.includes("orange-300")) hexColor = "#fdba74";
                                    if (seg.color.includes("gray-300")) hexColor = "#d1d5db";
                                    if (seg.color.includes("gray-400")) hexColor = "#9ca3af";
                                    if (seg.color.includes("blue-300")) hexColor = "#93c5fd";
                                    if (seg.color.includes("blue-500")) hexColor = "#3b82f6";
                                    if (seg.color.includes("blue-600")) hexColor = "#2563eb";

                                    return (
                                        <div key={i} className="flex-1" style={{ backgroundColor: hexColor }} />
                                    );
                                })}
                            </div>
                            <motion.div
                                className="absolute top-0 -mt-1.5 drop-shadow-md z-10"
                                initial={{ left: "0%" }}
                                animate={{ left: `${percentage}%` }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                style={{ transform: "translateX(-50%)" }}
                            >
                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent md:border-l-[12px] md:border-r-[12px] md:border-t-[18px]" style={{ borderTopColor: "#facc15" }} />
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-5 text-[10px] sm:text-xs md:text-base font-bold mb-3 px-0 mt-1 tracking-tight whitespace-nowrap">
                            <div></div>
                            <div className="text-center" style={{ color: "#ea580c" }}>{language === "zh" ? "云淡风轻" : "Friends"}</div>
                            <div></div>
                            <div className="text-center" style={{ color: "#60a5fa" }}>{language === "zh" ? "绝对理想型" : "Ideal"}</div>
                            <div></div>
                        </div>

                        {/* Result Description - Tighter Vertical Spacing */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="mt-4 w-full mx-auto px-1 space-y-2"
                        >
                            {/* Analysis Section - Dynamic Theme Color */}
                            <div className="rounded-xl p-2.5 md:p-6 border bg-opacity-50"
                                style={{ backgroundColor: `${theme.hex}08` /* 5% opacity */, borderColor: `${theme.hex}20` /* 20% opacity */ }}>
                                <h3 className="flex items-center font-bold text-sm md:text-lg mb-0.5 md:mb-3"
                                    style={{ color: theme.hex }}>
                                    <span className="w-1 h-3 md:h-5 rounded-full mr-2" style={{ backgroundColor: theme.hex }}></span>
                                    {t("result.analysis_title")}
                                </h3>
                                <p
                                    className="text-[1rem] md:text-lg font-bold leading-relaxed md:leading-[1.8]"
                                    style={{
                                        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
                                        textAlign: 'justify',
                                        textAlignLast: 'left',
                                        textJustify: 'inter-ideograph' as any,
                                        color: theme.hex // Dynamic Text Color!
                                    }}
                                >
                                    {getFinalText(language === "zh" ? result.descriptionZh : result.descriptionEn)}
                                </p>
                            </div>

                            {!isPreviewMode && (
                                <div className="w-full">
                                    <AdUnit slot="RESULT_TOP_SLOT" />
                                </div>
                            )}

                            {/* Advice Section - Static Green for Contrast */}
                            <div className="rounded-xl p-2.5 md:p-6 border bg-emerald-50/50 border-emerald-100"
                                style={{ backgroundColor: '#ecfdf5', borderColor: '#d1fae5' }}>
                                <h3 className="flex items-center font-bold text-sm md:text-lg mb-0.5 md:mb-3"
                                    style={{ color: '#059669' }}>
                                    <span className="w-1 h-3 md:h-5 rounded-full mr-2" style={{ backgroundColor: '#059669' }}></span>
                                    {t("result.advice_title")}
                                </h3>
                                <p
                                    className="text-[1rem] md:text-lg font-bold leading-relaxed md:leading-[1.8]"
                                    style={{
                                        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
                                        textAlign: 'justify',
                                        textAlignLast: 'left',
                                        textJustify: 'inter-ideograph' as any,
                                        color: '#047857' // emerald-700
                                    }}
                                >
                                    {getFinalText(language === "zh" ? result.adviceZh : result.adviceEn)}
                                </p>
                            </div>
                        </motion.div>

                        {!isPreviewMode && (
                            <div className="w-full max-w-5xl mx-auto px-1 mt-4">
                                {/* Bottom ad slot removed due to lack of ID */}
                            </div>
                        )}
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
                                className="flex-1 py-5 bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-400 text-white rounded-2xl font-bold text-lg md:text-xl flex items-center justify-between px-6 hover:opacity-95 transition-all shadow-xl disabled:opacity-70"
                                whileTap={{ scale: 0.98 }}
                            >
                                <Camera className="w-6 h-6" />
                                <span>{t("common.share")}</span>
                                <Link2 className="w-6 h-6" />
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
                </motion.div>
            </motion.div>
        </>
    );
}
