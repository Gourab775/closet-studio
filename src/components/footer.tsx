"use client"

import { useState } from "react"
import Link from "next/link"

const FOOTER_LINKS = {
  shop: [
    { href: "/store", label: "All Products" },
    { href: "/collections", label: "Collections" },
  ],
  company: [
    { href: "/about", label: "Our Story" },
    { href: "/about#philosophy", label: "Philosophy" },
    { href: "/contact", label: "Contact" },
  ],
  help: [
    { href: "/contact", label: "Support" },
    { href: "/contact#shipping", label: "Shipping" },
    { href: "/contact#returns", label: "Returns" },
  ],
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubscribed(true)
    }, 600)
  }

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1 mb-5">
              <span className="text-sm font-black tracking-[0.3em] uppercase text-foreground">
                CLOSET
              </span>
              <span className="text-sm font-light italic text-muted-foreground tracking-widest">
                studio
              </span>
            </Link>
            <p className="text-[11px] leading-relaxed text-muted-foreground font-light tracking-wide max-w-[260px] mb-6">
              A timeless lifestyle beyond clothing. Where minimalism meets
              luxury. Designed for those who appreciate quiet elegance.
            </p>
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-foreground block">
                  Stay Updated
                </span>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent border-b border-border/60 py-2 text-[11px] text-foreground font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/40 min-w-0 sm:min-w-[200px]"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="text-[9px] font-bold tracking-[0.15em] uppercase text-foreground hover:text-muted-foreground transition-colors ml-0 sm:ml-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {subscribed ? "Subscribed" : submitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              </div>
          </div>

          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-foreground block mb-5">
              Shop
            </span>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-muted-foreground hover:text-foreground hover:tracking-wider transition-all duration-300 tracking-wide font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-foreground block mb-5">
              Company
            </span>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-muted-foreground hover:text-foreground hover:tracking-wider transition-all duration-300 tracking-wide font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-foreground block mb-5">
              Help
            </span>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-muted-foreground hover:text-foreground hover:tracking-wider transition-all duration-300 tracking-wide font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[9px] text-muted-foreground tracking-[0.15em] font-light">
            &copy; 2025 CLOSET STUDIO. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-[9px] text-muted-foreground hover:text-foreground tracking-[0.15em] font-light transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[9px] text-muted-foreground hover:text-foreground tracking-[0.15em] font-light transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
