import PurchasePage from "./purchase-item";
import PurchaseSelector from "./PuchaseSelector";

export default function ListSalesOrPurchases({ sales, isPurchase }: { sales: any, isPurchase: boolean }) {

  return (
    <div className="flex">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-6">{isPurchase ? "Mes demandes" : "Mes offres"}</h1>
        <PurchaseSelector isPurchase={isPurchase} />
        <div className="flex flex-wrap gap-2">
          {sales?.map((sale: any) => (
            <PurchasePage key={sale.id} sale={sale} isPurchase={isPurchase} />
          ))}
        </div>
        {sales.length === 0 && <div>{isPurchase ? "Aucune demande" : "Aucune offre"}</div>}
      </div>
    </div>
  )
}