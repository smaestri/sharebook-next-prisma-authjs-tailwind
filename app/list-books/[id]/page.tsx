import BookCreateLoading from "@/components/book-create-loading";
import { Suspense } from "react";
import DetailsBookPage from "./book-detail-page";

export default async function BookDetailPage({ params, searchParams }: any) {
    const theParams = await params;
    const theSearchedParams = await searchParams;
  return (<Suspense fallback={<BookCreateLoading />}>
    <DetailsBookPage params={theParams} searchParams={theSearchedParams} />
  </Suspense>)
}
