import { auth } from "@/auth";
import ListSalesOrPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";
import prisma from "@/lib/prisma";

export type BorrowWithBook = any

export default async function Sellings({searchParams}: any) {
  const session = await auth()

  if (!session?.user) return (
    <div>Please connect</div>
  )
    const user = session.user

  console.log('user retrieved from oauth', (JSON.stringify(user)))
  const email = user.email

  console.log('ventes pour user ' + email)
  const params = await searchParams;

  console.log('searchParams' + JSON.stringify(params))


  // const { data: sales } = await supabase
  // .from("borrow")
  // .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
  // .neq("borrower_id", email)
  // .in("status", (!searchParams.status || searchParams.status === 'ongoing') ? 
  //   [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] : 
  //   [BORROW_STATUS.CANCELLED, BORROW_STATUS.REFUSED, BORROW_STATUS.CLOSED])
  // .order('created_at', { ascending: false })

  const sales = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId: { not: user.id },
    }
  })


  console.log('sales', JSON.stringify(sales))

  return <ListSalesOrPurchases sales={sales} isPurchase={false} />
 
}