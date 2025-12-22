"use client";


import { motion } from "framer-motion";
import { RefreshCw, Share2, Download } from "lucide-react";
import type { ResultCategory } from "@/lib/quiz-data";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

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

    // 满分100分制
    const maxScore = 100;
    const displayScore = Math.min(score, maxScore);
    const percentage = Math.round((displayScore / maxScore) * 100);

    const handleShare = async () => {
        if (!resultRef.current || isGenerating) return;

        setIsGenerating(true);
        try {
            // 等待一下以确保UI稳定
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(resultRef.current, {
                useCORS: true,
                backgroundColor: null, // Allow transparency for rounded corners
                logging: false,
            } as any);

            const image = canvas.toDataURL("image/png");

            // 创建下载链接
            const link = document.createElement("a");
            link.href = image;
            link.download = `恋爱测试结果-${result.titleZh}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err: any) {
            console.error("生成图片失败:", err);
            alert(`生成图片失败: ${err?.message || "未知错误"}`);
        } finally {
            setIsGenerating(false);
        }
    };

    // 圆环尺寸参数
    const size = 180;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-50 via-white to-indigo-50"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-4xl text-center"
            >
                {/* 截图区域容器 */}
                {/* 截图区域容器 */}
                {/* 截图区域容器 - 恢复白卡风格 */}
                {/* 截图区域容器 - 恢复白卡风格 - 纯白背景防止Glitch */}
                <div
                    ref={resultRef}
                    className="p-8 rounded-3xl shadow-xl bg-white border border-gray-100 mx-auto"
                    style={{ backgroundColor: "#ffffff" }} // Ensure solid white for capture
                >
                    {/* Title */}
                    <p className="mb-6 text-lg" style={{ color: "#6b7280" }}>
                        你对 <span className="font-bold" style={{ color: "#1f2937" }}>他的喜欢程度</span> 位于：
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
                            <span className="text-base mt-1" style={{ color: "#9ca3af" }}>/ 100</span>
                        </div>
                    </div>

                    {/* 等级标题 */}
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="text-2xl font-bold mb-6"
                        style={{ color: "#f59e0b" }}
                    >
                        {result.titleZh}
                    </motion.h2>

                    {/* Segment Labels (Top) */}
                    <div className="flex justify-between text-xs mb-1 px-1">
                        <span style={{ color: "#ef4444" }}>一时脑热</span>
                        <span style={{ color: "#6b7280" }}>小鹿乱撞</span>
                        <span style={{ color: "#2563eb" }}>永生挚爱</span>
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

                    {/* Segment Labels (Bottom) */}
                    <div className="flex justify-between text-xs mb-8 px-1">
                        <span style={{ color: "#9ca3af" }}></span>
                        <span style={{ color: "#6b7280" }}>云淡风轻</span>
                        <span style={{ color: "#3b82f6" }}>绝对理想型</span>
                        <span style={{ color: "#9ca3af" }}></span>
                    </div>

                    {/* Result Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="rounded-xl p-6 shadow-lg mb-6 text-left"
                        style={{ backgroundColor: "#ffffff", borderColor: "#f3f4f6", borderWidth: "1px", borderStyle: "solid" }}
                    >
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: "#1f2937" }}>
                            💡 你的情感现状分析
                        </h3>
                        <p className="leading-relaxed mb-6" style={{ color: "#4b5563" }}>
                            {result.descriptionZh}
                        </p>

                        <div className="rounded-lg p-4" style={{ backgroundColor: "#ecfdf5", borderColor: "#d1fae5", borderWidth: "1px", borderStyle: "solid" }}>
                            <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: "#065f46" }}>
                                ❤️ 给你的恋爱建议
                            </h3>
                            <p className="font-medium leading-relaxed" style={{ color: "#047857" }}>
                                {result.adviceZh}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex gap-3 px-4"
                >
                    <motion.button
                        onClick={onRestart}
                        className="flex-1 py-3.5 bg-white rounded-xl font-medium text-gray-600 border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                        whileTap={{ scale: 0.98 }}
                    >
                        <RefreshCw className="w-4 h-4" />
                        重新测试
                    </motion.button>

                    <motion.button
                        onClick={handleShare}
                        disabled={isGenerating}
                        className="flex-1 py-3.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-70"
                        whileTap={{ scale: 0.98 }}
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                生成中...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                保存结果图片
                            </>
                        )}
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div >
    );
}
