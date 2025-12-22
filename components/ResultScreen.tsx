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
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(resultRef.current, {
                useCORS: true,
                scale: 2, // 提高清晰度
                backgroundColor: "#f9fafb", // bg-gray-50
            } as any);

            const image = canvas.toDataURL("image/png");

            // 创建下载链接
            const link = document.createElement("a");
            link.href = image;
            link.download = `恋爱测试结果-${result.titleZh}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("生成图片失败:", err);
            alert("抱歉，生成图片失败，请稍后重试");
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
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-4xl text-center"
            >
                {/* 截图区域容器 */}
                <div ref={resultRef} className="bg-gray-50 p-4 rounded-xl">
                    {/* Title */}
                    <p className="text-gray-500 mb-6 text-lg">
                        你对 <span className="font-bold text-gray-800">他的喜欢程度</span> 位于：
                    </p>

                    {/* Score Circle - 参考设计美化版 */}
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
                        {/* 中心分数显示 */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                            >
                                {displayScore}
                            </motion.span>
                            <span className="text-base text-gray-400 mt-1">/ 100</span>
                        </div>
                    </div>

                    {/* 等级标题 */}
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="text-2xl font-bold text-amber-500 mb-6"
                    >
                        {result.titleZh}
                    </motion.h2>

                    {/* Segment Labels (Top) */}
                    <div className="flex justify-between text-xs mb-1 px-1">
                        <span className="text-red-500">一时脑热</span>
                        <span className="text-gray-500">小鹿乱撞</span>
                        <span className="text-blue-600">永生挚爱</span>
                    </div>

                    {/* Result Bar */}
                    <div className="relative mb-2">
                        <div className="flex h-3 rounded-full overflow-hidden">
                            {segments.map((seg, i) => (
                                <div key={i} className={`flex-1 ${seg.color}`} />
                            ))}
                        </div>
                        {/* Marker */}
                        <motion.div
                            className="absolute top-0 -mt-1"
                            initial={{ left: "0%" }}
                            animate={{ left: `${percentage}%` }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                            style={{ transform: "translateX(-50%)" }}
                        >
                            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-yellow-400" />
                        </motion.div>
                    </div>

                    {/* Segment Labels (Bottom) */}
                    <div className="flex justify-between text-xs mb-8 px-1">
                        <span className="text-gray-400"></span>
                        <span className="text-gray-500">云淡风轻</span>
                        <span className="text-blue-500">绝对理想型</span>
                        <span className="text-gray-400"></span>
                    </div>

                    {/* Result Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6 text-left"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                            💡 你的情感现状分析
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {result.descriptionZh}
                        </p>

                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                            <h3 className="text-base font-bold text-emerald-800 mb-2 flex items-center gap-2">
                                ❤️ 给你的恋爱建议
                            </h3>
                            <p className="text-emerald-700 font-medium leading-relaxed">
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
        </motion.div>
    );
}
