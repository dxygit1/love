"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface BlogLayoutProps {
    children: React.ReactNode;
    title: string;
    titleEn: string;
    date: string;
    readTime: string;
    author?: string;
    coverImage?: string;
}

export function BlogLayout({ children, title, titleEn, date, readTime, author = "Love Quiz", coverImage }: BlogLayoutProps) {
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

                {/* Cover Image */}
                {coverImage && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={coverImage}
                            alt={language === "zh" ? title : titleEn}
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                )}

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
                <div className="blog-content prose prose-lg prose-rose max-w-none">
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
