export const PRODUCT_SPACE_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  SEARCH_DEBOUNCE_MS: 300,
  MOBILE_BREAKPOINT: 1024,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
} as const;

export const FILTER_TYPES = {
  CATEGORY: "category",
  VARIANT: "variant",
  SEARCH: "search",
  CUSTOM: "custom",
} as const;

export const UI_STATES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  EMPTY: "empty",
} as const;

export function formatCategoryName(name: string) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
