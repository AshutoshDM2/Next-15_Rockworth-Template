"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

type Crumb = {
  label: string;
  href?: string;
  onClick?: () => void;
};

interface BreadcrumbProps {
  items: Crumb[];
  textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, textSize = "sm" }) => {
  if (!items || items.length === 0) return null;

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  return (
    <nav
      className={`mt-4 ${textSizeClasses[textSize]} text-black font-normal flex items-center flex-wrap space-x-1`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ) : item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-black" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
