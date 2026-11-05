"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1)

  const shipping = totalPrice >= 200 ? 0 : 15
  const total = totalPrice + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      clearCart()
      router.push("/order-confirmation")
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 text-center">
          <p className="text-sm text-muted-foreground font-light mb-6">
            Your bag is empty. Add some items before checking out.
          </p>
          <Link
            href="/store"
            className="inline-block h-14 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.25em] px-12 rounded-full leading-[56px] hover:bg-primary/90 transition-colors"
          >
            Explore Store
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="text-center mb-14">
          <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-4">
            CHECKOUT
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground">
            {step === 1 ? "SHIPPING" : "PAYMENT"}
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 mb-14">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border ${step >= 1 ? "bg-foreground text-background border-foreground" : "border-border"}`}>
              1
            </span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase hidden sm:block">Shipping</span>
          </div>
          <div className={`w-12 h-[1px] ${step >= 2 ? "bg-foreground" : "bg-border"} transition-colors duration-500`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border ${step >= 2 ? "bg-foreground text-background border-foreground" : "border-border"}`}>
              2
            </span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase hidden sm:block">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                        Zip
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                        placeholder="Zip code"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-bold uppercase tracking-[0.25em] rounded-full transition-colors duration-300"
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                        Expiry
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                        placeholder="000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-border/60 py-3 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                      placeholder="Full name"
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="h-14 px-8 border border-border text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:bg-muted transition-colors rounded-full"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-bold uppercase tracking-[0.25em] rounded-full transition-colors duration-300"
                    >
                      Place Order — ${total}.00
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-muted/30 p-8 sticky top-24">
              <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground mb-6">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-20 bg-muted flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-[9px] text-muted-foreground font-light mt-0.5">
                        {item.product.colors[item.selectedColor].name} / {item.selectedSize}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-[11px] font-medium">${item.product.priceNumber * item.quantity}.00</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/40 pt-4 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Subtotal</span>
                  <span className="font-medium">${totalPrice}.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Complimentary" : `$${shipping}.00`}
                  </span>
                </div>
                <div className="border-t border-border/40 pt-3 flex justify-between">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Total</span>
                  <span className="text-lg font-semibold">${total}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
