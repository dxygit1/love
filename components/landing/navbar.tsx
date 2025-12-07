"use client"

import Link from "next/link"
import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Bookmark, Menu, X, Sun, Moon, Monitor } from "lucide-react"
import { useState } from "react"

import { BetaBanner } from "@/components/landing/beta-banner"

export function Navbar() {
  const { t, locale, setLocale, theme, setTheme, user } = useAppContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/#features", label: t.nav.features },
    { href: "/#testimonials", label: t.nav.testimonials },
    { href: "/#faq", label: t.nav.faq },
    { href: "/#contact", label: t.nav.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all">
      <BetaBanner />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">AI Bookmark</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <div className="flex items-center border border-border rounded-lg p-0.5">
              <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-md transition-colors ${theme === "dark" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-md transition-colors ${theme === "system" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center border border-border rounded-lg p-0.5">
              <button
                onClick={() => setLocale("zh")}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${locale === "zh" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                中文
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${locale === "en" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                EN
              </button>
            </div>

            {user ? (
              <Link href="/dashboard">
                <Button size="sm">{locale === 'zh' ? '进入控制台' : 'Dashboard'}</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link href="/login?mode=register">
                  <Button size="sm">{t.nav.getStarted}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-2 px-3 py-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link href="/login?mode=register" className="flex-1">
                  <Button size="sm" className="w-full">
                    {t.nav.getStarted}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
