"use client"

import dynamic from "next/dynamic"

const CinematicHero = dynamic(
  () =>
    import("@/components/ui/cinematic-product-scroll-section").then(
      (mod) => mod.Component
    ),
  { ssr: false }
)

export function HomePageClient() {
  return <CinematicHero />
}
