"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "@/components/providers"
import { DashboardHeader } from "@/components/dashboard-header"
import { BookmarkContent } from "@/components/bookmark-content"
import { AiUsageWidget } from "@/components/ai-usage-widget"
import AdminDashboard from "@/app/admin/page"

type TabType = "bookmarks" | "usage" | "admin"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, setUser, isAuthenticated } = useAppContext()
  const [isAdmin, setIsAdmin] = useState(false)

  // Get initial tab from URL or default to bookmarks
  const getInitialTab = useCallback((): TabType => {
    const tabParam = searchParams.get("tab")
    if (tabParam === "usage" || tabParam === "admin" || tabParam === "bookmarks") {
      return tabParam
    }
    return "bookmarks"
  }, [searchParams])

  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab)

  // Handle tab change - update URL
  const handleTabChange = useCallback((newTab: TabType) => {
    setActiveTab(newTab)
    // Update URL without full page reload
    const params = new URLSearchParams(searchParams.toString())
    if (newTab === "bookmarks") {
      params.delete("tab") // Clean URL for default tab
    } else {
      params.set("tab", newTab)
    }
    const newUrl = params.toString() ? `/dashboard?${params.toString()}` : "/dashboard"
    router.replace(newUrl, { scroll: false })
  }, [router, searchParams])

  // Handle Google OAuth callback
  useEffect(() => {
    const authData = searchParams.get("auth")
    if (authData) {
      try {
        const userData = JSON.parse(atob(authData))
        setUser(userData)
        // Keep tab param if present
        const tabParam = searchParams.get("tab")
        const newUrl = tabParam ? `/dashboard?tab=${tabParam}` : "/dashboard"
        router.replace(newUrl)
      } catch (error) {
        console.error("Failed to parse auth data:", error)
      }
    }
  }, [searchParams, setUser, router])

  // Sync tab from URL on mount/URL change
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam === "usage" || tabParam === "admin") {
      setActiveTab(tabParam)
    } else if (!tabParam) {
      setActiveTab("bookmarks")
    }
  }, [searchParams])

  // Redirect to login if not authenticated
  useEffect(() => {
    const authData = searchParams.get("auth")
    if (!isAuthenticated && !authData) {
      router.push("/login")
    }
  }, [isAuthenticated, router, searchParams])

  // Check if user is admin
  const [isAdminLoaded, setIsAdminLoaded] = useState(false)

  useEffect(() => {
    if (!user?.id) {
      setIsAdmin(false)
      setIsAdminLoaded(true)
      return
    }

    // Fetch user role from API
    setIsAdminLoaded(false)
    fetch(`/api/user/role?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setIsAdmin(data.role === 'admin')
        setIsAdminLoaded(true)
      })
      .catch(() => {
        setIsAdmin(false)
        setIsAdminLoaded(true)
      })
  }, [user?.id])

  // Redirect to bookmarks if non-admin tries to access admin tab (only after role is loaded)
  useEffect(() => {
    if (isAdminLoaded && activeTab === "admin" && !isAdmin) {
      handleTabChange("bookmarks")
    }
  }, [activeTab, isAdmin, isAdminLoaded, handleTabChange])

  if (!isAuthenticated && !searchParams.get("auth")) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50">
      {/* Fixed Header */}
      <DashboardHeader activeTab={activeTab} onTabChange={handleTabChange} isAdmin={isAdmin} />

      {/* Tab Content - Only this area switches */}
      <main className="flex-1">
        {activeTab === "bookmarks" && <BookmarkContent />}
        {activeTab === "usage" && (
          <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
                AI 使用统计
              </h1>
              <p className="text-muted-foreground">查看你的 AI 分类使用情况</p>
            </div>
            <div className="max-w-xl">
              <AiUsageWidget />
            </div>
          </div>
        )}
        {activeTab === "admin" && isAdmin && (
          <AdminDashboard />
        )}
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardContent />
    </Suspense>
  )
}
