import prisma from "@/lib/prisma";
import SideBarView, { Counter } from "./SideBarView";
import { BORROW_STATUS } from "@/lib/constants";
import { Category, UserBook } from "@/app/generated/prisma";
import { auth } from "@/auth";
export default async function SideBarPage({ }) {

  const session = await auth()

  if (!session?.user) return (
    <div>Please connect</div>
  )

  const categories: Category[] = await prisma.category.findMany();

  const countUserBookForCategory = async (category: Category, userId?: string) => {
    const userBooks = await prisma.userBook.findMany({
      where: {
        book: {
          categoryId: category.id,
        },
        NOT: {
          userId,
        },
        deleted: false
      }
    });
    if (userBooks.length === 0) {
      return 0;
    }
    console.log('userBooks for cat ' + category.name + " : " + userBooks.length)
    let res = 0
    for (const ub of userBooks) {
      if (await isUSerBookAvailable(ub)) {
        res++;
      }
    }
    return res;
  }

  const isUSerBookAvailable = async (ub: UserBook) => {
    console.log('ub id', ub.id)
    const borrows = await prisma.borrow.findMany({
      where: {
        userBookId: ub.id,
        status: { in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] }
      }
    })
    if (borrows.length > 0) {
      return false
    }
    return true
  }

  const resCat: Counter[] = []
  console.log('test')
  // for each category, get counter of books not borrowed
  for (const category of categories) {
    const result = await countUserBookForCategory(category, session?.user?.id)
    resCat.push({ ...category, count: result })

  }
  return (<SideBarView categories={resCat} />)
}
