"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ShoppingBag, Heart, Check, Truck, RotateCcw, ShieldCheck, Sparkles } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ImageCarousel } from "@/components/ui/image-carousel"

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedThumb, setSelectedThumb] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const selectedColorHex = product.colors[selectedColor]?.hex || product.colors[0]?.hex
  const colorImage = product.colorImages[selectedColorHex] || product.thumbnail

  const handleAddToBag = () => {
    if (!selectedSize) {
      setError(true)
      return
    }
    setError(false)
    for (let q = 0; q < quantity; q++) {
      addItem(product, selectedColor, selectedSize)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const handleQtyChange = (delta: number) => {
    const newQty = quantity + delta
    if (newQty >= 1 && newQty <= 10) {
      setQuantity(newQty)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Left Column: Image Gallery (lg:col-span-7) */}
      <div className="lg:col-span-7 flex flex-col gap-6 w-full max-w-[620px] mx-auto lg:max-w-none">
        {/* Main Image Carousel */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-muted shadow-sm border border-border/40">
          <ImageCarousel
            images={product.images}
            alt={product.title}
            overrideSrc={selectedThumb || (selectedColor === 0 ? null : colorImage)}
            className="w-full h-full"
          />
        </div>

        {/* Color Edition Thumbnails */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
              Color Editions ({product.colors.length})
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wider font-light">
              Select to preview
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {product.colors.map((color, i) => (
              <button
                key={color.hex}
                type="button"
                onClick={() => {
                  setSelectedColor(i)
                  setSelectedThumb(null)
                }}
                className={`relative w-16 h-20 rounded-xl border-2 transition-all duration-300 overflow-hidden flex-shrink-0 bg-muted ${
                  selectedColor === i && !selectedThumb
                    ? "border-foreground ring-2 ring-foreground/20 scale-105 shadow-md"
                    : "border-border/60 hover:border-foreground/50 opacity-75 hover:opacity-100"
                }`}
                aria-label={color.name}
              >
                <Image
                  src={product.colorImages[color.hex] || product.thumbnail}
                  alt={color.name}
                  fill
                  className="object-cover object-center"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Product Info, Options & Actions (lg:col-span-5) */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        {/* Title, Collection, Price */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold tracking-[0.5em] text-muted-foreground uppercase">
            {product.collection}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl sm:text-3xl font-light tracking-wide text-foreground">
              {product.price}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground font-light">
          {product.longDescription || product.description}
        </p>

        {/* Color Selector */}
        <div className="flex flex-col gap-3 pt-3 border-t border-border/40">
          <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
            Color — <span className="text-foreground">{product.colors[selectedColor]?.name}</span>
          </span>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((color, i) => (
              <button
                key={color.hex}
                type="button"
                onClick={() => {
                  setSelectedColor(i)
                  setSelectedThumb(null)
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs tracking-wider transition-all duration-300 ${
                  selectedColor === i
                    ? "border-foreground bg-foreground/5 text-foreground font-medium shadow-sm ring-1 ring-foreground"
                    : "border-border/70 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
              Size {selectedSize && <span className="text-foreground">— {selectedSize}</span>}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-light">
              True to size
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setSelectedSize(size)
                  setError(false)
                }}
                className={`min-w-[52px] h-12 px-4 text-xs font-bold tracking-[0.15em] uppercase rounded-xl border transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-foreground text-background border-foreground shadow-md scale-105"
                    : error && !selectedSize
                    ? "border-destructive text-destructive animate-pulse"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {error && !selectedSize && (
            <p className="text-[11px] text-destructive font-light flex items-center gap-1.5">
              <span>* Please select a size before adding to bag</span>
            </p>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex flex-col gap-3 pt-2">
          <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
            Quantity
          </span>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center border border-border/80 rounded-full p-1 bg-muted/20">
              <button
                type="button"
                onClick={() => handleQtyChange(-1)}
                disabled={quantity <= 1}
                className="w-9 h-9 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base font-light"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQtyChange(1)}
                disabled={quantity >= 10}
                className="w-9 h-9 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base font-light"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-[11px] text-muted-foreground font-light">
              Maximum 10 per order
            </span>
          </div>
        </div>

        {/* Action Buttons: Add to Bag + Wishlist */}
        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={handleAddToBag}
            className={`flex-1 h-14 text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 rounded-full transition-all duration-300 shadow-md ${
              added
                ? "bg-emerald-600 text-white scale-[1.02]"
                : "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]"
            }`}
          >
            {added ? (
              <>
                <Check size={16} strokeWidth={2.5} />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} strokeWidth={2} />
                <span>Add to Bag</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className={`h-14 w-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
              liked
                ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:border-red-900"
                : "bg-transparent text-foreground border-border hover:border-foreground"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} strokeWidth={2} />
          </button>
        </div>

        {/* Luxury Perks / Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border/40 text-[11px] text-muted-foreground font-light">
          <div className="flex items-center gap-2">
            <Truck size={14} className="text-foreground shrink-0" />
            <span>Free Express Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw size={14} className="text-foreground shrink-0" />
            <span>30-Day Free Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-foreground shrink-0" />
            <span>100% Authentic</span>
          </div>
        </div>

        {/* Material & Care Section */}
        <div className="pt-6 border-t border-border/40">
          <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-3">
            Material & Care
          </span>
          <p className="text-xs text-foreground font-medium mb-2">{product.material}</p>
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            {product.care.join(" • ")}
          </p>
        </div>

        {/* Details & Features */}
        <div className="pt-6 border-t border-border/40">
          <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-4">
            Product Features
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="text-xs text-foreground font-light flex items-center gap-2.5"
              >
                <span className="w-1.5 h-1.5 bg-foreground rounded-full shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
