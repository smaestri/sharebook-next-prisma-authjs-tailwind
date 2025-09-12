"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";


interface Counter {
  id: number
  name: string
  count: number
}

export default function SideBarView({ categories }: { categories: Counter[] }) {
  //const { userConnected }: any = useUserContext();
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
    
  </div>
  )
}
