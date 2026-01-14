import { Skeleton } from "./ui/skeleton";

export default function BookCreateLoading() {
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="w-full">
      {/* Tabs skeleton */}
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Grid of book skeletons */}
      <div className="flex flex-wrap gap-4">
        {placeholders.map((_, idx) => (
          <div key={idx} className="flex flex-col w-[300px]">
            <Skeleton className="h-[150px] mb-3 w-full" />
            <div className="mb-3">
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-6 flex justify-center">
        <Skeleton className="h-8 w-40" />
      </div>
    </div>
  )

}