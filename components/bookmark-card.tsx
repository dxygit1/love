"use client"

import { useState } from "react"
import type { Bookmark } from "@/types/bookmark"
import { Button } from "@/components/ui/button"
import { Trash2, Globe, Copy, Check, MoreHorizontal, Star, RotateCcw } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppContext } from "./providers"
import { cn } from "@/lib/utils"

interface BookmarkCardProps {
    bookmark: Bookmark
    onDelete: (id: string) => void
    onToggleFavorite?: (id: string) => void
    onRestore?: (id: string) => void
    onPermanentDelete?: (id: string) => void
    isTrashView?: boolean
}

export function BookmarkCard({
    bookmark,
    onDelete,
    onToggleFavorite,
    onRestore,
    onPermanentDelete,
    isTrashView = false
}: BookmarkCardProps) {
    const { t } = useAppContext()
    const [isHovered, setIsHovered] = useState(false)
    const [copied, setCopied] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.clipboard.writeText(bookmark.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onDelete(bookmark.id)
    }

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onToggleFavorite?.(bookmark.id)
    }

    const handleRestore = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onRestore?.(bookmark.id)
    }

    const handlePermanentDelete = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onPermanentDelete?.(bookmark.id)
    }

    // Get domain for display
    let domain = ""
    try {
        domain = new URL(bookmark.url).hostname
    } catch {
        domain = "example.com"
    }

    return (
        <div
            className={cn(
                "group relative flex flex-col p-3 rounded-xl bg-background/50 border border-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 h-[130px] backdrop-blur-sm cursor-pointer overflow-hidden",
                isTrashView && "opacity-75 hover:opacity-100"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => !isTrashView && window.open(bookmark.url, '_blank')}
        >
            {/* Hover Actions (Top Right - Inside Card) */}
            <div className={cn(
                "absolute top-2 right-2 flex gap-1 transition-all duration-200 z-20",
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                {isTrashView ? (
                    // Trash view actions
                    <>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 rounded-full shadow-sm bg-background border border-border/50 text-muted-foreground hover:text-green-600 hover:bg-background"
                            onClick={handleRestore}
                            title={t.restore}
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 rounded-full shadow-sm bg-background border border-border/50 text-muted-foreground hover:text-destructive hover:bg-background"
                            onClick={handlePermanentDelete}
                            title={t.deletePermanently}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                    </>
                ) : (
                    // Normal view actions - Star, Copy, More (all in a row)
                    <>
                        {/* Favorite Star */}
                        {onToggleFavorite && (
                            <Button
                                variant="secondary"
                                size="icon"
                                className={cn(
                                    "h-7 w-7 rounded-full shadow-sm bg-background border border-border/50 hover:bg-background transition-colors",
                                    bookmark.isFavorite
                                        ? "text-yellow-500 hover:text-yellow-600"
                                        : "text-muted-foreground hover:text-yellow-500"
                                )}
                                onClick={handleToggleFavorite}
                                title={bookmark.isFavorite ? t.removeFromFavorites : t.addToFavorites}
                            >
                                <Star className={cn("w-3.5 h-3.5", bookmark.isFavorite && "fill-current")} />
                            </Button>
                        )}

                        {/* Copy URL */}
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 rounded-full shadow-sm bg-background border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background"
                            onClick={handleCopy}
                            title="Copy URL"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 rounded-full shadow-sm bg-background border border-border/50 text-muted-foreground hover:text-destructive hover:bg-background"
                            onClick={handleDelete}
                            title={t.deleteBookmark}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                    </>
                )}
            </div>

            {/* Header: Icon + Info */}
            <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-center overflow-hidden">
                    {!imageError && bookmark.faviconUrl ? (
                        <img
                            src={bookmark.faviconUrl}
                            alt=""
                            className="w-5 h-5 object-contain opacity-90"
                            loading="lazy"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <Globe className="w-5 h-5 text-muted-foreground/50" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground/90 mb-1" title={bookmark.title}>
                        {bookmark.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground/60 truncate">
                        {domain}
                    </p>
                </div>
            </div>

            {/* Description - Only show if exists */}
            {bookmark.description && (
                <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-1 mb-2">
                    {bookmark.description}
                </p>
            )}

            {/* Footer: Group Badge Only */}
            <div className="mt-auto">
                {bookmark.group && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-primary/10 text-primary">
                        {bookmark.group}
                    </span>
                )}
            </div>
        </div>
    )
}
