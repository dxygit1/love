"use client";

import { AnimatePresence } from "framer-motion";
import { useQuizDoILikeHer } from "@/hooks/useQuizDoILikeHer";
import { WelcomeScreenDoILikeHer } from "@/components/WelcomeScreenDoILikeHer";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { AnalyzingScreen } from "@/components/AnalyzingScreen";
import { PersonalizationScreen } from "@/components/PersonalizationScreen";

export default function DoILikeHerPage() {
    const {
        state,
        currentQuestion,
        totalQuestions,
        canGoBack,
        startQuiz,
        selectAnswer,
        goBack,
        resetQuiz,
        submitPersonalization,
    } = useQuizDoILikeHer();

    return (
        <main className="min-h-screen">
            <AnimatePresence mode="wait">
                {state.step === "welcome" && (
                    <WelcomeScreenDoILikeHer key="welcome" onStart={startQuiz} />
                )}

                {state.step === "quiz" && !state.isAnalyzing && currentQuestion && (
                    <QuizScreen
                        key={`quiz-${state.currentQuestionIndex}`}
                        question={currentQuestion}
                        currentIndex={state.currentQuestionIndex}
                        totalQuestions={totalQuestions}
                        selectedAnswer={state.answers[currentQuestion.id]}
                        canGoBack={canGoBack}
                        onSelectAnswer={selectAnswer}
                        onBack={goBack}
                    />
                )}

                {state.isAnalyzing && (
                    <AnalyzingScreen key="analyzing" />
                )}

                {state.step === "personalization" && !state.isAnalyzing && (
                    <PersonalizationScreen
                        key="personalization"
                        onSubmit={submitPersonalization}
                    />
                )}

                {state.step === "result" && state.result && !state.isAnalyzing && (
                    <ResultScreen
                        key="result"
                        score={state.score}
                        result={state.result}
                        onRestart={resetQuiz}
                        personName={state.personName}
                        gender={state.gender}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
