"use client"

import { useAppContext } from "@/components/providers"
import { Brain, Zap, Cloud, Search, FolderOpen, Shield } from "lucide-react"

const icons = [Brain, Zap, Cloud, Search, FolderOpen, Shield]

export function Features() {
  const { t } = useAppContext()

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.features.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.features.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => {
            const Icon = icons[index]
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
