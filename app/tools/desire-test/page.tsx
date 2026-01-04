"use client";

import { useState, useRef } from "react";
import { ArrowLeft, RefreshCw, Camera } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { dimensionInfos } from "@/lib/quiz-data-desire";
import { motion } from "framer-motion";
import { XiaohongshuGenerator } from "@/components/XiaohongshuGenerator";

export default function DesireTestToolPage() {
    const { t, language } = useLanguage();
    const resultRef = useRef<HTMLDivElement>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // 8个维度的分数
    const [scores, setScores] = useState({
        food: 20,
        sex: 15,
        freedom: 25,
        money: 30,
        emotion: 20,
        fame: 10,
        power: 15,
        appearance: 15,
    });

    // 计算总分和百分比
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    const chartData = dimensionInfos
        .map(dim => ({
            key: dim.key,
            name: language === 'zh' ? dim.nameZh : dim.nameEn,
            value: totalScore > 0 ? (scores[dim.key as keyof typeof scores] / totalScore) * 100 : 0,
            score: scores[dim.key as keyof typeof scores] || 0,
            color: dim.color,
            emoji: dim.emoji
        }))
        .filter(d => d.score > 0)
        .sort((a, b) => b.value - a.value);

    // 找出主导欲望
    const dominantDesire = chartData.length > 0 ? chartData[0] : null;

    // 自定义标签
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
                style={{ fontSize: '13px', fontWeight: 500 }}
            >
                {emoji} {name}: {(percent * 100).toFixed(1)}%
            </text>
        );
    };

    // 自定义标签线
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
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row pt-20">
            {/* 控制面板 */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-xl overflow-y-auto h-auto md:h-screen order-last md:order-none">
                <div className="mb-6">
                    <Link href="/tools" className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {t("tools.back_to_tools")}
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">
                        {language === 'zh' ? '欲望组成图生成器' : 'Desire Chart Generator'}
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        {language === 'zh' ? '调整各维度分数，生成你的欲望饼图' : 'Adjust each dimension to generate your desire chart'}
                    </p>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {dimensionInfos.map(dim => (
                        <div key={dim.key} className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dim.color }} />
                                {dim.emoji} {language === 'zh' ? dim.nameZh : dim.nameEn} ({scores[dim.key as keyof typeof scores]})
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={scores[dim.key as keyof typeof scores]}
                                onChange={(e) => setScores(prev => ({ ...prev, [dim.key]: Number(e.target.value) }))}
                                className="w-full"
                                style={{ accentColor: dim.color }}
                            />
                        </div>
                    ))}
                </div>

                {/* 结果预览 */}
                <div className="pt-4 border-t border-gray-100 mt-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        {language === 'zh' ? '结果预览' : 'Result Preview'}
                    </h3>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1 max-h-32 overflow-y-auto">
                        {chartData.slice(0, 5).map(d => (
                            <div key={d.key} className="flex justify-between">
                                <span className="text-gray-500">{d.emoji} {d.name}:</span>
                                <span className="font-mono font-bold">{d.value.toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI文案生成 */}
                <div className="pt-4 border-t border-gray-100">
                    <XiaohongshuGenerator
                        type="mental-age"
                        data={{
                            resultTitle: dominantDesire ? `${dominantDesire.emoji} ${dominantDesire.name}` : "欲望分析",
                            description: dominantDesire ? (language === 'zh'
                                ? `你的主导欲望是${dominantDesire.name}，占比${dominantDesire.value.toFixed(1)}%`
                                : `Your dominant desire is ${dominantDesire.name}, ${dominantDesire.value.toFixed(1)}%`)
                                : ""
                        }}
                    />
                </div>

                {/* 分享按钮 */}
                <div className="space-y-2 mt-4">
                    <button
                        onClick={() => setIsPreviewMode(true)}
                        className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                        <Camera className="w-4 h-4" />
                        {language === 'zh' ? '截图分享' : 'Share'}
                    </button>

                    <button
                        onClick={() => setScores({ food: 20, sex: 15, freedom: 25, money: 30, emotion: 20, fame: 10, power: 15, appearance: 15 })}
                        className="flex items-center justify-center w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-medium transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {language === 'zh' ? '重置' : 'Reset'}
                    </button>
                </div>
            </div>

            {/* 预览区域 */}
            <div className="flex-1 relative flex flex-col md:h-full md:overflow-y-auto bg-gradient-to-br from-amber-50 via-white to-orange-50">
                {isPreviewMode && (
                    <div
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setIsPreviewMode(false)}
                    >
                        <p className="fixed top-8 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-pulse">
                            {language === 'zh' ? '点击任意位置退出预览' : 'Click anywhere to exit'}
                        </p>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`min-h-screen flex flex-col items-center pt-20 pb-6 px-4 md:px-6 bg-white ${isPreviewMode ? 'fixed inset-0 z-[60] overflow-y-auto cursor-pointer !pt-10 !px-0 !bg-white' : ''}`}
                    onClick={isPreviewMode ? () => setIsPreviewMode(false) : undefined}
                >
                    <div className="w-full h-20 mb-2" />

                    <div ref={resultRef} className="w-full max-w-2xl text-center bg-white">
                        <div className="text-base md:text-lg text-gray-600 mb-2">
                            {language === 'zh' ? '你的' : 'Your '}
                            <span className="font-bold text-gray-800 mx-2">
                                {language === 'zh' ? '欲望组成' : 'Desire Composition'}
                            </span>
                            {language === 'zh' ? '由以下元素构成：' : 'is made of:'}
                        </div>

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
                                                            {data.emoji} {data.name}: {data.value.toFixed(1)}%
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: data.color }} />
                                                            <span className="text-base font-bold text-gray-800">分数: {data.score}</span>
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

                        {dominantDesire && (
                            <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: `${dominantDesire.color}20` }}>
                                <p className="text-gray-600 text-sm mb-1">
                                    {language === 'zh' ? '你的主导欲望是' : 'Your dominant desire is'}
                                </p>
                                <p className="text-2xl font-bold" style={{ color: dominantDesire.color }}>
                                    {dominantDesire.emoji} {dominantDesire.name}
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
