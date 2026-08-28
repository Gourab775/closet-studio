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
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-14">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light">
          <Link href="/store" className="hover:text-foreground transition-colors duration-300">
            Store
          </Link>
          <span>/</span>
          <Link
            href={`/collections`}
            className="hover:text-foreground transition-colors duration-300"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-foreground font-normal">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="relative w-full aspect-[3/4] bg-muted overflow-hidden group/img">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover/img:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-0 left-0 w-10 h-[1px] bg-white/30" />
            <div className="absolute top-0 left-0 w-[1px] h-10 bg-white/30" />
            <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-white/30" />
            <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-white/30" />
          </div>

          <div className="flex flex-col justify-start py-2">
            <span className="text-[9px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-3">
              {product.collection}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4 leading-tight">
              {product.title}
            </h1>

            <span className="text-xl md:text-2xl font-light tracking-[0.1em] text-foreground mb-8">
              {product.price}
            </span>

            <p className="text-sm leading-relaxed text-muted-foreground font-light mb-10 max-w-lg">
              {product.longDescription}
            </p>

            <ProductDetailClient product={product} />

            <div className="mt-12 pt-8 border-t border-border/40">
              <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-4">
                Material
              </span>
              <p className="text-sm text-foreground font-light">{product.material}</p>
            </div>

            <div className="mt-6 pt-8 border-t border-border/40">
              <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-4">
                Features
              </span>
              <ul className="flex flex-col gap-2">
                {product.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground font-light flex items-center gap-2">
                    <span className="w-1 h-1 bg-foreground/40 rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-8 border-t border-border/40">
              <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-4">
                Care
              </span>
              <ul className="flex flex-col gap-2">
                {product.care.map((c) => (
                  <li key={c} className="text-sm text-muted-foreground font-light flex items-center gap-2">
                    <span className="w-1 h-1 bg-foreground/40 rounded-full" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border/40">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="text-center mb-14">
              <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-4">
                You May Also Like
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
                RELATED
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.handle}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted mb-4">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
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
                    <span className="text-[8px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 font-light">
                      {item.collection}
                    </span>
                    <h3 className="text-xs sm:text-sm uppercase font-normal text-foreground mb-1 tracking-widest line-clamp-1">
                      {item.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-light tracking-[0.15em] text-foreground/80">
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
