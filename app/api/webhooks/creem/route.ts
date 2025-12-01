import { type NextRequest, NextResponse } from "next/server"
import { CREEM_CONFIG } from "@/lib/creem-config"
import crypto from "crypto"

// Verify Creem webhook signature
function verifySignature(payload: string, signature: string): boolean {
  if (!CREEM_CONFIG.webhookSecret) return false

  const expectedSignature = crypto.createHmac("sha256", CREEM_CONFIG.webhookSecret).update(payload).digest("hex")

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("x-creem-signature") || ""

    // Verify webhook signature (skip in test mode if no secret)
    if (CREEM_CONFIG.webhookSecret && !verifySignature(payload, signature)) {
      console.error("[v0] Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(payload)
    console.log("[v0] Creem webhook event:", event.type)

    // Handle different event types
    switch (event.type) {
      case "checkout.completed":
        // Handle successful checkout
        console.log("[v0] Checkout completed:", event.data)
        // TODO: Update user subscription status in database
        break

      case "subscription.active":
        // Handle subscription activation
        console.log("[v0] Subscription activated:", event.data)
        // TODO: Grant user access to premium features
        break

      case "subscription.canceled":
        // Handle subscription cancellation
        console.log("[v0] Subscription canceled:", event.data)
        // TODO: Revoke user's premium access
        break

      case "subscription.renewed":
        // Handle subscription renewal
        console.log("[v0] Subscription renewed:", event.data)
        // TODO: Update subscription expiry date
        break

      case "payment.success":
        // Handle successful payment
        console.log("[v0] Payment successful:", event.data)
        break

      case "payment.failed":
        // Handle failed payment
        console.log("[v0] Payment failed:", event.data)
        // TODO: Notify user about failed payment
        break

      default:
        console.log("[v0] Unhandled event type:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
