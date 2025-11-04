import type { ProductSpaceResponse } from "@/types/Products";

export function createProductSpaceHandlers(
  productSpace: ProductSpaceResponse,
  setActiveCategory: (category: string) => void,
  setActiveVariant: (variant: string) => void,
  setActiveFilters: (
    filters:
      | Record<string, string>
      | ((prev: Record<string, string>) => Record<string, string>)
  ) => void,
  setSearchTerm: (term: string) => void
) {
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveVariant("");
    setActiveFilters({});
    setSearchTerm("");

    // Don't automatically set first variant - let user choose
    // This prevents the double-click behavior issue

    // Update URL without page reload
    const newUrl = categoryId
      ? `/products/${productSpace.slug}/${categoryId.toLowerCase()}`
      : `/products/${productSpace.slug}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleVariantChange = (variant: string) => {
    setActiveVariant(variant);
    setActiveFilters({});
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev: { [x: string]: string }) => ({
      ...prev,
      [filterId]: prev[filterId] === value ? "" : value,
    }));
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  return {
    handleCategoryChange,
    handleVariantChange,
    handleFilterChange,
    handleSearchChange,
  };
}
