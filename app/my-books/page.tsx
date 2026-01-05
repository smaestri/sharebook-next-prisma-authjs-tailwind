import BookCreateLoading from "@/components/book-create-loading";
import { Suspense } from "react";
import MyBooks from "./my-books";

export default async function MyBooksPage() {
  return (<Suspense fallback={<BookCreateLoading />}>
    <MyBooks />
  </Suspense>)
}

