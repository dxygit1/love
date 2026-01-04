"use client";

import { useState } from "react";
import { doILikeHimQuestions, calculateDoILikeHimScore, getDoILikeHimResult } from "@/lib/quiz-data-do-i-like-him";

export function useQuizDoILikeHim() {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [finished, setFinished] = useState(false);
    const [language, setLanguage] = useState<"en" | "zh">("zh");

    const totalQuestions = doILikeHimQuestions.length;

    const startQuiz = () => {
        setStarted(true);
        setCurrentQuestion(0);
        setAnswers([]);
        setFinished(false);
    };

    const restartQuiz = () => {
        setStarted(false);
        setCurrentQuestion(0);
        setAnswers([]);
        setFinished(false);
    };

    const answerQuestion = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);

        const question = doILikeHimQuestions[currentQuestion];
        const selectedOption = question.options[optionIndex];

        // 处理跳转逻辑
        if (selectedOption.jumpTo) {
            // 跳转到指定题目（题目ID从1开始，数组索引从0开始）
            const jumpIndex = selectedOption.jumpTo - 1;
            if (jumpIndex < totalQuestions) {
                setCurrentQuestion(jumpIndex);
            } else {
                setFinished(true);
            }
        } else if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinished(true);
        }
    };

    const goBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const score = finished ? calculateDoILikeHimScore(answers) : 0;
    const result = finished ? getDoILikeHimResult(score) : null;

    const toggleLanguage = () => {
        setLanguage(language === "zh" ? "en" : "zh");
    };

    return {
        started,
        currentQuestion,
        totalQuestions,
        answers,
        finished,
        score,
        result,
        language,
        startQuiz,
        restartQuiz,
        answerQuestion,
        goBack,
        toggleLanguage,
        questions: doILikeHimQuestions,
    };
}
