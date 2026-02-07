import { Skeleton } from "./ui/skeleton";

export default function PurchaseFormLoading() {
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 w-full max-w-md">
          {/* Book title skeleton */}
          <div className="max-w-full">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Date section skeleton */}
          <div>
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-10 w-48" />
          </div>

          {/* Message section skeleton */}
          <div>
            <Skeleton className="h-4 w-64 mb-2" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Button skeleton */}
          <div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
