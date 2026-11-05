import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PRODUCTS, getProductByHandle, getProductsByCollection } from "@/lib/products"
import { ProductDetailClient } from "./client"

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }))
}

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = getProductByHandle(handle)
  if (!product) return { title: "Product Not Found" }
  return {
    title: `${product.title} — CLOSET Studio`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = getProductByHandle(handle)
  if (!product) notFound()

  const related = getProductsByCollection(product.collectionHandle)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="flex items-center gap-2 mb-16 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">
          <Link href="/store" className="hover:text-foreground transition-colors duration-300">
            Store
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <Link
            href={`/collections`}
            className="hover:text-foreground transition-colors duration-300"
          >
            {product.collection}
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <span className="text-foreground font-normal">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="flex flex-col justify-start py-4">
            <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-6">
              {product.collection}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              {product.title}
            </h1>

            <span className="text-2xl sm:text-3xl font-light tracking-[0.1em] text-foreground mb-10">
              {product.price}
            </span>

            <p className="text-sm leading-relaxed text-muted-foreground font-light mb-12 max-w-lg">
              {product.longDescription}
            </p>

            <ProductDetailClient product={product} />

            <div className="mt-16 pt-10 border-t border-border/40">
              <span className="text-[9px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-5">
                Material & Care
              </span>
              <p className="text-sm text-foreground font-light">{product.material}</p>
              <p className="text-sm text-muted-foreground font-light mt-4">
                {product.care.join(" • ")}
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-border/40">
              <span className="text-[9px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-5">
                Details
              </span>
              <ul className="flex flex-col gap-3">
                {product.features.map((f) => (
                  <li key={f} className="text-sm text-foreground font-light flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border/40">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="text-center mb-20">
              <span className="text-[9px] font-bold tracking-[0.6em] text-muted-foreground uppercase block mb-5">
                You May Also Like
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                RELATED
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.handle}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted mb-5 rounded-2xl">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1200"
                      sizes="(max-width: 768px) 50vw, 33vw"
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
                    <span className="text-[8px] text-muted-foreground uppercase tracking-[0.5em] block mb-3 font-light">
                      {item.collection}
                    </span>
                    <h3 className="text-xs sm:text-sm uppercase font-normal text-foreground mb-2 tracking-widest line-clamp-1">
                      {item.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-light tracking-[0.2em] text-foreground/80">
                      {item.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
