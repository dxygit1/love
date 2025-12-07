"use client"

import { useAppContext } from "@/components/providers"
import { X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function BetaBanner() {
    const { t } = useAppContext()
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="relative bg-primary text-primary-foreground px-4 py-3 text-center">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm font-medium">
                <span>{t.betaBanner.text}</span>
                <Link
                    href="/dashboard"
                    className="underline hover:text-white/80 transition-colors"
                >
                    {t.betaBanner.link}
                </Link>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
            >
                <X className="w-4 h-4" />
                <span className="sr-only">Dismiss</span>
            </button>
        </div>
    )
}
