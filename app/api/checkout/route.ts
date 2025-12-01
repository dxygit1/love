import { type NextRequest, NextResponse } from "next/server"
import { CREEM_CONFIG, getCreemHeaders } from "@/lib/creem-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceId, successUrl, cancelUrl } = body

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    // If Creem API key is not configured, return mock checkout URL
    if (!CREEM_CONFIG.apiKey) {
      console.log("[v0] Creem API key not configured, using mock checkout")
      return NextResponse.json({
        checkoutUrl: successUrl || "/dashboard?checkout=success",
        message: "Mock checkout - Creem not configured",
      })
    }

    // Create Creem checkout session
    const response = await fetch(`${CREEM_CONFIG.baseUrl}/v1/checkouts`, {
      method: "POST",
      headers: getCreemHeaders(),
      body: JSON.stringify({
        product_id: priceId,
        success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL || ""}/dashboard?checkout=success`,
        cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL || ""}/#pricing`,
        mode: CREEM_CONFIG.testMode ? "test" : "live",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Creem checkout error:", error)
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ checkoutUrl: data.checkout_url })
  } catch (error) {
    console.error("[v0] Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
