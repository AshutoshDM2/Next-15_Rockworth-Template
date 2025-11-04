import * as React from "react";
import { cn } from "@/lib/utils";

interface MainparagraphProps {
  paragraph?: string;
  className?: string;
}

export default function Mainparagraph({
  paragraph = "With a firm belief that creation is a part of human nature, At Main, we craft workspaces that empower people and elevate businesses through functional and sustainable furniture solutions.",
  className,
}: MainparagraphProps) {
  return (
    <p
      className={cn(
        "text-base text-gray-700 leading-relaxed font-light",
        className
      )}
    >
      {paragraph}
    </p>
  );
}
