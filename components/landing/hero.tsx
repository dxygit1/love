"use client"

import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Bookmark, Target } from "lucide-react"
import Link from "next/link"
import { HeroDemo } from "@/components/landing/hero-demo"

export function Hero() {
  const { t, user, locale } = useAppContext()

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              {t.hero.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              {t.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 text-pretty">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 px-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
                    {locale === 'zh' ? '进入控制台' : 'Go to Dashboard'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login?mode=register">
                  <Button size="lg" className="gap-2 px-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
                    {t.hero.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              <a href="#features">
                <Button variant="outline" size="lg" className="px-8 bg-transparent hover:bg-muted/50">
                  {t.hero.secondaryCta}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 pt-10 border-t border-border lg:border-none lg:pt-0 lg:mt-16">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-xs text-muted-foreground font-medium">{t.stats.bookmarks}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Target className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-xs text-muted-foreground font-medium">{t.stats.accuracy}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Demo Animation */}
          <div className="relative mt-8 lg:mt-0">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
