import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found — CLOSET Studio",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <main className="min-h-screen pt-16 flex flex-col items-center justify-center text-center">
      <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-4">
        404
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6">
        Not Found
      </h1>
      <p className="text-sm text-muted-foreground font-light max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/store"
        className="inline-block h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-bold uppercase tracking-[0.25em] px-12 rounded-full transition-colors duration-300 leading-[56px]"
      >
        Explore Store
      </Link>
    </main>
  )
}
