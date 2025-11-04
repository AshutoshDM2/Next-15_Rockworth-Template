"use client";
import { Button } from "@/components/ui/Button/Button";
import { SliderDots } from "@/components/SliderDots/SliderDots";
import { IoIosPlay } from "react-icons/io";

interface SliderControlsProps {
  totalItems: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  learnMoreText?: string;
  onLearnMore?: () => void;
}

export function SliderControls({
  totalItems,
  currentIndex,
  onDotClick,
  learnMoreText = "Learn More",
  onLearnMore,
}: SliderControlsProps) {
  return (
    <div className="flex items-center justify-center lg:justify-between mt-8">
      <Button
        variant="outline"
        size="default"
        className="group border-gray-400 text-gray-700 hover:border-brand-color hover:text-white hover:bg-brand-color transition-all duration-300 px-6 py-2.5 text-sm font-medium bg-transparent"
        onClick={onLearnMore}
      >
        {learnMoreText}
        <IoIosPlay
          className="ml-0.5 fill-current"
          style={{ width: "0.9rem" }}
        />
      </Button>

      <div className="hidden lg:flex gap-2 ml-96">
        <SliderDots
          total={totalItems}
          current={currentIndex}
          onDotClick={onDotClick}
        />
      </div>
    </div>
  );
}
