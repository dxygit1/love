"use client";

import { useState, useEffect } from "react";
import { X, Mail, Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setCopied(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("dxysy1@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const textarea = document.createElement("textarea");
            textarea.value = "dxysy1@gmail.com";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-sm mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center gap-4 pt-2">
                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-rose-500" />
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {t("header.contact")}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {t("header.email_label")}
                        </p>
                    </div>

                    <div className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                        <span className="text-gray-800 font-medium text-sm select-all">
                            dxysy1@gmail.com
                        </span>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-rose-500 text-white hover:bg-rose-600 active:scale-95"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    {t("header.email_copied")}
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    {t("header.copy_email")}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
