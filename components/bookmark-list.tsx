"use client"

import React, { useState } from "react"
import type { Bookmark } from "@/types/bookmark"
import { Folder, Link, ChevronDown, ChevronRight, GripVertical } from "lucide-react"
import { useAppContext } from "./providers"
import { BookmarkCard } from "./bookmark-card"
import { cn } from "@/lib/utils"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface BookmarkListProps {
  bookmarks: Bookmark[]
  onDelete: (id: string) => void
  isSearching?: boolean
  tagOrder?: string[]
  onMoveGroup?: (groupName: string, direction: "up" | "down") => void
}

interface SortableGroupProps {
  group: string
  items: Bookmark[]
  isCollapsed: boolean
  onToggle: () => void
  onDelete: (id: string) => void
}

function SortableGroup({ group, items, isCollapsed, onToggle, onDelete }: SortableGroupProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: group })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="space-y-4">
      <div className="group flex items-center gap-3 w-full">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 rounded-md bg-muted/50 hover:bg-primary/10 transition-colors cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </button>

        {/* Collapse Button */}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md bg-muted/50 hover:bg-primary/10 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        <h3 className="font-semibold text-lg flex items-center gap-2">
          {group}
          <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {items.length}
          </span>
        </h3>

        <div className="h-px flex-1 bg-border/50" />
      </div>

      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 transition-all duration-300",
          isCollapsed ? "hidden opacity-0" : "opacity-100"
        )}
      >
        {items.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

export function BookmarkList({ bookmarks, onDelete, isSearching = false, tagOrder = [], onMoveGroup }: BookmarkListProps) {
  const { t } = useAppContext()
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const [localTagOrder, setLocalTagOrder] = useState<string[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Sync local order with prop when it changes
  React.useEffect(() => {
    if (tagOrder.length > 0) {
      setLocalTagOrder(tagOrder)
    }
  }, [tagOrder])

  if (!t || typeof t.uncategorized !== "string") {
    return null
  }

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  // If searching, show a flat list
  if (isSearching) {
    if (bookmarks.length === 0) {
      return (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No results found</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
        ))}
      </div>
    )
  }

  // Group bookmarks by category
  const groupedBookmarks = bookmarks.reduce(
    (acc, bookmark) => {
      let group = bookmark.group || t.uncategorized
      if (group === t.myBookmarks) {
        group = t.uncategorized
      }

      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(bookmark)
      return acc
    },
    {} as Record<string, Bookmark[]>
  )

  const groups = Object.entries(groupedBookmarks)

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/30 rounded-3xl border border-dashed border-border/50">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
          <Link className="w-8 h-8 opacity-50" />
        </div>
        <p className="text-lg font-medium mb-1">{t.noBookmarks}</p>
        <p className="text-sm opacity-70">{t.addFirstBookmark}</p>
      </div>
    )
  }

  // Sort groups by localTagOrder (if available) or tagOrder
  const effectiveOrder = localTagOrder.length > 0 ? localTagOrder : tagOrder

  const sortedGroups = groups.sort((a, b) => {
    const indexA = effectiveOrder.indexOf(a[0])
    const indexB = effectiveOrder.indexOf(b[0])

    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return a[0].localeCompare(b[0])
  })

  const groupNames = sortedGroups.map(([group]) => group)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = groupNames.indexOf(active.id as string)
      const newIndex = groupNames.indexOf(over.id as string)

      const newOrder = arrayMove(groupNames, oldIndex, newIndex)

      // Update local state immediately for instant visual feedback
      setLocalTagOrder(newOrder)

      // Save to API
      fetch("/api/tags/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: (window as any).__user_id, tagOrder: newOrder }),
      }).catch(console.error)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={groupNames} strategy={verticalListSortingStrategy}>
        <div className="space-y-8">
          {sortedGroups.map(([group, items]) => (
            <SortableGroup
              key={group}
              group={group}
              items={items}
              isCollapsed={collapsedGroups[group] || false}
              onToggle={() => toggleGroup(group)}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
