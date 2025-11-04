import Section from "@/common/Section/Section";
import { Skeleton } from "@/components/ui/skeleton";

interface GridSkeletonLoadingProps {
  itemsCount?: number;
  isLoading?: boolean;
  message?: string;
}

export default function GridSkeletonLoading({
  itemsCount = 9,
  isLoading = true,
}: GridSkeletonLoadingProps) {
  return (
    <Section className="lg:py-6">
      {/* Loading Message */}
      {/* {isLoading && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-color"></div>
            <span className="text-gray-600 text-sm">{message}</span>
          </div>
        </div>
      )} */}

      {/* Project Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 p-2">
        {Array.from({ length: itemsCount }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <Skeleton className="w-full aspect-[4/3] rounded-lg" />
            {/* Additional skeleton elements for better visual feedback */}
          </div>
        ))}
      </div>

      {/* Loading Progress Indicator */}
      {isLoading && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
            <span>Loading {itemsCount} projects...</span>
          </div>
        </div>
      )}
    </Section>
  );
}
