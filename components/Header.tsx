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
            <div className="w-full mx-auto px-4 md:px-8 lg:px-16 h-14 md:h-16 flex items-center justify-between">
                {/* Logo + Nav - Left */}
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                        <div className="p-1.5 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg text-white shadow-lg group-hover:scale-105 transition-transform">
                            <Heart className="w-5 h-5 fill-current" />
                        </div>
                        <span className="font-bold text-base md:text-lg text-gray-800 tracking-tight group-hover:text-rose-600 transition-colors">
                            {t("header.title")}
                        </span>
                    </Link>

                    {/* Nav - Right of logo */}
                    <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
                        <Link
                            href="/"
                            className={cn(
                                "transition-colors hover:text-rose-500 whitespace-nowrap",
                                isHome ? "text-rose-600" : "text-gray-600"
                            )}
                        >
                            {t("header.home")}
                        </Link>
                        <Link
                            href="/about"
                            className={cn(
                                "transition-colors hover:text-rose-500 whitespace-nowrap",
                                pathname === "/about" ? "text-rose-600" : "text-gray-600"
                            )}
                        >
                            {t("header.about")}
                        </Link>
                    </nav>
                </div>

                <button
                    onClick={toggleLanguage}
                    className="flex-shrink-0 flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3 text-xs md:text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all border border-gray-200 hover:border-rose-200 ml-2 md:ml-0"
                >
                    <Languages className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>{language === "zh" ? "EN" : "中"}</span>
                </button>
            </div>
        </header>
    );
}
