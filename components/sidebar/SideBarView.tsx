"use client"
import Link from "next/link";
import { Input } from "../ui/input";
import { useSession } from "@/auth-client";

export interface Counter {
  id: number
  name: string
  count: number
}

export default function SideBarView({ categories }: { categories: Counter[] }) {
  const { data: session } = useSession()
  if (!session?.user) {
    return <div>Please login</div>
  }
  const renderCategories = categories.map((cat: Counter) => {
    return (
      <div key={cat.name}>
        <Link href={{ pathname: `/list-books`, query: { categoryId: cat.id } }} >
          {cat.name}({cat.count})
          {/* (<Counter categoryId={cat.id} />) */}
        </Link></div>)
  })
  return (<div className="flex flex-col">
    <div><b>Filtrer par catégorie</b></div>
    {renderCategories}
    <div className="mt-3"><b>Chercher par utilisateur</b></div>
    <div>
    <Input style={{"width": "80%"}}  type="text" placeholder="Nom d'utilisateur"  />
    </div>
  </div>
  )
}
