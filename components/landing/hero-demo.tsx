"use client"

import { motion } from "framer-motion"
import { Search, Loader2, CheckCircle2, Folder, ExternalLink, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { useAppContext } from "@/components/providers"

export function HeroDemo() {
    const { t } = useAppContext()
    const [step, setStep] = useState<"idle" | "typing" | "analyzing" | "result">("idle")
    const [text, setText] = useState("")
    const fullText = "https://github.com/torvalds/linux"

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const runAnimation = () => {
            // Reset
            setStep("typing")
            setText("")

            // Typing animation (simulated)
            let i = 0
            const typeInterval = setInterval(() => {
                i++
                setText(fullText.substring(0, i))
                if (i >= fullText.length) {
                    clearInterval(typeInterval)
                    setStep("analyzing")

                    // Analyzing delay
                    timeout = setTimeout(() => {
                        setStep("result")

                        // Hold result then restart
                        timeout = setTimeout(() => {
                            setStep("idle")
                            timeout = setTimeout(runAnimation, 1000)
                        }, 4000)
                    }, 1500)
                }
            }, 50)
        }

        // Initial start
        timeout = setTimeout(runAnimation, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className="relative w-full max-w-2xl mx-auto perspective-1000">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-3xl -z-10" />

            {/* Main Card */}
            <motion.div
                className="w-full bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-none overflow-hidden"
                initial={{ rotateX: 5, rotateY: -5 }}
                animate={{
                    rotateX: step === "result" ? 0 : 5,
                    rotateY: step === "result" ? 0 : -5,
                    scale: step === "result" ? 1.05 : 1
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Visual Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <div className="p-6 space-y-6">
                    {/* Input Field Simulation */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {t?.addBookmark || "Add Bookmark"}
                        </label>
                        <div className="relative">
                            <div className="flex items-center h-12 px-4 rounded-lg bg-muted/50 border border-border">
                                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                                <span className="text-foreground font-mono text-sm">{text}</span>
                                {step === "typing" && (
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="w-0.5 h-5 bg-primary ml-1"
                                    />
                                )}
                            </div>

                            {/* Analyzing Status */}
                            {step === "analyzing" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute right-3 top-3"
                                >
                                    <div className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        AI Analyzing...
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="relative h-[160px]">
                        {step === "result" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="absolute inset-0 bg-gradient-to-br from-card to-muted/30 border border-border/40 rounded-xl p-4 shadow-md flex flex-col gap-2 h-[150px] backdrop-blur-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-foreground">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-sm truncate">Linux Kernel</h4>
                                            <a href="#" className="text-xs text-muted-foreground flex items-center hover:underline truncate">
                                                github.com/torvalds/linux
                                            </a>
                                        </div>
                                    </div>

                                    {/* Actions (Mock) */}
                                    <div className="flex gap-1 shrink-0">
                                        <div className="w-7 h-7 rounded-sm hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors cursor-pointer">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-border/40 my-1" />

                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    Original source code for the Linux kernel. Essential resource for OS development.
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Folder className="w-3 h-3" />
                                        Development
                                    </span>
                                    <span className="text-[10px] text-muted-foreground/50">Just now</span>
                                </div>

                                <div className="absolute -right-2 -top-2">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg ring-2 ring-background"
                                    >
                                        <CheckCircle2 className="w-3 h-3" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {/* Placeholder / Empty State */}
                        {step !== "result" && (
                            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-xl">
                                <div className="text-center text-muted-foreground/50">
                                    <div className="w-12 h-12 rounded-full bg-muted/50 mx-auto mb-2 flex items-center justify-center">
                                        <Folder className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm">Result will appear here</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Floating connecting line decoration */}
            <motion.div
                className="absolute top-1/2 left-full w-20 h-px bg-gradient-to-r from-primary to-transparent"
                style={{ originX: 0 }}
                animate={{ scaleX: step === "analyzing" ? [0, 1] : 0, opacity: step === "analyzing" ? 1 : 0 }}
            />
        </div>
    )
}
