"use client";

import { useState, useCallback } from "react";
import { questions, results, type Question, type ResultCategory } from "@/lib/quiz-data";

export type QuizStep = "welcome" | "quiz" | "result";

export interface QuizState {
    step: QuizStep;
    currentQuestionIndex: number;
    answers: Record<number, string>; // questionId -> optionId
    score: number;
    result: ResultCategory | null;
    isAnalyzing: boolean;
}

export function useQuiz() {
    const [state, setState] = useState<QuizState>({
        step: "welcome",
        currentQuestionIndex: 0,
        answers: {},
        score: 0,
        result: null,
        isAnalyzing: false,
    });

    const startQuiz = useCallback(() => {
        setState({
            step: "quiz",
            currentQuestionIndex: 0,
            answers: {},
            score: 0,
            result: null,
            isAnalyzing: false,
        });
    }, []);

    // Select answer and auto-advance to next question
    const selectAnswer = useCallback((questionId: number, optionId: string) => {
        setState((prev) => {
            const newAnswers = { ...prev.answers, [questionId]: optionId };
            const nextIndex = prev.currentQuestionIndex + 1;

            // If this was the last question, start analyzing
            if (nextIndex >= questions.length) {
                // Calculate score immediately but don't show it yet
                let totalScore = 0;
                for (const qId in newAnswers) {
                    const question = questions.find((q) => q.id === Number(qId));
                    if (question) {
                        const selectedOption = question.options.find(
                            (o) => o.id === newAnswers[Number(qId)]
                        );
                        if (selectedOption) {
                            totalScore += selectedOption.weight;
                        }
                    }
                }
                const result = results.find(
                    (r) => totalScore >= r.minScore && totalScore <= r.maxScore
                );

                // Set analyzing state
                setTimeout(() => {
                    setState((currentState) => ({
                        ...currentState,
                        isAnalyzing: false,
                        step: "result",
                        score: totalScore,
                        result: result || results[results.length - 1],
                    }));
                }, 2500); // 2.5 seconds delay for "analysis"

                return {
                    ...prev,
                    answers: newAnswers,
                    isAnalyzing: true,
                };
            }

            // Otherwise advance to next question
            return {
                ...prev,
                answers: newAnswers,
                currentQuestionIndex: nextIndex,
            };
        });
    }, []);

    const goBack = useCallback(() => {
        setState((prev) => {
            if (prev.currentQuestionIndex > 0) {
                return {
                    ...prev,
                    currentQuestionIndex: prev.currentQuestionIndex - 1,
                };
            }
            return prev;
        });
    }, []);

    const resetQuiz = useCallback(() => {
        setState({
            step: "welcome",
            currentQuestionIndex: 0,
            answers: {},
            score: 0,
            result: null,
            isAnalyzing: false,
        });
    }, []);

    const currentQuestion: Question | undefined =
        questions[state.currentQuestionIndex];
    const totalQuestions = questions.length;
    const progress = ((state.currentQuestionIndex) / totalQuestions) * 100;
    const canGoBack = state.currentQuestionIndex > 0;

    return {
        state,
        currentQuestion,
        totalQuestions,
        progress,
        canGoBack,
        startQuiz,
        selectAnswer,
        goBack,
        resetQuiz,
    };
}
