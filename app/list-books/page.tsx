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
  }
}

export default async function ListBooksPage({ searchParams }: ListBooksProps) {
  const { categoryId, userId, search, page, searchType } = await searchParams
  const key = (categoryId || "") + (userId || "") + (search || "") + (page || "") + (searchType || "")
  return (<Suspense key={key} fallback={<BookCreateLoading />}>
    <ListBooks props={{
      categoryId: categoryId,
      userId: userId,
      search: search,
      pageParam: page,
      searchType: searchType
    }}
    />
  </Suspense>)
}

