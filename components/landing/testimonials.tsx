"use client"

import { useAppContext } from "@/components/providers"
import { useRef } from "react"

export function Testimonials() {
  const { t } = useAppContext()
  const scrollRef1 = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)

  // Duplicate items for seamless scrolling
  const items = t.testimonials.items
  const row1 = [...items.slice(0, 3), ...items.slice(0, 3)]
  const row2 = [...items.slice(3), ...items.slice(3)]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.testimonials.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </div>

        {/* Scrolling testimonials - Row 1 (scroll left) */}
        <div className="relative mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          <div ref={scrollRef1} className="flex gap-4 animate-scroll-left">
            {row1.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Scrolling testimonials - Row 2 (scroll right) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          <div ref={scrollRef2} className="flex gap-4 animate-scroll-right">
            {row2.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
}: { testimonial: { content: string; author: string; role: string; company: string } }) {
  return (
    <div className="flex-shrink-0 w-[350px] p-6 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
      <p className="text-foreground mb-6 leading-relaxed text-sm">"{testimonial.content}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {testimonial.author[0]}
        </div>
        <div>
          <div className="font-medium text-foreground text-sm">{testimonial.author}</div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role} @ {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  )
}
