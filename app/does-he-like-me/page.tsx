"use client";

import { AnimatePresence } from "framer-motion";
import { useQuizDoesHeLikeMe } from "@/hooks/useQuizDoesHeLikeMe";
import { WelcomeScreenDoesHeLikeMe } from "@/components/WelcomeScreenDoesHeLikeMe";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { AnalyzingScreen } from "@/components/AnalyzingScreen";
import { PersonalizationScreen } from "@/components/PersonalizationScreen";

export default function DoesHeLikeMePage() {
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
    } = useQuizDoesHeLikeMe();

    return (
        <>
            <AnimatePresence mode="wait">
                {state.step === "welcome" && (
                    <WelcomeScreenDoesHeLikeMe key="welcome" onStart={startQuiz} />
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
                        quizType="does-he-like-me"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
