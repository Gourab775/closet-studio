"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  autoScroll?: boolean
  interval?: number
  initialDelay?: number
  randomize?: boolean
  overrideSrc?: string | null
}

export function ImageCarousel({
  images,
  alt,
  className,
  autoScroll = true,
  interval = 4000,
  initialDelay,
  randomize = false,
  overrideSrc,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [manualPause, setManualPause] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const hasDraggedRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isPaused = !!overrideSrc || manualPause || isHovered
  const displayImages = overrideSrc ? [overrideSrc] : (images && images.length > 0 ? images : [])
  const effectiveIndex = overrideSrc ? 0 : currentIndex

  // Auto-slide effect with independent initial delay and randomized staggering
  useEffect(() => {
    if (!autoScroll || displayImages.length <= 1 || isPaused) return

    let timer: NodeJS.Timeout
    let isCancelled = false

    const scheduleNext = (delayMs: number) => {
      timer = setTimeout(() => {
        if (isCancelled) return
        setCurrentIndex((prev) => (prev + 1) % displayImages.length)
        const jitter = randomize ? Math.floor(Math.random() * 1200 - 600) : 0
        const nextDelay = Math.max(2800, interval + jitter)
        scheduleNext(nextDelay)
      }, delayMs)
    }

    const startDelay =
      initialDelay !== undefined
        ? initialDelay
        : randomize
        ? Math.floor(Math.random() * 2000 + 800)
        : interval

    scheduleNext(startDelay)

    return () => {
      isCancelled = true
      clearTimeout(timer)
    }
  }, [displayImages.length, autoScroll, interval, isPaused, initialDelay, randomize])

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      setManualPause(true)
      setTimeout(() => setManualPause(false), 5000)
    },
    []
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setDragOffset(0)
    hasDraggedRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - dragStart
    setDragOffset(diff)
    if (Math.abs(diff) > 6) {
      hasDraggedRef.current = true
    }
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > 40 && displayImages.length > 1) {
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
    hasDraggedRef.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - dragStart
    setDragOffset(diff)
    if (Math.abs(diff) > 6) {
      hasDraggedRef.current = true
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > 40 && displayImages.length > 1) {
      if (dragOffset < 0) {
        goTo((currentIndex + 1) % displayImages.length)
      } else {
        goTo((currentIndex - 1 + displayImages.length) % displayImages.length)
      }
    }
    setDragOffset(0)
  }

  // Prevent link navigation if user was dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      hasDraggedRef.current = false
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-muted group/img select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className || ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp()
        setIsHovered(false)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClickCapture={handleClickCapture}
    >
      <div
        className={`flex h-full w-full ${
          isDragging
            ? "transition-none"
            : "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        }`}
        style={{
          transform: `translateX(calc(-${effectiveIndex * 100}% + ${dragOffset}px))`,
        }}
      >
        {displayImages.map((src, i) => (
          <div key={`${src}-${i}`} className="relative w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt={`${alt} - ${i + 1}`}
              fill
              className="object-cover object-center pointer-events-none"
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots indicator */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 pointer-events-auto">
          {displayImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goTo(i)
              }}
              className={`rounded-full transition-all duration-300 ${
                i === effectiveIndex
                  ? "w-5 h-1.5 bg-foreground shadow-sm"
                  : "w-1.5 h-1.5 bg-foreground/35 hover:bg-foreground/70"
              }`}
              aria-label={`Slide to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Subtle bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}
