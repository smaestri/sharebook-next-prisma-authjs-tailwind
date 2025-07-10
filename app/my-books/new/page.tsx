import { Suspense } from "react";
import BookCreateLoading from "@/components/book-create-loading";
import CreateBook from "./create-book";

export default async function CreateBookPage() {
 
  return (<>
    <Suspense fallback={<BookCreateLoading />}>
      <CreateBook />
    </Suspense>
  </>
  )
}
