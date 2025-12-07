"use client"

import Image from "next/image"
import { useAppContext } from "@/components/providers"
import { motion } from "framer-motion"

export function ProductShowcase() {
    const { t } = useAppContext()

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {t?.nav?.dashboard || "Beautiful Dashboard"}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience a clean, distraction-free interface designed for efficiency. Dark mode included.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-5xl mx-auto perspective-1000"
                >
                    <div className="relative rounded-xl border border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden transform-gpu">
                        {/* Browser Bar Decoration */}
                        <div className="h-8 bg-muted/80 backdrop-blur border-b border-border flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="flex-1 text-center text-xs text-muted-foreground font-medium">
                                app.aibookmark.com/dashboard
                            </div>
                        </div>

                        {/* Actual Image */}
                        <div className="relative aspect-[16/9] w-full bg-gray-900/50">
                            {/* We use the generic mockup we generated */}
                            <Image
                                src="/assets/dashboard_mockup.png"
                                alt="Dashboard Preview"
                                fill
                                className="object-cover object-top"
                            />

                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Glow effect behind */}
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full opacity-50" />
                </motion.div>
            </div>
        </section>
    )
}
