"use client";

import { useCallback } from "react";

export function useOptimalScroll() {
  const scrollToOptimalView = useCallback(() => {
    const heroSection = document.querySelector("[data-hero-section]");
    const productsSection = document.getElementById("products-section");

    if (heroSection && productsSection) {
      // Calculate position to show the products section at the top with padding
      const heroHeight = heroSection.getBoundingClientRect().height;
      const optimalPosition = heroHeight - 80; // 80px padding from top

      window.scrollTo({
        top: Math.max(0, optimalPosition),
        behavior: "smooth",
      });
    } else {
      // Fallback to top if elements not found
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const scrollToSection = useCallback((sectionId: string, offset = 0) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return {
    scrollToOptimalView,
    scrollToSection,
  };
}
