"use client";

import { motion } from "framer-motion";
import { RefreshCw, Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultScreenZhananProps {
    score: number;
    onRestart: () => void;
}

// 20种渐变色配置 (来自arealme.com)
const gradientColors = [
    ["#899480", "#b2c0cb"],
    ["#5d5169", "#878f63"],
    ["#5b3939", "#b0adb0"],
    ["#a79a66", "#735433"],
    ["#4a7f7b", "#a6905a"],
    ["#2d5898", "#86b7b5"],
    ["#6f5f90", "#758eb7"],
    ["#53b6b0", "#3a2455"],
    ["#36905e", "#4c641d"],
    ["#1168c1", "#29905a"],
    ["#ff578a", "#00ffea"],
    ["#64aaf8", "#ed4e86"],
    ["#07d3c7", "#e80ab1"],
    ["#68b7e9", "#8b3edb"],
    ["#703bc0", "#2365a8"],
    ["#baa138", "#7d2dc8"],
    ["#f3781e", "#512b90"],
    ["#ff00a8", "#fba73a"],
    ["#cc2b5e", "#753a88"],
    ["#de184b", "#1f2556"],
];

// 星级评分数组
const starRatings = [
    "☆", "★", "★☆", "★★", "★★☆", "★★★", "★★★☆",
    "★★★★", "★★★★☆", "★★★★★", "★★★★★☆", "★★★★★★", "★★★★★★☆", "★★★★★★★"
];

// 结果等级定义
const resultLevels = [
    { minScore: 100, title: "渣男毁灭者", titleEn: "Destroyer", description: "渣男见到你唯恐避之不及，你的存在是他们的噩梦", descriptionEn: "Toxic men fear you. Your existence is their nightmare." },
    { minScore: 90, title: "渣男氪金眼", titleEn: "Expert Eye", description: "任何渣男都逃不过你的法眼，他们在你眼里无处遁形", descriptionEn: "No toxic man escapes your sharp eyes. They have nowhere to hide." },
    { minScore: 80, title: "渣男躲避机", titleEn: "Dodger", description: "你能轻松识别大多数渣男的套路，但极偶尔会被渣男套路", descriptionEn: "You can spot most toxic patterns, but occasionally get caught." },
    { minScore: 70, title: "渣男摇摆人", titleEn: "Waverer", description: "你会对渣男的行为有所怀疑，但又不敢100%确定，有时容易陷入渣男的套路", descriptionEn: "You suspect toxic behavior but aren't always sure, sometimes falling into their traps." },
    { minScore: 60, title: "清纯小可爱", titleEn: "Innocent", description: "你的感情经历中一半是渣男，但你的单纯善良有时候会让渣男不忍下手", descriptionEn: "Half your relationships were toxic, but your innocence sometimes makes them hesitate." },
    { minScore: 50, title: "渣男收割机", titleEn: "Victim", description: "你的感情经历几乎都是被渣男套路的故事，你深受渣男伤害却又无可奈何", descriptionEn: "Almost all your relationships were toxic. You've been hurt but feel helpless." },
    { minScore: -Infinity, title: "懵懂傻白甜", titleEn: "Naive", description: "你根本无力辨别渣男的套路，只能默默忍受他们的玩弄", descriptionEn: "You can't identify toxic patterns at all, silently enduring their manipulation." },
];

// 获取结果等级
function getResultLevel(score: number) {
    for (const level of resultLevels) {
        if (score >= level.minScore) {
            return level;
        }
    }
    return resultLevels[resultLevels.length - 1];
}

// 获取渐变色 (根据分数)
function getGradientColors(score: number): [string, string] {
    const index = Math.min(Math.floor((score / 100) * 19), 19);
    return gradientColors[index] as [string, string];
}

// 获取星级评分
function getStarRating(score: number): string {
    const index = Math.min(Math.floor((score / 100) * 13), 13);
    return starRatings[index];
}

// 渲染星级 (半星用低透明度)
function renderStars(rating: string) {
    return rating.split("").map((char, i) => {
        if (char === "☆") {
            return <span key={i} style={{ opacity: 0.5 }}>★</span>;
        }
        return <span key={i}>{char}</span>;
    });
}

export function ResultScreenZhanan({ score, onRestart }: ResultScreenZhananProps) {
    const { language } = useLanguage();
    const [displayScore, setDisplayScore] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const animationRef = useRef<number | null>(null);

    const result = getResultLevel(score);
    const [color1, color2] = getGradientColors(score);
    const stars = getStarRating(score);

    // 滚动到顶部
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    // 分数计数动画 (5秒, easeOutQuint)
    useEffect(() => {
        const startTime = performance.now();
        const duration = 5000;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuint
            const eased = 1 - Math.pow(1 - progress, 5);
            const currentScore = Math.round(score * eased);

            setDisplayScore(currentScore);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setShowContent(true);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [score]);

    const shareText = language === "zh"
        ? `我的渣男辨别力指数是 ${score}, 你能识别渣男的套路吗？`
        : `My Toxic Detection Score is ${score}. Can you spot the red flags?`;

    const handleEnterPreview = () => {
        setIsPreviewMode(true);
    };

    const handleExitPreview = () => {
        setIsPreviewMode(false);
    };

    return (
        <>
            {/* 预览模式遮罩层 */}
            {isPreviewMode && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer"
                    onClick={handleExitPreview}
                >
                    <p className="fixed top-8 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-pulse">
                        {language === 'zh' ? '长按图片保存，点击任意位置退出' : 'Long press to save, tap to exit'}
                    </p>
                </div>
            )}

            {/* 主内容 - 预览模式时变为全屏固定 */}
            <div
                className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex flex-col items-center justify-center px-4
                    ${isPreviewMode ? 'fixed inset-0 z-[60] !pt-16 !pb-8 overflow-y-auto cursor-pointer' : 'pt-28 pb-12'}`}
                onClick={isPreviewMode ? handleExitPreview : undefined}
            >
                <div className="mx-auto w-full" style={{ maxWidth: "970px" }}>
                    {/* 分数显示 */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-gray-500 mb-2 text-sm">
                            {language === "zh" ? (
                                <>你的 <span className="font-bold">渣男鉴别力测试</span> 得分为：</>
                            ) : (
                                "Your Toxic Partner Detection Test Score:"
                            )}
                        </p>

                        {/* 超大分数 */}
                        <div className="relative">
                            <motion.span
                                className="inline-block leading-none"
                                style={{
                                    fontSize: "6rem",
                                    fontWeight: 300,
                                    color: color1,
                                    fontFamily: "system-ui, 'Helvetica Neue', Helvetica, arial, sans-serif"
                                }}
                            >
                                {displayScore}
                            </motion.span>
                            <span
                                style={{
                                    fontSize: "3rem",
                                    color: "#999",
                                    marginLeft: "4px"
                                }}
                            >
                                /100
                            </span>
                        </div>
                    </motion.div>

                    {/* 结果卡片 */}
                    <motion.div
                        className="text-white text-center relative overflow-hidden mx-auto"
                        style={{
                            width: "96%",
                            padding: "10px",
                            borderRadius: "15px",
                            fontWeight: 700,
                            fontSize: "1em",
                            background: `linear-gradient(160deg, ${color1}, ${color2})`,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {/* 加载中占位文字 */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: showContent ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-white/80 text-lg animate-pulse">
                                {language === "zh" ? "正在评价..." : "Evaluating..."}
                            </span>
                        </motion.div>

                        {/* 称号 */}
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {language === "zh" ? result.title : result.titleEn}
                        </motion.h2>

                        {/* 描述 */}
                        <motion.p
                            className="text-white/90 mb-2 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {language === "zh" ? result.description : result.descriptionEn}
                        </motion.p>

                        {/* 星级评分 */}
                        <motion.div
                            style={{
                                fontSize: "22px",
                                fontWeight: 400,
                                margin: "5px auto",
                                verticalAlign: "middle",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {renderStars(stars)}
                        </motion.div>
                    </motion.div>

                    {/* 操作按钮 - 预览模式时隐藏 */}
                    {!isPreviewMode && (
                        <motion.div
                            className="flex gap-4 mt-8 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <button
                                onClick={handleEnterPreview}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all"
                            >
                                <Camera className="w-5 h-5" />
                                <span>{language === "zh" ? "截图分享" : "Screenshot"}</span>
                            </button>
                            <button
                                onClick={onRestart}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <RefreshCw className="w-5 h-5" />
                                <span>{language === "zh" ? "重新测试" : "Retry"}</span>
                            </button>
                        </motion.div>
                    )}

                    {/* 分享文案 - 预览模式时隐藏 */}
                    {!isPreviewMode && (
                        <motion.p
                            className="text-center text-gray-400 text-sm mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            {shareText}
                        </motion.p>
                    )}
                </div>
            </div>
        </>
    );
}

