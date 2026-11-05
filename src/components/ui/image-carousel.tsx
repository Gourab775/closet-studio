"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  autoScroll?: boolean
  interval?: number
  overrideSrc?: string | null
}

export function ImageCarousel({ images, alt, className, autoScroll = true, interval = 3000, overrideSrc }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [manualPause, setManualPause] = useState(false)
  const isPaused = !!overrideSrc || manualPause

  useEffect(() => {
    if (!autoScroll || images.length <= 1 || isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, autoScroll, interval, isPaused])

  const displaySrc = overrideSrc || images[currentIndex]

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl bg-muted group/img ${className || ""}`}>
      <Image
        src={displaySrc}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-500 ease-in-out"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Navigation dots */}
      {images.length > 1 && !overrideSrc && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i)
                setManualPause(true)
                setTimeout(() => setManualPause(false), 5000)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-foreground"
                  : "bg-foreground/30"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
    </div>
  )
}
