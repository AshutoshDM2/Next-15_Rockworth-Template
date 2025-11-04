import Section from "../../common/Section/Section";
import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => (
  <div className="w-full h-[300px] bg-gray-100 rounded-2xl animate-pulse shadow-inner">
    <Skeleton className="w-full h-2/3 bg-gray-200 rounded-t-2xl" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-4 bg-gray-300 rounded w-3/4" />
      <Skeleton className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export const SpacesLoader = () => {
  return (
    <div
      className="bg-white relative overflow-hidden"
      role="status"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50" />
      <Section className="relative z-10">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-medium text-black text-center lg:text-left px-4 sm:px-0">
            Solution Spaces
          </h2>

          {/* Mobile: 1 item */}
          <div className="block sm:hidden pt-6">
            <SkeletonCard />
          </div>

          {/* Tablet: 2 items */}
          <div className="hidden sm:flex lg:hidden gap-6 pt-6">
            {[...Array(2)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

          {/* Desktop: 3 items */}
          <div className="hidden lg:flex gap-6 pt-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
