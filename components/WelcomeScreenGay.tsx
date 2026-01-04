"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { gayDimensions } from '@/lib/quiz-data-gay';
import { TestPageContent } from '@/components/TestPageContent';

interface WelcomeScreenGayProps {
    onStart: () => void;
}

export default function WelcomeScreenGay({ onStart }: WelcomeScreenGayProps) {
    const { language } = useLanguage();

    return (
        <div className="w-full flex flex-col items-center min-h-screen pt-28 pb-12 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-pink-50 via-white to-purple-50">
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
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-600 mb-6 text-sm font-medium"
                >
                    <Heart size={16} />
                    <span>{language === 'zh' ? '性取向测试' : 'Sexuality Test'}</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {language === 'zh' ? '性取向测试' : 'Sexual Orientation Test'}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                    {language === 'zh'
                        ? '虽然我们大多数人都认为异性恋是性取向的常态，但在学术上，性取向其实是一个广域的范围，存在多种类型的性偏好和性别认同。想知道你自己目前究竟更偏向异性恋、同性恋还是双性恋吗？请如实回答下面的10道问题，发现你最本质的性取向！'
                        : 'While most of us consider heterosexuality the norm, academically, sexual orientation is a wide spectrum with various types of preferences and identities. Want to know if you lean more towards heterosexual, homosexual, or bisexual? Answer these 10 questions honestly to discover your true orientation!'}
                </p>

                {/* Dimension Preview */}
                <div className="mb-8 flex flex-wrap justify-center gap-3">
                    {gayDimensions.map((dim, index) => (
                        <motion.div
                            key={dim.key}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                            style={{
                                backgroundColor: `${dim.color}20`,
                                color: dim.color === '#FFE53E' ? '#B8860B' : dim.color  // 黄色用深色文字
                            }}
                        >
                            <span>{dim.emoji}</span>
                            <span>{language === 'zh' ? dim.name : dim.nameEn}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-pink-500 text-white text-lg font-semibold rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all w-full md:w-auto overflow-hidden"
                >
                    <span className="relative z-10">
                        {language === 'zh' ? '开始测试' : 'Start Test'}
                    </span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <p className="text-sm text-gray-400 mt-4">
                    {language === 'zh' ? '⏱️ 约2分钟 · 10道题' : '⏱️ ~2 min · 10 questions'}
                </p>

                {/* Disclaimer - 红色文字更醒目 */}
                <p className="mt-6 text-red-500 text-sm font-medium">
                    {language === 'zh'
                        ? '免责声明：本测试仅供娱乐与自我探索。谢绝未满20岁者参与。'
                        : 'Disclaimer: This test is for entertainment and self-exploration only. Not suitable for those under 20.'}
                </p>

                {/* About Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-left max-w-3xl mx-auto space-y-6"
                >
                    <div className="bg-white/80 rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1 h-5 bg-pink-500 rounded-full" />
                            {language === 'zh' ? '关于这个测试' : 'About This Test'}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {language === 'zh'
                                ? '性取向是一个复杂的话题，它可能会随着时间的推移而发生改变。这个测试基于你对特定情境的反应，帮助你更好地了解自己的性取向倾向。请记住，无论你的结果是什么，都是完全正常和有效的。'
                                : 'Sexual orientation is a complex topic that may change over time. This test, based on your reactions to specific scenarios, helps you understand your orientation tendencies better. Remember, whatever your result, it is completely normal and valid.'}
                        </p>
                    </div>

                    <div className="bg-white/80 rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1 h-5 bg-purple-500 rounded-full" />
                            {language === 'zh' ? '测试原理' : 'How It Works'}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {language === 'zh'
                                ? '通过10道精心设计的情境问题，我们将分析你在面对同性和异性时的心理反应和偏好。最终结果将以饼图形式展示，清晰呈现你在三种性取向（同性恋、双性恋、异性恋）上的比例分布。'
                                : 'Through 10 carefully designed scenario questions, we analyze your psychological reactions and preferences towards same-sex and opposite-sex individuals. Results are displayed as a pie chart showing your distribution across three orientations.'}
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* FAQ and Psychology Content */}
            <TestPageContent testType="gay-test" />
        </div>
    );
}
