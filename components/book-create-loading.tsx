import { Skeleton } from "./ui/skeleton";

export default function BookCreateLoading() {
    return (
        <div className="flex max-w-md">
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-5 rounded-lg" />
                <Skeleton className="h-5 rounded-lg" />
                <Skeleton className="h-5 rounded-lg" />
            </div>
        </div>
    )

}