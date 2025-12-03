"use client"

import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState } from "react"
import { CREEM_CONFIG } from "@/lib/creem-config"

export function Pricing() {
  const { t, user, locale } = useAppContext()
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (planIndex: number) => {
    const plan = t.pricing.plans[planIndex]

    // Free plan - just redirect to register
    if (planIndex === 0) {
      window.location.href = "/login?mode=register"
      return
    }

    // Pro or Ultra plan - Redirect to Creem Payment
    if (planIndex === 1 || planIndex === 2) {
      // Optional: Require login before payment to track user?
      // For pre-order, maybe we want to reduce friction and let them pay first.
      // But capturing their account is better. Let's keep login check.
      if (!user) {
        const planType = planIndex === 1 ? 'pro' : 'ultra'
        // Redirect to login, then auto-redirect to payment
        window.location.href = `/login?redirect=/checkout?plan=${planType}`
        return
      }

      setLoading(plan.name)

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan: planIndex === 1 ? 'pro' : 'ultra',
            userId: user.id
          }),
        })

        const data = await response.json()

        if (data.url) {
          window.location.href = data.url
        } else {
          console.error("No checkout URL received")
          setLoading(null)
        }
      } catch (error) {
        console.error("Checkout error:", error)
        setLoading(null)
      }
    }
  }

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.pricing.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{t.pricing.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all ${plan.popular
                ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105 z-10"
                : "bg-background border-border hover:border-primary/50"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-foreground text-primary text-xs font-medium rounded-full">
                  Early Bird Offer
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
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

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span className={`leading-tight ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full py-6 text-lg"
                variant={plan.popular ? "secondary" : "default"}
                onClick={() => handleCheckout(index)}
                disabled={loading === plan.name}
              >
                {loading === plan.name ? "..." :
                  // For paid plans (Pro/Ultra), show "Login to Purchase" if not logged in
                  (index > 0 && !user) ? (locale === 'zh' ? '登录以购买' : 'Login to Purchase') : plan.cta
                }
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
