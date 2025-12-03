import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Creem Webhook received:", JSON.stringify(body, null, 2))

    // Verify event type
    const eventType = body.type
    if (!eventType) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 })
    }

    // Handle payment success
    // Note: Adjust event name based on actual Creem documentation if different
    if (eventType === "checkout.session.completed" || eventType === "payment.success") {
      const session = body.data?.object || body.data

      // Extract user ID from client_reference_id or metadata
      const userId = session.client_reference_id || session.metadata?.user_id || session.metadata?.userId

      if (!userId) {
        console.error("No user ID found in webhook payload")
        return NextResponse.json({ received: true }) // Return 200 to acknowledge
      }

      const amount = session.amount_total || session.amount
      const currency = session.currency
      const paymentId = session.id
      const productId = session.product_id || session.price?.product

      // Determine plan based on product ID or amount
      let plan = 'pro'
      let limit = 3000

      // Check against configured IDs if available, or fallback to amount logic
      const proId = process.env.NEXT_PUBLIC_CREEM_PRO_ID
      const ultraId = process.env.NEXT_PUBLIC_CREEM_ULTRA_ID

      if (productId === ultraId) {
        plan = 'ultra'
        limit = 10000
      } else if (amount > 5000) { // Fallback: > $50 (5000 cents)
        plan = 'ultra'
        limit = 10000
      }

      console.log(`Processing payment for user ${userId}: Plan ${plan}, Limit ${limit}`)

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          plan: plan,
          subscription_status: 'active',
          usage_limit: limit,
          customer_id: session.customer,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (updateError) {
        console.error("Failed to update profile:", updateError)
        return NextResponse.json({ error: "Database update failed" }, { status: 500 })
      }

      // Log payment
      const { error: logError } = await supabase
        .from('payment_logs')
        .insert({
          user_id: userId,
          amount: amount,
          currency: currency,
          status: 'succeeded',
          provider_payment_id: paymentId,
          metadata: session
        })

      if (logError) {
        console.error("Failed to log payment:", logError)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
