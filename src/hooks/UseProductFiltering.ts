/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IProduct } from "@/types/Products";
import { useMemo } from "react";

interface UseProductFilteringProps {
  currentCategory: any;
  activeVariant: string; // "" or undefined means no variant selected
  activeFilters: Record<string, string>;
  searchTerm: string;
  productSpace?: any; // Add productSpace to access all categories when currentCategory is null
}

export function useProductFiltering({
  currentCategory,
  activeVariant,
  activeFilters,
  searchTerm,
  productSpace,
}: UseProductFilteringProps) {
  const filteredProducts = useMemo(() => {
    // If no current category, show all products from all categories
    if (!currentCategory) {
      if (!productSpace) return [];

      let allProducts: IProduct[] = [];

      // Collect all products from all categories
      productSpace.categories.forEach((category: any) => {
        allProducts = [...allProducts, ...category.products];
      });

      // Apply variant filter if selected
      if (activeVariant && activeVariant.trim() !== "") {
        allProducts = allProducts.filter(
          (product: any) => product.variant === activeVariant
        );
      }

      // Apply active filters
      Object.entries(activeFilters).forEach(([filterId, filterValue]) => {
        if (filterValue) {
          allProducts = allProducts.filter((product: any) => {
            const productValue = product[filterId as keyof IProduct];
            return productValue === filterValue;
          });
        }
      });

      // Apply search filter if provided
      if (searchTerm) {
        allProducts = allProducts.filter(
          (product: any) =>
            product.site_product_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      // Keep only first variant of each unique site_product_name
      const uniqueProductMap = new Map<string, IProduct>();
      allProducts.forEach((product: IProduct) => {
        if (!uniqueProductMap.has(product.site_product_name)) {
          uniqueProductMap.set(product.site_product_name, product);
        }
      });

      return Array.from(uniqueProductMap.values());
    }

    // Original filtering logic for specific category
    let products = currentCategory.products;

    // ✅ Only filter by variant if user has selected a real variant
    if (activeVariant && activeVariant.trim() !== "") {
      products = products.filter(
        (product: any) => product.variant === activeVariant
      );
    }

    // Filter by active filters
    Object.entries(activeFilters).forEach(([filterId, filterValue]) => {
      if (filterValue) {
        products = products.filter((product: any) => {
          const productValue = product[filterId as keyof IProduct];
          return productValue === filterValue;
        });
      }
    });

    // Filter by search term
    if (searchTerm) {
      products = products.filter(
        (product: any) =>
          product.site_product_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ✅ Keep only first variant of each unique site_product_name
    const uniqueProductMap = new Map<string, IProduct>();

    products.forEach((product: IProduct) => {
      if (!uniqueProductMap.has(product.site_product_name)) {
        uniqueProductMap.set(product.site_product_name, product);
      }
    });

    return Array.from(uniqueProductMap.values());
  }, [currentCategory, activeVariant, activeFilters, searchTerm, productSpace]);

  // Get all available variants from all categories when showing all products
  const allVariants = useMemo(() => {
    if (!productSpace) return [];

    const variantSet = new Set<string>();

    productSpace.categories.forEach((category: any) => {
      if (category.variants) {
        category.variants.forEach((variant: string) => {
          variantSet.add(variant);
        });
      }
    });

    return Array.from(variantSet);
  }, [productSpace]);

  // Get all available filters from all categories when showing all products
  const allFilters = useMemo(() => {
    if (!productSpace) return [];

    const filterMap = new Map<string, any>();

    productSpace.categories.forEach((category: any) => {
      if (category.filters) {
        category.filters.forEach((filterGroup: any) => {
          if (!filterMap.has(filterGroup.id)) {
            filterMap.set(filterGroup.id, {
              ...filterGroup,
              options: [...filterGroup.options],
            });
          } else {
            // Merge options from different categories
            const existingFilter = filterMap.get(filterGroup.id);
            const existingOptionValues = new Set(
              existingFilter.options.map((opt: any) => opt.value)
            );

            filterGroup.options.forEach((option: any) => {
              if (!existingOptionValues.has(option.value)) {
                existingFilter.options.push(option);
              }
            });
          }
        });
      }
    });

    return Array.from(filterMap.values());
  }, [productSpace]);

  return {
    filteredProducts,
    allVariants,
    allFilters,
  };
}
