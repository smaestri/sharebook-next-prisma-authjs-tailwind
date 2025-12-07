import BookCreateLoading from "@/components/book-create-loading";
import { Suspense } from "react";
import ListBooks from "./list-books";

export type BookWithCategory = any

export interface ListBooksProps{
  searchParams: Promise<{
      categoryId?: string,
      userId?: string,
      page?: number,
  }>
}

export default async function ListBooksPage({ searchParams }: ListBooksProps) {
  return (<Suspense fallback={<BookCreateLoading />}>
    <ListBooks searchParams={searchParams} />
  </Suspense>)
}

