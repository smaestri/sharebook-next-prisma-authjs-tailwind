import { auth } from "@/auth";
import PurchaseClient from "./purchase-client";
import prisma from "@/lib/prisma";
import { Borrow } from "@/app/generated/prisma";

export default async function PurchasePage({ sale, isPurchase }: { sale: Borrow, isPurchase: boolean }) {
  const session = await auth()

  if (!session?.user) return (
    <div>Please connect</div>
  )
  let buyerName
  if (!isPurchase) {
    const buyer = await prisma.user.findFirst({
      where: {
        id: sale.borrowerId
      },
    })
    buyerName = buyer?.name
  }

  console.log('buyerName', buyerName)

  console.log('sale', sale)

  return (<PurchaseClient sale={sale} isPurchase={isPurchase} buyerName={buyerName} isItem={true} />)

}
