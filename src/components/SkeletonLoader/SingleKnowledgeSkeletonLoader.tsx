export function BlogDetailSkeleton() {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Navigation Skeleton */}
          <div className="mb-8">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
  
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
  
            <div className="space-y-4 mb-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
  
            <div className="flex gap-6 mb-6">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
  
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
  
          {/* Featured Image Skeleton */}
          <div className="w-full aspect-video bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
  
          {/* Content Skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }