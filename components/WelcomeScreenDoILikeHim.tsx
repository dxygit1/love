"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { doILikeHimResults } from '@/lib/quiz-data-do-i-like-him';

interface WelcomeScreenDoILikeHimProps {
    onStart: () => void;
}

export default function WelcomeScreenDoILikeHim({ onStart }: WelcomeScreenDoILikeHimProps) {
    const { language } = useLanguage();

    return (
        <div className="w-full flex flex-col items-center min-h-screen pt-28 pb-12 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-rose-50 via-white to-pink-50">
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
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 mb-6 text-sm font-medium"
                >
                    <Heart size={16} />
                    <span>{language === 'zh' ? '恋爱心理测试' : 'Love Psychology Test'}</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {language === 'zh' ? '测测你到底有多喜欢他？' : 'How Much Do You Like Him?'}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                    {language === 'zh'
                        ? '你对他的感情到底只是一时的小火花，还是持久绚烂的烟火？我们总是下意识不自觉地美化一段关系。早一点看清楚自己的感情，才能在感情中更清醒，不在缥缈的缘分中错付时间和真心。'
                        : 'Is it just a spark or lasting fireworks? We often subconsciously beautify relationships. Understanding your true feelings early helps you navigate love more wisely and avoid wasting time on uncertain fate.'}
                </p>

                {/* Result Preview */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {doILikeHimResults.map((result, index) => (
                        <motion.div
                            key={result.titleZh}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-rose-50 text-rose-600"
                        >
                            <span>💕</span>
                            <span>{language === 'zh' ? result.titleZh : result.titleEn}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-rose-500 text-white text-lg font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all w-full md:w-auto overflow-hidden"
                >
                    <span className="relative z-10">
                        {language === 'zh' ? '开始测试' : 'Start Test'}
                    </span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <p className="text-sm text-gray-400 mt-4">
                    {language === 'zh' ? '⏱️ 约3分钟 · 15道题' : '⏱️ ~3 min · 15 questions'}
                </p>

                {/* About Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl text-left border border-rose-100"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-rose-500" />
                        {language === 'zh' ? '关于这个测试' : 'About This Test'}
                    </h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-rose-400">•</span>
                            <span>{language === 'zh' ? '基于行为心理学设计，深度分析你对他的真实感情' : 'Based on behavioral psychology to analyze your true feelings'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-400">•</span>
                            <span>{language === 'zh' ? '测试无法测算和无现实交集的偶像爱豆关系' : 'Cannot measure feelings for celebrities with no real interaction'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-400">•</span>
                            <span>{language === 'zh' ? '建议选择日常生活中有接触的人来测试' : 'Recommended for people you interact with in daily life'}</span>
                        </li>
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
}
