"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "@/components/providers"
import { CREEM_CONFIG } from "@/lib/creem-config"
import { Loader2 } from "lucide-react"

function CheckoutContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { user } = useAppContext()
    const plan = searchParams.get("plan")

    useEffect(() => {
        // If not logged in, redirect to login
        if (!user) {
            const redirectUrl = encodeURIComponent(`/checkout?plan=${plan}`)
            router.push(`/login?mode=register&redirect=${redirectUrl}`)
            return
        }

        // Initiate checkout via API
        const initiateCheckout = async () => {
            try {
                const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        plan: plan,
                        userId: user.id,
                    }),
                })

                const data = await response.json()

                if (data.url) {
                    window.location.href = data.url
                } else {
                    console.error("No checkout URL received")
                    router.push("/#pricing")
                }
            } catch (error) {
                console.error("Checkout error:", error)
                router.push("/#pricing")
            }
        }

        if (user && plan) {
            initiateCheckout()
        }
    }, [user, plan, router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Redirecting to secure payment...</p>
        </div>
    )
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <CheckoutContent />
        </Suspense>
    )
}
