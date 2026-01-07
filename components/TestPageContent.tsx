"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, FileText, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { testPageContents, type TestPageContentData } from "@/lib/test-page-content";

interface TestPageContentProps {
    testType: string;
}

export function TestPageContent({ testType }: TestPageContentProps) {
    const { language } = useLanguage();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const content = testPageContents[testType];
    if (!content) return null;

    const introduction = language === "zh" ? content.introduction : content.introductionEn;
    const methodology = language === "zh" ? content.methodology : content.methodologyEn;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-12">
            {/* Introduction Section */}
            {introduction && (
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-6 h-6 text-rose-500" />
                        <h2 className="text-xl font-bold text-gray-800">
                            {language === "zh" ? "关于这个测试" : "About This Test"}
                        </h2>
                    </div>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {introduction}
                    </div>
                </section>
            )}

            {/* Methodology Section */}
            {methodology && (
                <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                        <h2 className="text-xl font-bold text-gray-800">
                            {language === "zh" ? "测试方法论" : "Test Methodology"}
                        </h2>
                    </div>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {methodology}
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <HelpCircle className="w-6 h-6 text-rose-500" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        {language === "zh" ? "常见问题" : "FAQ"}
                    </h2>
                </div>
                <div className="space-y-3">
                    {content.faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-medium text-gray-800">
                                    {language === "zh" ? faq.question : faq.questionEn}
                                </span>
                                {openFaqIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openFaqIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-4 text-gray-600 leading-relaxed">
                                            {language === "zh" ? faq.answer : faq.answerEn}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* Psychology Background Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-6 h-6 text-indigo-500" />
                    <h2 className="text-xl font-bold text-gray-800">
                        {language === "zh" ? content.psychologyTitle : content.psychologyTitleEn}
                    </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    {language === "zh" ? content.psychologyContent : content.psychologyContentEn}
                </p>
            </section>
        </div>
    );
}
