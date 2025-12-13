import PurchaseClient from "./purchase-client";
import prisma from "@/lib/prisma";
import { Borrow } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function PurchasePage({ sale, isPurchase }: { sale: Borrow, isPurchase: boolean }) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
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
