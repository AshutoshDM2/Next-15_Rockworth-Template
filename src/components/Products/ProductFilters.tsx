"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Search } from "lucide-react";
import type { FilterGroup } from "@/lib/mock-data";
import { Separator } from "../ui/Separator/Separator";
import { formatCategoryName } from "@/constant/product-space";
import { ProductVariants } from "./ProductVariants";
import { MobileProductVariants } from "./MobileProductVariant";

interface Category {
  id: string;
  name?: string;
  title?: string;
}

interface ProductFiltersProps {
  filters: FilterGroup[];
  categories?: Category[];
  activeCategory?: string;
  onFilterChange: (filterId: string, value: string) => void;
  onSearchChange: (search: string) => void;
  onCategoryChange?: (categoryId: string) => void;
  activeFilters: Record<string, string>;
  variants: string[];
  activeVariant: string;
  onVariantChange: (variant: string) => void;
}

export function ProductFilters({
  filters,
  categories,
  activeCategory,
  onFilterChange,
  onSearchChange,
  onCategoryChange,
  activeFilters,
  variants,
  activeVariant,
  onVariantChange,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="w-full lg:w-48 space-y-8 bg-white">
      {/* Search Section */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-60 pl-0 pr-12 py-3 text-gray-500 placeholder-gray-400 border-0 border-gray-300 rounded-none focus:ring-0 bg-transparent"
          />
          <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 h-6 w-6 text-black" />
          <Separator className="lg:w-40 my-0 h-0.5 bg-gray-900" />
        </div>
      </div>

      <div className="lg:hidden block">
        <ProductVariants
          variants={variants}
          activeVariant={activeVariant}
          onVariantChange={onVariantChange}
        />
      </div>
      <div className="lg:hidden block">
        <MobileProductVariants
          variants={variants}
          activeVariant={activeVariant}
          onVariantChange={onVariantChange}
        />
      </div>

      {/* Category Filter Section */}
      {categories && categories.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-normal text-black">Filter by category</h2>
          <div className="space-y-4">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={isActive}
                      onChange={() => {
                        // Toggle behavior: if same category is clicked, deselect it
                        if (isActive) {
                          onCategoryChange?.("");
                        } else {
                          onCategoryChange?.(category.id);
                        }
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ease-in-out
                        ${
                          isActive
                            ? "border-black bg-white"
                            : "border-black group-hover:border-black bg-white"
                        }
                      `}
                    >
                      {isActive && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-normal text-black">
                    {formatCategoryName(
                      category.name || category.title || category.id
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Filter Sections */}
      <div className="space-y-8">
        {filters.map((filterGroup, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-normal text-black">
              {filterGroup.name}
            </h3>
            <div className="space-y-4">
              {filterGroup.options.map((option) => {
                const isActive = activeFilters[filterGroup.id] === option.value;
                return (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name={filterGroup.id}
                        value={option.value}
                        checked={activeFilters[filterGroup.id] === option.value}
                        onChange={() =>
                          onFilterChange(filterGroup.id, option.value)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ease-in-out
                          ${
                            isActive
                              ? "border-black bg-white"
                              : "border-black group-hover:border-black bg-white"
                          }
                        `}
                      >
                        {isActive && (
                          <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-normal text-black">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
