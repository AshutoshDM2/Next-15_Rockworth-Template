"use client";

import type React from "react";

interface SliderContainerProps {
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  className?: string;
}

export function SliderContainer({
  children,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  className = "",
}: SliderContainerProps) {
  return (
    <div
      className={`p-2 relative overflow-hidden cursor-grab active:cursor-grabbing lg:cursor-default lg:active:cursor-default ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}
