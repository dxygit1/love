"use client";

import { useState, useCallback, useMemo } from 'react';
import { questions, DesireDimension, getDimensionInfo, DimensionInfo, DesireOption } from '@/lib/quiz-data-desire';

export interface DimensionScore {
    dimension: DesireDimension;
    score: number;
    percentage: number;
    info: DimensionInfo;
}

export const useQuizDesire = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [dimensionScores, setDimensionScores] = useState<Record<DesireDimension, number>>({
        food: 0,
        sex: 0,
        freedom: 0,  // 新增：自由
        money: 0,
        emotion: 0,  // 新增：感情
        fame: 0,
        power: 0,
        appearance: 0
    });
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [history, setHistory] = useState<number[]>([]);

    const handleStart = useCallback(() => {
        setIsStarted(true);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setDimensionScores({
            food: 0,
            sex: 0,
            freedom: 0,
            money: 0,
            emotion: 0,
            fame: 0,
            power: 0,
            appearance: 0
        });
        setIsFinished(false);
        setHistory([]);
    }, []);

    const handleAnswer = useCallback((questionId: number, optionId: string, option: DesireOption) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));

        // Add score to the corresponding dimension
        setDimensionScores(prev => ({
            ...prev,
            [option.dimension]: prev[option.dimension] + option.score
        }));

        // Add to history for back navigation
        setHistory(prev => [...prev, currentQuestionIndex]);

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300);
        } else {
            setIsFinished(true);
        }
    }, [currentQuestionIndex]);

    const handlePrevious = useCallback(() => {
        if (history.length > 0) {
            const prevQuestionIndex = history[history.length - 1];
            setCurrentQuestionIndex(prevQuestionIndex);

            // Remove last answer score
            const lastAnswerId = answers[questions[prevQuestionIndex].id];
            const question = questions[prevQuestionIndex];
            const selectedOption = question.options.find(o => o.id === lastAnswerId);

            if (selectedOption) {
                setDimensionScores(prev => ({
                    ...prev,
                    [selectedOption.dimension]: prev[selectedOption.dimension] - selectedOption.score
                }));
            }

            // Update history and answers
            setHistory(prev => prev.slice(0, -1));
            const newAnswers = { ...answers };
            delete newAnswers[questions[prevQuestionIndex].id];
            setAnswers(newAnswers);
        }
    }, [history, answers]);

    const handleRestart = useCallback(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setDimensionScores({
            food: 0,
            sex: 0,
            freedom: 0,
            money: 0,
            emotion: 0,
            fame: 0,
            power: 0,
            appearance: 0
        });
        setIsFinished(false);
        setIsStarted(false);
        setHistory([]);
    }, []);

    // Calculate results with percentages - 使用动态总分
    const result = useMemo(() => {
        if (!isFinished) return null;

        // 动态计算总分（不再使用固定24分）
        const totalScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0);

        const scores: DimensionScore[] = (Object.keys(dimensionScores) as DesireDimension[])
            .map(dim => ({
                dimension: dim,
                score: dimensionScores[dim],
                percentage: totalScore > 0
                    ? Math.round((dimensionScores[dim] / totalScore) * 10000) / 100
                    : 0, // Keep 2 decimal places
                info: getDimensionInfo(dim)
            }))
            .filter(d => d.score > 0); // 只显示有分数的维度

        // Sort by score descending
        scores.sort((a, b) => b.score - a.score);

        return {
            scores,
            topDimension: scores[0],
            totalScore
        };
    }, [isFinished, dimensionScores]);

    return {
        currentQuestionIndex,
        currentQuestion: questions[currentQuestionIndex],
        totalQuestions: questions.length,
        answers,
        handleAnswer,
        handlePrevious,
        handleRestart,
        handleStart,
        isFinished,
        isStarted,
        result
    };
};
