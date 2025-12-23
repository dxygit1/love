"use client";


import { motion } from "framer-motion";
import { RefreshCw, Camera, Link2 } from "lucide-react";
import type { ResultCategory } from "@/lib/quiz-data";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultScreenProps {
    score: number;
    result: ResultCategory;
    onRestart: () => void;
}

// Result bar segments
const segments = [
    { label: "一时脑热", color: "bg-red-400", textColor: "text-red-500" },
    { label: "云淡风轻", color: "bg-gray-300", textColor: "text-gray-500" },
    { label: "小鹿乱撞", color: "bg-gray-400", textColor: "text-gray-600" },
    { label: "绝对理想型", color: "bg-blue-300", textColor: "text-blue-500" },
    { label: "永生挚爱", color: "bg-blue-500", textColor: "text-blue-600" },
];

export function ResultScreen({ score, result, onRestart }: ResultScreenProps) {
    const resultRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const { t, language } = useLanguage();

    // 满分100分制
    const maxScore = 100;
    const displayScore = Math.min(score, maxScore);
    const percentage = Math.round((displayScore / maxScore) * 100);

    const handleEnterPreview = () => {
        setIsPreviewMode(true);
    };

    const handleCaptureAndClose = async () => {
        if (!resultRef.current || isGenerating) return;

        setIsGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(resultRef.current, {
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            } as any);

            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = `LoveQuiz-Result-${language === "zh" ? result.titleZh : result.titleEn}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err: any) {
            console.error("图片生成失败:", err);
            alert(`图片生成失败: ${err?.message || "未知错误"}`);
        } finally {
            setIsGenerating(false);
            setIsPreviewMode(false);
        }
    };

    // 圆环尺寸参数
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <>
            {/* Screenshot Preview Overlay */}
            {isPreviewMode && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
                    onClick={handleCaptureAndClose}
                >
                    <p className="fixed top-8 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-pulse">
                        {isGenerating ? t("common.generating") : "点击任意位置保存图片"}
                    </p>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`min-h-screen flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-br from-rose-50 via-white to-indigo-50 ${isPreviewMode ? 'fixed inset-0 z-[60] overflow-auto cursor-pointer' : ''}`}
                onClick={isPreviewMode ? handleCaptureAndClose : undefined}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-5xl text-center"
                >
                    {/* 截图区域容器 */}
                    {/* 截图区域容器 */}
                    {/* 截图区域容器 - 恢复白卡风格 */}
                    {/* 截图区域容器 - 恢复白卡风格 - 纯白背景防止Glitch */}
                    <div
                        ref={resultRef}
                        className="p-8 md:p-12 rounded-[2rem] shadow-xl bg-white border border-gray-100 mx-auto"
                        style={{ backgroundColor: "#ffffff" }} // Ensure solid white for capture
                    >
                        {/* Title */}
                        <p className="mb-6 text-lg" style={{ color: "#6b7280" }}>
                            {language === "zh" ? (
                                <>你对 <span className="font-bold" style={{ color: "#1f2937" }}>他的喜欢程度</span> 位于：</>
                            ) : (
                                <>Your love level for <span className="font-bold" style={{ color: "#1f2937" }}>Him</span> is:</>
                            )}
                        </p>

                        {/* Score Circle */}
                        <div className="relative mx-auto mb-6" style={{ width: size, height: size }}>
                            {/* 定义渐变 */}
                            <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#93c5fd" />
                                        <stop offset="50%" stopColor="#60a5fa" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                                {/* 背景圆环 */}
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke="#e5e7eb"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                {/* 进度圆环 - 渐变色 */}
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
                            {/* 中心分数显示 - 保持纯色防止glitch */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    className="text-6xl font-bold"
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
                                <span className="text-xs mt-1 font-medium" style={{ color: "#9ca3af" }}>/ 100</span>
                            </div>
                        </div>

                        {/* Segment Labels (Top) - Grid Layout */}
                        <div className="grid grid-cols-5 text-sm md:text-base font-bold mb-2 px-0">
                            <div className="text-left" style={{ color: "#e11d48" }}>{language === "zh" ? "一时脑热" : "Impulse"}</div>
                            <div></div>
                            <div className="text-center" style={{ color: "#9ca3af" }}>{language === "zh" ? "小鹿乱撞" : "Crush"}</div>
                            <div></div>
                            <div className="text-right" style={{ color: "#2563eb" }}>{language === "zh" ? "永生挚爱" : "Love"}</div>
                        </div>

                        {/* Result Bar */}
                        <div className="relative mb-2">
                            <div className="flex h-3 rounded-full overflow-hidden">
                                {segments.map((seg, i) => {
                                    // Map classes to hex for manual override
                                    let hexColor = "#d1d5db"; // default gray-300
                                    if (seg.color.includes("red-400")) hexColor = "#f87171";
                                    if (seg.color.includes("gray-300")) hexColor = "#d1d5db";
                                    if (seg.color.includes("gray-400")) hexColor = "#9ca3af";
                                    if (seg.color.includes("blue-300")) hexColor = "#93c5fd";
                                    if (seg.color.includes("blue-500")) hexColor = "#3b82f6";

                                    return (
                                        <div key={i} className="flex-1" style={{ backgroundColor: hexColor }} />
                                    );
                                })}
                            </div>
                            {/* Marker */}
                            <motion.div
                                className="absolute top-0 -mt-1"
                                initial={{ left: "0%" }}
                                animate={{ left: `${percentage}%` }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                style={{ transform: "translateX(-50%)" }}
                            >
                                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent" style={{ borderTopColor: "#facc15" }} />
                            </motion.div>
                        </div>

                        {/* Segment Labels (Bottom) - Grid Layout */}
                        <div className="grid grid-cols-5 text-sm md:text-base font-bold mb-8 px-0 mt-2">
                            <div></div>
                            <div className="text-center" style={{ color: "#ea580c" }}>{language === "zh" ? "云淡风轻" : "Friends"}</div>
                            <div></div>
                            <div className="text-center" style={{ color: "#60a5fa" }}>{language === "zh" ? "绝对理想型" : "Ideal"}</div>
                            <div></div>
                        </div>

                        {/* Result Description - Justified Text Style */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="mt-6 w-full mx-auto px-1 space-y-4"
                        >
                            {/* Analysis Section - Rose Card */}
                            <div className="bg-rose-50/50 rounded-2xl p-5 md:p-6 border border-rose-100">
                                <h3 className="flex items-center text-rose-500 font-bold text-lg mb-3">
                                    <span className="w-1.5 h-5 bg-rose-500 rounded-full mr-2"></span>
                                    {t("result.analysis_title")}
                                </h3>
                                <p
                                    className="text-base md:text-lg font-medium"
                                    style={{
                                        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
                                        lineHeight: '1.8',
                                        textAlign: 'justify',
                                        textAlignLast: 'left',
                                        textJustify: 'inter-ideograph' as any,
                                        color: '#4b5563'
                                    }}
                                >
                                    {language === "zh" ? result.descriptionZh : result.descriptionEn}
                                </p>
                            </div>

                            {/* Advice Section - Blue Card */}
                            <div className="bg-blue-50/50 rounded-2xl p-5 md:p-6 border border-blue-100">
                                <h3 className="flex items-center text-blue-500 font-bold text-lg mb-3">
                                    <span className="w-1.5 h-5 bg-blue-500 rounded-full mr-2"></span>
                                    {t("result.advice_title")}
                                </h3>
                                <p
                                    className="text-base md:text-lg font-medium"
                                    style={{
                                        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
                                        lineHeight: '1.8',
                                        textAlign: 'justify',
                                        textAlignLast: 'left',
                                        textJustify: 'inter-ideograph' as any,
                                        color: '#4b5563'
                                    }}
                                >
                                    {language === "zh" ? result.adviceZh : result.adviceEn}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons - Hidden in Preview Mode */}
                    {!isPreviewMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 }}
                            className="flex flex-row gap-4 px-4 mt-8 w-full max-w-5xl mx-auto"
                        >
                            <motion.button
                                onClick={handleEnterPreview}
                                disabled={isGenerating}
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
