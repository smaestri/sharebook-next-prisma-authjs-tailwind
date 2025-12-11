import { auth } from "@/auth";
import { headers } from "next/headers";
import ListSalesOrPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";
import prisma from "@/lib/prisma";

export default async function PurchasesPage({ searchParams }: any) {
  const params = await searchParams;
  const statusParam = params?.status;
    console.log('statusParam', statusParam)

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session?.user) return (
    <div>Please connect</div>
  )
  const borrowerId = session.user.id

  console.log('statusParam', statusParam)
  const purchases: any = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId,
      status: !statusParam || statusParam === 'ongoing' ?
        { in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] } :
        { in: [BORROW_STATUS.CANCELLED, BORROW_STATUS.CLOSED, BORROW_STATUS.REFUSED] }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log('purchases', JSON.stringify(purchases))
  return <ListSalesOrPurchases sales={purchases} isPurchase={true} />

}