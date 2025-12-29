"use client";

import Link from "next/link";

import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="w-full py-6 mt-auto border-t border-gray-100 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
                <div>
                    © {new Date().getFullYear()} Love Quiz. All rights reserved.
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/about" className="hover:text-rose-500 transition-colors">
                        {t("header.about")}
                    </Link>
                    <Link href="/privacy" className="hover:text-rose-500 transition-colors">
                        {t("header.privacy")}
                    </Link>
                    <Link href="/terms" className="hover:text-rose-500 transition-colors">
                        用户协议
                    </Link>
                    <a href="mailto:contact@lovequiz.app" className="hover:text-rose-500 transition-colors">
                        联系我们
                    </a>
                    <Link href="/tools" className="hover:text-rose-500 transition-colors">
                        Tools
                    </Link>
                </div>
            </div>
        </footer>
    );
}
