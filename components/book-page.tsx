import prisma from "@/lib/prisma";
import BookForm from "./book-form";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { BORROW_STATUS } from "@/lib/constants";

export default async function BookPage({ book, email, displayLinkToDetail, myBooks, myPurchases, categories }: any) {

  const iHavePurchasedThisBook = myPurchases?.filter((purchase: any) => {
    return purchase.userBook.book.id === book.id
  })?.length > 0

  console.log('iHavePurchasedThisBook', book.title, iHavePurchasedThisBook);

  // pour chaque book, regarder le nombre d'utilisateur qui le possedent
  let userBooks: any = []


  //TO OPTIMIZE 
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