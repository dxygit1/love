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

interface AddBookmarkDialogProps {
  onAdd: (bookmark: Bookmark) => void
}

export function AddBookmarkDialog({ onAdd }: AddBookmarkDialogProps) {
  const { t } = useAppContext()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [group, setGroup] = useState("")
  const [isClassifying, setIsClassifying] = useState(false)
  const [error, setError] = useState("")

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
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Classification failed")
      }

      setGroup(data.category)

      if (!title.trim() && data.site_info) {
        setTitle(data.site_info)
      }
    } catch (err) {
      setError(t.classifyFailed)
      console.error("Classification error:", err)
    } finally {
      setIsClassifying(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError(t.enterUrl)
      return
    }

    let hostname = "unknown"
    try {
      hostname = new URL(url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`).hostname
    } catch {
      hostname = url.trim()
    }

    const bookmark: Bookmark = {
      id: Date.now().toString(),
      title: title.trim() || hostname,
      url: url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`,
      group: group.trim() || t.uncategorized,
      createdAt: new Date().toISOString(),
    }

    onAdd(bookmark)
    resetForm()
    setOpen(false)
  }

  const resetForm = () => {
    setTitle("")
    setUrl("")
    setGroup("")
    setError("")
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
                disabled={isClassifying}
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
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setOpen(false)}>
              {t.cancel}
            </Button>
            <Button type="submit" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              {t.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
