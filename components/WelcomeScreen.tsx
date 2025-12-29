"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdUnit } from "@/components/AdUnit";
import Link from "next/link";

interface WelcomeScreenProps {
    onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen flex flex-col items-center pt-28 pb-20 relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-indigo-50"
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

            <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
                {/* 顶部广告位 */}
                {/* Top Ad moved to below CTA */}

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
                            {t("welcome.title_1")}
                        </span>
                    </h1>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight mb-8">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
                            {t("welcome.title_2")}
                        </span>
                    </h1>

                    {/* Card Content */}
                    <motion.div
                        className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 mb-8 max-w-2xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
                            <span className="font-semibold text-rose-500">{t("welcome.subtitle_1")}</span> {t("welcome.subtitle_2")}
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {t("welcome.desc")}
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50/50 py-3 rounded-lg border border-gray-100/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {t("welcome.tip")}
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
                                {t("welcome.btn_start")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.button>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{t("welcome.time")}</span>
                        </div>

                        {/* Cross Link */}
                        <div className="mt-4">
                            <Link href="/does-he-like-me" className="text-sm text-gray-500 hover:text-rose-500 transition-colors flex items-center gap-1 border-b border-dashed border-gray-300 hover:border-rose-300 pb-0.5">
                                <Sparkles className="w-3 h-3" />
                                Switch to: <b>Does He Like Me?</b>
                            </Link>
                        </div>
                    </div>

                    {/* SEO Content Sections (For AdSense) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-left space-y-12 max-w-5xl mx-auto pb-8"
                    >
                        {/* Section 1: Introduction */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-rose-500 rounded-full" />
                                {t("welcome_content.about_title")}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                                {t("welcome_content.about_text")}
                            </p>
                        </section>

                        {/* Section 2: Theory */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-indigo-500 rounded-full" />
                                {t("welcome_content.dimension_title")}
                            </h2>
                            <div className="bg-white/50 rounded-2xl p-6 border border-white/60 shadow-sm">
                                <ul className="space-y-4 text-base text-gray-600">
                                    <li className="flex gap-3">
                                        <span className="font-bold text-indigo-600 min-w-16">{t("welcome_content.dim_1_title")}</span>
                                        <span>{t("welcome_content.dim_1_desc")}</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-rose-600 min-w-16">{t("welcome_content.dim_2_title")}</span>
                                        <span>{t("welcome_content.dim_2_desc")}</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-purple-600 min-w-16">{t("welcome_content.dim_3_title")}</span>
                                        <span>{t("welcome_content.dim_3_desc")}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 3: FAQ - Expanded for SEO/AdSense Value */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-violet-500 rounded-full" />
                                {t("welcome_content.faq_title")}
                            </h2>
                            <div className="space-y-6">
                                <div className="bg-white/40 rounded-xl p-5 border border-white/50">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="text-rose-400">Q.</span> {t("welcome_content.faq_1_q")}
                                    </h3>
                                    <p className="text-base text-gray-600 leading-relaxed pl-6 border-l-2 border-rose-100">
                                        {t("welcome_content.faq_1_a")}
                                    </p>
                                </div>
                                <div className="bg-white/40 rounded-xl p-5 border border-white/50">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="text-rose-400">Q.</span> {t("welcome_content.faq_2_q")}
                                    </h3>
                                    <p className="text-base text-gray-600 leading-relaxed pl-6 border-l-2 border-rose-100">
                                        {t("welcome_content.faq_2_a")}
                                    </p>
                                </div>
                                <div className="bg-white/40 rounded-xl p-5 border border-white/50">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="text-rose-400">Q.</span> {t("welcome_content.faq_3_q")}
                                    </h3>
                                    <p className="text-base text-gray-600 leading-relaxed pl-6 border-l-2 border-rose-100">
                                        {t("welcome_content.faq_3_a")}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Bottom Ad Slot - Positioned safely after legitimate content */}
                        <div className="w-full mt-8 min-h-[100px]">
                            <AdUnit slot="HOME_TOP_SLOT" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}
