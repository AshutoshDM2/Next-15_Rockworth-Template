export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <span className="ml-3 text-gray-500 text-sm sm:text-base">
        Searching...
      </span>
    </div>
  );
}
