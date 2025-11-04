import Section from "@/common/Section/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

interface ProductSpaceSkeletonProps {
  showHero?: boolean;
  productCount?: number;
}

export function ProductSpaceSkeleton({
  showHero = true,
  productCount = 12,
}: ProductSpaceSkeletonProps) {
  return (
    <Section className="lg:py-0">
      {/* Hero Section Skeleton */}
      {showHero && (
        <div className="relative bg-white">
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 my-2 w-full">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-1 w-32" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-2 w-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              {/* Right Image */}
              <div className="relative col-span-2">
                <Skeleton className=" h-64 lg:h-[350px]" />
              </div>
            </div>
          </>
        </div>
      )}

      {/* Main Content Section with Left Filter and Right Products */}
      <div className="bg-white">
        <div className="container mx-auto px-2 py-8">
          <div className="flex gap-8">
            {/* Left Filter Sidebar - 30% width */}
            <div className="w-full lg:w-[20%] space-y-6 hidden lg:block">
              {/* Search Bar */}
              <div className="space-y-2">
                <div className="relative">
                  <Skeleton className="h-12 w-full rounded-md border" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-20" /> {/* "Category" label */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" /> {/* "Price Range" label */}
                <div className="space-y-3">
                  <Skeleton className="h-2 w-full rounded-full" />{" "}
                  {/* Price slider */}
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-16" /> {/* "Brand" label */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Products Section - 70% width */}
            <div className="w-full lg:w-[80%] space-y-6">
              {/* Top Bar with Results and Sort */}
              <div className="flex justify-start gap-4 pb-4 border-b">
                {/* <div className="flex items-center justify-between gap-20">
                  <Skeleton className="h-10 w-32 lg:w-48" />
                  <Skeleton className="h-10 w-32 lg:w-48 block lg:hidden" />
                </div> */}
                <div className="hidden lg:flex flex-wrap gap-3">
                  <Skeleton className="h-10 w-28 rounded-full" />
                  <Skeleton className="h-10 w-32 rounded-full" />
                  <Skeleton className="h-10 w-28 rounded-full" />
                  <Skeleton className="h-10 w-32 rounded-full" />
                  <Skeleton className="h-10 w-32 rounded-full" />
                  <Skeleton className="h-10 w-32 rounded-full" />
                  <Skeleton className="h-10 w-28 rounded-full" />
                </div>
              </div>

              {/* Products Grid - 4 columns */}
              {productCount > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: productCount }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md overflow-hidden transition-shadow"
                    >
                      {/* Product Image Skeleton */}
                      <div className="relative bg-gray-100 rounded-xl">
                        <Skeleton className="w-full h-56" />
                        {/* Placeholder brand text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Skeleton className="h-8 w-32" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-3 text-center">
                        <Skeleton className="h-5 w-full" /> {/* Product name */}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center pt-8">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
