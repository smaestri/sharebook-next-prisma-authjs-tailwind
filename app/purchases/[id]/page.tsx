import { auth } from "@/auth"
import prisma from "@/lib/prisma"

interface PurchaseProps {
    params: {
        id: number
    }
}

export default async function Purchases(props: PurchaseProps) {

      const session = await auth()
    
      if (!session?.user) return (
        <div>Please connect</div>
      )
    
      const email = session.user.email

    // load purchase
    const purchase = await prisma.borrow.findFirst({
        where: {
            id: props.params.id
        },
        include: {
            userBook: {
                include: {
                    user: true
                    }
                }   
            }
        }
    )

return(<><div>Détail de l'achat / vente</div><div>{JSON.stringify(purchase)}</div></>)

}
