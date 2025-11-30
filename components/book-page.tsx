import prisma from "@/lib/prisma";
import BookForm from "./book-form";

export default async function BookPage({ book, email, displayLinkToDetail, displayGetBook = false }: any) {
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
    console.log('book id', book.id, 'has', userBooks.length, 'userBooks')
  }

  let categories :any = []
  if(displayGetBook){
    categories = await prisma.category.findMany();
    console.log('categopries', categories)
  }
  
  return (<BookForm book={book} userBooks={userBooks} email={email} displayLinkToDetail={displayLinkToDetail} categories={categories} />)
}