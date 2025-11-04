/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProductFilters } from "@/components/Products/ProductFilters";
import { Button } from "@/components/ui/Button/Button";
import { Filter, X } from "lucide-react";
import { useEffect } from "react";

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  filters: any[];
  onFilterChange: (filterId: string, value: string) => void;
  onSearchChange: (search: string) => void;
  activeFilters: Record<string, string>;
  categories: any[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  variants: string[];
  activeVariant: string;
  onVariantChange: (variant: string) => void;
}

export function MobileFilterSidebar({
  isOpen,
  onClose,
  onClick,
  filters,
  onFilterChange,
  onSearchChange,
  activeFilters,
  categories,
  activeCategory,
  onCategoryChange,
  variants,
  activeVariant,
  onVariantChange,
}: MobileFilterSidebarProps) {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  const clearAllFilters = () => {
    Object.keys(activeFilters).forEach((key) => {
      onFilterChange(key, "");
    });
    onCategoryChange("");
    onVariantChange("");
  };

  return (
    <>
      {/* Floating Filter Button */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <Button
          onClick={onClick}
          size="lg"
          className="p-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 relative"
          aria-label="Open filters"
        >
          <Filter className="h-5 w-5" />
          {activeFilterCount > 0 && (
            <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
              {activeFilterCount}
            </div>
          )}
        </Button>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet Sidebar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white z-50 lg:hidden transition-transform duration-300 ease-out rounded-t-2xl shadow-2xl flex flex-col ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "85vh", maxHeight: "85vh" }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            {activeFilterCount > 0 && (
              <div className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full font-medium">
                {activeFilterCount} active
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content - This will expand to fill available space */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          <div className="space-y-6">
            <ProductFilters
              filters={filters}
              categories={categories}
              activeCategory={activeCategory}
              onFilterChange={onFilterChange}
              onSearchChange={onSearchChange}
              onCategoryChange={onCategoryChange}
              activeFilters={activeFilters}
              variants={variants}
              activeVariant={activeVariant}
              onVariantChange={onVariantChange}
            />
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="border-t border-gray-100 p-6 bg-white flex-shrink-0 sticky bottom-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex-1 border-primary text-primary hover:bg-primary/5 bg-transparent"
              disabled={activeFilterCount === 0}
            >
              Clear All
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
