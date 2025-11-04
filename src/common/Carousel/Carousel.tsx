/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";

// Types for the carousel
export interface CarouselItem {
  id: string | number;
  title: string;
  description?: string;
  image: string;
  [key: string]: any; // Allow additional properties
}

export interface ResponsiveConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  largeDesktop: number;
}

export interface CarouselProps {
  items: any[];
  title?: string;
  onItemClick?: (item: CarouselItem) => void;
  onPlayClick?: (item: CarouselItem) => void;
  className?: string;
  itemClassName?: string;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showPlayButton?: boolean;
  showMobileNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  itemsPerView?: ResponsiveConfig;
  gap?: number;
  aspectRatio?: string;
  enableHover?: boolean;
  customItemRenderer?: (item: CarouselItem, index: number) => ReactNode;
  navigationClassName?: string;
  indicatorClassName?: string;
}

const defaultItemsPerView: ResponsiveConfig = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  largeDesktop: 3,
};

const cardVariants: any = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export function Carousel({
  items,
  title,
  onItemClick,
  onPlayClick,
  className = "",
  itemClassName = "",
  showNavigation = true,
  showIndicators = true,
  showPlayButton = true,
  showMobileNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  itemsPerView = defaultItemsPerView,
  gap = 20,
  aspectRatio = "4/3",
  enableHover = true,
  customItemRenderer,
  navigationClassName = "",
  indicatorClassName = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerViewCurrent, setItemsPerViewCurrent] = useState(
    itemsPerView.desktop
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerViewCurrent(itemsPerView.mobile);
      } else if (width < 1024) {
        setItemsPerViewCurrent(itemsPerView.tablet);
      } else if (width < 1280) {
        setItemsPerViewCurrent(itemsPerView.desktop);
      } else {
        setItemsPerViewCurrent(itemsPerView.largeDesktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && items.length > itemsPerViewCurrent) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, items.length - itemsPerViewCurrent);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, items.length, itemsPerViewCurrent]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && items.length > itemsPerViewCurrent) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, items.length - itemsPerViewCurrent);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoPlayInterval);
    }
  };

  // Responsive item dimensions
  const getItemWidth = () => {
    if (typeof window === "undefined") return 382;
    const width = window.innerWidth;
    if (width < 640) return Math.min(380, width - 40);
    if (width < 1024) return 300;
    if (width < 1280) return 320;
    return 382;
  };

  const itemWidth = getItemWidth();
  const maxIndex = Math.max(0, items.length - itemsPerViewCurrent);

  const handleItemClick = (item: CarouselItem) => {
    onItemClick?.(item);
  };

  const handlePlayButtonClick = (e: React.MouseEvent, item: CarouselItem) => {
    e.stopPropagation();
    onPlayClick?.(item);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const getTransformValue = () => {
    const translateX = currentIndex * (itemWidth + gap);
    return -translateX;
  };

  // Default item renderer
  const renderDefaultItem = (item: CarouselItem, index: number) => (
    <motion.div
      key={item.id}
      variants={cardVariants}
      whileHover={
        enableHover
          ? {
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : {}
      }
      className={`mx-auto flex-shrink-0 group cursor-pointer p-4 lg:p-0 lg:py-4 ${itemClassName}`}
      style={{ width: itemWidth, margin: "auto" }}
      onHoverStart={() => enableHover && setHoveredItem(item.description || "")}
      onHoverEnd={() => enableHover && setHoveredItem(null)}
      onClick={() => handleItemClick(item)}
    >
      <div
        className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500`}
        style={{ aspectRatio }}
      >
        {/* Item Image */}
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 300px, (max-width: 1280px) 320px, 350px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-row items-end justify-between p-3 sm:p-4">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-white text-base sm:text-lg lg:text-xl font-normal drop-shadow-lg"
          >
            {item.title}
          </motion.h3>

          {showPlayButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f97316",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-brand-color transition-all duration-300"
              onClick={(e) => handlePlayButtonClick(e, item)}
            >
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5 text-white fill-white" />
            </motion.div>
          )}
        </div>

        {/* Hover Description */}
        {enableHover && item.description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: hoveredItem === item.description ? 1 : 0,
              y: hoveredItem === item.description ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-12 sm:bottom-16 left-3 sm:left-4 right-3 sm:right-4 text-white/90 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {item.description}
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No items to display
      </div>
    );
  }

  return (
    <div className={`bg-white relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          {title && (
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-medium text-black text-center lg:text-left px-4 sm:px-0 mb-8">
              {title}
            </h2>
          )}

          <div className="relative">
            {/* Navigation Buttons - Hidden on mobile, visible on larger screens */}
            {showNavigation && items.length > itemsPerViewCurrent && (
              <>
                <motion.button
                  onClick={goToPrevious}
                  className={`hidden sm:flex absolute -left-4 lg:-left-6 top-[40%] -translate-y-[30%] z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-brand-color hover:bg-brand-color hover:text-white transition-all duration-300 border border-brand-color ${navigationClassName}`}
                >
                  <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                </motion.button>

                <motion.button
                  onClick={goToNext}
                  className={`hidden sm:flex absolute -right-4 lg:-right-6 top-[40%] -translate-y-[40%] z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-brand-color hover:bg-brand-color hover:text-white transition-all duration-300 border border-brand-color ${navigationClassName}`}
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </motion.button>
              </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden mx-auto ml-1">
              <motion.div
                ref={carouselRef}
                className="flex"
                style={{ gap: `${gap}px` }}
                animate={{
                  x: getTransformValue(),
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                {items.map((item, index) =>
                  customItemRenderer
                    ? customItemRenderer(item, index)
                    : renderDefaultItem(item, index)
                )}
              </motion.div>
            </div>

            {/* Mobile Navigation Buttons */}
            {showMobileNavigation && items.length > itemsPerViewCurrent && (
              <div className="flex sm:hidden justify-center mt-6 space-x-4">
                <motion.button
                  onClick={goToPrevious}
                  className={`w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-brand-color hover:bg-brand-color hover:text-white transition-all duration-300 border border-brand-color ${navigationClassName}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={goToNext}
                  className={`w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-brand-color hover:bg-brand-color hover:text-white transition-all duration-300 border border-brand-color ${navigationClassName}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            {/* Carousel Indicators */}
            {showIndicators && items.length > itemsPerViewCurrent && (
              <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-brand-color w-6 sm:w-8"
                        : "bg-gray-300 w-2"
                    } ${indicatorClassName}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
