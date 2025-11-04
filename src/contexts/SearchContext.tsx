"use client";

import { getSearchResults } from "@/lib/SearchApi";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// API Response interfaces
interface ApiSearchResult {
  variant: string;
  site_category: string;
  site_product_name: string;
  id?: string;
  price?: string;
  product_image?: string;
  description?: string;
  slug: string;
}

// Transformed search result for UI
interface SearchResult {
  id: string;
  title: string;
  category: string;
  variant: string;
  price?: string;
  product_image?: string;
  description?: string;
  slug: string;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  pageNo: number;
  itemPerPage: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  imageUrl: string;
}

interface SearchContextType extends SearchState {
  setQuery: (query: string) => void;
  search: (searchTerm: string, page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  clearSearch: () => void;
  resetSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);
const DEFAULT_COLUMNS = "variant,site_category,site_product_name";
const DEFAULT_ITEMS_PER_PAGE = 10;

// Transform API response to UI format
const transformApiResult = (
  apiResult: ApiSearchResult,
  index: number
): SearchResult => ({
  id: apiResult.variant || `result-${index}`,
  title: apiResult.site_product_name || "Untitled Product",
  category: apiResult.site_category || "Uncategorized",
  variant: apiResult.variant || "",
  product_image: apiResult.product_image,
  description: `${apiResult.variant} - ${apiResult.site_category}`,
  slug: apiResult.slug,
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    error: null,
    pageNo: 1,
    itemPerPage: DEFAULT_ITEMS_PER_PAGE,
    total: 0,
    totalPages: 0,
    hasMore: false,
    imageUrl: "",
  });

  const setQuery = useCallback((query: string) => {
    setSearchState((prev) => ({ ...prev, query }));
  }, []);

  const search = useCallback(async (searchTerm: string, page = 1) => {
    if (!searchTerm.trim()) {
      setSearchState((prev) => ({
        ...prev,
        results: [],
        total: 0,
        totalPages: 0,
        hasMore: false,
        error: null,
      }));
      return;
    }

    setSearchState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      pageNo: page,
    }));

    try {
      const { data, meta } = await getSearchResults({
        searchTerm: searchTerm.trim(),
        pageNo: page,
        itemPerPage: DEFAULT_ITEMS_PER_PAGE,
        columns: DEFAULT_COLUMNS,
      });

      // Transform API results to UI format
      const transformedResults = data.map(transformApiResult);

      setSearchState((prev) => ({
        ...prev,
        results:
          page === 1
            ? transformedResults
            : [...prev.results, ...transformedResults],
        total: data?.total || data.length,
        totalPages:
          data?.totalPages ||
          Math.ceil((data?.total || data.length) / DEFAULT_ITEMS_PER_PAGE),
        hasMore: page < (data?.totalPages || 1),
        imageUrl: meta,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Failed to fetch search results", error);
      setSearchState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while searching",
        results: page === 1 ? [] : prev.results,
      }));
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (searchState.hasMore && !searchState.isLoading && searchState.query) {
      await search(searchState.query, searchState.pageNo + 1);
    }
  }, [
    search,
    searchState.hasMore,
    searchState.isLoading,
    searchState.query,
    searchState.pageNo,
  ]);

  const clearSearch = useCallback(() => {
    setSearchState((prev) => ({
      ...prev,
      results: [],
      total: 0,
      totalPages: 0,
      hasMore: false,
      error: null,
    }));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchState({
      query: "",
      results: [],
      isLoading: false,
      error: null,
      pageNo: 1,
      itemPerPage: DEFAULT_ITEMS_PER_PAGE,
      total: 0,
      totalPages: 0,
      hasMore: false,
      imageUrl: "",
    });
  }, []);

  const contextValue: SearchContextType = {
    ...searchState,
    setQuery,
    search,
    loadMore,
    clearSearch,
    resetSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
