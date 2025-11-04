"use client";
/* eslint-disable @next/next/no-img-element */
import FallbackImage from "@/components/Common/FallBackLogo";
import Link from "next/link";
import { useState } from "react";

export const MobileListProductImage = ({
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
    <Link href={`${linkPrefix}${spaceSlug}`}>
      <div className="category-image relative aspect-square overflow-hidden rounded-lg shadow-md group cursor-pointer">
        <img
          src={image}
          alt={title}
          onError={() => setHasError(true)}
          className="aspect-square  transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>{" "}
    </Link>
  );
};
