"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getVisiblePages: () => (number | string)[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  getVisiblePages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-8 mb-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={`
          flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-lg border transition-all duration-300 transform
          ${
            hasPrevPage
              ? "border-brand-color text-brand-color hover:bg-brand-color hover:text-white hover:scale-105 active:scale-95"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-2 sm:px-3 py-2 text-gray-400 text-sm">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`
                w-12 h-12 sm:w-10 sm:h-10 rounded-lg border font-medium transition-all duration-300 transform text-sm sm:text-base
                ${
                  isActive
                    ? "bg-brand-color text-white border-brand-color shadow-lg scale-105"
                    : "border-gray-300 text-gray-700 hover:border-brand-color hover:text-brand-color hover:scale-105 active:scale-95"
                }
              `}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`
          flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-lg border transition-all duration-300 transform
          ${
            hasNextPage
              ? "border-brand-color text-brand-color hover:bg-brand-color hover:text-white hover:scale-105 active:scale-95"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
