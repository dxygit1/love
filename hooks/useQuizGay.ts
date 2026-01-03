'use client';

import { useState, useCallback } from 'react';
import { gayQuizQuestions, calculateGayScores, getDominantOrientation } from '@/lib/quiz-data-gay';

export type GayQuizState = 'welcome' | 'quiz' | 'result';

export function useQuizGay() {
    const [state, setState] = useState<GayQuizState>('welcome');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [scores, setScores] = useState<Record<string, number>>({ A: 0, B: 0, C: 0 });
    const [language, setLanguage] = useState<'zh' | 'en'>('zh');

    const totalQuestions = gayQuizQuestions.length;

    const startQuiz = useCallback(() => {
        setState('quiz');
        setCurrentQuestion(0);
        setAnswers([]);
        setScores({ A: 0, B: 0, C: 0 });
    }, []);

    const answerQuestion = useCallback((answerIndex: number) => {
        const newAnswers = [...answers, answerIndex];
        setAnswers(newAnswers);

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // 计算最终分数
            const finalScores = calculateGayScores(newAnswers);
            setScores(finalScores);
            setState('result');
        }
    }, [answers, currentQuestion, totalQuestions]);

    const goBack = useCallback(() => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setAnswers(answers.slice(0, -1));
        }
    }, [currentQuestion, answers]);

    const restart = useCallback(() => {
        setState('welcome');
        setCurrentQuestion(0);
        setAnswers([]);
        setScores({ A: 0, B: 0, C: 0 });
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
    }, []);

    return {
        state,
        currentQuestion,
        totalQuestions,
        answers,
        scores,
        language,
        questions: gayQuizQuestions,
        startQuiz,
        answerQuestion,
        goBack,
        restart,
        toggleLanguage,
        getDominantOrientation: () => getDominantOrientation(scores),
    };
}
