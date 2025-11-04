"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

interface FooterLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FooterLink({
  href,
  children,
  className = "",
}: FooterLinkProps) {
  return (
    <motion.div>
      <Link
        href={href}
        className={`text-xs text-gray-500 hover:text-black transition-all duration-200 hover:translate-x-1 inline-block ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
