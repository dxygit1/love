"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, Loader2, Folder, ArrowRight } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/components/providers"

export function HeroSearch() {
    const { t, user } = useAppContext()
    const router = useRouter()
    const [query, setQuery] = useState("")
    const [step, setStep] = useState<"idle" | "analyzing">("idle")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!query.trim()) return

        setStep("analyzing")

        // Simulate a brief "thinking" pause for effect (UX)
        await new Promise(resolve => setTimeout(resolve, 800))

        const targetUrl = `/dashboard?add=${encodeURIComponent(query.trim())}`

        if (user) {
            router.push(targetUrl)
        } else {
            // If not logged in, go to login then redirect
            router.push(`/login?redirect=${encodeURIComponent(targetUrl)}`)
        }
    }

    return (
        <div className="relative w-full max-w-lg mx-auto aspect-[4/3] perspective-1000">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-3xl -z-10" />

            {/* Main Card */}
            <motion.div
                className="w-full bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
                initial={{ rotateX: 5, rotateY: -5 }}
                whileHover={{ rotateX: 0, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Visual Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <div className="p-6 space-y-8">
                    {/* Header Text */}
                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{t?.addBookmark || "Add Bookmark"}</h3>
                        <p className="text-sm text-muted-foreground">
                            {user ? "Save to your collection" : "Try it out instantly"}
                        </p>
                    </div>

                    {/* Interactive Input Field */}
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className={`
                            flex items-center h-14 px-4 rounded-xl border transition-all duration-300
                            ${step === "analyzing"
                                ? "bg-primary/5 border-primary/50 ring-2 ring-primary/20"
                                : "bg-muted/50 border-border group-focus-within:border-primary/50 group-focus-within:bg-background group-focus-within:shadow-lg"
                            }
                        `}>
                            {step === "analyzing" ? (
                                <Loader2 className="w-5 h-5 text-primary animate-spin mr-3 shrink-0" />
                            ) : (
                                <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                            )}

                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Paste any URL here..."
                                disabled={step === "analyzing"}
                                className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/70"
                            />

                            <AnimatePresence>
                                {query.trim() && step === "idle" && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8, x: 10 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, x: 10 }}
                                        type="submit"
                                        className="ml-2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>

                    {/* Result Preview Placeholder */}
                    <div className="relative h-48 border-2 border-dashed border-muted-foreground/10 rounded-xl flex items-center justify-center bg-muted/5">
                        <AnimatePresence mode="wait">
                            {step === "analyzing" ? (
                                <motion.div
                                    key="analyzing"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-center space-y-3"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                                    </div>
                                    <p className="text-sm font-medium text-foreground">AI is analyzing content...</p>
                                    <p className="text-xs text-muted-foreground">Identifying category & tags</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-muted-foreground/50"
                                >
                                    <div className="w-12 h-12 rounded-full bg-muted/50 mx-auto mb-2 flex items-center justify-center">
                                        <Folder className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm">Preview will appear here</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
