import { auth } from "@/auth";
import { headers } from "next/headers";
import BookPage from "@/components/book-page";
import prisma from "@/lib/prisma";

export default async function DetailsBookPage({params, searchParams}: {params: {id: string | undefined, title: string, author: string, image: string}, searchParams: any}) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
    if (!session?.user) return (
    <div>Please connect</div>
  )
    const email = session.user.email
    let book = null;

    console.log('params in details book page', params.id, searchParams.title)

    if (!searchParams.title && params.id){
        book = await prisma.book.findFirst({
          where: {
            id: parseInt(params.id),
          }
        });
        console.log('book found by id', book)
    }else {
      console.log('book found by URL')

      book = {
        id: 0,
        title: searchParams.title,
        author: searchParams.author,
        image: searchParams.image,
      }
    }
  return (        
  <BookPage key={book?.id} book={book} email={email} displayLinkToDetail={false} />
  )
}

