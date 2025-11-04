"use client";

import { cn } from "@/lib/utils";

interface SliderDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export function SliderDots({
  total,
  current,
  onDotClick,
  className,
}: SliderDotsProps) {
  return (
    <div
      className={cn(
        "flex justify-center mt-4 gap-2 overflow-x-auto pb-2",
        className
      )}
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick}
          className={`h-2 rounded-full transition-all duration-300 disabled:opacity-50 ${
            current === index
              ? "bg-brand-color w-6"
              : "bg-gray-300 hover:bg-gray-400 w-2"
          }`}
        />
      ))}
    </div>
  );
}
