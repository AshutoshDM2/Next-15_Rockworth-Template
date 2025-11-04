import type React from "react";

interface SliderTrackProps {
  children: React.ReactNode;
  translateX: number;
  totalItems: number;
  slidesPerView: number;
  transitionDuration?: number;
}

export function SliderTrack({
  children,
  translateX,
  totalItems,
  slidesPerView,
  transitionDuration = 500,
}: SliderTrackProps) {
  return (
    <div
      className="flex transition-transform ease-in-out"
      style={{
        transform: `translateX(${translateX}%)`,
        width: `${totalItems * (100 / slidesPerView)}%`,
        transitionDuration: `${transitionDuration}ms`,
      }}
    >
      {children}
    </div>
  );
}
