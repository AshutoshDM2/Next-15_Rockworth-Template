"use client";

import Section from "@/common/Section/Section";
import { ProductHero } from "@/components/Products/ProductHero";
import { useBodyScrollLock } from "@/hooks/UseBodyScrollLock";
import { useMobileFilterManagement } from "@/hooks/UseMobileFilterManagement";
import { useProductFiltering } from "@/hooks/UseProductFiltering";
import { useProductSpaceState } from "@/hooks/UseProductSpaceState";
import type { ProductSpaceResponse } from "@/types/Products";
import { createProductSpaceHandlers } from "@/utils/ProductSpaceHandlers";
import { DesktopFilterSidebar } from "./components/DesktopFilterSidebar";
import { MobileFilterSidebar } from "./components/MobileFilterSidebar";
import { ProductSpaceContent } from "./components/ProductSpaceContent";

interface ProductSpacePageProps {
  productSpace: ProductSpaceResponse;
  imageMeta: string;
  initialCategorySlug?: string;
}

export function ProductSpacePage({
  productSpace,
  imageMeta,
  initialCategorySlug,
}: ProductSpacePageProps) {
  const {
    activeCategory,
    setActiveCategory,
    activeVariant,
    setActiveVariant,
    activeFilters,
    setActiveFilters,
    searchTerm,
    setSearchTerm,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    currentCategory,
  } = useProductSpaceState({ productSpace, initialCategorySlug });

  //* Custom hook for filtering logic
  const { filteredProducts, allVariants, allFilters } = useProductFiltering({
    currentCategory,
    activeVariant,
    activeFilters,
    searchTerm,
    productSpace,
  });

  //* Custom hooks for mobile filter management
  const { closeMobileFilter } = useMobileFilterManagement(
    isMobileFilterOpen,
    setIsMobileFilterOpen
  );

  //* Custom hook for body scroll lock
  useBodyScrollLock(isMobileFilterOpen);

  const {
    handleCategoryChange,
    handleVariantChange,
    handleFilterChange,
    handleSearchChange,
  } = createProductSpaceHandlers(
    productSpace,
    setActiveCategory,
    setActiveVariant,
    setActiveFilters,
    setSearchTerm
  );

  //* Get the category to use for filters and variants (use all categories when showing all products)
  const categoryForFilters = currentCategory || productSpace.categories[0];
  const variantsToShow = currentCategory
    ? categoryForFilters.variants
    : allVariants;
  const filtersToShow = currentCategory
    ? categoryForFilters.filters
    : allFilters;

  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        title={productSpace.title}
        description={productSpace.description}
        heroImage={productSpace.hero_image}
        imageMeta={imageMeta}
        activeCategory={activeCategory}
        onCategoryClick={() => setActiveCategory("")}
      />

      <Section>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Desktop Sidebar */}
          <DesktopFilterSidebar
            filters={filtersToShow}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            activeFilters={activeFilters}
            categories={productSpace.categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            variants={variantsToShow}
            activeVariant={activeVariant}
            onVariantChange={handleVariantChange}
          />

          {/* Mobile Filter Sidebar */}
          <MobileFilterSidebar
            isOpen={isMobileFilterOpen}
            onClick={() => setIsMobileFilterOpen(true)}
            onClose={closeMobileFilter}
            filters={filtersToShow}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            activeFilters={activeFilters}
            categories={productSpace.categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            variants={variantsToShow}
            activeVariant={activeVariant}
            onVariantChange={handleVariantChange}
          />

          {/* Vertical Separator - Desktop Only */}
          <div className="hidden lg:block w-px bg-gray-200"></div>

          {/* Main Content */}
          <ProductSpaceContent
            variants={variantsToShow}
            activeVariant={activeVariant}
            onVariantChange={handleVariantChange}
            filteredProducts={filteredProducts}
            imageMeta={imageMeta}
          />
        </div>
      </Section>
    </div>
  );
}
