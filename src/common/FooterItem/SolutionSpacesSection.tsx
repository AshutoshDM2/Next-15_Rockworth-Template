"use client";

import { fetchProductSpaces } from "@/lib/ProductsApi/ProductsApi";
import { ProductSpaceResponse } from "@/types/Products";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SolutionSpacesSection() {
  const [productSpaces, setProductSpaces] = useState<ProductSpaceResponse[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductSpaces = async () => {
      try {
        const { data } = await fetchProductSpaces({});
        setProductSpaces(data);
      } catch (error) {
        console.error("Failed to fetch product spaces:", error);
      } finally {
        setLoading(false);
      }
    };

    getProductSpaces();
  }, []);

  return (
    <div className="sm:col-span-1 lg:col-span-1  h-full lg:border-r text-gray-400">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-black font-semibold text-base">Solution Spaces</h3>
      </div>
      <ul className="space-y-3">
        {loading
          ? // Skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <li
                key={index}
                className="w-32 h-4 bg-gray-200 rounded animate-pulse"
              ></li>
            ))
          : // Render actual data
            productSpaces.map((space) => (
              <Link
                key={space.product_space_uuid}
                href={`/products/${space.slug}`}
                className="flex"
              >
                <li className="text-gray-500 hover:text-black text-sm transition-colors cursor-pointer">
                  {space.title}
                </li>
              </Link>
            ))}
      </ul>
    </div>
  );
}
