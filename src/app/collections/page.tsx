import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { COLLECTIONS, getProductsByCollection } from "@/lib/products"

export const metadata: Metadata = {
  title: "Collections — CLOSET Studio",
  description: "Explore our curated collections. Timeless pieces designed for effortless elegance.",
}

const COLLECTION_IMAGES: Record<string, string> = {
  "studio-collection": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
  "tailored-studio": "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1200&auto=format&fit=crop",
  essentials: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
}

export default function CollectionsPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="text-center py-16 md:py-24">
        <span className="text-[9px] font-bold tracking-[0.6em] text-muted-foreground uppercase block mb-6">
          CURATED
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-10">
          COLLECTIONS
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="flex flex-col gap-24">
          {COLLECTIONS.map((collection, index) => {
            const items = getProductsByCollection(collection.handle)
            return (
              <div
                key={collection.handle}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                  index % 2 !== 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="md:[direction:ltr]">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl group/img">
                    <Image
                      src={COLLECTION_IMAGES[collection.handle]}
                      alt={collection.title}
                      fill
                      className="object-cover grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-1200"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-0 left-0 w-10 h-[1px] bg-white/40" />
                    <div className="absolute top-0 left-0 w-[1px] h-10 bg-white/40" />
                    <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-white/40" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-white/40" />
                  </div>
                </div>

                <div className="md:[direction:ltr] flex flex-col justify-center">
                  <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-6">
                    {collection.subtitle}
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-8">
                    {collection.title}
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-light mb-10 max-w-lg">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-8">
                    <Link
                      href="/store"
                      className="text-[10px] font-bold tracking-[0.25em] uppercase text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-300"
                    >
                      View Collection
                    </Link>
                    <span className="text-[10px] text-muted-foreground tracking-widest font-light">
                      {items.length} pieces
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
