import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { UseCases } from "@/components/landing/use-cases"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { ProductShowcase } from "@/components/landing/product-showcase"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <Features />
      <UseCases />
      {/* <Pricing /> */}
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
