"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface BlogLayoutProps {
    children: React.ReactNode;
    title: string;
    titleEn: string;
    date: string;
    readTime: string;
    author?: string;
}

export function BlogLayout({ children, title, titleEn, date, readTime, author = "Love Quiz" }: BlogLayoutProps) {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pt-20 pb-16">
            <article className="max-w-3xl mx-auto px-4 sm:px-6">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-500 hover:text-rose-600 text-sm font-medium transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {language === "zh" ? "返回文章列表" : "Back to Articles"}
                </Link>

                {/* Article Header */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                        {language === "zh" ? title : titleEn}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {author}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {language === "zh" ? `${readTime}分钟阅读` : `${readTime} min read`}
                        </span>
                    </div>
                </header>

                {/* Article Content */}
                <div className="prose prose-lg prose-rose max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-li:text-gray-700
                    prose-strong:text-gray-900
                    prose-blockquote:border-l-rose-400 prose-blockquote:bg-rose-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                ">
                    {children}
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="bg-rose-50 rounded-2xl p-6 text-center">
                        <p className="text-gray-600 mb-4">
                            {language === "zh"
                                ? "觉得这篇文章有帮助？试试我们的趣味测试吧！"
                                : "Found this helpful? Try our fun quizzes!"}
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg transition-all"
                        >
                            {language === "zh" ? "开始测试" : "Start Quiz"}
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}
