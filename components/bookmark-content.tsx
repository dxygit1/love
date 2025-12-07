"use client"

import { useState, useEffect, useMemo } from "react"
import { AddBookmarkDialog } from "./add-bookmark-dialog"
import { BookmarkList } from "./bookmark-list"
import type { Bookmark } from "@/types/bookmark"
import { Search, X, ChevronDown, LayoutGrid, List } from "lucide-react"
import { useAppContext } from "./providers"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DashboardSidebar, type FilterMode } from "./dashboard-sidebar"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter, useSearchParams } from "next/navigation"

export function BookmarkContent() {
    const { t, user } = useAppContext()
    const router = useRouter()
    const searchParams = useSearchParams()

    // Auto-open add dialog logic
    const [addDialogUrl, setAddDialogUrl] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    useEffect(() => {
        const addUrl = searchParams.get("add")
        if (addUrl) {
            setAddDialogUrl(addUrl)
            setIsAddDialogOpen(true)

            const newParams = new URLSearchParams(searchParams.toString())
            newParams.delete("add")
            const newUrl = newParams.toString() ? `?${newParams.toString()}` : window.location.pathname
            router.replace(newUrl, { scroll: false })
        }
    }, [searchParams, router])

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterMode, setFilterMode] = useState<FilterMode>("all")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [tags, setTags] = useState<Array<{ id: string; name: string; color: string; sort_order: number }>>([])
    const [trashBookmarks, setTrashBookmarks] = useState<Bookmark[]>([])
    const [viewMode, setViewMode] = useState<"grid" | "grouped">(() => {
        // Read from localStorage on initial render (client-side only)
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('bookmarkViewMode') as "grid" | "grouped") || "grid"
        }
        return "grid"
    })

    // Save viewMode to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('bookmarkViewMode', viewMode)
    }, [viewMode])

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
                  tags(id, name)
                )
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error loading bookmarks:", error)
            setLoading(false)
            return
        }

        const allBookmarks: Bookmark[] = (data || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            description: item.description,
            faviconUrl: item.favicon_url,
            group: item.bookmark_tags?.[0]?.tags?.name || t.uncategorized,
            tags: item.bookmark_tags?.map((bt: any) => bt.tags?.name).filter(Boolean) || [],
            createdAt: item.created_at,
            isFavorite: item.is_favorite || false,
            deletedAt: item.deleted_at,
        }))

        // Separate active and deleted bookmarks
        setBookmarks(allBookmarks.filter(b => !b.deletedAt))
        setTrashBookmarks(allBookmarks.filter(b => b.deletedAt))
        setLoading(false)
    }

    // Soft delete - move to trash
    const handleDelete = async (id: string) => {
        if (!user) return

        const { error } = await supabase
            .from("bookmarks")
            .update({ deleted_at: new Date().toISOString() })
            .eq("id", id)
            .eq("user_id", user.id)

        if (error) {
            console.error("Error deleting bookmark:", error)
            return
        }

        const deletedBookmark = bookmarks.find(b => b.id === id)
        if (deletedBookmark) {
            setBookmarks(bookmarks.filter((b) => b.id !== id))
            setTrashBookmarks([...trashBookmarks, { ...deletedBookmark, deletedAt: new Date().toISOString() }])
        }
    }

    // Restore from trash
    const handleRestore = async (id: string) => {
        if (!user) return

        const { error } = await supabase
            .from("bookmarks")
            .update({ deleted_at: null })
            .eq("id", id)
            .eq("user_id", user.id)

        if (error) {
            console.error("Error restoring bookmark:", error)
            return
        }

        const restoredBookmark = trashBookmarks.find(b => b.id === id)
        if (restoredBookmark) {
            setTrashBookmarks(trashBookmarks.filter((b) => b.id !== id))
            setBookmarks([{ ...restoredBookmark, deletedAt: null }, ...bookmarks])
        }
    }

    // Permanent delete
    const handlePermanentDelete = async (id: string) => {
        if (!user) return

        const { error } = await supabase.from("bookmarks").delete().eq("id", id).eq("user_id", user.id)

        if (error) {
            console.error("Error permanently deleting bookmark:", error)
            return
        }

        setTrashBookmarks(trashBookmarks.filter((b) => b.id !== id))
    }

    // Toggle favorite
    const handleToggleFavorite = async (id: string) => {
        if (!user) return

        const bookmark = bookmarks.find(b => b.id === id)
        if (!bookmark) return

        const newFavoriteState = !bookmark.isFavorite

        const { error } = await supabase
            .from("bookmarks")
            .update({ is_favorite: newFavoriteState })
            .eq("id", id)
            .eq("user_id", user.id)

        if (error) {
            console.error("Error toggling favorite:", error)
            return
        }

        setBookmarks(bookmarks.map(b =>
            b.id === id ? { ...b, isFavorite: newFavoriteState } : b
        ))
    }

    const handleBookmarkAdded = () => {
        loadBookmarks()
        loadTags()
    }

    // Calculate tag counts (preserve sort_order from database, only show tags with bookmarks)
    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        bookmarks.forEach(b => {
            b.tags?.forEach(tag => {
                counts[tag] = (counts[tag] || 0) + 1
            })
        })
        // Keep the order from tags (which respects sort_order from DB), just filter out empty ones
        return tags
            .map(t => ({ id: t.id, name: t.name, count: counts[t.name] || 0, sortOrder: t.sort_order }))
            .filter(t => t.count > 0) // Only show tags that have bookmarks
        // Don't sort - preserve the order from the database (user's drag order)
    }, [bookmarks, tags])

    // Filter bookmarks based on mode
    const filteredBookmarks = useMemo(() => {
        // Trash view shows deleted bookmarks
        if (filterMode === "trash") {
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                return trashBookmarks.filter(b =>
                    b.title.toLowerCase().includes(query) ||
                    b.url.toLowerCase().includes(query)
                )
            }
            return trashBookmarks
        }

        let result = bookmarks

        // Filter by mode
        if (filterMode === "recent") {
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            result = result.filter(b => new Date(b.createdAt) >= sevenDaysAgo)
        } else if (filterMode === "favorites") {
            result = result.filter(b => b.isFavorite)
        }

        // Filter by tag
        if (selectedTag) {
            result = result.filter(b => b.tags?.some(tag => tag === selectedTag))
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(b =>
                b.title.toLowerCase().includes(query) ||
                b.url.toLowerCase().includes(query) ||
                b.description?.toLowerCase().includes(query) ||
                b.tags?.some(tag => tag.toLowerCase().includes(query)) ||
                b.group?.toLowerCase().includes(query)
            )
        }

        return result
    }, [bookmarks, trashBookmarks, filterMode, selectedTag, searchQuery])

    // View title
    const getViewTitle = () => {
        if (filterMode === "recent") return t.recentlyAdded || "Recently Added"
        if (filterMode === "favorites") return t.favorites || "Favorites"
        if (filterMode === "trash") return t.trash || "Trash"
        return t.allBookmarks || "All Bookmarks"
    }

    // Sidebar counts
    const sidebarCounts = useMemo(() => ({
        all: bookmarks.length,
        favorites: bookmarks.filter(b => b.isFavorite).length,
        trash: trashBookmarks.length,
    }), [bookmarks, trashBookmarks])

    // Handle sidebar filter change
    const handleSidebarFilter = (mode: FilterMode) => {
        setFilterMode(mode)
        setSelectedTag(null) // Reset tag filter when switching modes
    }

    return (
        <div className="flex min-h-[calc(100vh-65px)] relative">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/3 rounded-full blur-3xl" />
            </div>

            {/* Left Sidebar */}
            <DashboardSidebar
                filterMode={filterMode}
                onFilterChange={handleSidebarFilter}
                counts={sidebarCounts}
                className="hidden md:flex sticky top-[65px] h-[calc(100vh-65px)]"
            />

            {/* Main Content */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 min-w-0">
                {/* Header: Title + View Toggle + Add Button */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl md:text-2xl font-bold text-foreground">
                            {selectedTag || getViewTitle()}
                        </h1>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            {filteredBookmarks.length}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* View Toggle - Only show in All/Recent/Favorites (not Trash) */}
                        {filterMode !== "trash" && (
                            <div className="flex items-center bg-muted/30 rounded-lg p-0.5">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        "h-7 w-7 rounded-md",
                                        viewMode === "grid" && "bg-background shadow-sm"
                                    )}
                                    onClick={() => setViewMode("grid")}
                                    title="Grid view"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        "h-7 w-7 rounded-md",
                                        viewMode === "grouped" && "bg-background shadow-sm"
                                    )}
                                    onClick={() => setViewMode("grouped")}
                                    title="Grouped view"
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                        <AddBookmarkDialog
                            onAdd={handleBookmarkAdded}
                            defaultOpen={isAddDialogOpen}
                            defaultUrl={addDialogUrl}
                            onOpenChange={setIsAddDialogOpen}
                        />
                    </div>
                </div>

                {/* Search + Filter Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <Input
                            type="text"
                            placeholder={t.searchPlaceholder || "Search..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-9 h-9 text-sm rounded-lg border-border/40 bg-muted/20 hover:bg-muted/30 focus:bg-background focus:border-primary/30 shadow-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted text-muted-foreground/60 hover:text-foreground transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <Button
                            variant={selectedTag === null ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedTag(null)}
                            className={cn(
                                "rounded-full px-3 h-7 text-xs font-medium transition-all shrink-0",
                                selectedTag === null
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            All
                        </Button>

                        {tagCounts.slice(0, 6).map((tag) => (
                            <Button
                                key={tag.id}
                                variant={selectedTag === tag.name ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                                className={cn(
                                    "rounded-full px-3 h-7 text-xs font-medium transition-all shrink-0",
                                    selectedTag === tag.name
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {tag.name}
                            </Button>
                        ))}

                        {tagCounts.length > 6 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full px-2 h-7 text-xs font-medium text-muted-foreground hover:text-foreground shrink-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        +{tagCounts.length - 6}
                                        <ChevronDown className="w-3 h-3 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
                                    {tagCounts.slice(6).map((tag) => (
                                        <DropdownMenuItem
                                            key={tag.id}
                                            onClick={() => setSelectedTag(tag.name)}
                                            className={cn(
                                                selectedTag === tag.name && "bg-primary/10 text-primary"
                                            )}
                                        >
                                            {tag.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                {/* Bookmark Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-40 rounded-xl bg-muted/20 animate-pulse" />
                        ))}
                    </div>
                ) : filteredBookmarks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">No bookmarks found</p>
                        <p className="text-muted-foreground/60 text-xs">Try adjusting your search or filter</p>
                    </div>
                ) : (
                    <BookmarkList
                        bookmarks={filteredBookmarks}
                        onDelete={handleDelete}
                        onToggleFavorite={handleToggleFavorite}
                        onRestore={handleRestore}
                        onPermanentDelete={handlePermanentDelete}
                        tagOrder={tags.map((t) => t.name)}
                        onTagOrderChange={loadTags}
                        layout={viewMode === "grouped" ? "list" : "grid"}
                        isTrashView={filterMode === "trash"}
                    />
                )}
            </div>
        </div>
    )
}

