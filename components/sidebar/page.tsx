import prisma from "@/lib/prisma";
import SideBarView, { Counter } from "./SideBarView";
import { BORROW_STATUS } from "@/lib/constants";
import { Category } from "@/app/generated/prisma";
import { auth } from "@/auth";
export default async function SideBarPage({ }) {

 const session = await auth()
  
    if (!session?.user) return (
      <div>Please connect</div>
    )

  const categories: Category[] = await prisma.category.findMany();


  const resCat : Counter[] = []

  // for each category, get counter of books not borrowed
  for (const category of categories) {
    const userBooks = await prisma.userBook.findMany({
      where: {
        book: {
          categoryId: category.id,
        },
        NOT: {
          userId: session?.user.id,
        },
        deleted: false
      }
    });
    if (userBooks.length === 0) {
      resCat.push({...category, count: 0})
      continue
    }
    let numberOfBooksForThisCategory = 0

    for (const ub of userBooks) {
      const borrow = await prisma.borrow.findFirst({
        where: {
          userBookId: ub.id,
          status: BORROW_STATUS.PENDING
        }
      })
      if (!borrow) {
        numberOfBooksForThisCategory ++
      }
      resCat.push({...category, count: numberOfBooksForThisCategory})
    }
  }
  return (<SideBarView categories={resCat} />)
}
