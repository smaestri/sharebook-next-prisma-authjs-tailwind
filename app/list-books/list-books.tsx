import { auth } from "@/auth";
import { headers } from "next/headers";
import { ListBooksProps } from "./page";
import prisma from "@/lib/prisma";
import BookPage from "@/components/book-page";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
export type BookWithCategoryAndUser = any

export default async function ListBooks({ searchParams }: ListBooksProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const params = await searchParams;
  const categoryId = params?.categoryId;
  const userId = params?.userId;

  console.log('ListBooks', categoryId, userId)

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

  const categories = await prisma.category.findMany();
  const numberOfPages = Math.ceil(total / COUNT_ITEMS_PER_PAGE);
  // helper to build links preserving categoryId
  const buildHref = (p: number) => {
    const qs = new URLSearchParams();
    if (categoryId) qs.set("categoryId", String(categoryId));
    qs.set("page", String(p));
    return `/list-books?${qs.toString()}`;
  };

  const pageNumbers: number[] = [];
  for (let i = 1; i <= numberOfPages; i++) pageNumbers.push(i);

  return (<>

    <div className="flex flex-wrap gap-4">
      {books?.map((book: any) => (
        <BookPage key={book.id} book={book} myBooks={myBooks} categories={categories} email={email} displayLinkToDetail={true} />
      ))}
    </div>
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={buildHref(page - 1)} />
          </PaginationItem>
        )}

        {pageNumbers.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p == page} href={buildHref(p)} aria-current={p === page ? "page" : undefined}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

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

