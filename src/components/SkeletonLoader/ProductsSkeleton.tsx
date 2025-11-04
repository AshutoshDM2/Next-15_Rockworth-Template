import Section from "@/common/Section/Section";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductsSkeletonProps {
  categoryCount?: number;
}

export default function ProductsSkeleton({
  categoryCount = 5,
}: ProductsSkeletonProps) {
  // Dynamic grid classes based on category count
  const getGridClass = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      case 5:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      case 6:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  return (
    <Section>
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-80" />
      </div>

      {/* Dynamic Product Categories Grid Skeleton */}
      <div className={`grid ${getGridClass(categoryCount)} gap-6 mb-16`}>
        {Array.from({ length: categoryCount }).map((_, index) => (
          <ProductCategoryCardSkeleton key={index} />
        ))}
      </div>
    </Section>
  );
}

function ProductCategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
      {/* Large Hero Image Skeleton - matches your layout */}
      <Skeleton className="w-full h-32" />

      {/* Category Content */}
      <div className="p-6">
        {/* Category Title */}
        <Skeleton className="h-6 w-auto mb-6" />

        {/* Subcategory List */}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-60" />
          ))}
        </div>
      </div>
    </div>
  );
}
