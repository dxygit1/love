"use client";

import { useState, useEffect, useRef } from "react";
import { useQuizDoILikeHim } from "@/hooks/useQuizDoILikeHim";
import WelcomeScreenDoILikeHim from "@/components/WelcomeScreenDoILikeHim";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { doILikeHimQuestions } from "@/lib/quiz-data-do-i-like-him";
import type { Question, Option } from "@/lib/quiz-data";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function DoILikeHimPage() {
    const quiz = useQuizDoILikeHim();
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const loadingTriggered = useRef(false);

    // 当测试完成时，先显示加载动画，然后显示结果
    useEffect(() => {
        if (quiz.finished && !loadingTriggered.current) {
            loadingTriggered.current = true;
            setIsLoading(true);

            const timer = setTimeout(() => {
                setIsLoading(false);
                setShowResult(true);
            }, 2000); // 2秒加载动画

            return () => clearTimeout(timer);
        }
    }, [quiz.finished]);

    // 转换数据格式以适配QuizScreen组件
    const convertedQuestions: Question[] = doILikeHimQuestions.map((q) => ({
        id: q.id,
        textEn: q.questionEn,
        textZh: q.question,
        options: q.options.map((opt, optIndex): Option => ({
            id: String.fromCharCode(97 + optIndex), // 'a', 'b', 'c', ...
            textEn: opt.textEn,
            textZh: opt.text,
            weight: opt.score // 使用score作为weight
        }))
    }));

    // 转换结果格式以适配ResultScreen
    const convertedResult = quiz.result ? {
        minScore: quiz.result.minScore,
        maxScore: quiz.result.maxScore,
        titleEn: quiz.result.titleEn,
        titleZh: quiz.result.titleZh,
        descriptionEn: quiz.result.descriptionEn,
        descriptionZh: quiz.result.descriptionZh,
        adviceEn: "",
        adviceZh: ""
    } : null;

    if (!quiz.started) {
        return <WelcomeScreenDoILikeHim onStart={quiz.startQuiz} />;
    }

    // 加载动画屏幕
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center">
                <motion.div
                    className="flex flex-col items-center gap-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 心跳动画 */}
                    <motion.div
                        className="relative"
                        animate={{
                            scale: [1, 1.2, 1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Heart className="w-20 h-20 text-rose-500 fill-rose-500" />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-8 h-8 text-pink-400 absolute -top-2 -right-2" />
                        </motion.div>
                    </motion.div>

                    {/* 加载文字 */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-xl font-bold text-rose-600 mb-2">正在分析你的心意...</p>
                        <p className="text-sm text-rose-400">请稍候片刻 💕</p>
                    </motion.div>

                    {/* 进度点 */}
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 bg-rose-400 rounded-full"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    // 显示结果
    if (showResult && convertedResult) {
        return (
            <ResultScreen
                score={quiz.score}
                result={convertedResult}
                onRestart={() => {
                    loadingTriggered.current = false;
                    setShowResult(false);
                    setIsLoading(false);
                    quiz.restartQuiz();
                }}
                quizType="do-i-like-him"
            />
        );
    }

    // 获取当前题目的已选答案
    const currentAnswer = quiz.answers[quiz.currentQuestion];
    const selectedOptionId = currentAnswer !== undefined
        ? String.fromCharCode(97 + currentAnswer)
        : undefined;

    return (
        <QuizScreen
            question={convertedQuestions[quiz.currentQuestion]}
            currentIndex={quiz.currentQuestion}
            totalQuestions={quiz.totalQuestions}
            selectedAnswer={selectedOptionId}
            canGoBack={quiz.currentQuestion > 0}
            onSelectAnswer={(questionId, optionId) => {
                // 将选项ID ('a', 'b', 'c'...) 转换回索引
                const optionIndex = optionId.charCodeAt(0) - 97;
                quiz.answerQuestion(optionIndex);
            }}
            onBack={quiz.goBack}
        />
    );
}
