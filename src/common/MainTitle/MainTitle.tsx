import * as React from "react";
import { cn } from "@/lib/utils";

interface MainTitleTitleProps {
  title?: string;
  className?: string;
}

export default function MainTitleTitle({
  title = "",
  className,
}: MainTitleTitleProps) {
  return (
    <h1
      className={cn(
        "text-3xl lg:text-4xl font-medium text-black tracking-wide",
        className
      )}
    >
      {title}
    </h1>
  );
}
