/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePagination } from "@/hooks/UsePagination";
import type { IProduct } from "@/types/Products";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductImageWithFallback from "../Common/ProductImageFallBack";
import { Pagination } from "./Pagination";

interface ProductGridProps {
  products: IProduct[];
  imageMeta: string;
}

export function ProductGrid({ products, imageMeta }: ProductGridProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  console.log(products, "=======>");

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    getVisiblePages,
    hasNextPage,
    hasPrevPage,
    containerRef, //* Get the ref from the hook
  } = usePagination({
    totalItems: products.length,
    itemsPerPage: 6,
    initialPage: 1,
  });

  //* Reset to first page when products change (e.g., when filtering)
  useEffect(() => {
    goToPage(1);
  }, [products.length]);

  const handlePageChange = (page: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      goToPage(page);
      setTimeout(() => setIsAnimating(false), 200);
    }, 150);
  };

  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <p className="text-gray-500 text-lg">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  const currentProducts = products.slice(
    paginatedData.startIndex,
    paginatedData.endIndex
  );

  return (
    <div className="flex-1">
      {/* Products Container with Ref */}
      <div ref={containerRef} className="scroll-mt-24 mt-6 lg:mt-10">
        {/* Products Count */}
        <div className="mb-4 -mt-6">
          <p className="text-sm text-gray-600">
            Showing {paginatedData.startIndex + 1}-
            {Math.min(paginatedData.endIndex, products.length)} of{" "}
            {products.length} products
          </p>
        </div>

        {/* Products Grid with Animation */}
        <div
          className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300
            ${
              isAnimating
                ? "opacity-50 transform scale-95"
                : "opacity-100 transform scale-100"
            }
          `}
        >
          {currentProducts.map((product, index) => (
            <div
              key={product.site_product_uuid}
              className={`
                mb-0 transition-all duration-300 transform
                ${isAnimating ? "translate-y-4" : "translate-y-0"}
              `}
              style={{
                transitionDelay: isAnimating ? "0ms" : `${index * 50}ms`,
              }}
            >
              <div className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow">
                <ProductImageWithFallback
                  src={product.image_array || product.product_image}
                  alt={product.site_product_name}
                  width={200}
                  height={200}
                  slug={`/product/${product.slug}`}
                  className="w-full h-auto object-contain"
                  imageMeta={imageMeta}
                />
              </div>
              <div className="p-4 space-y-2 text-center">
                <Link href={`/product/${product.slug}`} className="mb-0">
                  <h3 className="text-sm font-medium text-black hover:text-brand-color transition-colors">
                    {product.site_product_name}
                  </h3>
                </Link>
                {product.colour && product.colour.length > 0 && (
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    {product.colour.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        getVisiblePages={getVisiblePages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
}
