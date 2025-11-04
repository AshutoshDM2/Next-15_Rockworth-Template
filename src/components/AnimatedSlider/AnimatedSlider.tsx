/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import Image from "next/image";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

interface AnimatedSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showProgress?: boolean;
}

export function AnimatedSlider({
  slides,
  autoPlay = true,
  autoPlayInterval = 1500000,
  showDots = true,
  showArrows = true,
  showProgress = true,
}: AnimatedSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (autoPlayInterval / 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, nextSlide, autoPlayInterval]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
      scale: 1,
      zIndex: 2,
    }),
    center: {
      zIndex: 3,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
      scale: 1,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-black">
      <AnimatePresence mode="popLayout" custom={1}>
        <motion.div
          key={currentSlide}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40, duration: 0.6 },
            opacity: { duration: 0.1 },
            scale: { duration: 0.1 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center h-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pr-24 sm:pr-32 lg:pr-40">
              <div className="max-w-2xl">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <span className="inline-block px-4 py-2 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      {slides[currentSlide].subtitle}
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-lg text-white/90 leading-relaxed max-w-xl"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div variants={itemVariants} className="pt-4">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-brand-color hover:text-white transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg font-medium rounded-sm shadow-2xl"
                      href={slides[currentSlide].cta.href}
                    >
                      {slides[currentSlide].cta.text}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {showProgress && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="h-1 bg-white/20">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      )}

      {/* Enhanced Thumbnail Preview */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 block">
        <div className="hidden md:flex flex-col space-y-3">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              className={`relative w-20 h-16 sm:w-24 sm:h-18 lg:w-28 lg:h-20 rounded-xl overflow-hidden border-3 transition-all duration-500 group ${
                index === currentSlide
                  ? "border-white shadow-2xl shadow-white/30 scale-110"
                  : "border-white/40 hover:border-white/80 opacity-60 hover:opacity-90 hover:scale-105"
              }`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                  index === currentSlide
                    ? "opacity-0"
                    : "opacity-100 group-hover:opacity-50"
                }`}
              />

              {/* Active indicator */}
              {index === currentSlide && (
                <motion.div
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-lg"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Slide number */}
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {index + 1}
                </span>
              </div>

              {/* Hover title */}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-white font-medium truncate">
                  {slide.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
