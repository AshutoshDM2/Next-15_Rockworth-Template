import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
  return (
    <section
      className={cn(
        "w-full max-w-screen-xl 2xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
        className
      )}>
      {children}
    </section>
  );
};

export default Section;
