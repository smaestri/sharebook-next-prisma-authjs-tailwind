import { BorrowWithBook } from "@/app/sales/page";
import PurchasePage from "./purchase-item";
import PurchaseSelector from "./PuchaseSelector";
import { Borrow } from "@/app/generated/prisma";

export default function ListSalesOrPurchases({ sales, isPurchase }: { sales: any, isPurchase: boolean }) {
  console.log('sales', sales)

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div>
          <PurchaseSelector isPurchase={isPurchase} />
        </div>
        <div className="flex flex-wrap gap-2">
          {sales?.map((sale: any) => (
            <PurchasePage key={sale.id} sale={sale} isPurchase={isPurchase} />
          ))}
        </div>
        {sales.length === 0 && <div>{isPurchase ? "Aucun achat" : "Aucune vente"}</div>}
      </div>
    </div>
  )
}