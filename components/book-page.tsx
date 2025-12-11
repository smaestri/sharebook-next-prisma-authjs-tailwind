import prisma from "@/lib/prisma";
import BookForm from "./book-form";

export default async function BookPage({ book, email, displayLinkToDetail }: any) {
  // pour chaque book, regarder le nombre d'utilisateur qui le possedent
  let userBooks: any = []
  let myBooks: any = []
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

  // si je possde le livre, ne pas proposer de le recuperer
  myBooks = await prisma.userBook.findMany({
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

    console.log('my books', myBooks)
    console.log('book.id', book.id)


  const iHaveThisBook = myBooks.filter((myBook: any) => {
    return myBook.book.id === book.id
  })?.length > 0



  let categories: any = []
console.log('iHaveThisBook', iHaveThisBook)
  if (!iHaveThisBook) {
    categories = await prisma.category.findMany();
  }

  return (<BookForm book={book} userBooks={userBooks} email={email} displayLinkToDetail={displayLinkToDetail} categories={categories} iHaveThisBook={iHaveThisBook} />)
}