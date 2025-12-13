import PurchaseForm from "@/components/create-purchase-form"
import prisma from "@/lib/prisma";

const Borrow = async ({ searchParams }: { searchParams: any }) => {

  const searchParamsList = await searchParams;
  const userBookId = searchParamsList.userBookId
  console.log('userBookId', userBookId)
  const userBook = await prisma.userBook.findUnique({
    where: { id: parseInt(userBookId) },
    include: { book: true, user: true },
  });

  console.log('userBook in purchase page', userBook)

  return (
    <PurchaseForm userBook={userBook} />
  )
}


export default Borrow;