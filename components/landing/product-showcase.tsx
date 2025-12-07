"use client"

import { useAppContext } from "@/components/providers"
import { HeroDemo } from "@/components/landing/hero-demo"
import Image from "next/image"

export function ProductShowcase() {
    const { locale } = useAppContext()

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                        {locale === 'zh' ? '看看 AI 如何智能分类' : 'See AI in Action'}
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        {locale === 'zh'
                            ? '粘贴任意链接，AI 自动提取标题、生成摘要、智能分类'
                            : 'Paste any link and let AI extract title, generate summary, and categorize'
                        }
                    </p>
                </div>

                {/* Side by side: Demo + Dashboard */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Demo Animation */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />
                        <HeroDemo />
                    </div>

                    {/* Dashboard Screenshot - matches Demo height */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />
                        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl max-h-[300px]">
                            <Image
                                src="/assets/dashboard_mockup.png"
                                alt="Dashboard Preview"
                                width={800}
                                height={500}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
