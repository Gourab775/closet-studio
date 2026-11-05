import { MetadataRoute } from "next"
import { PRODUCTS } from "@/lib/products"

type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?: "weekly" | "monthly" | "always" | "hourly" | "daily" | "yearly" | "never"
  priority?: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://closet-e-commerce-store.vercel.app"

  const staticRoutes: SitemapEntry[] = [
    "",
    "/store",
    "/collections",
    "/about",
    "/contact",
    "/cart",
    "/checkout",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))

  const productRoutes: SitemapEntry[] = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
