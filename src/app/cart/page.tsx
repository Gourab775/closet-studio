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
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-32 text-center">
          <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-4">
            BAG
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6">
            EMPTY
          </h1>
          <p className="text-sm text-muted-foreground font-light mb-10">
            Your bag is waiting to be filled with timeless pieces.
          </p>
          <Link
            href="/store"
            className="inline-block h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-bold uppercase tracking-[0.25em] px-12 rounded-full transition-colors duration-300 leading-[56px]"
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
            BAG
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground">
            YOUR BAG
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-6 pb-8 border-b border-border/40"
              >
                <Link
                  href={`/products/${item.product.handle}`}
                  className="relative w-28 h-36 sm:w-36 sm:h-44 bg-muted flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${item.product.handle}`}
                      className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-1 hover:text-foreground transition-colors"
                    >
                      {item.product.collection}
                    </Link>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                      {item.product.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-light">
                      <span>
                        Color: {item.product.colors[item.selectedColor].name}
                      </span>
                      <span className="w-px h-3 bg-border" />
                      <span>Size: {item.selectedSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border/60">
                      <button
                        onClick={() =>
                          updateQuantity(index, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(index, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium tracking-wider">
                        ${item.product.priceNumber * item.quantity}.00
                      </span>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-muted/30 p-8 sticky top-24">
              <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground mb-6">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-8">
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
                <div className="border-t border-border/40 pt-4 flex justify-between">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Total</span>
                  <span className="text-lg font-semibold">
                    ${totalPrice >= 200 ? totalPrice : totalPrice + 15}.00
                  </span>
                </div>
              </div>

              {totalPrice < 200 && (
                <p className="text-[10px] text-muted-foreground font-light text-center mb-6">
                  Add ${200 - totalPrice} more for complimentary shipping
                </p>
              )}

              <Link
                href="/checkout"
                className="block w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-bold uppercase tracking-[0.25em] text-center leading-[56px] rounded-full transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/store"
                className="block w-full h-12 text-center text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors leading-[48px] mt-3"
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
