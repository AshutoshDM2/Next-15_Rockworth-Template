import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-8 px-4">
      <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
        No results found
      </h3>
      <p className="text-gray-500 text-sm sm:text-base">
        Try searching with different keywords
      </p>
    </div>
  );
}
