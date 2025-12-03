"use client"

import { AiUsageWidget } from "@/components/ai-usage-widget"
import { DashboardHeader } from "@/components/dashboard-header"

export default function UsagePage() {
    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            AI 使用统计
                        </h1>
                    </div>

                    <div className="max-w-xl">
                        <AiUsageWidget />
                    </div>
                </div>
            </main>
        </div>
    )
}
