"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "@/components/providers"
import { DashboardHeader } from "@/components/dashboard-header"
import { BookmarkContent } from "@/components/bookmark-content"
import { AiUsageWidget } from "@/components/ai-usage-widget"
import AdminDashboard from "@/app/admin/page"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, setUser, isAuthenticated } = useAppContext()
  const [activeTab, setActiveTab] = useState<"bookmarks" | "usage" | "admin">("bookmarks")

  // Handle Google OAuth callback
  useEffect(() => {
    const authData = searchParams.get("auth")
    if (authData) {
      try {
        const userData = JSON.parse(atob(authData))
        setUser(userData)
        router.replace("/dashboard")
      } catch (error) {
        console.error("Failed to parse auth data:", error)
      }
    }
  }, [searchParams, setUser, router])

  // Redirect to login if not authenticated
  useEffect(() => {
    const authData = searchParams.get("auth")
    if (!isAuthenticated && !authData) {
      router.push("/login")
    }
  }, [isAuthenticated, router, searchParams])

  // Redirect to bookmarks if non-admin tries to access admin tab
  useEffect(() => {
    if (activeTab === "admin" && user?.email !== 'dxysy1@gmail.com') {
      setActiveTab("bookmarks")
    }
  }, [activeTab, user])

  if (!isAuthenticated && !searchParams.get("auth")) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50">
      {/* Fixed Header */}
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

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
        {activeTab === "admin" && user?.email === 'dxysy1@gmail.com' && (
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
