"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Bookmark } from "@/types/bookmark"
import { Sparkles, Plus, Loader2 } from "lucide-react"
import { useAppContext } from "./providers"
import { supabase } from "@/lib/supabase"

interface AddBookmarkDialogProps {
  onAdd: (bookmark: Bookmark) => void
}

export function AddBookmarkDialog({ onAdd }: AddBookmarkDialogProps) {
  const { t, user, locale } = useAppContext()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [group, setGroup] = useState("")
  const [isClassifying, setIsClassifying] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [smartGrouping, setSmartGrouping] = useState(false) // Restore: Smart grouping toggle
  const [generatedSummary, setGeneratedSummary] = useState("") // NEW: Store generated summary

  if (!t || typeof t.addBookmark !== "string") {
    return null
  }

  const handleClassify = async () => {
    if (!url.trim()) {
      setError(t.urlRequired)
      return
    }

    setIsClassifying(true)
    setError("")

    try {
      let summary = ""

      // Step 1: Always generate summary
      const summarizeResponse = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          title: title.trim(),
          description: "",
          locale: locale,
        }),
      })

      if (summarizeResponse.ok) {
        const summarizeData = await summarizeResponse.json()
        summary = summarizeData.summary || ""
        setGeneratedSummary(summary) // Store for display
      }

      // Step 2: Classify
      // Only enable smart grouping (similarity matching) if checkbox is checked
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          locale: locale,
          userId: user?.id,
          smartGrouping: smartGrouping, // Controlled by checkbox
          summary: summary,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Classification failed")
      }

      setGroup(data.category)

      // Always use AI's concise site name
      if (data.site_info) {
        setTitle(data.site_info)
      }
    } catch (err) {
      setError(t.classifyFailed)
      console.error("Classification error:", err)
    } finally {
      setIsClassifying(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError(t.enterUrl)
      return
    }

    if (!user) {
      setError("You must be logged in to add bookmarks")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      let hostname = "unknown"
      try {
        hostname = new URL(url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`).hostname
      } catch {
        hostname = url.trim()
      }

      const finalTitle = title.trim() || hostname
      const finalUrl = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`
      const finalGroup = group.trim() || t.uncategorized

      // 0. Ensure user profile exists (fix foreign key constraint error)
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            email: user.email,
            full_name: user.name,
            avatar_url: user.avatar,
          },
          { onConflict: "id" }
        )

      if (profileError) {
        console.error("Profile upsert error:", profileError)
        // Continue anyway, profile might already exist
      }

      // 1. Fetch Favicon
      // Strategy: API (for internet) -> Frontend Probe (for intranet/fallback)
      let faviconUrl = ""

      // Try API first
      try {
        const faviconRes = await fetch(`/api/favicon?url=${encodeURIComponent(finalUrl)}`)
        if (faviconRes.ok) {
          const data = await faviconRes.json()
          if (data.url) faviconUrl = data.url
        }
      } catch (e) {
        console.warn("API favicon fetch failed:", e)
      }

      // If API failed (e.g. intranet), try probing /favicon.ico from frontend
      if (!faviconUrl) {
        try {
          const directFavicon = new URL("/favicon.ico", finalUrl).href
          // Create an image to test if it loads
          await new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => {
              faviconUrl = directFavicon
              resolve()
            }
            img.onerror = () => resolve()
            img.src = directFavicon
            // Timeout after 1s
            setTimeout(resolve, 1000)
          })
        } catch (e) {
          console.warn("Frontend favicon probe failed:", e)
        }
      }

      // 2. Insert Bookmark
      const { data: bookmarkData, error: bookmarkError } = await supabase
        .from("bookmarks")
        .insert({
          title: finalTitle,
          url: finalUrl,
          user_id: user.id,
          description: generatedSummary || "", // Save AI-generated summary
          favicon_url: faviconUrl || null,
        })
        .select()
        .single()

      if (bookmarkError) throw bookmarkError

      // 2. Handle Tag (Group)
      if (finalGroup) {
        // Get current max sort_order for this user
        const { data: existingTags } = await supabase
          .from("tags")
          .select("sort_order")
          .eq("user_id", user.id)
          .order("sort_order", { ascending: false })
          .limit(1)

        const maxSortOrder = existingTags?.[0]?.sort_order ?? -1  // Already integer
        const newSortOrder = maxSortOrder + 1  // Use integer directly

        // Upsert tag
        const { data: tagData, error: tagError } = await supabase
          .from("tags")
          .upsert(
            { name: finalGroup, user_id: user.id, sort_order: newSortOrder },
            { onConflict: "user_id, name" }
          )
          .select()
          .single()

        if (tagError) throw tagError

        // Link bookmark and tag
        if (tagData) {
          const { error: linkError } = await supabase
            .from("bookmark_tags")
            .insert({
              bookmark_id: bookmarkData.id,
              tag_id: tagData.id,
            })

          if (linkError) throw linkError
        }
      }

      // Construct the bookmark object to return
      const newBookmark: Bookmark = {
        id: bookmarkData.id,
        title: bookmarkData.title,
        url: bookmarkData.url,
        group: finalGroup,
        tags: [finalGroup], // For compatibility
        faviconUrl: bookmarkData.favicon_url,
        createdAt: bookmarkData.created_at,
      }

      onAdd(newBookmark)
      resetForm()
      setOpen(false)
    } catch (err: any) {
      console.error("Error saving bookmark:", err)
      setError(err.message || "Failed to save bookmark")
    } finally {
      setIsSaving(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setUrl("")
    setGroup("")
    setError("")
    setGeneratedSummary("") // Clear summary
    setSmartGrouping(false) // Reset checkbox
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          {t.addBookmark}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            {t.addBookmark}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="dialog-title">{t.title}</Label>
            <Input
              id="dialog-title"
              placeholder={t.titlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dialog-url">
              {t.url} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dialog-url"
              type="url"
              placeholder={t.urlPlaceholder}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError("")
              }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dialog-group">{t.group}</Label>
            <div className="flex gap-2">
              <Input
                id="dialog-group"
                placeholder={t.groupPlaceholder}
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleClassify}
                disabled={isClassifying || isSaving}
                className="shrink-0"
              >
                {isClassifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.classifying}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t.aiClassify}
                  </>
                )}
              </Button>
            </div>

            {/* Smart Grouping Checkbox - Restored */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="smart-grouping"
                checked={smartGrouping}
                onChange={(e) => setSmartGrouping(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="smart-grouping"
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                🤖 {locale === 'zh' ? '智能分组 (基于相似度匹配)' : 'Smart Grouping (Similarity Match)'}
              </label>
            </div>

            {/* Display generated summary - Always visible */}
            <div className="mt-3 space-y-2">
              <Label className="text-sm font-medium">
                {locale === 'zh' ? '网站摘要' : 'Website Summary'}
              </Label>
              <textarea
                value={generatedSummary}
                onChange={(e) => setGeneratedSummary(e.target.value)}
                rows={2}
                disabled={isClassifying}
                className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder={
                  isClassifying
                    ? (locale === 'zh' ? '正在生成摘要...' : 'Generating summary...')
                    : (locale === 'zh' ? 'AI 将自动生成摘要，您也可以手动编辑' : 'AI will generate summary, or you can edit manually')
                }
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setOpen(false)} disabled={isSaving}>
              {t.cancel}
            </Button>
            <Button type="submit" className="flex-1" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  {t.save}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
