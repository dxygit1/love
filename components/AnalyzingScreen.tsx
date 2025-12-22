"use client";

import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function AnalyzingScreen() {
    const [text, setText] = useState("正在整合你的回答...");

    useEffect(() => {
        const texts = [
            "正在整合你的回答...",
            "正在分析情感倾向...",
            "正在计算心动指数...",
            "生成最终报告中..."
        ];
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % texts.length;
            setText(texts[index]);
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6"
        >
            <div className="relative mb-8">
                {/* 脉冲动画背景 */}
                <motion.div
                    className="absolute inset-0 bg-rose-200 rounded-full blur-xl"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 核心图标 */}
                <motion.div
                    className="relative w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-rose-100"
                    animate={{
                        boxShadow: ["0px 10px 30px rgba(251, 113, 133, 0.2)", "0px 10px 50px rgba(251, 113, 133, 0.4)", "0px 10px 30px rgba(251, 113, 133, 0.2)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />

                    {/* 旋转的加载圈 */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{ margin: -4 }}
                    />
                </motion.div>
            </div>

            <motion.h2
                key={text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold text-gray-700 mb-2"
            >
                {text}
            </motion.h2>

            <p className="text-gray-400 text-sm">
                AI 正在用心解读你的心意
            </p>
        </motion.div>
    );
}
