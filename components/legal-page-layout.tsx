"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/components/providers"
import { Navbar } from "@/components/landing/navbar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight } from "lucide-react"

interface Section {
    id: string
    title: string
    content: React.ReactNode
}

interface LegalPageLayoutProps {
    title: string
    lastUpdated: string
    sections: Section[]
}

export function LegalPageLayout({ title, lastUpdated, sections }: LegalPageLayoutProps) {
    const [activeSection, setActiveSection] = useState(sections[0].id)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: "-20% 0px -35% 0px" }
        )

        sections.forEach((section) => {
            const element = document.getElementById(section.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [sections])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 100 // Header height + padding
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar Navigation - Hidden on mobile, sticky on desktop */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24">
                            <div className="space-y-1 mb-4">
                                <h3 className="font-semibold text-lg px-4">{title}</h3>
                                <p className="text-xs text-muted-foreground px-4">{lastUpdated}</p>
                            </div>
                            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                                <nav className="space-y-1">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-sm rounded-lg transition-colors flex items-center justify-between group",
                                                activeSection === section.id
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            {section.title}
                                            {activeSection === section.id && (
                                                <ChevronRight className="w-4 h-4 opacity-50" />
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </ScrollArea>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="lg:hidden mb-8">
                            <h1 className="text-3xl font-bold mb-2">{title}</h1>
                            <p className="text-sm text-muted-foreground">{lastUpdated}</p>
                        </div>

                        <div className="space-y-16">
                            {sections.map((section) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-24"
                                >
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 pb-2 border-b">
                                        <span className="text-primary/20 text-3xl font-black select-none">#</span>
                                        {section.title}
                                    </h2>
                                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                        {section.content}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
