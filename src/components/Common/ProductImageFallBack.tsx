"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import FallbackImage from "./FallBackLogo";
import { cn } from "@/lib/utils";

interface ImageArrayItem {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface ProductImageWithFallbackProps {
  width?: number;
  height?: number;
  src: string | ImageArrayItem[];
  alt: string;
  slug?: string;
  rounded?: boolean;
  className?: string;
  imageMeta?: string;
}

const ProductImageWithFallback: React.FC<ProductImageWithFallbackProps> = ({
  width = 200,
  height = 200,
  src,
  alt,
  slug,
  rounded,
  className,
  imageMeta = "",
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <FallbackImage rounded={rounded} slug={slug} />;
  }

  // Handle image_array structure
  if (Array.isArray(src) && src.length > 0 && typeof src[0] === "object") {
    const imageArray = src as ImageArrayItem[];
    const firstImage = imageArray[0];

    console.log(firstImage, "=======>");

    return (
      <Link href={slug || "/"}>
        <picture>
          {/* Desktop image */}
          <source
            media="(min-width: 1024px)"
            srcSet={`${imageMeta}${firstImage.desktop}`}
          />
          {/* Tablet image */}
          <source
            media="(min-width: 768px)"
            srcSet={`${imageMeta}${firstImage.tablet}`}
          />
          {/* Mobile image */}
          <Image
            src={`${imageMeta}${firstImage.mobile}`}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "w-full h-auto object-contain transition-all duration-300",
              className
            )}
            onError={() => setHasError(true)}
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </picture>
      </Link>
    );
  }

  // Handle single string src (fallback for existing usage)
  const imageSrc = typeof src === "string" ? src : "";

  return (
    <Link href={slug || "/"}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-auto object-contain transition-all duration-300",
          className
        )}
        onError={() => setHasError(true)}
        priority={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </Link>
  );
};

export default ProductImageWithFallback;
