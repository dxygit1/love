import { motion } from 'framer-motion';
import { ArrowRight, Activity, Clock, Users, Heart, Brain, RefreshCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface WelcomeScreenProps {
    onStart: (age: number) => void;
}

export default function WelcomeScreenMentalAge({ onStart }: WelcomeScreenProps) {
    const { language, t } = useLanguage();
    const [age, setAge] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleStart = () => {
        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum <= 0 || ageNum > 150) {
            setError(t("common.mental_age_invalid_age"));
            return;
        }
        onStart(ageNum);
    };

    return (
        <div className="flex flex-col items-center min-h-screen pt-28 pb-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl mx-auto"
            >
                {/* Category Tag */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-600 mb-6 text-sm font-medium"
                >
                    <Brain size={16} />
                    <span>Core Self</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {t("common.mental_age_title")}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                    {t("common.mental_age_desc")}
                </p>

                {/* Input for Age */}
                <div className="mb-8 w-full max-w-xs mx-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        {t("common.mental_age_enter_age")}
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => {
                                setAge(e.target.value);
                                setError('');
                            }}
                            placeholder={t("common.mental_age_input_placeholder")}
                            className={cn(
                                "w-full px-4 py-3 text-lg border-2 rounded-xl outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                                error
                                    ? "border-red-300 focus:border-red-500 bg-red-50"
                                    : "border-gray-200 focus:border-green-500"
                            )}
                            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                            {language === 'zh' ? '岁' : ''}
                        </span>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-left flex items-center gap-1">
                            <span className="inline-block w-4 h-4 rounded-full bg-red-100 text-red-500 text-xs flex items-center justify-center">!</span>
                            {error}
                        </p>
                    )}

                    {/* Quick Select Buttons */}
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2 no-scrollbar">
                        {[18, 20, 25, 30].map(val => (
                            <button
                                key={val}
                                onClick={() => { setAge(val.toString()); setError(''); }}
                                className="px-3 py-1 text-sm bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-600 rounded-full transition-colors whitespace-nowrap"
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStart}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all w-full md:w-auto overflow-hidden"
                >
                    <span className="relative z-10">{t("common.mental_age_start_button")}</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                {/* Scientific Context Section (SEO Booster) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-left max-w-3xl mx-auto space-y-8"
                >
                    <div className="bg-white/80 rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-500 rounded-full" />
                            {t("common.mental_age_about_title")}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                            {t("common.mental_age_about_content")}
                        </p>
                    </div>

                    <div className="bg-white/80 rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full" />
                            {t("common.mental_age_brain_title")}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                            {t("common.mental_age_brain_content")}
                        </p>
                    </div>
                </motion.div>

                {/* Features / FAQ Preview */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4">
                            <Clock size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{t("common.faq_mental_age_q1")}</h3>
                        <p className="text-sm text-gray-500">{t("common.faq_mental_age_a1")}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                            <Activity size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{t("common.faq_mental_age_q2")}</h3>
                        <p className="text-sm text-gray-500">{t("common.faq_mental_age_a2")}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                            <RefreshCcw size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{t("common.faq_mental_age_q3")}</h3>
                        <p className="text-sm text-gray-500">{t("common.faq_mental_age_a3")}</p>
                    </div>
                </div>

                {/* Cross Links to Other Quizzes */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-medium">More Quizzes</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/love-quiz" className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors">
                            <Heart size={14} />
                            {t("header.title")}
                        </Link>
                        <Link href="/does-he-like-me" className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-full text-sm font-medium hover:bg-rose-100 transition-colors">
                            <Heart size={14} />
                            {t("welcome_does_he_like_me.title_1")} {t("welcome_does_he_like_me.title_2")}
                        </Link>
                        <Link href="/do-i-like-her" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
                            <Users size={14} />
                            {t("welcome_do_i_like_her.title_1")} {t("welcome_do_i_like_her.title_2")}
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
