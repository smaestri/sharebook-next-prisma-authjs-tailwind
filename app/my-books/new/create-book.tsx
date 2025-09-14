import CreateEditBookForm from "@/components/create-edit-form";
import { UserBookWithBookAndUser } from "@/lib/DbSchemas";
import prisma from "@/lib/prisma";

export default async function CreateBook({ bookId }: { bookId?: string }) {
  const categories: any = await prisma.category.findMany();

  let userBook: UserBookWithBookAndUser | null = null
  if (bookId) {
    const userBookId = parseInt(bookId);
    userBook = await prisma.userBook.findUnique({
      where: { id: userBookId },
      include: { book: true, user: true },
    });

    console.log('userBook to edit', userBook)

    if (!userBook) {
      return <div>Livre introuvable</div>
    }
  }

  return (
    <CreateEditBookForm categories={categories || []} userBook={userBook} />
  )
}
