import Section from "@/common/Section/Section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Section>
      <div className="mb-8">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-64 mb-4" />

        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Skeleton className="h-4 w-16" />
          <span className="text-gray-400">{"/"}</span>
          <Skeleton className="h-4 w-20" />
          <span className="text-gray-400">{"/"}</span>
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Metadata Skeleton */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />{" "}
            {/* Icon placeholder */}
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />{" "}
            {/* Icon placeholder */}
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        {/* Location Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Image Gallery Skeletons */}
      <div className="grid gap-8">
        <Skeleton className="w-full aspect-video rounded-lg" />
        <Skeleton className="w-full aspect-video rounded-lg" />
        <Skeleton className="w-full aspect-video rounded-lg" />
      </div>
    </Section>
  );
}
