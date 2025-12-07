"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Clock, Star, Trash2 } from "lucide-react"
import { useAppContext } from "./providers"

export type FilterMode = "all" | "recent" | "favorites" | "trash"

interface DashboardSidebarProps {
    filterMode: FilterMode
    onFilterChange: (mode: FilterMode) => void
    counts?: {
        all: number
        favorites: number
        trash: number
    }
    className?: string
}

export function DashboardSidebar({
    filterMode,
    onFilterChange,
    counts,
    className
}: DashboardSidebarProps) {
    const { t } = useAppContext()

    const menuItems = [
        {
            mode: "all" as FilterMode,
            icon: LayoutGrid,
            label: t.allBookmarks || "All Bookmarks",
            count: counts?.all
        },
        {
            mode: "recent" as FilterMode,
            icon: Clock,
            label: t.recentlyAdded || "Recently Added"
        },
        {
            mode: "favorites" as FilterMode,
            icon: Star,
            label: t.favorites || "Favorites",
            count: counts?.favorites
        },
        {
            mode: "trash" as FilterMode,
            icon: Trash2,
            label: t.trash || "Trash",
            count: counts?.trash
        },
    ]

    return (
        <aside className={cn(
            "w-52 flex-shrink-0 flex flex-col h-full border-r border-border/40 bg-muted/5",
            className
        )}>
            {/* Main Navigation */}
            <div className="flex-1 px-3 py-5">
                <div className="mb-2">
                    <p className="px-3 mb-3 text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
                        Library
                    </p>

                    <div className="space-y-0.5">
                        {menuItems.map((item) => (
                            <Button
                                key={item.mode}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-between h-9 px-3 font-medium text-sm rounded-lg transition-all",
                                    filterMode === item.mode
                                        ? "bg-primary/10 text-primary hover:bg-primary/15"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                                onClick={() => onFilterChange(item.mode)}
                            >
                                <span className="flex items-center gap-2.5">
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </span>
                                {item.count !== undefined && item.count > 0 && (
                                    <span className="text-[10px] font-mono bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                                        {item.count}
                                    </span>
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}
