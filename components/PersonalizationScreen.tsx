"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, SkipForward } from "lucide-react";

interface PersonalizationScreenProps {
    onSubmit: (name: string, gender: "male" | "female") => void;
}

export function PersonalizationScreen({ onSubmit }: PersonalizationScreenProps) {
    const { t, language } = useLanguage();
    const [name, setName] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male");

    const handleSubmit = () => {
        onSubmit(name, gender);
    };

    const handleSkip = () => {
        onSubmit("", "male"); // Default values
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-indigo-50"
        >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-rose-100">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {language === "zh" ? "最后一步..." : "Almost there..."}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {language === "zh"
                            ? "填写对方信息，生成专属情感报告"
                            : "Enter details for a personalized report"}
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                            {language === "zh" ? "对方姓名 (选填)" : "His/Her Name (Optional)"}
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={language === "zh" ? "例如：李明" : "e.g. Alex"}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all bg-gray-50/50"
                        />
                    </div>

                    {/* Gender Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                            {language === "zh" ? "他的性别" : "Gender"}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setGender("male")}
                                className={`py-3 rounded-xl border-2 font-medium transition-all ${gender === "male"
                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                    : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                                    }`}
                            >
                                {language === "zh" ? "他 (男)" : "Male"}
                            </button>
                            <button
                                onClick={() => setGender("female")}
                                className={`py-3 rounded-xl border-2 font-medium transition-all ${gender === "female"
                                    ? "border-rose-500 bg-rose-50 text-rose-600"
                                    : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                                    }`}
                            >
                                {language === "zh" ? "她 (女)" : "Female"}
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons - Equal size side-by-side */}
                    <div className="pt-4 grid grid-cols-2 gap-4">
                        <button
                            onClick={handleSkip}
                            className="w-full py-4 bg-gray-100 text-gray-600 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            {language === "zh" ? "直接查看" : "Skip"}
                            <SkipForward className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {language === "zh" ? "生成报告" : "Submit"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
