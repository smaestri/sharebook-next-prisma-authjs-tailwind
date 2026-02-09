import prisma from "@/lib/prisma";
import SideBarView, { Counter } from "../../components/sidebar/SideBarView";
import { Category } from "@/app/generated/prisma";

export default async function SideBarPage({ }) {

  const categories: Category[] = await prisma.category.findMany();
  const countUserBookForCategory = async (category: Category) => {
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
    const result = await countUserBookForCategory(category);
    resCat.push({ ...category, count: result })

  }
  return (<SideBarView categories={resCat} />)
}
