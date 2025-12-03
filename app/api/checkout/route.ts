import { type NextRequest, NextResponse } from "next/server"
import { CREEM_CONFIG } from "@/lib/creem-config"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { plan, userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user email from database
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single()

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Determine product ID
    let productId = ""
    if (plan === "pro") {
      productId = CREEM_CONFIG.products.pro.id
    } else if (plan === "ultra") {
      productId = CREEM_CONFIG.products.ultra.id
    } else {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Call Creem API to create checkout session
    const requestBody = {
      productId: productId,
      customer: {
        email: profile.email,
      },
      metadata: {
        userId: userId,
        plan: plan,
        fullName: profile.full_name || profile.email
      },
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?payment=success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/#pricing`,
    }

    console.log("Creem API Request:")
    console.log("- Endpoint: https://api.creem.io/v1/checkouts")
    console.log("- API Key:", CREEM_CONFIG.apiKey ? `${CREEM_CONFIG.apiKey.substring(0, 15)}...` : "MISSING")
    console.log("- Body:", JSON.stringify(requestBody, null, 2))

    const creemResponse = await fetch("https://api.creem.io/v1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CREEM_CONFIG.apiKey || "",
      },
      body: JSON.stringify(requestBody),
    })

    if (!creemResponse.ok) {
      const errorData = await creemResponse.text()
      console.error("Creem API error:", errorData)
      console.error("Status:", creemResponse.status)
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
    }

    const checkoutSession = await creemResponse.json()
    console.log("Creem API response:", JSON.stringify(checkoutSession, null, 2))

    // Return the checkout URL
    return NextResponse.json({
      url: checkoutSession.url || checkoutSession.checkoutUrl
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
