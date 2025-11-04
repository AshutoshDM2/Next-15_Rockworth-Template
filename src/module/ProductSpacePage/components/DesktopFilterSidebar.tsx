/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductFilters } from "@/components/Products/ProductFilters";

interface DesktopFilterSidebarProps {
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

export function DesktopFilterSidebar({
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
}: DesktopFilterSidebarProps) {
  return (
    <div className="hidden lg:block w-48 space-y-4">
      <div className="space-y-8">
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
  );
}
