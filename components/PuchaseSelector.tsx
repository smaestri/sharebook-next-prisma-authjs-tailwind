"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "@/components/ui/switch"

import { Label } from "./ui/label";

export default function PurchaseSelector({ isPurchase }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status') || "ongoing"
  console.log('status', status)
  return (
    
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" onCheckedChange={(event: any) => {
        router.push(`/${isPurchase ? "purchases" : "sales"}?status=${event ? "closed" : "ongoing"}`)
      }} />
      <Label htmlFor="airplane-mode">{isPurchase?"Achats":"Ventes"} clôturé{isPurchase?"":"e"}s</Label>
      </div>
  )


}
