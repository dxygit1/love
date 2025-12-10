"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { type Locale, translations } from "@/lib/i18n"
import { supabase } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

// Theme types
type Theme = "light" | "dark" | "system"

// User type (extending Supabase user or just using it)
// We'll use a simplified interface that matches what the app expects, 
// but mapped from Supabase
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  provider: "email" | "google"
}

interface AppContextType {
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
  // Locale
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.zh
  // Auth
  user: User | null
  setUser: (user: User | null) => void // Kept for compatibility, but mostly managed by Supabase
  isAuthenticated: boolean
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark")
  const [locale, setLocaleState] = useState<Locale>("en")
  const [user, setUserState] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedLocale = localStorage.getItem("locale") as Locale | null

    if (savedTheme) setThemeState(savedTheme)
    if (savedLocale) setLocaleState(savedLocale)

    setMounted(true)
  }, [])

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem("user")
      }
    }
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  // Sync auth state for Chrome extension consumption - WRITE TO DEDICATED COOKIE
  // NOTE: This app uses CUSTOM AUTH (not Supabase Auth), so we write cookie based on `user` state
  useEffect(() => {
    const setCookie = (name: string, value: string, days = 7) => {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
    }

    const deleteCookie = (name: string) => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }

    if (user) {
      // User is logged in - write cookie for extension
      const extensionAuth = {
        // Since we don't have a real Supabase token, we'll create a simple auth payload
        // The API will need to be updated to accept this format
        access_token: `custom_${user.id}_${Date.now()}`,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          provider: user.provider
        }
      }
      setCookie("ai-bookmark-auth", JSON.stringify(extensionAuth))
      console.log('[Auth] Cookie written: ai-bookmark-auth (custom auth)')
    } else {
      // User logged out - delete cookie
      deleteCookie("ai-bookmark-auth")
      console.log('[Auth] Cookie deleted: ai-bookmark-auth')
    }
  }, [user])

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
      setResolvedTheme(isDark ? "dark" : "light")
    }

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      applyTheme(mediaQuery.matches)

      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches)
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    } else {
      applyTheme(theme === "dark")
    }
  }, [theme, mounted])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }, [])

  // Manual setUser is mostly for optimistic updates or legacy support
  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser)
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUserState(null)
  }, [])

  const t = translations[locale]

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        locale,
        setLocale,
        t,
        user,
        setUser,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
