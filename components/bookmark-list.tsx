"use client"

import { useState } from "react"
import type { Bookmark } from "@/types/bookmark"
import { Button } from "@/components/ui/button"
import { Trash2, Folder, Link, ChevronDown, ChevronRight } from "lucide-react"
import { useAppContext } from "./providers"

interface BookmarkListProps {
  bookmarks: Bookmark[]
  onDelete: (id: string) => void
}

export function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
  const { t } = useAppContext()
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  if (!t || typeof t.uncategorized !== "string") {
    return null
  }

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  // Group bookmarks by category
  const groupedBookmarks = bookmarks.reduce(
    (acc, bookmark) => {
      const group = bookmark.group || t.uncategorized
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(bookmark)
      return acc
    },
    {} as Record<string, Bookmark[]>,
  )

  const groups = Object.entries(groupedBookmarks)

  if (groups.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Link className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg">{t.noBookmarks}</p>
        <p className="text-sm">{t.addFirstBookmark}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Folder className="w-5 h-5 text-primary" />
        {t.myBookmarks}
        <span className="text-sm font-normal text-muted-foreground">
          ({bookmarks.length} {t.items})
        </span>
      </h2>

      <div className="space-y-4">
        {groups.map(([group, items]) => {
          const isCollapsed = collapsedGroups[group]

          return (
            <div key={group} className="rounded-lg border bg-card overflow-hidden">
              <button
                onClick={() => toggleGroup(group)}
                className="w-full flex items-center gap-2 p-3 hover:bg-muted/50 transition-colors text-left"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="font-medium text-sm flex-1">{group}</h3>
                <span className="text-xs text-muted-foreground">({items.length})</span>
              </button>

              {!isCollapsed && (
                <div className="px-3 pb-3">
                  <div className="flex flex-wrap gap-3">
                    {items.map((bookmark) => (
                      <div key={bookmark.id} className="group relative flex flex-col items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(bookmark.id)
                          }}
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          aria-label={t.deleteBookmark}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>

                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer"
                          title={bookmark.url}
                        >
                          <span className="text-lg font-bold text-primary">
                            {bookmark.title.charAt(0).toUpperCase()}
                          </span>
                        </a>

                        <span className="text-xs text-center mt-1.5 max-w-[56px] truncate" title={bookmark.title}>
                          {bookmark.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
