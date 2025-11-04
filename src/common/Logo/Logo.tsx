/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  href: string;
}

const logoVariants: any = {
  hidden: { scale: 0.8, opacity: 0, rotateY: -90 },
  visible: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.6,
    },
  },
};

export function Logo({
  width = 160,
  height = 60,
  className = "",
  href,
  animated = true,
}: LogoProps) {
  const LogoContent = () => (
    <div className={`relative ${className}`}>
      <Link href={href}>
        <Image
          src="/images/Logo.webp"
          alt="Rockworth Logo"
          width={width}
          height={height}
          priority
          className="object-contain"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Link>
    </div>
  );

  if (!animated) {
    return (
      <div className="cursor-pointer">
        <LogoContent />
      </div>
    );
  }

  return (
    <motion.div
      variants={logoVariants}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 },
      }}
      className="flex-shrink-0 cursor-pointer"
    >
      <LogoContent />
    </motion.div>
  );
}
