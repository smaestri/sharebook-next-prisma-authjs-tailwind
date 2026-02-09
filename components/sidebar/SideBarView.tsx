"use client"
import Link from "next/link";
import { useSession } from "@/auth-client";

export interface Counter {
  id: number
  name: string
  count: number
}

export default function SideBarView({ categories }: { categories: Counter[] }) {

  const renderCategories = categories.map((cat: Counter) => {
    return (
      <div key={cat.name}>
        <Link href={{ pathname: `/list-books`, query: { categoryId: cat.id } }} className="underline">
          {cat.name}({cat.count})
        </Link></div>)
  })
  return (<div className="flex flex-col">
    <div><b>Filtrer par catégorie</b></div>
    {renderCategories}
    
  </div>
  )
}
