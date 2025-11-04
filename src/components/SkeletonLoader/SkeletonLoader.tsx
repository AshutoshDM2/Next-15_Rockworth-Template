import Section from "../../common/Section/Section";
import { Skeleton } from "../ui/skeleton";

export const BlogSkeletonLoader = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <Section className="lg:py-0 py-0">
        <div className="flex flex-col items-start mb-16">
          <Skeleton className="h-6 w-40 bg-gray-300 mb-4 mt-10" />
          <Skeleton className="h-6 w-20 bg-gray-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <Skeleton className="h-64 w-full bg-gray-300" />
              <div className="p-6">
                <Skeleton className="h-7 w-full bg-gray-300 mb-3" />
                <Skeleton className="h-4 w-full bg-gray-300 mb-2" />
                <Skeleton className="h-4 w-full bg-gray-300 mb-2" />
                <Skeleton className="h-4 w-2/3 bg-gray-300 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24 bg-gray-300" />
                  <Skeleton className="h-5 w-24 bg-gray-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
