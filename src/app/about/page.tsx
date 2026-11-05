import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About — CLOSET Studio",
  description:
    "A timeless lifestyle beyond clothing. Learn about our philosophy of minimalism meeting luxury.",
}

const VALUES = [
  {
    title: "Minimalism",
    description:
      "We strip away the unnecessary to reveal the essential. Every seam, every cut, every detail serves a purpose.",
  },
  {
    title: "Quality",
    description:
      "Premium materials sourced from the finest mills. We never compromise on the integrity of our fabrics or craftsmanship.",
  },
  {
    title: "Timelessness",
    description:
      "We design for decades, not seasons. Our pieces transcend trends to become enduring parts of your wardrobe.",
  },
  {
    title: "Sustainability",
    description:
      "Conscious production, ethical sourcing, and a commitment to creating less but better.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative h-[65vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format&fit=crop"
            alt="CLOSET Studio Atelier"
            fill
            className="object-cover grayscale opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
        </div>

        <div className="relative z-10 text-center px-6">
          <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.6em] block mb-6">
            EST. 2024
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground">
            OUR STORY
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-8">
              THE BEGINNING
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-8 leading-snug">
              Born from a belief that true elegance lies in restraint.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-light">
              CLOSET Studio was founded with a singular vision: to create
              clothing that speaks through silence. In a world of excess, we
              chose restraint. In a landscape of noise, we chose quiet
              confidence. Our atelier is where architecture meets fashion, where
              every line is deliberate and every detail considered.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop"
                alt="CLOSET Studio Craftsmanship"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1200"
              />
              <div className="absolute top-0 left-0 w-12 h-[1px] bg-foreground/30" />
              <div className="absolute top-0 left-0 w-[1px] h-12 bg-foreground/30" />
              <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-foreground/30" />
              <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-foreground/30" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="text-center mb-20">
            <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-6">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {VALUES.map((value, i) => (
              <div key={value.title} className="text-center md:text-left group p-8 -m-8 rounded-2xl hover:bg-muted/40 transition-colors duration-500">
                <span className="text-[9px] font-bold text-muted-foreground tracking-[0.3em] block mb-6 group-hover:text-foreground transition-colors duration-300">
                  0{i + 1}
                </span>
                <h3 className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-foreground mb-5">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-light">
                  {value.description}
                </p>
                <div className="w-10 h-[1px] bg-foreground/20 mt-8 group-hover:w-16 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-8">
            THE ATELIER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-10 leading-tight">
            Where Architecture
            <br />
            <span className="italic font-light text-muted-foreground">
              Meets Fashion
            </span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-light max-w-2xl mx-auto mb-16">
            Every piece in our collection is conceived in our studio, where
            natural light floods through floor-to-ceiling windows onto clean
            work surfaces. Here, our designers work with the same precision and
            intentionality that defines our clothing. Each pattern is a
            blueprint. Each stitch, a structural decision.
          </p>
          <div className="relative w-full aspect-video max-w-4xl mx-auto overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1400&auto=format&fit=crop"
              alt="CLOSET Studio Interior"
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
