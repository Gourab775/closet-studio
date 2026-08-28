"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCTS } from "@/lib/products"

const COLLECTIONS = ["All", "Studio Collection", "Tailored Studio", "Essentials"]

export default function StorePage() {
  const [activeCollection, setActiveCollection] = useState("All")

  const filtered =
    activeCollection === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.collection === activeCollection)

  return (
    <main className="min-h-screen pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-4">
            STORE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground">
            ALL PIECES
          </h1>
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-8 mb-14 flex-wrap">
          {COLLECTIONS.map((col) => (
            <button
              key={col}
              onClick={() => setActiveCollection(col)}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 pb-1 border-b ${
                activeCollection === col
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
              }`}
            >
              {col}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group block"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted mb-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="text-center">
                <span className="text-[8px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 font-light">
                  {product.collection}
                </span>
                <h3 className="text-xs sm:text-sm uppercase font-normal text-foreground mb-1 tracking-widest line-clamp-1">
                  {product.title}
                </h3>
                <span className="text-[10px] sm:text-xs font-light tracking-[0.15em] text-foreground/80">
                  {product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
