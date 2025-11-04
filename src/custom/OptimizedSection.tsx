/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import type React from "react";
import { Suspense, useEffect, useRef, useState, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedSectionProps {
  children: React.ReactNode;
  height?: string;
  sectionName?: string;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

const LoadingSkeleton = memo(
  ({ height, sectionName }: { height: string; sectionName?: string }) => (
    <div
      className={cn(
        height,
        "bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse rounded-lg mx-4 my-8",
        "bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
      )}
      aria-label={`Loading ${sectionName || "section"}`}
      role="status"
    >
      <span className="sr-only">Loading {sectionName || "content"}...</span>
    </div>
  )
);

LoadingSkeleton.displayName = "LoadingSkeleton";

export const OptimizedSection = memo(
  ({
    children,
    height = "h-32",
    sectionName,
    rootMargin = "100px",
    threshold = 0.1,
    className,
  }: OptimizedSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        },
        {
          rootMargin,
          threshold,
          // @ts-ignore
          trackVisibility: true,
          delay: 100,
        }
      );

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
        observer.disconnect();
      };
    }, [rootMargin, threshold, hasLoaded]);

    return (
      <section
        ref={ref}
        className={cn("relative", className)}
        aria-label={sectionName ? `${sectionName} section` : undefined}
      >
        {isVisible ? (
          <Suspense
            fallback={
              <LoadingSkeleton height={height} sectionName={sectionName} />
            }
          >
            {children}
          </Suspense>
        ) : (
          <LoadingSkeleton height={height} sectionName={sectionName} />
        )}
      </section>
    );
  }
);

OptimizedSection.displayName = "OptimizedSection";
