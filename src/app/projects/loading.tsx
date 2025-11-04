import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      {/* Hero Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 lg:mb-16">
        <div className="flex flex-col justify-center">
          {/* Title Skeleton */}
          <Skeleton className="h-16 w-3/4 mb-4" />
          <Skeleton className="hidden lg:flex  h-16 w-1/2 mb-8" />

          {/* Button Skeleton */}
          <Skeleton className="hidden lg:flex  h-10 w-40 rounded-md lg:mb-8" />

          {/* Description Skeleton */}
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />

          {/* Breadcrumbs Skeleton */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-400">{"/"}</span>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        {/* Hero Image Skeleton */}
        <Skeleton className="w-full aspect-[4/3] rounded-lg hidden lg:block" />
      </div>

      {/* Filter Buttons Skeleton */}
      <div className="flex space-x-4 mb-6 lg:mb-12">
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      {/* Project Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden">
            <Skeleton className="w-full aspect-[4/3] rounded-lg mb-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
