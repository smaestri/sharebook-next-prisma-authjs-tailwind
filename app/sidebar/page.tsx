import prisma from "@/lib/prisma";
import SideBarView, { Counter } from "../../components/sidebar/SideBarView";
import { Category } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function SideBarPage({ }) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session?.user) return (
    <div>Please connect</div>
  )
  const categories: Category[] = await prisma.category.findMany();
  const countUserBookForCategory = async (category: Category, userId?: string) => {
    const countBooksForCategory = await prisma.book.count({
      where: {
        categoryId: category.id,
      }
    });

    return countBooksForCategory;
  }

  const resCat: Counter[] = []
  // for each category, get counter of books not borrowed
  for (const category of categories) {
    const result = await countUserBookForCategory(category, session?.user?.id)
    resCat.push({ ...category, count: result })

  }
  return (<SideBarView categories={resCat} />)
}
