"use client";

import { ProductCategory } from "@/types/Products";
import { ChevronDown } from "lucide-react";
import { memo, useCallback, useState } from "react";

interface CategorySelectorProps {
  categories: ProductCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isLoading?: boolean;
}

export const CategorySelector = memo<CategorySelectorProps>(
  function CategorySelector({
    categories,
    activeCategory,
    onCategoryChange,
    isLoading = false,
  }) {
    const [isOpen, setIsOpen] = useState(false);

    const activeItem = categories.find((cat) => cat.id === activeCategory);

    const handleCategorySelect = useCallback(
      (categoryId: string) => {
        onCategoryChange(categoryId);
        setIsOpen(false);
      },
      [onCategoryChange]
    );

    const toggleDropdown = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    if (isLoading) {
      return (
        <div className="mt-1.5 mb-8">
          <div className="border-b border-t border-gray-400 animate-pulse">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-1.5 relative mb-8">
        <div className="border-b border-t border-gray-400">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-auto text-left focus:outline-none focus:ring-2 focus:ring-brand-color focus:ring-offset-2 rounded"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label="Select product category"
          >
            <span className="text-base lg:text-lg font-medium text-brand-color p-1">
              {activeItem?.id || "Select Category"}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-brand-color transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <div
              className="fixed inset-0 z-10 lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <div
              className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-20 min-w-48 max-h-60 overflow-y-auto"
              role="listbox"
              aria-label="Product categories"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full text-base text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    activeCategory === category.id
                      ? "bg-orange-50 text-brand-color font-medium"
                      : "text-gray-700"
                  }`}
                  role="option"
                  aria-selected={activeCategory === category.id}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);
