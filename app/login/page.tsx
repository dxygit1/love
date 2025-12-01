"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bookmark, Mail, Lock, User, ArrowLeft } from "lucide-react"
import { AUTH_CONFIG } from "@/lib/auth-config"

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, user, setUser, locale, setLocale, theme, setTheme } = useAppContext()

  const [mode, setMode] = useState<"login" | "register">(searchParams.get("mode") === "register" ? "register" : "login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful login/register
    const mockUser = {
      id: crypto.randomUUID(),
      email,
      name: mode === "register" ? name : email.split("@")[0],
      provider: "email" as const,
    }

    setUser(mockUser)
    setLoading(false)
    router.push("/dashboard")
  }

  const handleGoogleLogin = () => {
    // Build Google OAuth URL
    const redirectUri = typeof window !== "undefined" ? `${window.location.origin}/api/auth/google/callback` : ""

    const params = new URLSearchParams({
      client_id: AUTH_CONFIG.google.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    })

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl text-primary-foreground">AI Bookmark</span>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">
            {locale === "zh" ? "智能管理你的收藏" : "Smart Bookmark Management"}
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            {locale === "zh"
              ? "使用 AI 自动分类，让每一个收藏都触手可及。"
              : "AI-powered categorization makes every bookmark accessible."}
          </p>
        </div>

        <div className="text-primary-foreground/60 text-sm">© 2025 AI Bookmark. All rights reserved.</div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{locale === "zh" ? "返回首页" : "Back to Home"}</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center border border-border rounded-lg p-0.5">
              <button
                onClick={() => setLocale("zh")}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  locale === "zh" ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  locale === "en" ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm space-y-6">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Bookmark className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-semibold text-xl text-foreground">AI Bookmark</span>
              </Link>
            </div>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {mode === "login" ? t.auth.login : t.auth.register}
              </h2>
              <p className="text-muted-foreground mt-2">
                {mode === "login" ? t.auth.noAccount : t.auth.hasAccount}
                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-primary hover:underline ml-1"
                >
                  {mode === "login" ? t.auth.register : t.auth.login}
                </button>
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">{error}</div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={locale === "zh" ? "姓名" : "Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={t.auth.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder={t.auth.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" className="text-sm text-primary hover:underline">
                    {t.auth.forgotPassword}
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? mode === "login"
                    ? t.auth.loggingIn
                    : t.auth.registering
                  : mode === "login"
                    ? t.auth.login
                    : t.auth.register}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">{t.auth.orContinueWith}</span>
              </div>
            </div>

            {/* Google Login */}
            <Button type="button" variant="outline" className="w-full gap-2 bg-transparent" onClick={handleGoogleLogin}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t.auth.google}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginContent />
    </Suspense>
  )
}
