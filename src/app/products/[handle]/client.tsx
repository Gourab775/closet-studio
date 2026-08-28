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
    <>
      <div className="mb-8">
        <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-3">
          Color — {product.colors[selectedColor].name}
        </span>
        <div className="flex gap-3">
          {product.colors.map((color, i) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColor(i)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                selectedColor === i
                  ? "border-foreground scale-110"
                  : "border-border hover:border-foreground/50"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-3">
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
              className={`min-w-[44px] h-11 px-4 text-[11px] font-bold tracking-[0.15em] uppercase border transition-all duration-300 ${
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
          <p className="text-[10px] text-destructive mt-2 font-light">
            Please select a size
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAddToBag}
          className={`flex-1 h-14 text-[10px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-3 rounded-full transition-all duration-300 ${
            added
              ? "bg-green-600 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
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
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
    </>
  )
}
