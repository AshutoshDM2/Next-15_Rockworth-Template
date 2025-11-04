/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  mobile: 2,
  tablet: 3,
  desktop: 5,
};

export function useResponsiveSlides(
  breakpoints: BreakpointConfig = DEFAULT_BREAKPOINTS
) {
  const [slidesPerView, setSlidesPerView] = useState(breakpoints.desktop);

  const getSlidesPerView = () => {
    if (typeof window === "undefined") return breakpoints.desktop;

    if (window.innerWidth >= 1024) return breakpoints.desktop;
    if (window.innerWidth >= 768) return breakpoints.tablet;
    return breakpoints.mobile;
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return slidesPerView;
}
