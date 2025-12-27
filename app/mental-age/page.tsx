"use client";

import { useQuizMentalAge } from "@/hooks/useQuizMentalAge";
import { QuizScreen } from "@/components/QuizScreen"; // Reuse generic quiz screen
import { ResultScreenMentalAge } from "@/components/ResultScreenMentalAge";
import WelcomeScreenMentalAge from "@/components/WelcomeScreenMentalAge";

export default function MentalAgePage() {
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
        result,
        realAge
    } = useQuizMentalAge();

    // 1. Show Result
    if (isFinished && result && realAge !== null) {
        return (
            <ResultScreenMentalAge
                mentalAge={result.mentalAge}
                realAge={realAge}
                result={result.category}
                onRestart={handleRestart}
            />
        );
    }

    // 2. Show Quiz
    // Only show quiz if realAge is set (handled by handleStart setting it in hook)
    if (realAge !== null && currentQuestion) {
        return (
            <QuizScreen
                question={currentQuestion}
                currentIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                selectedAnswer={answers[currentQuestion.id]}
                canGoBack={currentQuestionIndex > 0}
                onSelectAnswer={(qId, oId) => {
                    // Find option value
                    const option = currentQuestion.options.find(o => o.id === oId);
                    if (option) {
                        handleAnswer(qId, oId, option.value);
                    }
                }}
                onBack={handlePrevious}
            />
        );
    }

    // 3. Show Welcome
    return (
        <WelcomeScreenMentalAge
            onStart={handleStart}
        />
    );
}
