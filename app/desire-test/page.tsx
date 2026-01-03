"use client";

import { useQuizDesire } from "@/hooks/useQuizDesire";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultScreenDesire } from "@/components/ResultScreenDesire";
import WelcomeScreenDesire from "@/components/WelcomeScreenDesire";

export default function DesireTestPage() {
    const {
        currentQuestionIndex,
        currentQuestion,
        totalQuestions,
        answers,
        handleAnswer,
        handlePrevious,
        handleRestart,
        handleStart,
        isFinished,
        isStarted,
        result
    } = useQuizDesire();

    // 1. Show Result
    if (isFinished && result) {
        return (
            <ResultScreenDesire
                result={result}
                onRestart={handleRestart}
            />
        );
    }

    // 2. Show Quiz
    if (isStarted && currentQuestion) {
        return (
            <QuizScreen
                question={currentQuestion as any}
                currentIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                selectedAnswer={answers[currentQuestion.id]}
                canGoBack={currentQuestionIndex > 0}
                onSelectAnswer={(qId, oId) => {
                    const option = currentQuestion.options.find(o => o.id === oId);
                    if (option) {
                        handleAnswer(qId, oId, option);
                    }
                }}
                onBack={handlePrevious}
            />
        );
    }

    // 3. Show Welcome
    return (
        <WelcomeScreenDesire onStart={handleStart} />
    );
}
