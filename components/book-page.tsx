import prisma from "@/lib/prisma";
import BookForm from "./book-form";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { BORROW_STATUS } from "@/lib/constants";

export default async function BookPage({ book, email, displayLinkToDetail, myBooks, categories }: any) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const myPurchases: any = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId: session?.user?.id,
      status:
        { in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] },
      userBook: {
        book: {
          id: book.id,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const iHavePurchasedThisBook = myPurchases?.length > 0

  // pour chaque book, regarder le nombre d'utilisateur qui le possedent
  let userBooks: any = []

  if (book.id) {
    userBooks = await prisma.userBook.findMany({
      include: {
        user: true,
        book: true,
      },
      where: {
        book: {
          id: book.id,
        },
        user: {
          email: {
            not: email,
          },
        },
        deleted: false,
      }
    })
  }

  const iHaveThisBook = myBooks.filter((myBook: any) => {
    return myBook.book.id === book.id
  })?.length > 0
  return (<BookForm book={book} userBooks={userBooks} email={email} displayLinkToDetail={displayLinkToDetail} categories={categories} iHaveThisBook={iHaveThisBook} iHavePurchasedThisBook={iHavePurchasedThisBook} />)
}