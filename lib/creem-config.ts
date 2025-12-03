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
  // Product IDs (to be configured in Creem dashboard)
  products: {
    pro: {
      id: process.env.NEXT_PUBLIC_CREEM_PRO_ID || "prod_6Bevs0KePDoVtuFPlQfzmA",
      name: "Lifetime Pro",
      priceId: "price_pro_lifetime",
      url: "https://www.creem.io/test/payment/prod_6Bevs0KePDoVtuFPlQfzmA",
    },
    ultra: {
      id: process.env.NEXT_PUBLIC_CREEM_ULTRA_ID || "prod_61op67wtYtK3ZrHwDPqYUu",
      name: "Lifetime Ultra",
      priceId: "price_ultra_lifetime",
      url: "https://www.creem.io/test/payment/prod_61op67wtYtK3ZrHwDPqYUu",
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
