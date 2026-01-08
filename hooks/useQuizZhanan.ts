"use client";

import { useState, useCallback } from "react";
import {
    zhananQuestions,
    zhananResults,
    getZhananResult,
    getNextQuestionId,
    type ZhananQuestion,
    type ZhananAnswer,
    type ZhananResult,
} from "@/lib/zhanan-quiz-data";

interface QuizState {
    started: boolean;
    finished: boolean;
    currentQuestionId: number;
    // 记录每道题的答案（单选存索引，多选存索引数组）
    answers: Map<number, number | number[]>;
    totalScore: number;
    result: ZhananResult | null;
    // 记录答题历史，用于返回上一题
    questionHistory: number[];
    // 记录多选题得分，用于goBack时正确减分
    multiSelectResults: Map<number, number>;
}

export function useQuizZhanan() {
    const [state, setState] = useState<QuizState>({
        started: false,
        finished: false,
        currentQuestionId: 1,
        answers: new Map(),
        totalScore: 0,
        result: null,
        questionHistory: [],
        multiSelectResults: new Map(),
    });

    // 获取当前题目
    const currentQuestion = zhananQuestions.find(
        (q) => q.id === state.currentQuestionId
    );

    // 开始测试
    const startQuiz = useCallback(() => {
        setState({
            started: true,
            finished: false,
            currentQuestionId: 1,
            answers: new Map(),
            totalScore: 0,
            result: null,
            questionHistory: [],
            multiSelectResults: new Map(),
        });
    }, []);

    // 重新开始
    const restartQuiz = useCallback(() => {
        setState({
            started: false,
            finished: false,
            currentQuestionId: 1,
            answers: new Map(),
            totalScore: 0,
            result: null,
            questionHistory: [],
            multiSelectResults: new Map(),
        });
    }, []);

    // 单选题答题
    const answerSingleSelect = useCallback(
        (optionIndex: number) => {
            if (!currentQuestion || currentQuestion.isMultiSelect) return;

            const selectedAnswer = currentQuestion.answers[optionIndex];
            if (!selectedAnswer) return;

            setState((prev) => {
                const newAnswers = new Map(prev.answers);
                newAnswers.set(prev.currentQuestionId, optionIndex);

                // 计算新分数
                const newScore = prev.totalScore + selectedAnswer.score;

                // 获取下一题ID
                const nextId = getNextQuestionId(prev.currentQuestionId, selectedAnswer);

                if (nextId === null) {
                    // 测试结束
                    return {
                        ...prev,
                        answers: newAnswers,
                        totalScore: newScore,
                        finished: true,
                        result: getZhananResult(newScore),
                        questionHistory: [...prev.questionHistory, prev.currentQuestionId],
                    };
                }

                return {
                    ...prev,
                    answers: newAnswers,
                    totalScore: newScore,
                    currentQuestionId: nextId,
                    questionHistory: [...prev.questionHistory, prev.currentQuestionId],
                };
            });
        },
        [currentQuestion]
    );

    // 多选题 - 切换选项
    const toggleMultiSelectOption = useCallback(
        (optionIndex: number) => {
            if (!currentQuestion || !currentQuestion.isMultiSelect) return;

            setState((prev) => {
                const currentSelected = (prev.answers.get(prev.currentQuestionId) as number[]) || [];
                let newSelected: number[];

                if (currentSelected.includes(optionIndex)) {
                    newSelected = currentSelected.filter((i) => i !== optionIndex);
                } else {
                    newSelected = [...currentSelected, optionIndex];
                }

                const newAnswers = new Map(prev.answers);
                newAnswers.set(prev.currentQuestionId, newSelected);

                return {
                    ...prev,
                    answers: newAnswers,
                };
            });
        },
        [currentQuestion]
    );

    // 多选题 - 确认提交
    const confirmMultiSelect = useCallback(() => {
        if (!currentQuestion || !currentQuestion.isMultiSelect) return;

        setState((prev) => {
            const selectedIndices = (prev.answers.get(prev.currentQuestionId) as number[]) || [];

            // 生成用户选择字符串，如 "110100"
            let userSelection = "";
            currentQuestion.answers.forEach((_, idx) => {
                userSelection += selectedIndices.includes(idx) ? "1" : "0";
            });

            // 精确匹配分数计算：
            // 只有完全匹配正确答案才能得满分，否则0分
            let addedScore = 0;
            if (currentQuestion.correctAnswer && userSelection === currentQuestion.correctAnswer) {
                addedScore = currentQuestion.fullScore || 10;
            }

            const newScore = prev.totalScore + addedScore;

            // 获取下一题ID
            const nextId = getNextQuestionId(prev.currentQuestionId);

            if (nextId === null) {
                return {
                    ...prev,
                    totalScore: newScore,
                    finished: true,
                    result: getZhananResult(newScore),
                    questionHistory: [...prev.questionHistory, prev.currentQuestionId],
                    // 保存用户选择用于goBack时判断
                    multiSelectResults: new Map(prev.multiSelectResults || []).set(prev.currentQuestionId, addedScore),
                };
            }

            // 保存用户选择用于goBack时判断
            const newMultiSelectResults = new Map(prev.multiSelectResults || []);
            newMultiSelectResults.set(prev.currentQuestionId, addedScore);

            return {
                ...prev,
                totalScore: newScore,
                currentQuestionId: nextId,
                questionHistory: [...prev.questionHistory, prev.currentQuestionId],
                multiSelectResults: newMultiSelectResults,
            };
        });
    }, [currentQuestion]);

    // 返回上一题
    const goBack = useCallback(() => {
        setState((prev) => {
            if (prev.questionHistory.length === 0) return prev;

            const newHistory = [...prev.questionHistory];
            const previousQuestionId = newHistory.pop()!;

            // 需要减去上一题的分数
            const previousQuestion = zhananQuestions.find((q) => q.id === previousQuestionId);
            const previousAnswer = prev.answers.get(previousQuestionId);

            let scoreToSubtract = 0;
            if (previousQuestion && previousAnswer !== undefined) {
                if (previousQuestion.isMultiSelect) {
                    // 多选题：从multiSelectResults获取实际得分
                    scoreToSubtract = prev.multiSelectResults.get(previousQuestionId) || 0;
                } else {
                    // 单选题
                    const answer = previousQuestion.answers[previousAnswer as number];
                    if (answer) {
                        scoreToSubtract = answer.score;
                    }
                }
            }

            // 清除上一题的答案和多选题结果
            const newAnswers = new Map(prev.answers);
            newAnswers.delete(previousQuestionId);

            const newMultiSelectResults = new Map(prev.multiSelectResults);
            newMultiSelectResults.delete(previousQuestionId);

            return {
                ...prev,
                currentQuestionId: previousQuestionId,
                questionHistory: newHistory,
                answers: newAnswers,
                multiSelectResults: newMultiSelectResults,
                totalScore: prev.totalScore - scoreToSubtract,
            };
        });
    }, []);

    // 获取当前多选题已选中的选项索引
    const getSelectedMultiOptions = (): number[] => {
        if (!currentQuestion?.isMultiSelect) return [];
        return (state.answers.get(state.currentQuestionId) as number[]) || [];
    };

    // 计算进度（基于答题历史长度）
    const progress = state.questionHistory.length;
    // 因为有分支，实际答题数量约12-14道
    const estimatedTotal = 14;

    return {
        started: state.started,
        finished: state.finished,
        currentQuestion,
        currentQuestionId: state.currentQuestionId,
        score: state.totalScore,
        result: state.result,
        progress,
        estimatedTotal,
        canGoBack: state.questionHistory.length > 0,
        startQuiz,
        restartQuiz,
        answerSingleSelect,
        toggleMultiSelectOption,
        confirmMultiSelect,
        goBack,
        getSelectedMultiOptions,
    };
}
