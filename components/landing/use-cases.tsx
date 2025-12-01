"use client"

import { useAppContext } from "@/components/providers"
import { Code, Palette, PenTool, GraduationCap } from "lucide-react"

const icons = [Code, Palette, PenTool, GraduationCap]
const colors = [
  "bg-blue-500/10 text-blue-500",
  "bg-pink-500/10 text-pink-500",
  "bg-orange-500/10 text-orange-500",
  "bg-green-500/10 text-green-500",
]

export function UseCases() {
  const { t } = useAppContext()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.cases.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.cases.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.cases.items.map((item, index) => {
            const Icon = icons[index]
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${colors[index]} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
