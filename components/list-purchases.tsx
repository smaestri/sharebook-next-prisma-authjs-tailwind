import PurchasePage from "./purchase-item";
import PurchaseSelector from "./PuchaseSelector";

export default function ListSalesOrPurchases({ sales, isPurchase }: { sales: any, isPurchase: boolean }) {

  return (
    <div className="flex">
      <div className="flex flex-col">
        <PurchaseSelector isPurchase={isPurchase} />
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