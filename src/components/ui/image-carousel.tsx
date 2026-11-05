"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
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
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const isPaused = !!overrideSrc || manualPause
  const displayImages = overrideSrc ? [overrideSrc] : images
  const effectiveIndex = overrideSrc ? 0 : currentIndex

  useEffect(() => {
    if (!autoScroll || displayImages.length <= 1 || isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length)
    }, interval)

    return () => clearInterval(timer)
  }, [displayImages.length, autoScroll, interval, isPaused])

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index)
    setManualPause(true)
    setTimeout(() => setManualPause(false), 5000)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setDragOffset(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setDragOffset(e.clientX - dragStart)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset < 0) {
        goTo((currentIndex + 1) % displayImages.length)
      } else {
        goTo((currentIndex - 1 + displayImages.length) % displayImages.length)
      }
    }
    setDragOffset(0)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setDragOffset(e.touches[0].clientX - dragStart)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset < 0) {
        goTo((currentIndex + 1) % displayImages.length)
      } else {
        goTo((currentIndex - 1 + displayImages.length) % displayImages.length)
      }
    }
    setDragOffset(0)
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl bg-muted group/img select-none ${className || ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{
          transform: `translateX(calc(-${effectiveIndex * 100}% + ${dragOffset}px))`,
        }}
      >
        {displayImages.map((src, i) => (
          <div key={`${src}-${i}`} className="relative w-full flex-shrink-0 h-full">
            <Image
              src={src}
              alt={`${alt} - ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === effectiveIndex
                  ? "bg-foreground"
                  : "bg-foreground/30"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  )
}
