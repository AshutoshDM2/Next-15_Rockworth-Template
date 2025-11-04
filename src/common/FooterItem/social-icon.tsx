"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SocialIconProps {
  icon: LucideIcon;
  href: string;
  label: string;
  delay?: number;
}

export function SocialIcon({ icon: Icon, href, label }: SocialIconProps) {
  return (
    <div>
      <Link
        href={href}
        aria-label={label}
        className="group relative w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-brand-color hover:bg-brand-color hover:shadow-md transition-all duration-200 hover:-translate-y-1"
      >
        <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-100 transition-colors" />

        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {label}
        </div>
      </Link>
    </div>
  );
}
