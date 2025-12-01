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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.contact.form.name}</label>
              <Input placeholder={t.contact.form.name} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.contact.form.email}</label>
              <Input type="email" placeholder={t.contact.form.email} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.contact.form.message}</label>
              <Textarea placeholder={t.contact.form.message} rows={5} required />
            </div>
            <Button type="submit" className="w-full" disabled={sending || sent}>
              {sending ? t.contact.form.sending : sent ? t.contact.form.success : t.contact.form.submit}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-muted-foreground">{t.contact.info.email}</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">WeChat</div>
                  <div className="text-muted-foreground">{t.contact.info.wechat}</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Address</div>
                  <div className="text-muted-foreground">{t.contact.info.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
