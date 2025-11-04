/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearch } from "@/contexts/SearchContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FallbackImage from "../Common/FallBackLogo";

interface SearchResultItemProps {
  result: any;
  index: number;
  onResultClick: () => void;
}

export function SearchResultItem({
  result,
  index,
  onResultClick,
}: SearchResultItemProps) {
  const [imageErrorMap, setImageErrorMap] = useState<
    Record<string | number, boolean>
  >({});

  const markImageError = (key: string | number) => {
    setImageErrorMap((prev) => ({ ...prev, [key]: true }));
  };
  const { imageUrl } = useSearch();

  const key = result.id ?? index;
  const imageSrc = `${imageUrl}${result.product_image}`;
  const hasError = imageErrorMap[key] || !result.product_image?.trim();

  // Optional: clear errors when the result list changes
  useEffect(() => setImageErrorMap({}), [result]);
  return (
    <div
      onClick={onResultClick}
      className="w-full flex items-center p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-left group cursor-pointer"
    >
      {/* Image */}
      <div className="shrink-0 mr-3 sm:mr-4">
        {hasError ? (
          <FallbackImage slug={`/product/${result.slug}`} searchTerm />
        ) : (
          <img
            src={imageSrc}
            alt={result.title}
            className="w-14 lg:w-20 h-14 lg:h-20 rounded-lg object-cover mr-4 border border-gray-200"
            onError={() => markImageError(key)}
          />
        )}
      </div>

      {/* Content */}
      <Link
        href={`/product/${result.slug}`}
        className="flex items-center justify-between w-full min-w-0"
      >
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="font-medium text-gray-900 truncate group-hover:text-orange-500 transition-colors text-sm sm:text-base">
            {result.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
            {result.description}
          </p>

          {/* Tags */}
          <div className="flex items-center mt-1 sm:mt-2 gap-1 sm:gap-2 flex-wrap">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {result.category}
            </span>
            {result.variant && (
              <span className="text-xs text-gray-400 bg-blue-100 px-2 py-0.5 rounded-full">
                {result.variant}
              </span>
            )}
            {result.price && (
              <span className="text-xs sm:text-sm font-medium text-orange-500">
                {result.price}
              </span>
            )}
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors shrink-0" />
      </Link>
    </div>
  );
}
