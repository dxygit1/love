"use client"

import { useState, useEffect } from "react"
import { AddBookmarkDialog } from "./add-bookmark-dialog"
import { BookmarkList } from "./bookmark-list"
import type { Bookmark } from "@/types/bookmark"
import { Sparkles, Loader2, Search, Tag as TagIcon, X } from "lucide-react"
import { useAppContext } from "./providers"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function BookmarkContent() {
    const { t, user } = useAppContext()
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [tags, setTags] = useState<Array<{ id: string; name: string; color: string; sort_order: number }>>([])

    useEffect(() => {
        if (user) {
            loadBookmarks()
            loadTags()
        }
    }, [user])

    const loadTags = async () => {
        if (!user) return

        const { data, error } = await supabase
            .from("tags")
            .select("*")
            .eq("user_id", user.id)
            .order("sort_order", { ascending: true })

        if (error) {
            console.error("Error loading tags:", error)
            return
        }

        setTags(data || [])
    }

    const loadBookmarks = async () => {
        if (!user) return

        setLoading(true)
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

        if (error) {
            console.error("Error loading bookmarks:", error)
            setLoading(false)
            return
        }

        const formattedBookmarks: Bookmark[] = (data || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            description: item.description,
            faviconUrl: item.favicon_url,
            group: item.bookmark_tags?.[0]?.tags?.name || t.uncategorized,
            tags: item.bookmark_tags?.map((bt: any) => bt.tags) || [],
            createdAt: item.created_at,
        }))

        setBookmarks(formattedBookmarks)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!user) return

        const { error } = await supabase.from("bookmarks").delete().eq("id", id).eq("user_id", user.id)

        if (error) {
            console.error("Error deleting bookmark:", error)
            return
        }

        setBookmarks(bookmarks.filter((b) => b.id !== id))
    }

    const handleBookmarkAdded = (bookmark: Bookmark) => {
        loadBookmarks()
        loadTags()
    }

    // 用于拖拽排序的函数
    const moveGroup = async (fromIndex: number, toIndex: number) => {
        if (!user) return

        const allTags = [...tags]
        const [movedTag] = allTags.splice(fromIndex, 1)
        allTags.splice(toIndex, 0, movedTag)

        const updatedTags = allTags.map((tag, index) => ({
            ...tag,
            sort_order: index,
        }))

        setTags(updatedTags)

        for (const tag of updatedTags) {
            const { error } = await supabase
                .from("tags")
                .update({ sort_order: tag.sort_order })
                .eq("id", tag.id)
                .eq("user_id", user.id)

            if (error) {
                console.error("Error updating tag order:", error)
            }
        }
    }

    const filteredBookmarks = bookmarks.filter((bookmark) => {
        const matchesSearch =
            searchQuery === "" ||
            bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.group?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTag =
            selectedTag === null || bookmark.tags?.some((tag) => tag.name === selectedTag)

        return matchesSearch && matchesTag
    })

    const allTags = Array.from(
        new Set(bookmarks.flatMap((b) => b.tags?.map((t) => typeof t === 'string' ? t : t.name) || []))
    )

    return (
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {/* Title and Add Button */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        {t.myBookmarks}
                    </h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {loading ? "..." : bookmarks.length}
                    </span>
                </div>
                <AddBookmarkDialog onAdd={handleBookmarkAdded} />
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder={t.searchPlaceholder || "Search bookmarks..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-12 h-12 text-base rounded-2xl border-border/50 bg-background/50"
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
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button
                        variant={selectedTag === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(null)}
                        className="rounded-full px-4 h-8 text-xs"
                    >
                        All
                    </Button>
                    {allTags.map((tag) => (
                        <Button
                            key={tag}
                            variant={selectedTag === tag ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className="rounded-full px-4 h-8 text-xs gap-1.5"
                        >
                            <TagIcon className="w-3 h-3" />
                            {tag}
                        </Button>
                    ))}
                </div>
            )}


            {/* Bookmark List */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-32 rounded-xl bg-muted/50 animate-pulse" />
                    ))}
                </div>
            ) : (
                <BookmarkList
                    bookmarks={filteredBookmarks}
                    onDelete={handleDelete}
                    tagOrder={tags.map((t) => t.name)}
                    onMoveGroup={moveGroup}
                />
            )}
        </div>
    )
}
