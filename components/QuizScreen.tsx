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
            className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-indigo-50"
        >
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200/50">
                <motion.div
                    className="h-full bg-gradient-to-r from-rose-400 to-indigo-400"
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
                    className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 z-10 mt-2 ml-2"
                >
                    <ChevronLeft className="w-6 h-6" />
                </motion.button>
            )}

            {/* Question Area */}
            <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 max-w-2xl mx-auto w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Question Counter */}
                        <div className="text-center mb-4">
                            <span className="text-sm text-gray-400 font-medium tracking-widest">
                                QUESTION {currentIndex + 1} / {totalQuestions}
                            </span>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
                            {language === "zh" ? question.textZh : question.textEn}
                        </h2>

                        {/* Options */}
                        <div className="space-y-3">
                            {shuffledOptions.map((option, index) => {
                                const isSelected = selectedAnswer === option.id;
                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={() => onSelectAnswer(question.id, option.id)}
                                        className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-200 ${isSelected
                                            ? "border-rose-400 bg-rose-50 shadow-md"
                                            : "border-white hover:border-rose-200 hover:bg-white shadow-sm hover:shadow"
                                            }`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="text-gray-700 text-base sm:text-lg">
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
