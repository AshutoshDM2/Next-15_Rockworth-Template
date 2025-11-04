"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";

interface ParallaxProps {
  imageUrl: string;
  enabled?: boolean;
  height?:
    | string
    | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  speed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
  position?: string;
  backgroundSize?: string;
  className?: string;
  children?: ReactNode; // <-- ✅ safer type
}

export function Parallax({
  imageUrl,
  height = { xs: "auto", md: "600px" },
  overlay = false,
  overlayOpacity = 0.6,
  overlayColor = "0, 0, 0",
  className,
  children,
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getResponsiveHeight = () => {
    if (typeof height === "string") return height;

    // For SSR, default to the largest breakpoint
    if (typeof window === "undefined") return height.md || height.lg || "500px";

    const width = window.innerWidth;
    if (width < 640 && height.xs) return height.xs;
    if (width < 768 && height.sm) return height.sm || height.xs;
    if (width < 1024 && height.md) return height.md || height.sm || height.xs;
    if (width < 1280 && height.lg)
      return height.lg || height.md || height.sm || height.xs;
    return (
      height.xl || height.lg || height.md || height.sm || height.xs || "500px"
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height: getResponsiveHeight() }}>
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {overlay && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: `rgba(${overlayColor}, ${overlayOpacity})`,
          }}
        />
      )}
      <div className="relative z-10 h-full">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
