import { auth } from "@/auth";
import { headers } from "next/headers";
import { ListBooksProps } from "./page";
import prisma from "@/lib/prisma";
import BookPage from "@/components/book-page";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BORROW_STATUS } from "@/lib/constants";
import { getBookInfoFromLib } from "@/lib/utils-search";
export type BookWithCategoryAndUser = any

export default async function ListBooks({ searchParams }: ListBooksProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const params = await searchParams;
  const categoryId = params?.categoryId;
  const userId = params?.userId;
  const search = params?.search;

  console.log('ListBooks', categoryId, userId, search)

  const pageParam = params?.page;
  let page = Number(pageParam);
  if (!Number.isFinite(page) || page < 1) page = 1;
  console.log('page', page)
  const COUNT_ITEMS_PER_PAGE = 20
  const skip = (page - 1) * COUNT_ITEMS_PER_PAGE;
  console.log('skip', skip)

  if (!session?.user) return (
    <div>Please connect</div>
  )
  const email = session.user.email

  let books: BookWithCategoryAndUser[] = []
  let total = 0
  if (categoryId) {
    console.log('list books of categoryId', userId)
    books = await prisma.book.findMany({
      where: {
        categoryId: parseInt(categoryId),
      },
      skip: skip,
      take: COUNT_ITEMS_PER_PAGE,
    });

    total = await prisma.book.count({
      where: {
        categoryId: parseInt(categoryId),
      },
    });
  } else if (userId) {
    console.log('list books of userId', userId)
    books = await prisma.book.findMany({
      where: {
        UserBook: {
          some: {
            userId: String(userId),
            deleted: false,
          }
        }
      },
      skip: skip,
      take: COUNT_ITEMS_PER_PAGE,
    });

    total = await prisma.book.count({
      where: {
        UserBook: {
          some: {
            userId: String(userId),
            deleted: false,
          }
        }
      },
    });
  } else if (search) {
    console.log('list books of search', search)
    const res = await getBookInfoFromLib(search, page, COUNT_ITEMS_PER_PAGE);
    console.log('res from getBookInfoFromLib', res)
    books = res.booksFound
    total = res.numFound
    console.log('books found from search', search, books.length)

  }

  const myBooks = await prisma.userBook.findMany({
    include: {
      user: true,
      book: true,
    },
    where: {
      user: {
        email: email,
      },
      deleted: false,
    }
  })

  const myPurchases: any = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId: session?.user?.id,
      status:
        { in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const categories = await prisma.category.findMany();
  const numberOfPages = Math.ceil(total / COUNT_ITEMS_PER_PAGE);
  console.log('numberOfPages', numberOfPages)
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

  return (<>

    <div className="flex flex-wrap gap-4">
      {books?.map((book: any) => (
        <BookPage key={book.id} book={book} myBooks={myBooks} myPurchases={myPurchases} categories={categories} email={email} displayLinkToDetail={true} />
      ))}
    </div>
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={buildHref(page - 1)} />
          </PaginationItem>
        )}

        {paginationRange.map((item, idx) => {
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
    </Pagination>
  </>
  )
}

