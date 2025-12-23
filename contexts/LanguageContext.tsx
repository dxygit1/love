"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationKey } from "@/lib/translations";

type Language = "zh" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("zh");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Check localStorage first
        const savedLang = localStorage.getItem("app-language") as Language;
        if (savedLang) {
            setLanguage(savedLang);
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith("en")) {
                setLanguage("en");
            } else {
                setLanguage("zh"); // Default to Chinese
            }
        }
        setIsInitialized(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("app-language", lang);
    };

    const t = (key: TranslationKey): string => {
        const keys = key.split(".");
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k as keyof typeof value];
            } else {
                return key; // Fallback to key if not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    // Prevent hydration mismatch by rendering children only after init, 
    // or use a simple loading state if needed. 
    // For this app, simply returning children is fine, but text might flash.
    // We'll stick to simple return for SPA compatibility.

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
