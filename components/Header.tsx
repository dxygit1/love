"use client";

import Link from "next/link";
import { Heart, Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "zh" ? "en" : "zh");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md border-b border-white/50 transition-all duration-300">
            <div className="container mx-auto px-6 h-16 flex items-center max-w-5xl gap-12">
                <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                    <div className="p-1.5 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg text-white shadow-lg group-hover:scale-105 transition-transform">
                        <Heart className="w-5 h-5 fill-current" />
                    </div>
                    <span className="font-bold text-lg text-gray-800 tracking-tight group-hover:text-rose-600 transition-colors">
                        {t("header.title")}
                    </span>
                </Link>

                <nav className="flex items-center gap-8 text-sm font-medium flex-grow">
                    <Link
                        href="/"
                        className={cn(
                            "transition-colors hover:text-rose-500",
                            isHome ? "text-rose-600" : "text-gray-600"
                        )}
                    >
                        {t("header.home")}
                    </Link>
                    <Link
                        href="/about"
                        className={cn(
                            "transition-colors hover:text-rose-500",
                            pathname === "/about" ? "text-rose-600" : "text-gray-600"
                        )}
                    >
                        {t("header.about")}
                    </Link>
                </nav>

                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all border border-gray-200 hover:border-rose-200"
                >
                    <Languages className="w-4 h-4" />
                    <span>{language === "zh" ? "EN" : "中"}</span>
                </button>
            </div>
        </header>
    );
}
