import PurchaseForm from "@/components/create-purchase-form"
import PurchaseFormLoading from "@/components/purchase-form-loading"
import prisma from "@/lib/prisma";
import { Suspense } from "react";

const Borrow = async ({ searchParams }: { searchParams: any }) => {

  const searchParamsList = await searchParams;
  const userBookId = searchParamsList.userBookId
  const userBook = await prisma.userBook.findUnique({
    where: { id: parseInt(userBookId) },
    include: { book: true, user: true },
  });
  return (
    <PurchaseForm userBook={userBook} />
  )
}


export default function Page({ searchParams }: { searchParams: any }) {
  return (
    <Suspense fallback={<PurchaseFormLoading />}>
      <Borrow searchParams={searchParams} />
    </Suspense>
  )
}