"use client";
/* eslint-disable @next/next/no-img-element */
import FallbackImage from "@/components/Common/FallBackLogo";
import { useState } from "react";

export const MobileProductImage = ({
  image,
  title,
  spaceSlug,
  linkPrefix,
}: {
  image: string;
  title: string;
  spaceSlug: string;
  linkPrefix: string;
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <FallbackImage megaMenu={true} slug={`${linkPrefix}${spaceSlug}`} />;
  }

  return (
    <div className="category-image relative h-44 overflow-hidden rounded-lg shadow-md group cursor-pointer">
      <img
        src={image}
        alt={title}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
