"use client";

import { useState, useEffect } from "react";
import type { ProductSpaceResponse } from "@/types/Products";

interface UseProductSpaceStateProps {
  productSpace: ProductSpaceResponse;
  initialCategorySlug?: string;
}

export function useProductSpaceState({
  productSpace,
  initialCategorySlug,
}: UseProductSpaceStateProps) {
  //? Set initial category based on URL or show all products
  const [activeCategory, setActiveCategory] = useState(() => {
    if (initialCategorySlug) {
      // If specific category slug is provided, find and set that category
      const foundCategory = productSpace.categories.find(
        (cat) => cat.id.toLowerCase() === initialCategorySlug.toLowerCase()
      );
      return foundCategory?.id || "";
    }
    // If no category slug provided, return empty to show all products
    return "";
  });

  //?? Start with empty variant to show all products initially
  const [activeVariant, setActiveVariant] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  //?? Reset variant whenever category changes
  useEffect(() => {
    setActiveVariant(""); //? Reset to show all products when category changes
    setActiveFilters({}); //? Also reset filters when category changes
    setSearchTerm(""); //? Also reset search when category changes
  }, [activeCategory]);

  //? Get current category - if no active category, return null to show all products
  const currentCategory = activeCategory
    ? productSpace.categories.find((cat) => cat.id === activeCategory)
    : null;

  //? Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    activeCategory,
    setActiveCategory,
    activeVariant,
    setActiveVariant,
    activeFilters,
    setActiveFilters,
    searchTerm,
    setSearchTerm,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    currentCategory,
  };
}
