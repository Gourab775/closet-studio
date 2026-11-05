"use client"

import React, { useState } from "react"
import { ShoppingBag, Heart, Check } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(false)

  const handleAddToBag = () => {
    if (!selectedSize) {
      setError(true)
      return
    }
    setError(false)
    addItem(product, selectedColor, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground uppercase block">
            Color — {product.colors[selectedColor].name}
          </span>
          <div className="flex gap-4">
            {product.colors.map((color, i) => (
              <button
                key={color.hex}
                onClick={() => setSelectedColor(i)}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                  selectedColor === i
                    ? "border-foreground scale-110 ring-1 ring-offset-1 ring-offset-background"
                    : "border-border hover:border-foreground/40"
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground uppercase block">
            Size
          </span>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size)
                  setError(false)
                }}
                className={`min-w-[48px] h-12 px-5 text-[11px] font-bold tracking-[0.2em] uppercase border transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-foreground text-background border-foreground"
                    : error && !selectedSize
                    ? "border-destructive text-destructive"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {error && (
            <p className="text-[10px] text-destructive font-light">
              Please select a size before adding to bag
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={handleAddToBag}
          className={`flex-1 h-14 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2.5 rounded-full transition-all duration-300 ${
            added
              ? "bg-success text-success-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {added ? (
            <>
              <Check size={15} strokeWidth={2} />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag size={15} strokeWidth={2} />
              <span>Add to Bag</span>
            </>
          )}
        </button>
        <button
          onClick={() => setLiked(!liked)}
          className={`h-14 w-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
            liked
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-foreground border-border hover:border-foreground"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={15} fill={liked ? "currentColor" : "none"} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
