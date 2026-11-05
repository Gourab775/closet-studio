"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-32 md:py-40 text-center">
          <span className="text-[9px] font-bold tracking-[0.6em] text-muted-foreground uppercase block mb-6">
            BAG
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-10">
            EMPTY
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-lg mx-auto mb-16 leading-relaxed">
            Your bag is waiting to be filled with timeless pieces.
          </p>
          <Link
            href="/store"
            className="inline-block h-16 bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] font-bold uppercase tracking-[0.3em] px-16 rounded-full transition-all duration-300 leading-[64px]"
          >
            Explore Store
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-20">
          <span className="text-[9px] font-bold tracking-[0.6em] text-muted-foreground uppercase block mb-5">
            BAG
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6">
            YOUR BAG
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 flex flex-col gap-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-8 pb-12 border-b border-border/40"
              >
                <Link
                  href={`/products/${item.product.handle}`}
                  className="relative w-32 h-40 sm:w-40 sm:h-48 bg-muted flex-shrink-0 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="192px"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${item.product.handle}`}
                      className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground uppercase block mb-2 hover:text-foreground transition-colors duration-300"
                    >
                      {item.product.collection}
                    </Link>
                    <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-foreground mb-3">
                      {item.product.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-light">
                      <span>Color: {item.product.colors[item.selectedColor].name}</span>
                      <span className="w-px h-4 bg-border" />
                      <span>Size: {item.selectedSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-border/60 rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={14} strokeWidth={2} />
                      </button>
                      <span className="w-12 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        <Plus size={14} strokeWidth={2} />
                      </button>
                    </div>

                    <div className="flex items-center gap-5">
                      <span className="text-sm font-medium tracking-wider">
                        ${item.product.priceNumber * item.quantity}.00
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-muted/40 p-10 sticky top-24 rounded-3xl border border-border/20">
              <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground mb-8">
                Order Summary
              </h2>

              <div className="flex flex-col gap-5 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Subtotal</span>
                  <span className="font-medium">${totalPrice}.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Shipping</span>
                  <span className="font-medium">
                    {totalPrice >= 200 ? "Complimentary" : "$15.00"}
                  </span>
                </div>
                <div className="border-t border-border/40 pt-5 flex justify-between">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Total</span>
                  <span className="text-lg font-semibold">
                    ${totalPrice >= 200 ? totalPrice : totalPrice + 15}.00
                  </span>
                </div>
              </div>

              {totalPrice < 200 && (
                <p className="text-[10px] text-muted-foreground font-light text-center mb-10">
                  Add ${200 - totalPrice} more for complimentary shipping
                </p>
              )}

              <Link
                href="/checkout"
                className="block w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] font-bold uppercase tracking-[0.3em] text-center leading-[64px] rounded-full transition-all duration-300"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/store"
                className="block w-full h-14 text-center text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 leading-[56px] mt-5"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
