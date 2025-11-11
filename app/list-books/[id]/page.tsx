import { auth } from "@/auth";
import BookPage from "@/components/book-page";
import prisma from "@/lib/prisma";

export default async function ListBooksPage({params}: {params: {id: string}}) {
  if (!params.id){
    return <div>No id</div>
  }
    const session = await auth()
  
    if (!session?.user) return (
    <div>Please connect</div>
  )
  const email = session.user.email
    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(params.id),
      }
    });
  return (        
  <BookPage key={book?.id} book={book} email={email} />
  )
}

