"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Question } from "@/lib/quiz-data";
import { useMemo } from "react";

interface QuizScreenProps {
    question: Question;
    currentIndex: number;
    totalQuestions: number;
    selectedAnswer?: string;
    canGoBack: boolean;
    onSelectAnswer: (questionId: number, optionId: string) => void;
    onBack: () => void;
}

export function QuizScreen({
    question,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    canGoBack,
    onSelectAnswer,
    onBack,
}: QuizScreenProps) {
    const { language } = useLanguage();

    // Randomize options order, re-shuffle only when question changes
    const shuffledOptions = useMemo(() => {
        return [...question.options].sort(() => Math.random() - 0.5);
    }, [question]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-16"
        >
            {/* Progress Bar - Fixed at top below header */}
            <div className="fixed top-14 left-0 right-0 h-1 bg-gray-200/50 z-10">
                <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Back Button */}
            {canGoBack && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={onBack}
                    className="absolute top-20 left-4 p-2 text-gray-400 hover:text-gray-600 z-10"
                >
                    <ChevronLeft className="w-6 h-6" />
                </motion.button>
            )}

            {/* Question Area */}
            <div className="flex-1 flex flex-col justify-center px-4 py-6 sm:px-8 max-w-xl mx-auto w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Question Counter */}
                        <div className="text-center mb-3">
                            <span className="text-xs text-gray-400 font-medium tracking-widest">
                                QUESTION {currentIndex + 1} / {totalQuestions}
                            </span>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
                            {language === "zh" ? question.textZh : question.textEn}
                        </h2>

                        {/* Options - Compact like arealme */}
                        <div className="space-y-2">
                            {shuffledOptions.map((option, index) => {
                                const isSelected = selectedAnswer === option.id;
                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={() => onSelectAnswer(question.id, option.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg border bg-white transition-all duration-200 ${isSelected
                                            ? "border-amber-400 bg-amber-50 shadow-sm"
                                            : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                                            }`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.02 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <span className="text-gray-700 text-sm sm:text-base">
                                            {language === "zh" ? option.textZh : option.textEn}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
