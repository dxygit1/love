"use client"

import { useState } from "react"
import type { Bookmark } from "@/types/bookmark"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trash2, MoreVertical, Globe, Copy, Check, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppContext } from "./providers"
import { cn } from "@/lib/utils"

interface BookmarkCardProps {
    bookmark: Bookmark
    onDelete: (id: string) => void
}

export function BookmarkCard({ bookmark, onDelete }: BookmarkCardProps) {
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

    // Get domain for display
    let domain = ""
    try {
        domain = new URL(bookmark.url).hostname
    } catch {
        domain = "example.com"
    }

    return (
        <div
            className="group relative flex flex-col p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Top Actions (visible on hover) */}
            <div className={cn(
                "absolute top-3 right-3 flex gap-1 transition-opacity duration-200 z-10",
                isHovered ? "opacity-100" : "opacity-0 md:opacity-0"
            )}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={handleCopy}
                    title="Copy URL"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        >
                            <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t.deleteBookmark}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
            >
                {/* Icon & Title */}
                <div className="flex items-start gap-3 mb-2">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-background border border-border/50 flex items-center justify-center overflow-hidden shadow-sm">
                        {!imageError && bookmark.faviconUrl ? (
                            <img
                                src={bookmark.faviconUrl}
                                alt=""
                                className="w-5 h-5"
                                loading="lazy"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <Globe className="w-5 h-5 text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="font-semibold text-sm leading-tight truncate pr-6" title={bookmark.title}>
                            {bookmark.title}
                        </h3>
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5 opacity-70">
                            {domain}
                        </p>
                    </div>
                </div>

                {/* Description (if any) */}
                {bookmark.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {bookmark.description}
                    </p>
                )}
            </a>
        </div>
    )
}
