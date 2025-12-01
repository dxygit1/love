"use client"

import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState } from "react"
import { CREEM_CONFIG } from "@/lib/creem-config"

export function Pricing() {
  const { t, user } = useAppContext()
  const [isYearly, setIsYearly] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (planIndex: number) => {
    const plan = t.pricing.plans[planIndex]

    // Free plan - just redirect to register
    if (planIndex === 0) {
      window.location.href = "/login?mode=register"
      return
    }

    // Get price ID based on plan
    const priceId =
      planIndex === 1
        ? isYearly
          ? CREEM_CONFIG.products.pro.priceIdYearly
          : CREEM_CONFIG.products.pro.priceId
        : isYearly
          ? CREEM_CONFIG.products.team.priceIdYearly
          : CREEM_CONFIG.products.team.priceId

    // If not logged in, redirect to login first
    if (!user) {
      window.location.href = `/login?mode=register&redirect=/checkout?plan=${planIndex}`
      return
    }

    setLoading(plan.name)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard?checkout=success`,
          cancelUrl: `${window.location.origin}/#pricing`,
        }),
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        console.error("No checkout URL received")
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.pricing.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{t.pricing.subtitle}</p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-muted border border-border">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                !isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2 ${
                isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t.pricing.yearly}
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t.pricing.save}</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl border transition-all ${
                plan.popular
                  ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-foreground text-primary text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}
                  >
                    {plan.price}
                  </span>
                  <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span className={plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "secondary" : "default"}
                onClick={() => handleCheckout(index)}
                disabled={loading === plan.name}
              >
                {loading === plan.name ? "..." : plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
