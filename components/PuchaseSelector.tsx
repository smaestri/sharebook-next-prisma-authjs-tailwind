"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

export default function PurchaseSelector({ isPurchase }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status') || "ongoing"
  console.log('status', status)
  return (
    <RadioGroup
      className="flex flex-row"
      value={status}
      onValueChange={(event: any) => {
        router.push(`/${isPurchase ? "purchases" : "sales"}?status=${event}`)
      }
      }>
      <div>
        <RadioGroupItem value='ongoing' id="ongoing" />
        <Label htmlFor="ongoing">En cours</Label>
      </div>
      <div>
        <RadioGroupItem value='closed' id="closed" />
        <Label htmlFor="closed">Clos</Label>

      </div>
    </RadioGroup>
  )


}
