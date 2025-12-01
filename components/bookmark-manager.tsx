"use client"

import { useState, useEffect } from "react"
import { AddBookmarkDialog } from "./add-bookmark-dialog"
import { BookmarkList } from "./bookmark-list"
import { DashboardHeader } from "./dashboard-header"
import type { Bookmark } from "@/types/bookmark"
import { Sparkles } from "lucide-react"
import { useAppContext } from "./providers"

export function BookmarkManager() {
  const { t } = useAppContext()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load from localStorage on mount
  useEffect(() => {
    if (!mounted) return
    const saved = localStorage.getItem("bookmarks")
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved))
      } catch {
        console.error("Failed to parse bookmarks from localStorage")
      }
    }
  }, [mounted])

  // Save to localStorage when bookmarks change
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks, mounted])

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => [...prev, bookmark])
  }

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="h-16 border-b border-border" />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
          <div className="text-center mb-12">
            <div className="h-10 w-48 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-12 w-96 bg-muted rounded mx-auto mb-3 animate-pulse" />
            <div className="h-6 w-64 bg-muted rounded mx-auto mb-8 animate-pulse" />
            <div className="h-12 w-36 bg-muted rounded mx-auto animate-pulse" />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t.aiSmartClassify}
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3 text-balance">{t.smartBookmarkManager}</h1>
          <p className="text-muted-foreground text-lg mb-8">{t.subtitle}</p>

          <AddBookmarkDialog onAdd={addBookmark} />
        </div>

        {/* Bookmark List */}
        <BookmarkList bookmarks={bookmarks} onDelete={deleteBookmark} />
      </main>
    </div>
  )
}
