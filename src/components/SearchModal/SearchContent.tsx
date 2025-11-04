import { useSearch } from "@/contexts/SearchContext";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { SearchResults } from "./SearchResults";

interface SearchContentProps {
  showResults: boolean;
  onResultClick: () => void;
}

export function SearchContent({
  showResults,
  onResultClick,
}: SearchContentProps) {
  const { isLoading, error, results, total } = useSearch();

  return (
    <div className="flex-1 overflow-y-auto">
      {isLoading && <LoadingState />}

      {error && <ErrorState error={error} />}

      {showResults && !isLoading && !error && (
        <>
          {results.length > 0 ? (
            <SearchResults
              results={results}
              total={total}
              onResultClick={onResultClick}
            />
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
}
