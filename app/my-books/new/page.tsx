import { Suspense } from "react";
import BookCreateLoading from "@/components/book-create-loading";
import CreateBook from "./create-book";

export default async function CreateBookPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const params = await searchParams;
  const myParam = params?.userBookId;
  console.log('myParam', params)
  return (<>
    <Suspense fallback={<BookCreateLoading />}>
      <CreateBook bookId={myParam} />
    </Suspense>
  </>
  )
}
