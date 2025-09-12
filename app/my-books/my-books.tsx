import { auth } from "@/auth";
import MyBooksForm from "@/components/my-books-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export type BookWithCategoryAndUser = any

export default async function MyBooks() {

  const session = await auth()

  if (!session?.user) return (
    <div>Please connect</div>
  )

  const email = session.user.email
  console.log('email', email)

     const userBooks : any= await prisma.userBook.findMany({
      include: {
        book: true,
        user: true
      },
      where: {
        deleted: false,
        userId: session.user.id
      }
     });
  console.log('userBooks', JSON.stringify(userBooks))

  const finalBooks = userBooks?.map((item: any) => ({ id: item.id, place: item.place, state: item.state, price: item.price, bookInfo: item.book, userInfo: item.user }))
  console.log('books fetched', JSON.stringify(finalBooks))

  return (

    <div className="flex justify-center">
      <div className="flex flex-col">
        <MyBooksForm email={email} books={finalBooks} />
        <div className="mt-3">
          <Link href="my-books/new">
            <Button>Créer un livre</Button>
          </Link>
        </div>
      </div>

    </div>
  )
}


