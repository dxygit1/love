"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "@/components/providers"
import { BookmarkManager } from "@/components/bookmark-manager"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, setUser, isAuthenticated } = useAppContext()

  // Handle Google OAuth callback
  useEffect(() => {
    const authData = searchParams.get("auth")
    if (authData) {
      try {
        const userData = JSON.parse(Buffer.from(authData, "base64").toString())
        setUser(userData)
        // Clean up URL
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

  if (!isAuthenticated && !searchParams.get("auth")) {
    return <div className="min-h-screen bg-background" />
  }

  return <BookmarkManager />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardContent />
    </Suspense>
  )
}
