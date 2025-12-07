"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { Bookmark } from "@/types/bookmark"
import { Sparkles, Plus, Loader2, Search, ExternalLink, Folder, CheckCircle2, X } from "lucide-react"
import { useAppContext } from "./providers"
import { supabase } from "@/lib/supabase"

interface AddBookmarkDialogProps {
  onAdd: (bookmark: Bookmark) => void
  defaultOpen?: boolean
  defaultUrl?: string
  onOpenChange?: (open: boolean) => void
}

export function AddBookmarkDialog({ onAdd, defaultOpen = false, defaultUrl = "", onOpenChange }: AddBookmarkDialogProps) {
  const { t, user, locale } = useAppContext()
  const [internalOpen, setInternalOpen] = useState(false)
  const open = defaultOpen || internalOpen

  // Step state: idle (input) -> analyzing -> result (edit/save)
  const [step, setStep] = useState<"idle" | "analyzing" | "result">("idle")

  // Form State
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState(defaultUrl)
  const [group, setGroup] = useState("")
  const [smartGrouping, setSmartGrouping] = useState(false)
  const [generatedSummary, setGeneratedSummary] = useState("")
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Update URL if defaultUrl changes
  useEffect(() => {
    if (defaultUrl) setUrl(defaultUrl)
  }, [defaultUrl])

  const handleOpenChange = (isOpen: boolean) => {
    setInternalOpen(isOpen)
    onOpenChange?.(isOpen)
    if (!isOpen) {
      setTimeout(() => resetForm(), 300)
    }
  }

  const resetForm = () => {
    setStep("idle")
    setTitle("")
    setUrl("")
    setGroup("")
    setError("")
    setGeneratedSummary("")
    setSmartGrouping(false)
  }

  const handleClassify = async () => {
    if (!url.trim()) {
      setError(t.urlRequired || "URL is required")
      return
    }

    setStep("analyzing")
    setError("")

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          locale: locale,
          userId: user?.id,
          smartGrouping: smartGrouping,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.code === 'QUOTA_EXCEEDED') {
          const quotaMsg = locale === 'zh'
            ? `本月 AI 额度已用完 (${data.usage}/${data.limit})`
            : `Monthly AI quota exceeded (${data.usage}/${data.limit})`
          setError(quotaMsg)
          setStep("idle")
          return
        }
        throw new Error(data.error || "Classification failed")
      }

      if (data.site_info) setTitle(data.site_info)
      if (data.category) setGroup(data.category)
      if (data.summary) setGeneratedSummary(data.summary)

      setStep("result")
    } catch (err: any) {
      setError(t.classifyFailed)
      console.error("Classification error:", err)
      setStep("idle")
    }
  }

  const handleSubmit = async () => {
    if (!url.trim()) return
    if (!user) {
      setError(t.addDialog.loginRequired)
      return
    }

    setIsSaving(true)
    setError("")

    try {
      let hostname = "unknown"
      try { hostname = new URL(url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`).hostname } catch { hostname = url.trim() }

      const finalTitle = title.trim() || hostname
      const finalUrl = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`
      const finalGroup = group.trim() || t.uncategorized

      // 0. Ensure user profile exists
      await supabase.from("profiles").upsert(
        { id: user.id, email: user.email, full_name: user.name, avatar_url: user.avatar },
        { onConflict: "id" }
      )

      // 1. Fetch Favicon
      let faviconUrl = ""
      try {
        const faviconRes = await fetch(`/api/favicon?url=${encodeURIComponent(finalUrl)}`)
        if (faviconRes.ok) {
          const data = await faviconRes.json()
          if (data.url) faviconUrl = data.url
        }
      } catch (e) {
        // ignore
      }

      // 2. Insert Bookmark
      const { data: bookmarkData, error: bookmarkError } = await supabase
        .from("bookmarks")
        .insert({
          title: finalTitle,
          url: finalUrl,
          user_id: user.id,
          description: generatedSummary || "",
          favicon_url: faviconUrl || null,
        })
        .select()
        .single()

      if (bookmarkError) throw bookmarkError

      // 3. Handle Tags
      if (finalGroup) {
        const { data: existingTags } = await supabase
          .from("tags").select("sort_order").eq("user_id", user.id).order("sort_order", { ascending: false }).limit(1)
        const maxSortOrder = existingTags?.[0]?.sort_order ?? -1

        const { data: tagData, error: tagError } = await supabase
          .from("tags")
          .upsert({ name: finalGroup, user_id: user.id, sort_order: maxSortOrder + 1 }, { onConflict: "user_id, name" })
          .select().single()

        if (tagError) throw tagError

        if (tagData) {
          await supabase.from("bookmark_tags").insert({ bookmark_id: bookmarkData.id, tag_id: tagData.id })
        }
      }

      const newBookmark: Bookmark = {
        id: bookmarkData.id,
        title: bookmarkData.title,
        url: bookmarkData.url,
        group: finalGroup,
        tags: [finalGroup],
        faviconUrl: bookmarkData.favicon_url,
        createdAt: bookmarkData.created_at,
      }

      onAdd(newBookmark)
      handleOpenChange(false)
    } catch (err: any) {
      console.error("Error saving bookmark:", err)
      setError(err.message || "Failed to save")
    } finally {
      setIsSaving(false)
    }
  }

  if (!t) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
          <Plus className="w-5 h-5" />
          {t.addBookmark}
        </Button>
      </DialogTrigger>

      {/* Custom Content without default padding/close button */}
      <DialogContent showCloseButton={false} className="sm:max-w-lg p-0 overflow-hidden bg-transparent border-none shadow-none">

        <div className="relative w-full aspect-[4/3] perspective-1000">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-3xl -z-10" />

          <div className="w-full h-full bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col relative">

            <div className="h-1.5 bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 shrink-0" />

            {/* Close Button (Absolute) */}
            <button
              onClick={() => handleOpenChange(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground/50 hover:text-foreground rounded-full hover:bg-muted/50 transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 p-6 flex flex-col gap-6">

              {/* 1. Persistent Header & Input Section */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold tracking-tight">{t.addDialog.title}</h2>
                  <p className="text-xs text-muted-foreground">{t.addDialog.description}</p>
                </div>

                <div className="relative group z-10">
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

                  <div className="relative flex items-center bg-background rounded-xl border border-border shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
                    <Search className="w-4 h-4 text-muted-foreground ml-3 mr-2 shrink-0" />
                    <input
                      className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground/70 h-11 text-sm"
                      placeholder={t.urlPlaceholder}
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value)
                        setError("")
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleClassify()
                      }}
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={handleClassify}
                      disabled={!url.trim() || step === 'analyzing'}
                      className="mr-1.5 h-8 px-3 shadow-none bg-primary/10 text-primary hover:bg-primary/20 text-xs font-medium"
                    >
                      {t.addDialog.analyze} <Sparkles className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-destructive text-center animate-in fade-in slide-in-from-top-1">{error}</p>
                )}
                {/* Improved Smart Grouping Toggle */}
                {step === 'idle' && (
                  <div className="flex items-center justify-between px-1">
                    <div className="text-[10px] text-muted-foreground/50 font-medium">
                      {t.addDialog.supported}
                    </div>
                    <div className="flex items-center gap-2">
                      <label htmlFor="smart-grouping" className="text-xs text-muted-foreground hover:text-foreground cursor-pointer select-none">
                        {t.addDialog.smartGrouping}
                      </label>
                      <input
                        type="checkbox"
                        id="smart-grouping"
                        checked={smartGrouping}
                        onChange={(e) => setSmartGrouping(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-muted-foreground/30 text-primary focus:ring-primary/20 accent-primary"
                      />
                    </div>
                  </div>
                )}         </div>

              {/* 2. Dynamic Content Area */}
              <div className="flex-1 relative min-h-[160px]"> {/* Fixed height container */}
                <AnimatePresence mode="wait">

                  {/* A. Idle / Placeholder */}
                  {step === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-muted-foreground/10 rounded-xl bg-muted/30"
                    >
                      <div className="text-center text-muted-foreground/40 space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-background/80 mx-auto flex items-center justify-center border border-border/50 shadow-sm">
                          <Folder className="w-6 h-6 opacity-50" />
                        </div>
                        <p className="text-xs font-medium">Result will appear here</p>
                      </div>
                    </motion.div>
                  )}

                  {/* B. Analyzing */}
                  {step === "analyzing" && (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
                    >
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-muted/30 rounded-full" />
                        <motion.div
                          className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground animate-pulse">{t.addDialog.analyzingDesc}</p>
                    </motion.div>
                  )}

                  {/* C. Result Card */}
                  {step === "result" && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute inset-0 bg-background border border-border rounded-xl p-4 shadow-sm flex flex-col gap-3"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 shrink-0 rounded bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50">
                            <img
                              src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(url)}&size=64`}
                              alt="Favicon"
                              className="w-5 h-5 object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                            />
                            <Folder className="w-5 h-5 text-muted-foreground absolute -z-10" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <input
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="w-full bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 focus:outline-none placeholder:text-muted-foreground/50 truncate"
                              placeholder={t.titlePlaceholder}
                            />
                            <div className="text-xs text-muted-foreground flex items-center truncate max-w-full">
                              <span className="truncate">{url}</span>
                              <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
                            </div>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium border border-green-500/20 max-w-[100px]">
                          <Folder className="w-3 h-3 shrink-0" />
                          <input
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className="bg-transparent border-none text-xs font-medium focus:ring-0 focus:outline-none w-full p-0 text-green-600 dark:text-green-400 placeholder:text-green-600/50 truncate"
                            placeholder={t.uncategorized}
                          />
                        </div>
                      </div>

                      <div className="h-px bg-border/50 my-1" />

                      {/* Summary */}
                      <div className="flex items-start gap-2 flex-1 min-h-0 pl-1">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <textarea
                          value={generatedSummary}
                          onChange={(e) => setGeneratedSummary(e.target.value)}
                          className="w-full h-full text-xs text-muted-foreground leading-relaxed bg-transparent border-none resize-none focus:ring-0 p-0 placeholder:text-muted-foreground/30"
                          placeholder={t.addDialog.noSummary}
                        />
                      </div>

                      {/* Actions Footer */}
                      <div className="flex gap-2 items-center mt-auto pt-1">
                        {/* Pseudo-tags */}
                        <div className="flex-1 flex gap-1.5 overflow-hidden opacity-70">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border truncate max-w-[80px]">
                            #{group || t.uncategorized}
                          </span>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => setStep("idle")}
                          >
                            {t.addDialog.back}
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 gap-1.5 bg-green-600 hover:bg-green-700 text-white shadow-sm text-xs px-3"
                            onClick={handleSubmit}
                            disabled={isSaving}
                          >
                            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                            {t.addDialog.confirmSave}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
