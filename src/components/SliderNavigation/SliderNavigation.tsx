"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SliderNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  className1?: string;
  className2?: string;
}

export function SliderNavigation({
  onPrev,
  onNext,
  className1,
  className2,
}: SliderNavigationProps) {
  return (
    <>
      <button
        onClick={onPrev}
        className={cn(
          "absolute -left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-brand-color hover:text-white border border-brand-color text-brand-color rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center",
          className1
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        className={cn(
          "absolute -right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-brand-color hover:text-white border border-brand-color text-brand-color  rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center",
          className2
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </>
  );
}
