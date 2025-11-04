"use client";

import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface HomeSliderProps {
  slides: string[];
  imageUrl?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  aspectRatio?: string;
  className?: string;
  arrowClassName?: string;
  dotClassName?: string;
  counterClassName?: string;
  onSlideChange?: (index: number) => void;
}

export function HomeSlider({
  slides,
  imageUrl,
  autoPlay = true,
  autoPlayInterval = 2000,
  showArrows = true,
  showDots = true,
  showCounter = true,
  aspectRatio = "aspect-[4/3] lg:aspect-[3/2]",
  className = "",
  arrowClassName = "",
  dotClassName = "",
  counterClassName = "",
  onSlideChange,
}: HomeSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % slides.length;
    setCurrentSlide(newIndex);
    onSlideChange?.(newIndex);
  }, [currentSlide, slides.length, onSlideChange]);

  const prevSlide = useCallback(() => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(newIndex);
    onSlideChange?.(newIndex);
  }, [currentSlide, slides.length, onSlideChange]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Resume auto-play after a delay
    if (autoPlay) {
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !autoPlay || slides.length <= 1) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlay, autoPlayInterval, nextSlide, slides.length]);

  if (!slides.length) return null;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={sliderRef}
        className={`relative ${aspectRatio} overflow-hidden rounded-xl group cursor-grab active:cursor-grabbing`}
        onMouseEnter={() => autoPlay && setIsAutoPlaying(false)}
        onMouseLeave={() => autoPlay && setIsAutoPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Image Container */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => {
            const fullSrc = imageUrl ? `${imageUrl}${slide}` : slide;
            return (
              <div
                key={index}
                className={`absolute w-full h-full inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={fullSrc || "/placeholder.svg"}
                  alt="Object cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - Only show if more than one slide */}
        {showArrows && slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className={`hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-color border border-brand-color text-brand-color hover:text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${arrowClassName}`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className={`hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-brand-color border border-brand-color hover:text-white text-brand-color rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${arrowClassName}`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Counter - Only show if more than one slide */}
        {showCounter && slides.length > 1 && (
          <div
            className={`absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium ${counterClassName}`}
          >
            {currentSlide + 1} / {slides.length}
          </div>
        )}
      </div>

      {/* Navigation Dots - Only show if more than one slide */}
      {showDots && slides.length > 1 && (
        <div className="flex justify-center mt-6 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-brand-color scale-125 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
              } ${dotClassName}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-brand-color/20 rounded-full blur-xl -z-10" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-gray-400/10 to-gray-600/10 rounded-full blur-2xl -z-10" />
    </div>
  );
}
