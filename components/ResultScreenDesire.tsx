"use client";

import { motion } from "framer-motion";
import { RefreshCw, Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { DimensionScore } from "@/hooks/useQuizDesire";

interface ResultScreenDesireProps {
    result: {
        scores: DimensionScore[];
        topDimension: DimensionScore;
        totalScore: number;
    };
    onRestart: () => void;
}

export function ResultScreenDesire({ result, onRestart }: ResultScreenDesireProps) {
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

    // 数据准备 - 按百分比从大到小排序
    const chartData = result.scores
        .filter(s => s.score > 0)
        .sort((a, b) => b.percentage - a.percentage)
        .map(s => ({
            name: language === 'zh' ? s.info.nameZh : s.info.nameEn,
            value: s.percentage,
            score: s.score,
            color: s.info.color,
            emoji: s.info.emoji
        }));

    // 自定义标签 - 精确匹配原网站样式
    // font-size: 12px, color: #333, 带emoji
    // 标签的Y坐标与钩子线齐平
    const renderLabel = ({ cx, cy, midAngle, outerRadius, percent, name, emoji }: any) => {
        const RADIAN = Math.PI / 180;

        // 斜线终点位置 (与labelLine中的midRadius一致)
        const LINE_LENGTH = 25;
        const HOOK_LENGTH = 12;
        const midRadius = outerRadius + LINE_LENGTH;
        const midX = cx + midRadius * Math.cos(-midAngle * RADIAN);
        const midY = cy + midRadius * Math.sin(-midAngle * RADIAN);

        // 标签X位置在钩子末端，Y位置与钩子线齐平
        const labelX = midX > cx ? midX + HOOK_LENGTH + 4 : midX - HOOK_LENGTH - 4;
        const labelY = midY;  // 与钩子线Y坐标完全一致

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

    // 自定义标签线 - 折线样式，颜色与色块一致
    const renderLabelLine = (props: any) => {
        const { cx, cy, midAngle, outerRadius, stroke } = props;
        const RADIAN = Math.PI / 180;

        // 配置参数（与renderLabel保持一致）
        const LINE_LENGTH = 25;  // 斜线长度
        const HOOK_LENGTH = 12;  // 水平钩子长度

        // 起点（饼图边缘）
        const startX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
        const startY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

        // 中间点（斜线终点）
        const midRadius = outerRadius + LINE_LENGTH;
        const midX = cx + midRadius * Math.cos(-midAngle * RADIAN);
        const midY = cy + midRadius * Math.sin(-midAngle * RADIAN);

        // 终点（水平钩子）
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
                        {/* 标题 - 精确匹配原网站 */}
                        <div className="text-base md:text-lg text-gray-600 mb-2">
                            {language === 'zh' ? '你的' : 'Your '}
                            <span className="font-bold text-gray-800 mx-2">
                                {language === 'zh' ? '欲望比重' : 'Desire Chart'}
                            </span>
                            {language === 'zh' ? '是这样的：' : 'is:'}
                        </div>

                        {/* 饼图容器 - 增加高度避免标签被裁切 */}
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
                                                        {/* 第一行：名称: 百分比 */}
                                                        <div className="text-sm text-gray-700 mb-1">
                                                            {data.name}: {data.value.toFixed(2)}%
                                                        </div>
                                                        {/* 第二行：颜色圆点 + 分数 */}
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
                    </div>

                    {!isPreviewMode && (
                        <div className="w-full max-w-sm mx-auto px-4 mt-8 pb-8 space-y-3">
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                onClick={handleEnterPreview}
                                className="w-full py-3.5 px-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full font-medium text-base flex items-center justify-center gap-2 hover:shadow-lg transition-all shadow-md active:scale-95"
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
