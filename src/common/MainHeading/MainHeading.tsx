import * as React from "react";
import { cn } from "@/lib/utils";

interface MainHeadingHeadingProps {
  title?: string;
  className?: string;
}

export default function MainHeadingHeading({
  title = "About MainHeading",
  className,
}: MainHeadingHeadingProps) {
  return (
    <h2
      className={cn(
        "text-2xl lg:text-3xl font-normal text-black tracking-wide",
        className
      )}
    >
      {title}
    </h2>
  );
}
