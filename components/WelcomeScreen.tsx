"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles, Clock } from "lucide-react";

interface WelcomeScreenProps {
    onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-indigo-50"
        >
            {/* 动态背景装饰 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-[10%] left-[10%] w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"
                    animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"
                    animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            <div className="w-full max-w-2xl px-6 relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Main Icon */}
                    <div className="relative inline-block mb-8">
                        <motion.div
                            className="absolute inset-0 bg-rose-400 rounded-full blur-xl opacity-20"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                            className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl rotate-3"
                            whileHover={{ rotate: 12, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Heart className="w-12 h-12 text-white fill-white" />
                            <motion.div
                                className="absolute -top-2 -right-2"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500">
                            测测你到底有多
                        </span>
                    </h1>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight mb-8">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
                            喜欢他？
                        </span>
                    </h1>

                    {/* Card Content */}
                    <motion.div
                        className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
                            <span className="font-semibold text-rose-500">“他其实没那么喜欢你”</span> —— 当年这句台词浇醒了多少梦中人。
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            我们容易美化一段关系，也容易在暧昧中迷失。
                            <br />
                            早点看清自己的心意，是狂热挚爱还是一时心动？
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50/50 py-3 rounded-lg border border-gray-100/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            建议选择日常生活中的朋友或暧昧对象来测哦
                        </div>
                    </motion.div>

                    {/* Start Button */}
                    <div className="flex flex-col items-center gap-4">
                        <motion.button
                            onClick={onStart}
                            className="group relative px-10 py-5 bg-gray-900 text-white font-bold text-xl rounded-2xl shadow-2xl hover:bg-gray-800 transition-all overflow-hidden"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center gap-3">
                                开始探索内心
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.button>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>预计用时: 2-3 分钟</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
