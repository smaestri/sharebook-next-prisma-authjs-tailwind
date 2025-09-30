import { auth } from "@/auth";
import Messages from "@/components/Messages";
import PurchaseClient from "@/components/purchase-client";
import prisma from "@/lib/prisma";

export type BorrowDate = {
  createdDate: string | undefined
  validatedDate: string | undefined
  closeDate: string | undefined
}
export default async function PurchasePage({ searchParams }: any) {
  const session = await auth()
  const params = await searchParams;

  if (!session?.user) return (
    <div>Please connect</div>
  )
  const borrowerId = session.user.id
  const id = params.id
  const isPurchase = params.isPurchase === "true" ? true : false
  console.log('id', id)

  const borrowWithMessage : any= await prisma.borrow.findFirst({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
      messages: { include: { user: true } }
    },
    where: {
      id: parseInt(id)
    }
  })


  console.log('borrowWithMessage', JSON.stringify(borrowWithMessage))

  if (!borrowWithMessage || borrowWithMessage.length == 0) {
    return <div>Achat introuvable</div>
  }


  let borrowDate: BorrowDate = { closeDate: undefined, createdDate: undefined, validatedDate: undefined };
  const createdDate = borrowWithMessage.createdDate
  const validatedDate = borrowWithMessage.validatedDate
  const closeDate = borrowWithMessage.closedDate
  borrowDate = {
    createdDate, validatedDate, closeDate
  }


  return (
    <div className="flex justify-center">
      <div className="flex flex-row gap-3">
        <div>
          <PurchaseClient sale={borrowWithMessage} isPurchase={isPurchase} buyer={''} />
        </div>
        <div>
          <Messages messages={borrowWithMessage.messages} borrowId={borrowWithMessage.id} isPurchase={isPurchase} borrowDate={borrowDate} />
        </div>
      </div>
    </div>)

}