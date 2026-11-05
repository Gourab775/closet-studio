"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/store", label: "STORE" },
  { href: "/collections", label: "COLLECTIONS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
]

export function Navbar() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = () => {
    setOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 md:px-10">
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-sm md:text-base font-black tracking-[0.3em] uppercase text-foreground">
            CLOSET
          </span>
          <span className="text-sm md:text-base font-light italic text-muted-foreground tracking-widest">
            studio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/store"
            onClick={handleNavClick}
            className="text-[10px] font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/80 transition-colors duration-300"
          >
            SHOP NOW
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative text-foreground p-1 hover:opacity-70 transition-opacity"
            aria-label={`${totalItems} items in cart`}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[8px] font-bold rounded-full flex items-center justify-center" aria-hidden="true">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground p-1"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border/40 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className={`text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/store"
            onClick={handleNavClick}
            className="text-[11px] font-bold tracking-[0.25em] uppercase bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-center hover:bg-primary/80 transition-colors duration-300 mt-2"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </header>
  )
}
