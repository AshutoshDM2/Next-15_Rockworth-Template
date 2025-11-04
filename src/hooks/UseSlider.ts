import { useState, useCallback, useEffect } from "react";

interface UseSliderProps {
  totalItems: number;
  autoPlayInterval?: number;
  transitionDuration?: number;
}

interface UseSliderReturn {
  currentIndex: number;
  isTransitioning: boolean;
  isAutoPlaying: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  setIsAutoPlaying: (playing: boolean) => void;
}

export function useSlider({
  totalItems,
  autoPlayInterval = 2000,
  transitionDuration = 500,
}: UseSliderProps): UseSliderReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
    },
    [isTransitioning]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  // Handle infinite scroll reset
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex >= totalItems) {
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        setCurrentIndex(totalItems - 1);
      }
    }, transitionDuration);
    return () => clearTimeout(timer);
  }, [currentIndex, totalItems, isTransitioning, transitionDuration]);

  return {
    currentIndex,
    isTransitioning,
    isAutoPlaying,
    nextSlide,
    prevSlide,
    goToSlide,
    setIsAutoPlaying,
  };
}
