"use client";

import type React from "react";

import { useState, useCallback } from "react";

interface UseTouchSliderProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  minSwipeDistance?: number;
}

interface UseTouchSliderReturn {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export function useTouchSlider({
  onSwipeLeft,
  onSwipeRight,
  onTouchStart: onTouchStartCallback,
  onTouchEnd: onTouchEndCallback,
  minSwipeDistance = 50,
}: UseTouchSliderProps): UseTouchSliderReturn {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
      onTouchStartCallback?.();
    },
    [onTouchStartCallback]
  );

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }

    onTouchEndCallback?.();
  }, [
    touchStart,
    touchEnd,
    minSwipeDistance,
    onSwipeLeft,
    onSwipeRight,
    onTouchEndCallback,
  ]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
