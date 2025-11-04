/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Section from "@/common/Section/Section";
import type { Performance } from "@/types/Products";
// import {
//   Shield,
//   Search,
//   Check,
//   Package,
//   Settings,
//   Headphones,
// } from "lucide-react";
import HtmlContentRenderer from "@/components/HtmlContentRenderer/HtmlContentRenderer";
import FallbackImage from "@/components/Common/FallBackLogo";

interface IPerformanceSectionProps {
  imageUrl: string;
  performance: Performance[] | null;
}

// const icons = [Shield, Search, Check, Package, Settings, Headphones];

export default function PerformanceSection({
  imageUrl,
  performance,
}: IPerformanceSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || !performance) return;

      const containerTop = container.offsetTop;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find which section is currently in view
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const sectionTop = section.offsetTop + containerTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const viewportCenter = scrollY + windowHeight / 2;

        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [performance]);

  const scrollToStep = (stepIndex: number) => {
    const section = sectionRefs.current[stepIndex];
    const container = containerRef.current;

    if (section && container) {
      const containerTop = container.offsetTop;
      const sectionTop = section.offsetTop + containerTop;
      window.scrollTo({
        top: sectionTop - 100, // Offset for better positioning
        behavior: "smooth",
      });
    }
  };

  const handleImageError = (stepId: string) => {
    setImageErrors((prev) => new Set([...prev, stepId]));
  };

  if (!performance) return null;

  return (
    <Section>
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-normal text-black tracking-wide">
          Key Features
        </h2>
      </div>

      <div ref={containerRef} className="relative">
        <div className="flex gap-8 lg:gap-12">
          {/* Sticky Sidebar Navigation */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-28">
              <div className="bg-[#f2f2f2] rounded-2xl p-3">
                <nav className="space-y-2">
                  {performance.map((step, index) => {
                    // const IconComponent = icons[index % icons.length];
                    const isActive = index === activeStep;

                    return (
                      <button
                        key={step.id}
                        onClick={() => scrollToStep(index)}
                        className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left group ${
                          isActive
                            ? "bg-brand-color text-white"
                            : "text-gray-700 hover:bg-brand-color hover:text-white"
                        }`}
                      >
                        {/* <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                            isActive
                              ? "bg-white text-black"
                              : "bg-white text-black group-hover:bg-white group-hover:text-black"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div> */}
                        <span className="font-medium">{step.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-4">
            {performance.map((step, index) => {
              // const IconComponent = icons[index % icons.length];
              const isImageLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  //@ts-ignore
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="flex items-center"
                >
                  <div
                    className={`grid lg:grid-cols-2 gap-12 mb-10 lg:mb-20 items-center w-full ${
                      isImageLeft ? "" : "lg:grid-flow-col-dense"
                    }`}
                  >
                    {/* Image Section */}
                    <div className={`${isImageLeft ? "" : "lg:col-start-2"}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        {imageErrors.has(step.id) ? (
                          <FallbackImage />
                        ) : (
                          <Image
                            src={`${imageUrl}${step.image}`}
                            alt={step.title}
                            width={600}
                            height={800}
                            className="w-full h-auto object-cover"
                            onError={() => handleImageError(step.id)}
                          />
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`${isImageLeft ? "" : "lg:col-start-1"}`}>
                      {/* <div className="lg:hidden mb-2">
                        <div className="w-12 h-12 bg-white shadow-xl rounded-lg flex items-center justify-center mb-3">
                          <IconComponent className="w-6 h-6 text-brand-color" />
                        </div>
                      </div> */}

                      {/* <div className="hidden lg:block mb-2">
                        <div
                          className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3"
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.16) 0px 0px 6px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                          }}
                        >
                          <IconComponent className="w-5 h-5 text-brand-color" />
                        </div>
                      </div> */}

                      <h3 className="text-2xl font-medium text-black tracking-wide mb-2">
                        {step.title}
                      </h3>
                      <div>
                        <HtmlContentRenderer content={step.description} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
