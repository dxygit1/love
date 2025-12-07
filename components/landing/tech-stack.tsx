"use client"

import { useAppContext } from "@/components/providers"
import { motion } from "framer-motion"

export function TechStack() {
    const { t } = useAppContext()

    // Using text labels for now to ensure consistency, can replace with SVGs later
    const technologies = [
        { name: "Next.js 14", color: "hover:text-black dark:hover:text-white" },
        { name: "React", color: "hover:text-[#61DAFB]" },
        { name: "TypeScript", color: "hover:text-[#3178C6]" },
        { name: "Tailwind CSS", color: "hover:text-[#38B2AC]" },
        { name: "OpenAI", color: "hover:text-[#10A37F]" },
        { name: "Supabase", color: "hover:text-[#3ECF8E]" },
        { name: "Vercel", color: "hover:text-black dark:hover:text-white" },
    ]

    return (
        <section className="py-12 border-y border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
                    {t.techStack.title}
                </p>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale hover:grayscale-0 transition-all duration-500">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`text-xl font-bold text-muted-foreground/50 transition-colors duration-300 cursor-default ${tech.color}`}
                        >
                            {tech.name}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
