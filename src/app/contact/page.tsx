import type { Metadata } from "next"
import { ContactForm } from "@/app/contact/contact-form"

const INFO = [
  {
    label: "Email",
    value: "hello@closetstudio.com",
  },
  {
    label: "Phone",
    value: "+1 (555) 000-0000",
  },
  {
    label: "Atelier",
    value: "123 Design District\nNew York, NY 10001",
  },
  {
    label: "Hours",
    value: "Mon – Fri: 10AM – 6PM EST",
  },
]

export const metadata: Metadata = {
  title: "Contact — CLOSET Studio",
  description:
    "Get in touch with CLOSET Studio. We're here to help with orders, inquiries, and collaborations.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-4">
              GET IN TOUCH
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-8">
              CONTACT
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground font-light max-w-md mb-14">
              Whether you have a question about an order, need styling advice, or
              want to explore a collaboration, we&apos;d love to hear from you.
            </p>

            <div className="flex flex-col gap-8">
              {INFO.map((item) => (
                <div key={item.label}>
                  <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                    {item.label}
                  </span>
                  <p className="text-sm text-foreground font-light whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start">
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="shipping" className="border-t border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <span className="text-[9px] font-bold tracking-[0.3em] text-foreground uppercase block mb-4">
                Shipping
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground font-light">
                Complimentary shipping on all orders over $200. Standard delivery
                takes 3-5 business days. Express options available at checkout.
              </p>
            </div>
            <div id="returns">
              <span className="text-[9px] font-bold tracking-[0.3em] text-foreground uppercase block mb-4">
                Returns
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground font-light">
                We accept returns within 14 days of delivery. Items must be
                unworn with tags attached. Free return shipping on all orders.
              </p>
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-[0.3em] text-foreground uppercase block mb-4">
                Care
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground font-light">
                Each piece comes with detailed care instructions. For questions
                about garment care, our team is always happy to assist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
