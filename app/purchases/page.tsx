import { auth } from "@/auth";
import ListSalesOrPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Borrow } from "../generated/prisma";

export type BorrowWithBook = any

export default async function Purchases({ searchParams }: any) {
  const session = await auth()

  if (!session?.user) return (
    <div>Please connect</div>
  )
  const borrowerId = session.user.id

  const purchases: BorrowWithBook[] = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId,
    }
  })
  // .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
  // .eq("borrower_id", email)
  // .in("status", !searchParams.status || searchParams.status === 'ongoing' ? 
  //   [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] : 
  //   [BORROW_STATUS.CANCELLED, BORROW_STATUS.CLOSED, BORROW_STATUS.REFUSED])
  // .order('created_at', { ascending: false })

  console.log('purchases', JSON.stringify(purchases))
  return <ListSalesOrPurchases sales={purchases} isPurchase={true} />

}