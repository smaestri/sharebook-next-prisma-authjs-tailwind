import { auth } from "@/auth";
import { headers } from "next/headers";
import BookPage from "@/components/book-page";
import prisma from "@/lib/prisma";
import { BORROW_STATUS } from "@/lib/constants";

export default async function DetailsBookPage({ params, searchParams }: { params: { id: string | undefined, title: string, author: string, image: string }, searchParams: any }) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) return (
    <div>Please connect</div>
  )
  const email = session.user.email
  let book = null;

  console.log('params in details book page', params.id, searchParams.title)

  if (!searchParams.title && params.id) {
    book = await prisma.book.findFirst({
      where: {
        id: parseInt(params.id),
      }
    });
    console.log('book found by id', book)
  } else {
    console.log('book found by URL')

    book = {
      id: 0,
      title: searchParams.title,
      author: searchParams.author,
      image: searchParams.image,
    }
  }
  const categories = await prisma.category.findMany();
  const myBooks = await prisma.userBook.findMany({
    include: {
      user: true,
      book: true,
    },
    where: {
      user: {
        email: email,
      },
      deleted: false,
    }
  })
  const myPurchases: any = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId: session?.user?.id,
      status:
        { in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return (
    <BookPage key={book?.id} book={book} email={email} displayLinkToDetail={false} categories={categories} myBooks={myBooks} myPurchases={myPurchases} />
  )
}

