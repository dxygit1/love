"use client"

import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const { t } = useAppContext()

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          {t.hero.badge}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
          {t.hero.title}
          <br />
          <span className="text-primary">{t.hero.titleHighlight}</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login?mode=register">
            <Button size="lg" className="gap-2 px-8">
              {t.hero.cta}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              {t.hero.secondaryCta}
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-10 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">50K+</div>
            <div className="text-sm text-muted-foreground mt-1">{t.stats.bookmarks}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">95%</div>
            <div className="text-sm text-muted-foreground mt-1">{t.stats.accuracy}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">2K+</div>
            <div className="text-sm text-muted-foreground mt-1">{t.stats.users}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">20+</div>
            <div className="text-sm text-muted-foreground mt-1">{t.stats.categories}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
