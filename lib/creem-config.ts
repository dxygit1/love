// Creem Payment Configuration
// Documentation: https://docs.creem.io/

export const CREEM_CONFIG = {
  // API Settings
  apiKey: process.env.CREEM_API_KEY || "",
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET || "",

  // API Base URL
  baseUrl: "https://api.creem.io",

  // Test Mode (use sandbox in development)
  testMode: process.env.NODE_ENV !== "production",

  // Product IDs (to be configured in Creem dashboard)
  products: {
    free: {
      id: "prod_free",
      name: "Free",
      priceId: "",
    },
    pro: {
      id: "prod_pro",
      name: "Pro",
      priceId: "price_pro_monthly", // Replace with actual Creem price ID
      priceIdYearly: "price_pro_yearly",
    },
    team: {
      id: "prod_team",
      name: "Team",
      priceId: "price_team_monthly", // Replace with actual Creem price ID
      priceIdYearly: "price_team_yearly",
    },
  },

  // Webhook Events to listen for
  webhookEvents: [
    "checkout.completed",
    "subscription.active",
    "subscription.canceled",
    "subscription.renewed",
    "payment.success",
    "payment.failed",
  ],
}

// Helper function to get Creem headers
export function getCreemHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": CREEM_CONFIG.apiKey,
  }
}
