"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Locale, translations } from "@/lib/i18n"

// Theme types
type Theme = "light" | "dark" | "system"

// User type
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
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark")
  const [locale, setLocaleState] = useState<Locale>("zh")
  const [user, setUserState] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedLocale = localStorage.getItem("locale") as Locale | null
    const savedUser = localStorage.getItem("user")

    if (savedTheme) setThemeState(savedTheme)
    if (savedLocale) setLocaleState(savedLocale)
    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("user")
      }
    }
    setMounted(true)
  }, [])

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

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const setUser = (newUser: User | null) => {
    setUserState(newUser)
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("user")
    }
  }

  const logout = () => {
    setUser(null)
  }

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
