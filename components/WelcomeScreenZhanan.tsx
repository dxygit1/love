"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { zhananResults } from '@/lib/zhanan-quiz-data';
import { TestPageContent } from '@/components/TestPageContent';

interface WelcomeScreenZhananProps {
    onStart: () => void;
}

export default function WelcomeScreenZhanan({ onStart }: WelcomeScreenZhananProps) {
    const { language } = useLanguage();

    return (
        <div className="w-full flex flex-col items-center min-h-screen pt-28 pb-12 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-600 mb-6 text-sm font-medium"
                >
                    <Shield size={16} />
                    <span>{language === 'zh' ? '情感能力测试' : 'Relationship Skill Test'}</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {language === 'zh' ? '渣男辨别力测试' : 'Toxic Partner Detection Test'}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                    {language === 'zh'
                        ? '渣男像地雷，既要慧眼识别又要小心绕开，但不是我们每个人都有排雷的能力。想知道是渣男套路深，还是你更火眼金睛吗？测测看才知道！'
                        : 'Detecting toxic partners is like finding landmines—you need sharp eyes and careful steps. Think you can spot the red flags? Take this test to find out!'}
                </p>

                {/* Result Preview */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {zhananResults.slice(0, 5).map((result, index) => (
                        <motion.div
                            key={result.title}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-50 text-purple-600"
                        >
                            <span>🛡️</span>
                            <span>{result.title}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-500 text-white text-lg font-semibold rounded-full shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all w-full md:w-auto overflow-hidden"
                >
                    <span className="relative z-10">
                        {language === 'zh' ? '开始测试' : 'Start Test'}
                    </span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <p className="text-sm text-gray-400 mt-4">
                    {language === 'zh' ? '⏱️ 约3-5分钟 · 约12-14道题' : '⏱️ ~3-5 min · ~12-14 questions'}
                </p>

                {/* About Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl text-left border border-purple-100"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        {language === 'zh' ? '注意事项' : 'Important Notes'}
                    </h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>{language === 'zh' ? '请想象自己是一位在校女大学生来答题' : 'Imagine yourself as a female college student answering'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>{language === 'zh' ? '选出你认为渣男最有可能的做法，而不是正确做法' : 'Choose what a toxic partner would likely do, not what is right'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>{language === 'zh' ? '多选题要选出所有可能的答案再点击继续' : 'For multiple-choice, select all answers before continuing'}</span>
                        </li>
                    </ul>
                </motion.div>
            </motion.div>

            {/* FAQ and Psychology Content */}
            <TestPageContent testType="zhanan-test" />
        </div>
    );
}
