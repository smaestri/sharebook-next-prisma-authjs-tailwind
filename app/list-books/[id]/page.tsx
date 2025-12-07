import { auth } from "@/auth";
import { headers } from "next/headers";
import BookPage from "@/components/book-page";
import prisma from "@/lib/prisma";

export default async function DetailsBookPage({params, searchParams}: {params: Promise<{id: string | undefined, title: string, author: string, image: string}>, searchParams: any}) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
    const theParams = await params;
    const theSearchedParams = await searchParams;
  
    if (!session?.user) return (
    <div>Please connect</div>
  )
    const email = session.user.email
    let book = null;

    console.log('params in details book page', theParams.id, theSearchedParams.title)

    if (!theSearchedParams.title && theParams.id){
        book = await prisma.book.findFirst({
          where: {
            id: parseInt(theParams.id),
          }
        });
        console.log('book found by id', book)
    }else {
      console.log('book found by URL')

      book = {
        id: 0,
        title: theSearchedParams.title,
        author: theSearchedParams.author,
        image: theSearchedParams.image,
      }
    }
  return (        
  <BookPage key={book?.id} book={book} email={email} displayLinkToDetail={false} displayGetBook={true} />
  )
}

