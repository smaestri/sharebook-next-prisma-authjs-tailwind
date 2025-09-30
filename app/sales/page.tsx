import { auth } from "@/auth";
import ListSalesOrPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";
import prisma from "@/lib/prisma";


export default async function Sellings({ searchParams }: any) {
  const params = await searchParams;
  const statusParam = params?.status;
  const session = await auth()
  if (!session?.user) return (
    <div>Please connect</div>
  )
  const user = session.user

  console.log('searchParams' + JSON.stringify(params))


  const sales: any = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId: { not: user.id },
      status: !statusParam || statusParam === 'ongoing' ?
        { in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] } :
        { in: [BORROW_STATUS.CANCELLED, BORROW_STATUS.CLOSED, BORROW_STATUS.REFUSED] }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log('sales', JSON.stringify(sales))

  return <ListSalesOrPurchases sales={sales} isPurchase={false} />

}