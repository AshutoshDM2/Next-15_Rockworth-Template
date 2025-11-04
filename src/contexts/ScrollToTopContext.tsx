/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ScrollToTopContextType {
  scrollToTop: () => void;
  disableAutoScroll: () => void;
  enableAutoScroll: () => void;
}

const ScrollToTopContext = createContext<ScrollToTopContextType | undefined>(
  undefined
);

interface ScrollToTopProviderProps {
  children: ReactNode;
  enabled?: boolean;
  behavior?: ScrollBehavior;
  top?: number;
}

export function ScrollToTopProvider({
  children,
  enabled = true,
  behavior = "smooth",
  top = 0,
}: ScrollToTopProviderProps) {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top,
      left: 0,
      behavior,
    });
  };

  const disableAutoScroll = () => {
    // You can implement state management here if needed
    // For now, this is a placeholder for future functionality
  };

  const enableAutoScroll = () => {
    // You can implement state management here if needed
    // For now, this is a placeholder for future functionality
  };

  // Scroll to top whenever the pathname changes
  useEffect(() => {
    if (enabled) {
      scrollToTop();
    }
  }, [pathname, enabled]);

  const value = {
    scrollToTop,
    disableAutoScroll,
    enableAutoScroll,
  };

  return (
    <ScrollToTopContext.Provider value={value}>
      {children}
    </ScrollToTopContext.Provider>
  );
}

export function useScrollToTop() {
  const context = useContext(ScrollToTopContext);
  if (context === undefined) {
    throw new Error("useScrollToTop must be used within a ScrollToTopProvider");
  }
  return context;
}
