"use client";

import { useState, useCallback, useMemo } from 'react';
import { questions, results, ResultCategory } from '@/lib/quiz-data-mental-age';
import { useLanguage } from '@/contexts/LanguageContext';

export const useQuizMentalAge = () => {
    const { language } = useLanguage();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [score, setScore] = useState(0); // This is the sum of weights
    const [isFinished, setIsFinished] = useState(false);
    const [history, setHistory] = useState<number[]>([]);

    // Real Age state
    const [realAge, setRealAge] = useState<number | null>(null);

    const handleStart = useCallback((age: number) => {
        if (age > 0 && age < 150) {
            setRealAge(age);
            setCurrentQuestionIndex(0);
            setAnswers({});
            setScore(0);
            setIsFinished(false);
            setHistory([]);
        }
    }, []);

    const handleAnswer = useCallback((questionId: number, optionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
        setScore(prev => prev + value);

        // Add to history for back navigation
        setHistory(prev => [...prev, currentQuestionIndex]);

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300); // Small delay for visual feedback
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
            // We need to subtract the value. Since we don't store value history, 
            // we must find the option value again.
            const question = questions[prevQuestionIndex];
            const selectedOption = question.options.find(o => o.id === lastAnswerId);
            if (selectedOption) {
                setScore(prev => prev - selectedOption.value);
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
        setScore(0);
        setIsFinished(false);
        setHistory([]);
        setRealAge(null); // Reset real age to force input again? Or keep it? Let's reset.
    }, []);

    const result = useMemo(() => {
        if (!isFinished || realAge === null) return null;

        // Calculation Logic from Source:
        // Raw Score (Sum of weights) / 10 = Mental Age Raw
        // Diff = Mental Age Raw - Real Age

        // Result is in days, convert to years
        const mentalAgeRaw = score / 365;
        let diff = mentalAgeRaw - realAge;

        // Edge case from source: if realAge is 0 (shouldn't happen), subtract 20.

        // Find category
        // Logic: n > 20

        let category: ResultCategory | undefined;

        // Source logic implemented:
        if (diff > 20) category = results.find(r => r.minDiff === 20);
        else if (diff >= 15) category = results.find(r => r.minDiff === 15);
        else if (diff >= 10) category = results.find(r => r.minDiff === 10);
        else if (diff >= 5) category = results.find(r => r.minDiff === 5);
        else if (diff >= 2) category = results.find(r => r.minDiff === 2);
        else if (diff >= -2) category = results.find(r => r.minDiff === -2);
        else if (diff >= -5) category = results.find(r => r.minDiff === -5);
        else if (diff >= -10) category = results.find(r => r.minDiff === -10);
        else if (diff >= -15) category = results.find(r => r.minDiff === -15);
        else category = results.find(r => r.maxDiff === -15); // Back to future

        // Fallback
        if (!category) category = results[results.length - 1];

        return {
            category,
            mentalAge: Math.round(mentalAgeRaw), // Return integer mental age for display
            realAge
        };
    }, [isFinished, score, realAge]);

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
        result,
        realAge
    };
};
