"use client"

import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Download } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const { t, user, locale } = useAppContext()

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          {t.hero.badge}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          {t.hero.title}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            {t.hero.titleHighlight}
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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
          <a href="/ai-bookmark-extension.zip" download>
            <Button variant="outline" size="lg" className="px-8 bg-transparent hover:bg-muted/50 gap-2">
              <Download className="w-4 h-4" />
              {locale === 'zh' ? '下载插件' : 'Download Extension'}
            </Button>
          </a>
        </div>

        {/* Stats - 4 items, centered */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-border">
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
