/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearch } from "@/contexts/SearchContext";
import { ChevronDown } from "lucide-react";
import { SearchResultItem } from "./SearchResultItem";

interface SearchResultsProps {
  results: any[];
  total: number;
  onResultClick: () => void;
}

export function SearchResults({
  results,
  total,
  onResultClick,
}: SearchResultsProps) {
  const { hasMore, isLoading, loadMore } = useSearch();

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      loadMore();
    }
  };

  return (
    <div className="p-3 sm:p-4 max-h-96">
      <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3">
        Search Results ({total} total)
      </h3>

      <div className="space-y-1 sm:space-y-2">
        {results.map((result, index) => (
          <SearchResultItem
            key={result.id ?? index}
            result={result}
            index={index}
            onResultClick={onResultClick}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex items-center justify-center w-full p-3 text-orange-500 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mr-2" />
                Loading more...
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Load more results
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
