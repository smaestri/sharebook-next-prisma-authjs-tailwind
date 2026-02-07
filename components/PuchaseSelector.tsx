"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import BookCreateLoading from "./book-create-loading";

export default function PurchaseSelector({ isPurchase }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status') || "ongoing"
  const [isLoading, setIsLoading] = useState(false)

  console.log('status in PurchaseSelector', status)
  console.log('isLoading in PurchaseSelector', isLoading)

  useEffect(() => {
    setIsLoading(false)
  }, [searchParams])

  const handleSwitchChange = (event: any) => {
    setIsLoading(true)
    router.push(`/${isPurchase ? "purchases" : "sales"}?status=${event ? "closed" : "ongoing"}`)
  }

  if (isLoading) {
    return <BookCreateLoading />
  }

  return (

    <div className="flex items-center space-x-2">
      <Switch 
        id="airplane-mode" 
        onCheckedChange={handleSwitchChange}
        checked={status === "closed"}
      />
      <Label htmlFor="airplane-mode">{isPurchase ? "Demandes" : "Offres"} clôturées</Label>
    </div>
  )


}
