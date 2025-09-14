"use client"
import { DeleteBook } from "./delete-book-button";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserBookWithBookAndUser } from "@/lib/DbSchemas";

interface MyBooksFormProps {
  books: UserBookWithBookAndUser[]
  email?: string | null
}

export default function MyBooksForm({ books, email }: MyBooksFormProps) {
  if (!books || books.length === 0) {
    return <div className="flex">Vous n'avez pas déclaré de livres pour le moment.</div>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {books?.map((userBook: UserBookWithBookAndUser) => (
        <div
          key={userBook.id}
          className="flex flex-col w-[300px]"
        >
          <div className="flex flex-col items-center">
            <div className="h-[150px] mb-3">
              {/* <Image
                src={userBook.bookInfo.image}
                alt={`${userBook.bookInfo.title}`}
                width={100}
                height={100}
              /> */}
            </div>
            <div className="h-[65px] mb-5">
              <p title={userBook.book.title} className="line-clamp-3 font-sans">{userBook.book.title} - {userBook.book.author}</p>
            </div>
          </div>
          {/* <div>Catégorie: {userBook.bookInfo.category.name}</div> */}
          <div>Description: {userBook.description}</div>
          <div className="flex flex-col items-center">
            {email && userBook.user.email !== email &&
              <Link href={`purchases/new?bookId=${userBook.id}`}>
                <Button>Acheter</Button>
              </Link>}
          </div>
          <div className="">
            {email && userBook.user.email === email &&
              <div className="flex flex-col items-center gap-2">
                <div>
                  <DeleteBook userBookId={userBook.id} />
                </div>
                <div>
                  <Link href={`/my-books/new?userBookId=${userBook.id}`}><Button>Modifier</Button></Link>
                </div>
              </div>
            }
          </div>
          <div>
            {!email && <div>Connectez-vous pour emprunter!{email}</div>}
          </div>
        </div>
      ))}
    </div>
  )

}







