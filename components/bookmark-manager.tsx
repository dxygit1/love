"use client"

import { useState, useEffect } from "react"
import { AddBookmarkDialog } from "./add-bookmark-dialog"
import { BookmarkList } from "./bookmark-list"
import { DashboardHeader } from "./dashboard-header"
import { AiUsageWidget } from "./ai-usage-widget"
import type { Bookmark } from "@/types/bookmark"
import { Sparkles, Loader2, Search, Tag as TagIcon, X } from "lucide-react"
import { useAppContext } from "./providers"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function BookmarkManager({ activeTab, onTabChange }: {
  activeTab?: "bookmarks" | "usage" | "admin"
  onTabChange?: (tab: "bookmarks" | "usage" | "admin") => void
}) {
  const { t, user } = useAppContext()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [tagOrder, setTagOrder] = useState<string[]>([])

  // Fetch bookmarks and tags from Supabase
  useEffect(() => {
    if (!user) return

    // Make user id available globally for DnD component
    if (typeof window !== 'undefined') {
      (window as any).__user_id = user.id
    }

    const fetchData = async () => {
      try {
        // Fetch bookmarks
        const { data, error } = await supabase
          .from("bookmarks")
          .select(`
  *,
  bookmark_tags(
    tag_id,
    tags(
      id,
      name
    )
  )
    `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        // Transform data to match Bookmark type
        const formattedBookmarks: Bookmark[] = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          description: item.description,
          faviconUrl: item.favicon_url,
          group: item.bookmark_tags?.[0]?.tags?.name || t.uncategorized,
          tags: item.bookmark_tags?.map((bt: any) => bt.tags.name) || [],
          createdAt: item.created_at,
        }))

        setBookmarks(formattedBookmarks)

        // Fetch tags with sort order
        const { data: tagsData, error: tagsError } = await supabase
          .from("tags")
          .select("name, sort_order")
          .eq("user_id", user.id)
          .order("sort_order", { ascending: true, nullsFirst: false })

        if (tagsError) throw tagsError

        const sortedTags = (tagsData || []).map((tag: any) => tag.name)
        setTagOrder(sortedTags)

      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, t.uncategorized])

  const addBookmark = async (bookmark: Bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev])
  }

  const deleteBookmark = async (id: string) => {
    const previousBookmarks = bookmarks
    setBookmarks((prev) => prev.filter((b) => b.id !== id))

    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .match({ id })

      if (error) throw error
    } catch (error) {
      console.error("Error deleting bookmark:", error)
      setBookmarks(previousBookmarks)
    }
  }

  const moveGroup = async (groupName: string, direction: "up" | "down") => {
    if (!user) return

    const currentIndex = tagOrder.indexOf(groupName)
    if (currentIndex === -1) return

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= tagOrder.length) return

    const newOrder = [...tagOrder]
    const temp = newOrder[currentIndex]
    newOrder[currentIndex] = newOrder[newIndex]
    newOrder[newIndex] = temp

    setTagOrder(newOrder)

    // Save to database
    try {
      await fetch("/api/tags/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, tagOrder: newOrder }),
      })
    } catch (error) {
      console.error("Error reordering tags:", error)
    }
  }

  // Derive all unique tags
  const allTags = Array.from(new Set(bookmarks.flatMap((b) => b.tags || []))).sort()

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesTag = selectedTag ? b.tags?.includes(selectedTag) : true
    const matchesSearch = searchQuery
      ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
    return matchesTag && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50">
      <DashboardHeader activeTab={activeTab} onTabChange={onTabChange} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 space-y-6">
          {/* Title and Add Button */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {t.myBookmarks}
            </h1>
            <AddBookmarkDialog onAdd={addBookmark} />
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center bg-background rounded-xl border border-border shadow-sm group-hover:shadow-md transition-all duration-300">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                placeholder={t.searchPlaceholder || "Search bookmarks..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Tags Cloud */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full px-4 h-8 text-xs"
              >
                All
              </Button>
              {allTags.slice(0, 12).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className="rounded-full px-4 h-8 text-xs gap-1.5"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </Button>
              ))}
              {allTags.length > 12 && (
                <Button variant="ghost" size="sm" className="rounded-full h-8 text-xs text-muted-foreground">
                  +{allTags.length - 12} more
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Bookmark List */}
        <BookmarkList
          bookmarks={filteredBookmarks}
          onDelete={deleteBookmark}
          isSearching={!!searchQuery || !!selectedTag}
          tagOrder={tagOrder}
          onMoveGroup={moveGroup}
        />
      </main>
    </div>
  )
}
