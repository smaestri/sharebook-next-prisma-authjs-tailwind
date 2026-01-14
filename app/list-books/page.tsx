import BookCreateLoading from "@/components/book-create-loading";
import { Suspense } from "react";
import ListBooks from "./list-books";

export type BookWithCategory = any

export interface ListBooksProps {
  searchParams: {
    categoryId?: string,
    userId?: string,
    search?: string
    page?: number,
    searchType?: string
    countTitle?: number
  }
}

export default async function ListBooksPage({ searchParams }: ListBooksProps) {
  const { categoryId, userId, search, page, searchType, countTitle } = await searchParams
  const key = (categoryId || "") + (userId || "") + (search || "") + (page || "") + (searchType || "") + (countTitle || "")
  return (<Suspense key={key} fallback={<BookCreateLoading />}>
    <ListBooks
      categoryId={categoryId}
      userId={userId}
      search={search}
      pageParam={page}
      searchType={searchType}
      countTitle={countTitle}
    />
  </Suspense>)
}

