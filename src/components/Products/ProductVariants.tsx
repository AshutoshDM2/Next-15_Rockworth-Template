/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProductVariantsProps {
  variants: string[];
  activeVariant: string;
  onVariantChange: (variant: string) => void;
}

export function ProductVariants({
  variants,
  activeVariant,
  onVariantChange,
}: ProductVariantsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Toggle logic: if clicking active variant, deselect it; otherwise select it
  const handleVariantSelect = (variant: string) => {
    if (activeVariant === variant) {
      // If clicking the active variant, deselect it (show all products)
      onVariantChange("");
    } else {
      // If clicking a different variant, select it
      onVariantChange(variant);
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, [variants]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Desktop - show slider if more than 4 variants, otherwise show normal buttons
  if (variants && variants.length > 6) {
    return (
      <div className="relative mb-6">
        <div className="hidden lg:flex items-start">
          {variants && variants.length > 0 && (
            <button
              onClick={() => scroll("left")}
              className="flex-shrink-0 p-2 mr-2 bg-white border border-brand-color rounded-full hover:bg-white text-brand-color transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide max-w-4xl"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {variants &&
              variants.map((variant) => {
                const isActive = activeVariant === variant;

                return (
                  <button
                    key={variant}
                    onClick={() => handleVariantSelect(variant)}
                    className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-white text-black border border-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {variant}
                  </button>
                );
              })}
          </div>
          {variants && variants.length > 0 && (
            <button
              onClick={() => scroll("right")}
              className="flex-shrink-0 p-2 ml-2 bg-white border border-brand-color rounded-full hover:bg-white text-brand-color transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Desktop - normal button layout for 4 or fewer variants
  return (
    <div className="hidden lg:flex flex-wrap gap-6 mb-6">
      {variants &&
        variants.map((variant) => {
          const isActive = activeVariant === variant;

          return (
            <button
              key={variant}
              onClick={() => handleVariantSelect(variant)}
              className={`inline-block px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-600 hover:bg-gray-50"
              }`}
            >
              {variant}
            </button>
          );
        })}
    </div>
  );
}
