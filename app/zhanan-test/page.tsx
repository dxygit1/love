"use client";

import { useState, useEffect, useRef } from "react";
import { useQuizZhanan } from "@/hooks/useQuizZhanan";
import WelcomeScreenZhanan from "@/components/WelcomeScreenZhanan";
import { ResultScreenZhanan } from "@/components/ResultScreenZhanan";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Check, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ZhananTestPage() {
    const quiz = useQuizZhanan();
    const { language } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const loadingTriggered = useRef(false);

    // 当测试完成时，显示加载动画
    useEffect(() => {
        if (quiz.finished && !loadingTriggered.current) {
            loadingTriggered.current = true;
            setIsLoading(true);

            const timer = setTimeout(() => {
                setIsLoading(false);
                setShowResult(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [quiz.finished]);

    // 未开始 - 显示欢迎页
    if (!quiz.started) {
        return <WelcomeScreenZhanan onStart={quiz.startQuiz} />;
    }

    // 加载动画
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex items-center justify-center">
                <motion.div
                    className="flex flex-col items-center gap-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Shield className="w-20 h-20 text-purple-500" />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Sparkles className="w-8 h-8 text-pink-400 absolute -top-2 -right-2" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-xl font-bold text-purple-600 mb-2">
                            {language === "zh" ? "正在分析你的辨别力..." : "Analyzing your detection skills..."}
                        </p>
                        <p className="text-sm text-purple-400">
                            {language === "zh" ? "请稍候片刻 🛡️" : "Please wait 🛡️"}
                        </p>
                    </motion.div>

                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 bg-purple-400 rounded-full"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    // 显示结果
    if (showResult) {
        return (
            <ResultScreenZhanan
                score={quiz.score}
                onRestart={() => {
                    loadingTriggered.current = false;
                    setShowResult(false);
                    setIsLoading(false);
                    quiz.restartQuiz();
                }}
            />
        );
    }

    // 显示题目
    const { currentQuestion } = quiz;
    if (!currentQuestion) return null;

    const selectedMultiOptions = quiz.getSelectedMultiOptions();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 pt-16"
        >
            {/* Progress Bar - Fixed at top below header */}
            <div className="fixed top-14 left-0 right-0 h-1 bg-gray-200/50 z-10">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((quiz.progress + 1) / quiz.estimatedTotal) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Back Button */}
            {quiz.canGoBack && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={quiz.goBack}
                    className="absolute top-20 left-4 p-2 text-gray-400 hover:text-gray-600 z-10"
                >
                    <ChevronLeft className="w-6 h-6" />
                </motion.button>
            )}

            {/* Question Area */}
            <div className="flex-1 flex flex-col justify-center px-4 py-6 sm:px-8 mx-auto" style={{ maxWidth: "640px", width: "90%" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >


                        {/* 多选提示 */}
                        {currentQuestion.isMultiSelect && (
                            <div className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 mb-4 text-sm text-purple-700 text-center">
                                {language === "zh" ? "📋 多选题：选择所有你认为正确的选项" : "📋 Multiple choice: Select all that apply"}
                            </div>
                        )}

                        {/* 题目文字 */}
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
                            {currentQuestion.question}
                        </h2>

                        {/* 选项列表 */}
                        <div className="space-y-3">
                            {currentQuestion.answers.map((answer, index) => {
                                const isSelected = currentQuestion.isMultiSelect
                                    ? selectedMultiOptions.includes(index)
                                    : false;

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() =>
                                            currentQuestion.isMultiSelect
                                                ? quiz.toggleMultiSelectOption(index)
                                                : quiz.answerSingleSelect(index)
                                        }
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                            ? "border-purple-500 bg-purple-50"
                                            : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                                            }`}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* 多选框/单选圈 */}
                                            <div
                                                className={`w-6 h-6 rounded-${currentQuestion.isMultiSelect ? "md" : "full"} border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                                                    ? "border-purple-500 bg-purple-500"
                                                    : "border-gray-300"
                                                    }`}
                                            >
                                                {isSelected && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                            <span className="text-gray-700">{answer.text}</span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* 多选题确认按钮 */}
                        {currentQuestion.isMultiSelect && (
                            <motion.button
                                onClick={quiz.confirmMultiSelect}
                                disabled={selectedMultiOptions.length === 0}
                                className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${selectedMultiOptions.length > 0
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                whileHover={selectedMultiOptions.length > 0 ? { scale: 1.02 } : {}}
                                whileTap={selectedMultiOptions.length > 0 ? { scale: 0.98 } : {}}
                            >
                                {language === "zh"
                                    ? `选好了，继续 (${selectedMultiOptions.length}个已选)`
                                    : `Continue (${selectedMultiOptions.length} selected)`}
                            </motion.button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
