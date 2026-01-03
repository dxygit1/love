"use client";

import { useQuizGay } from "@/hooks/useQuizGay";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultScreenGay } from "@/components/ResultScreenGay";
import WelcomeScreenGay from "@/components/WelcomeScreenGay";

export default function GayTestPage() {
    const {
        state,
        currentQuestion,
        totalQuestions,
        answers,
        scores,
        questions,
        startQuiz,
        answerQuestion,
        goBack,
        restart,
    } = useQuizGay();

    // 1. Show Result
    if (state === 'result') {
        return (
            <ResultScreenGay
                scores={scores}
                onRestart={restart}
            />
        );
    }

    // 2. Show Quiz
    if (state === 'quiz') {
        const question = questions[currentQuestion];
        // 转换为QuizScreen需要的格式
        const convertedQuestion = {
            id: question.id,
            textEn: question.questionEn,
            textZh: question.question,
            options: question.options.map((opt, idx) => ({
                id: String.fromCharCode(97 + idx), // a, b, c, d...
                textEn: opt.textEn,
                textZh: opt.text,
                weight: opt.score,
            })),
        };

        return (
            <QuizScreen
                question={convertedQuestion}
                currentIndex={currentQuestion}
                totalQuestions={totalQuestions}
                selectedAnswer={answers[currentQuestion] !== undefined
                    ? String.fromCharCode(97 + answers[currentQuestion])
                    : undefined}
                canGoBack={currentQuestion > 0}
                onSelectAnswer={(qId, optionId) => {
                    // 将字母id转回索引
                    const optionIndex = optionId.charCodeAt(0) - 97;
                    answerQuestion(optionIndex);
                }}
                onBack={goBack}
            />
        );
    }

    // 3. Show Welcome
    return (
        <WelcomeScreenGay onStart={startQuiz} />
    );
}
