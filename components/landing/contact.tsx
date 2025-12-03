"use client"

import type React from "react"

import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageCircle, MapPin } from "lucide-react"
import { useState } from "react"

export function Contact() {
  const { t } = useAppContext()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Email Card */}
          <a
            href="mailto:dxysy1@gmail.com"
            className="group flex items-center gap-4 p-8 rounded-3xl bg-muted/30 border border-border hover:bg-muted/50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground font-medium mb-1">Email us</div>
              <div className="text-lg font-bold text-foreground break-all">dxysy1@gmail.com</div>
            </div>
          </a>

          {/* Twitter Card */}
          <a
            href="https://x.com/OwenDong_sy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-8 rounded-3xl bg-muted/30 border border-border hover:bg-muted/50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center group-hover:bg-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground font-medium mb-1">Follow us on X</div>
              <div className="text-lg font-bold text-foreground">@OwenDong_sy</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
