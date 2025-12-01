"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Bookmark, Sun, Moon, Monitor, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const router = useRouter()
  const { t, locale, setLocale, theme, setTheme, user, logout } = useAppContext()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!t || typeof t.light !== "string") {
    return (
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-muted animate-pulse" />
          <div className="flex gap-2">
            <div className="w-24 h-8 rounded-lg bg-muted animate-pulse" />
            <div className="w-16 h-8 rounded-lg bg-muted animate-pulse" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">AI Bookmark</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="flex items-center border border-border rounded-lg p-0.5">
            <button
              onClick={() => setTheme("light")}
              className={`p-1.5 rounded-md transition-colors ${
                theme === "light" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              title={t.light}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-1.5 rounded-md transition-colors ${
                theme === "dark" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              title={t.dark}
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`p-1.5 rounded-md transition-colors ${
                theme === "system" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              title={t.system}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center border border-border rounded-lg p-0.5">
            <button
              onClick={() => setLocale("zh")}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                locale === "zh" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              中文
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                locale === "en" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {user?.avatar ? (
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                {locale === "zh" ? "退出登录" : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
