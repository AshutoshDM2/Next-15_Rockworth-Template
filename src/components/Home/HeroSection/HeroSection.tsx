"use client";

import Section from "@/common/Section/Section";
import { HomeSlider } from "@/components/Common/HomeSlider";
import OutlineButton from "@/components/Common/OutlineButton";

const demoSlides = [
  "/images/slider/slider_image_1.webp",
  "/images/slider/slider_image_2.webp",
  "/images/slider/slider_image_3.webp",
  "/images/slider/slider_image_4.webp",
  "/images/slider/slider_image_5.webp",
];

export function HeroSection() {
  const handleSlideChange = () => {};

  return (
    <div className="relative overflow-hidden bg-white">
      <Section>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-6">
              {/* Main heading */}
              <div className="overflow-hidden">
                <h1 className="text-4xl lg:text-5xl font-medium text-black tracking-wide">
                  {["Design For", "How", "People Work"].map((word, index) => (
                    <span
                      key={word}
                      className="inline-block mr-4 leading-tight"
                    >
                      {word}
                      {index < 2 && <br />}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Subtitle */}
              <div className="relative max-w-sm">
                <span className="text-base text-gray-700 mb-2 leading-relaxed font-light">
                  Innovative and sustainable solutions crafted for modern
                  businesses.
                </span>
              </div>
            </div>

            {/* Buttons - Hidden on mobile */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-4">
              <OutlineButton
                href="/products"
                size="lg"
                className="w-40 bg-black text-white"
              >
                Explore Products
              </OutlineButton>
              <OutlineButton
                size="lg"
                href="/resources?type=catalogues"
                className="w-40"
              >
                Download Catalogs
              </OutlineButton>
            </div>
          </div>

          {/* Right Image Slider */}
          <div className="relative">
            <HomeSlider
              slides={demoSlides}
              autoPlay={true}
              autoPlayInterval={2000}
              showArrows={true}
              showDots={true}
              showCounter={true}
              aspectRatio="aspect-[4/3] lg:aspect-[3/2]"
              onSlideChange={handleSlideChange}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
