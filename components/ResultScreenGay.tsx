"use client";

import { motion } from "framer-motion";
import { RefreshCw, Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { gayDimensions, GayDimension } from "@/lib/quiz-data-gay";

interface ResultScreenGayProps {
    scores: Record<string, number>;
    onRestart: () => void;
}

export function ResultScreenGay({ scores, onRestart }: ResultScreenGayProps) {
    const resultRef = useRef<HTMLDivElement>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const handleEnterPreview = () => {
        setIsPreviewMode(true);
    };

    const handleCaptureAndClose = () => {
        setIsPreviewMode(false);
    };

    // 计算总分和百分比
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    // 数据准备 - 按百分比从大到小排序
    const chartData = gayDimensions
        .map(dim => ({
            key: dim.key,
            name: language === 'zh' ? dim.name : dim.nameEn,
            value: totalScore > 0 ? (scores[dim.key] / totalScore) * 100 : 0,
            score: scores[dim.key] || 0,
            color: dim.color,
            emoji: dim.emoji
        }))
        .filter(d => d.score > 0)
        .sort((a, b) => b.value - a.value);

    // 找出主导取向
    const dominantOrientation = chartData.length > 0 ? chartData[0] : null;

    // 自定义标签 - 精确匹配原网站样式
    const renderLabel = ({ cx, cy, midAngle, outerRadius, percent, name, emoji }: any) => {
        const RADIAN = Math.PI / 180;
        const LINE_LENGTH = 25;
        const HOOK_LENGTH = 12;
        const midRadius = outerRadius + LINE_LENGTH;
        const midX = cx + midRadius * Math.cos(-midAngle * RADIAN);
        const midY = cy + midRadius * Math.sin(-midAngle * RADIAN);
        const labelX = midX > cx ? midX + HOOK_LENGTH + 4 : midX - HOOK_LENGTH - 4;
        const labelY = midY;

        if (percent < 0.03) return null;

        return (
            <text
                x={labelX}
                y={labelY}
                fill="#333"
                textAnchor={midX > cx ? 'start' : 'end'}
                dominantBaseline="central"
                style={{
                    fontSize: '13px',
                    fontWeight: 500,
                }}
            >
                {emoji} {name}: {(percent * 100).toFixed(2)}%
            </text>
        );
    };

    // 自定义标签线 - 折线样式
    const renderLabelLine = (props: any) => {
        const { cx, cy, midAngle, outerRadius, stroke } = props;
        const RADIAN = Math.PI / 180;
        const LINE_LENGTH = 25;
        const HOOK_LENGTH = 12;

        const startX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
        const startY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

        const midRadius = outerRadius + LINE_LENGTH;
        const midX = cx + midRadius * Math.cos(-midAngle * RADIAN);
        const midY = cy + midRadius * Math.sin(-midAngle * RADIAN);

        const endX = midX > cx ? midX + HOOK_LENGTH : midX - HOOK_LENGTH;
        const endY = midY;

        return (
            <polyline
                points={`${startX},${startY} ${midX},${midY} ${endX},${endY}`}
                fill="none"
                stroke={stroke}
                strokeWidth={1}
            />
        );
    };

    return (
        <>
            {isPreviewMode && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
                    onClick={handleCaptureAndClose}
                >
                    <p className="fixed top-8 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-pulse">
                        {language === 'zh' ? '点击任意位置退出预览' : 'Click anywhere to exit preview'}
                    </p>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`min-h-screen flex flex-col items-center pt-20 pb-6 px-4 md:px-6 bg-white ${isPreviewMode ? 'fixed inset-0 z-[60] overflow-y-auto cursor-pointer !pt-10 !px-0 !bg-white' : ''}`}
                onClick={isPreviewMode ? handleCaptureAndClose : undefined}
            >
                {/* 顶部广告位占位 */}
                <div className="w-full h-20 mb-2" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-2xl text-center"
                >
                    <div
                        ref={resultRef}
                        className={`mx-auto max-w-2xl bg-white ${isPreviewMode ? 'w-full max-w-none px-4' : ''}`}
                        style={{ backgroundColor: "#ffffff" }}
                    >
                        {/* 标题 */}
                        <div className="text-base md:text-lg text-gray-600 mb-2">
                            {language === 'zh' ? '你的' : 'Your '}
                            <span className="font-bold text-gray-800 mx-2">
                                {language === 'zh' ? '性取向分布' : 'Sexual Orientation'}
                            </span>
                            {language === 'zh' ? '是这样的：' : 'is:'}
                        </div>

                        {/* 饼图容器 */}
                        <div className="w-full h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        startAngle={90}
                                        endAngle={-270}
                                        labelLine={renderLabelLine}
                                        label={renderLabel}
                                        outerRadius={130}
                                        innerRadius={0}
                                        dataKey="value"
                                        animationBegin={0}
                                        animationDuration={800}
                                        paddingAngle={0}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                                stroke="#fff"
                                                strokeWidth={2}
                                                style={{ outline: 'none', cursor: 'pointer' }}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-200">
                                                        <div className="text-sm text-gray-700 mb-1">
                                                            {data.name}: {data.value.toFixed(2)}%
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className="w-3 h-3 rounded-full inline-block"
                                                                style={{ backgroundColor: data.color }}
                                                            />
                                                            <span className="text-base font-bold text-gray-800">
                                                                : {data.score}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 主导取向结果 */}
                        {dominantOrientation && (
                            <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: `${dominantOrientation.color}15` }}>
                                <p className="text-gray-600 text-sm mb-1">
                                    {language === 'zh' ? '你的主导取向是' : 'Your dominant orientation is'}
                                </p>
                                <p className="text-2xl font-bold" style={{ color: dominantOrientation.color === '#FFE53E' ? '#B8860B' : dominantOrientation.color }}>
                                    {dominantOrientation.emoji} {dominantOrientation.name}
                                </p>
                            </div>
                        )}
                    </div>

                    {!isPreviewMode && (
                        <div className="w-full max-w-sm mx-auto px-4 mt-8 pb-8 space-y-3">
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                onClick={handleEnterPreview}
                                className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-medium text-base flex items-center justify-center gap-2 hover:shadow-lg transition-all shadow-md active:scale-95"
                                whileTap={{ scale: 0.98 }}
                            >
                                <Camera className="w-5 h-5" />
                                <span>{language === 'zh' ? '分享结果' : 'Share'}</span>
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                onClick={onRestart}
                                className="w-full py-2.5 text-gray-400 hover:text-gray-600 text-sm font-normal flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                {language === 'zh' ? '再测一次' : 'Try Again'}
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
}
