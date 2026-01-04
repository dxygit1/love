"use client";

import { motion } from 'framer-motion';
import { ArrowRight, PieChart, Heart, Brain, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { dimensionInfos } from '@/lib/quiz-data-desire';
import { TestPageContent } from '@/components/TestPageContent';

interface WelcomeScreenDesireProps {
    onStart: () => void;
}

export default function WelcomeScreenDesire({ onStart }: WelcomeScreenDesireProps) {
    const { language } = useLanguage();

    return (
        <div className="w-full flex flex-col items-center min-h-screen pt-28 pb-12 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-amber-50 via-white to-rose-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl mx-auto"
            >
                {/* Category Tag */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-600 mb-6 text-sm font-medium"
                >
                    <PieChart size={16} />
                    <span>{language === 'zh' ? '心理测试' : 'Psychology Test'}</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {language === 'zh' ? '你的欲望组成图' : 'Your Desire Chart'}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                    {language === 'zh'
                        ? '每个人心中都有不同的渴望。有的人追求美食带来的满足，有的人向往财富与物质安全，还有人渴望被他人认可与尊重。其实这些都是我们内心的欲望，只是每个人的侧重点各有不同。现在就来测一测，看看哪种欲望在主导着你的人生吧！'
                        : 'Everyone has different desires. Some pursue satisfaction from food, some yearn for wealth and security, others crave recognition and respect. These are all our inner desires, just with different priorities. Take this test now to discover which desire dominates your life!'}
                </p>

                {/* Dimension Preview */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {dimensionInfos.map((dim, index) => (
                        <motion.div
                            key={dim.key}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                            style={{
                                backgroundColor: `${dim.color}15`,
                                color: dim.color
                            }}
                        >
                            <span>{dim.emoji}</span>
                            <span>{language === 'zh' ? dim.nameZh : dim.nameEn}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-full shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transition-all w-full md:w-auto overflow-hidden"
                >
                    <span className="relative z-10">
                        {language === 'zh' ? '开始测试' : 'Start Test'}
                    </span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <p className="text-sm text-gray-400 mt-4">
                    {language === 'zh' ? '⏱️ 约2分钟 · 12道题' : '⏱️ ~2 min · 12 questions'}
                </p>

                {/* About Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-left max-w-3xl mx-auto space-y-8"
                >
                    <div className="bg-white/80 rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-amber-500 rounded-full" />
                            {language === 'zh' ? '关于这个测试' : 'About This Test'}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            {language === 'zh'
                                ? '在现实生活中，我们都有各种各样的渴望。想享受美食、想拥有更多财富、想被人崇拜尊敬、想追求自由......这些都是我们内心的欲望。这个测试将根据你的直觉选择，分析你内心真实的欲望比重，生成专属于你的欲望组成图。'
                                : 'In real life, we all have various desires. To enjoy delicious food, to have more wealth, to be admired and respected, to pursue freedom... These are all our inner desires. This test will analyze your true desire proportions based on your instinctive choices.'}
                        </p>
                    </div>

                    <div className="bg-white/80 rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-rose-500 rounded-full" />
                            {language === 'zh' ? '八大欲望维度' : 'Eight Desire Dimensions'}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {dimensionInfos.map(dim => (
                                <div key={dim.key} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: dim.color }}
                                    />
                                    <span className="text-gray-600 text-sm">
                                        {dim.emoji} {language === 'zh' ? dim.nameZh : dim.nameEn}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Cross Links */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-medium">
                        {language === 'zh' ? '更多测试' : 'More Quizzes'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/mental-age" className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">
                            <Brain size={14} />
                            {language === 'zh' ? '心理年龄测试' : 'Mental Age Test'}
                        </Link>
                        <Link href="/love-quiz" className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors">
                            <Heart size={14} />
                            {language === 'zh' ? '爱情测试' : 'Love Quiz'}
                        </Link>
                        <Link href="/does-he-like-me" className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-full text-sm font-medium hover:bg-rose-100 transition-colors">
                            <Sparkles size={14} />
                            {language === 'zh' ? 'TA喜欢我吗' : 'Does He Like Me'}
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* FAQ and Psychology Content */}
            <TestPageContent testType="desire-test" />
        </div>
    );
}
