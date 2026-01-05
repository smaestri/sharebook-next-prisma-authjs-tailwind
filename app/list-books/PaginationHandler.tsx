import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { COUNT_ITEMS_PER_PAGE } from "./list-books";

export default function PaginationHandler({ page, total, categoryId, userId, search }: any) {
  const numberOfPages = Math.ceil(total / COUNT_ITEMS_PER_PAGE);

      // helper to build links preserving categoryId
      const buildHref = (p: number) => {
        const qs = new URLSearchParams();
        if (categoryId) qs.set("categoryId", String(categoryId));
        if (userId) qs.set("userId", String(userId));
        if (search) qs.set("search", String(search));
        qs.set("page", String(p));
        return `/list-books?${qs.toString()}`;
      };
    
    // Helper: returns an array of number | 'left-ellipsis' | 'right-ellipsis'
    function getPaginationRange(totalPages: number, current: number, siblingCount = 1, boundaryCount = 1) {
        if (totalPages <= 0) return [];
        const range: (number | string)[] = [];
        const left = Math.max(current - siblingCount, 1);
        const right = Math.min(current + siblingCount, totalPages);

        // left boundary
        for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
            range.push(i);
        }

        // left ellipsis
        if (left > boundaryCount + 1) {
            range.push("left-ellipsis");
        } else {
            for (let i = boundaryCount + 1; i < left; i++) {
                range.push(i);
            }
        }

        // middle (siblings + current)
        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        // right ellipsis
        if (right < totalPages - boundaryCount) {
            range.push("right-ellipsis");
        } else {
            for (let i = right + 1; i <= Math.max(totalPages - boundaryCount, right); i++) {
                range.push(i);
            }
        }

        // right boundary
        for (let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1); i <= totalPages; i++) {
            range.push(i);
        }

        // remove duplicates while preserving order
        return Array.from(new Set(range));
    }



    // compute pagination items (tweak siblingCount/boundaryCount if needed)

    const paginationRange = getPaginationRange(numberOfPages, page, 1, 1);


    return (<Pagination>
        <PaginationContent>
            {page > 1 && (
                <PaginationItem>
                    <PaginationPrevious href={buildHref(page - 1)} />
                </PaginationItem>
            )}

            {paginationRange.map((item: any, idx: any) => {
                if (typeof item === "string") {
                    // render ellipsis
                    return (
                        <PaginationItem key={`ellipsis-${idx}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    );
                } else {
                    const p = item as number;
                    return (
                        <PaginationItem key={p}>
                            <PaginationLink isActive={p == page} href={buildHref(p)} aria-current={p === page ? "page" : undefined}>
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            })}

            {page < numberOfPages && (
                <PaginationItem>
                    <PaginationNext href={buildHref(page + 1)} />
                </PaginationItem>
            )}
        </PaginationContent>
    </Pagination>)
}