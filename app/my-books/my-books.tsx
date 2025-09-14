import { auth } from "@/auth";
import MyBooksForm from "@/components/my-books-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { UserBookWithBookAndUser } from "@/lib/DbSchemas";

export default async function MyBooks() {
  const session = await auth()

  if (!session?.user) return (
    <div>Please connect</div>
  )

  const email = session.user.email
  console.log('email', email)

  const books: UserBookWithBookAndUser[] = await prisma.userBook.findMany({
    include: {
      book: true,
      user: true
    },
    where: {
      deleted: false,
      userId: session?.user?.id
    }
  });

  console.log('userBooks', JSON.stringify(books))

  return (

    <div className="flex justify-center">
      <div className="flex flex-col">
        <MyBooksForm email={email} books={books} />
        <div className="mt-3">
          <Link href="my-books/new">
            <Button>Créer un livre</Button>
          </Link>
        </div>
      </div>

    </div>
  )
}


