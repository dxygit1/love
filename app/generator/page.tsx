"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { results, type ResultCategory } from "@/lib/quiz-data";
import { AnalyzingScreen } from "@/components/AnalyzingScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { ArrowRight, Settings2 } from "lucide-react";

type Step = "input" | "analyzing" | "result";

export default function GeneratorPage() {
    const [step, setStep] = useState<Step>("input");
    const [score, setScore] = useState(88);
    const [name, setName] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [result, setResult] = useState<ResultCategory | null>(null);

    const handleGenerate = () => {
        // 1. Calculate result based on score
        const foundResult = results.find(
            (r) => score >= r.minScore && score <= r.maxScore
        );
        setResult(foundResult || results[results.length - 1]);

        // 2. Formatting name
        const finalName = name.trim() || (gender === "male" ? "他" : "她");
        setName(finalName);

        // 3. Start Animation
        setStep("analyzing");
        setTimeout(() => {
            setStep("result");
        }, 2500);
    };

    const handleRestart = () => {
        setStep("input");
        setResult(null);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <AnimatePresence mode="wait">
                {/* Step 1: Input Form */}
                {step === "input" && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center p-6"
                    >
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-8">
                                <Settings2 className="w-6 h-6 text-rose-500" />
                                <h1 className="text-2xl font-bold text-gray-800">
                                    结果生成器
                                </h1>
                            </div>

                            <div className="space-y-6">
                                {/* Score Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
                                        <span>设定分数 (0-100)</span>
                                        <span className="text-rose-500 font-bold text-lg">{score}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={score}
                                        onChange={(e) => setScore(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>不喜欢</span>
                                        <span>超爱</span>
                                    </div>
                                </div>

                                {/* Name Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        对方称呼
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="例如：李明 / My Crush"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all"
                                    />
                                </div>

                                {/* Gender Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        性别
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setGender("male")}
                                            className={`py-3 rounded-xl border-2 font-medium transition-all ${gender === "male"
                                                ? "border-blue-500 bg-blue-50 text-blue-600"
                                                : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                                                }`}
                                        >
                                            男
                                        </button>
                                        <button
                                            onClick={() => setGender("female")}
                                            className={`py-3 rounded-xl border-2 font-medium transition-all ${gender === "female"
                                                ? "border-rose-500 bg-rose-50 text-rose-600"
                                                : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                                                }`}
                                        >
                                            女
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={handleGenerate}
                                        className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        开始生成动画
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Analyzing Animation */}
                {step === "analyzing" && (
                    <AnalyzingScreen key="analyzing" />
                )}

                {/* Step 3: Result */}
                {step === "result" && result && (
                    <ResultScreen
                        key="result"
                        score={score}
                        result={result}
                        onRestart={handleRestart} // Go back to input
                        personName={name}
                        gender={gender}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
