import prisma from "@/lib/prisma";
import BookForm from "./book-form";

export default async function BookPage({book, email} : any) {
// pour chaque book, regarder le nombre d'utilisateur qui le possedent
    const userBooks = await prisma.userBook.findMany({
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

    console.log('all user_books',JSON.stringify(userBooks))

    return (<BookForm book={book} userBooks={userBooks} email={email} />)
}