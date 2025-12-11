import { Suspense } from "react";
import BookCreateLoading from "@/components/book-create-loading";
import PurchasesPage from "./PurchasesPage";

export default async function Purchases() {
  return (<>
    <Suspense fallback={<BookCreateLoading />}>
      <PurchasesPage />
    </Suspense>
  </>
  )
}
