import { auth } from "@/auth";
import { ListBooksProps } from "./page";
import prisma from "@/lib/prisma";
import BookPage from "@/components/book-page";
export type BookWithCategoryAndUser = any

export default async function ListBooks({ searchParams }: ListBooksProps) {
  const session = await auth()
  const params = await searchParams;
  const categoryId = params?.categoryId;

  if (!session?.user) return (
    <div>Please connect</div>
  )
  const email = session.user.email
  console.log('List book of not userId' + session.user.id + "with cat " + categoryId)
    const books = await prisma.book.findMany({
      where: {
        categoryId: parseInt(categoryId),
      }
    });
  return (<>
    <div className="flex flex-wrap gap-4">
      {books?.map((book: any) => (
        <BookPage key={book.id} book={book} email={email} />
      ))}
    </div>
  </>
  )
}

