"use client"

import React, { useState } from "react"
import Image from "next/image"
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
  const [quantity, setQuantity] = useState(1)

  const selectedColorHex = product.colors[selectedColor].hex
  const colorImage = product.colorImages[selectedColorHex] || product.thumbnail
  const inStock = quantity <= 5

  const handleAddToBag = () => {
    if (!selectedSize) {
      setError(true)
      return
    }
    if (!inStock) {
      setError(true)
      return
    }
    setError(false)
    addItem(product, selectedColor, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleQtyChange = (delta: number) => {
    const newQty = quantity + delta
    if (newQty >= 1 && newQty <= 10) {
      setQuantity(newQty)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        {/* Main Product Image */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-muted group/img">
            <Image
              src={colorImage}
              alt={`${product.title} — ${product.colors[selectedColor].name}`}
              fill
              className="object-cover transition-opacity duration-500 ease-in-out"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
            {!inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl">
                <span className="text-foreground font-bold text-sm tracking-wider uppercase">
                  Out of Stock
                </span>
              </div>
            )}
            <div className="absolute top-0 left-0 w-10 h-[1px] bg-white/30" />
            <div className="absolute top-0 left-0 w-[1px] h-10 bg-white/30" />
            <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-white/30" />
            <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-white/30" />
          </div>

          {/* Color swatches as image thumbnails */}
          <div className="flex gap-3">
            {product.colors.map((color, i) => (
              <button
                key={color.hex}
                onClick={() => setSelectedColor(i)}
                className={`w-10 h-10 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  selectedColor === i
                    ? "border-foreground scale-105 ring-1 ring-offset-1 ring-offset-background shadow-lg"
                    : "border-border hover:border-foreground/40"
                }`}
                aria-label={color.name}
              >
                <Image
                  src={product.colorImages[color.hex] || product.thumbnail}
                  alt={color.name}
                  fill
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground uppercase block">
            Color — {product.colors[selectedColor].name}
          </span>

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
                  disabled={!inStock}
                  className={`min-w-[48px] h-12 px-5 text-[11px] font-bold tracking-[0.2em] uppercase border transition-all duration-300 ${
                    selectedSize === size
                      ? "bg-foreground text-background border-foreground"
                      : error && !selectedSize
                      ? "border-destructive text-destructive"
                      : "bg-transparent text-foreground border-border hover:border-foreground"
                  } ${!inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!inStock && (
              <p className="text-[10px] text-destructive font-light">
                Currently out of stock
              </p>
            )}
            {error && !inStock === false && (
              <p className="text-[10px] text-destructive font-light">
                Please select a size before adding to bag
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <span className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground uppercase block">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQtyChange(-1)}
                disabled={quantity <= 1 || !inStock}
                className="w-10 h-10 flex items-center justify-center border border-border/60 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-[10px]">−</span>
              </button>
              <span className="w-8 text-center text-sm font-bold">{quantity}</span>
              <button
                onClick={() => handleQtyChange(1)}
                disabled={quantity >= 10 || !inStock}
                className="w-10 h-10 flex items-center justify-center border border-border/60 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-[10px]">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={handleAddToBag}
          disabled={!selectedSize || !inStock}
          className={`flex-1 h-16 text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2.5 rounded-full transition-all duration-300 ${
            added
              ? "bg-success text-success-foreground"
              : !selectedSize || !inStock
              ? "bg-muted text-muted-foreground border border-border/40 cursor-not-allowed opacity-50"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {added ? (
            <>
              <Check size={16} strokeWidth={2} />
              <span>Added to Bag</span>
            </>
          ) : !inStock ? (
            <span>Out of Stock</span>
          ) : (
            <>
              <ShoppingBag size={16} strokeWidth={2} />
              <span>Add to Bag</span>
            </>
          )}
        </button>
        <button
          onClick={() => setLiked(!liked)}
          className={`h-16 w-16 flex items-center justify-center rounded-full border transition-all duration-300 ${
            liked
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-foreground border-border hover:border-foreground"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
