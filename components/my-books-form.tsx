"use client"
import { DeleteBook } from "./delete-book-button";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserBookWithBookAndUser } from "@/lib/DbSchemas";
import { useState } from "react";
import ImageWithLoading from './ImageWithLoading';

interface MyBooksFormProps {
  books: UserBookWithBookAndUser[]
  email?: string | null
}

export default function MyBooksForm({ books, email }: MyBooksFormProps) {
    const [loading, setLoading] = useState(false);
  
  if (!books || books.length === 0) {
    return <div className="flex">Vous n'avez pas déclaré de livres pour le moment.</div>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {books?.map((userBook: any) => (
        <div
          key={userBook.id}
          className="flex flex-col w-[300px]"
        >
          <div className="flex flex-col items-center">
            <div className="h-[150px] mb-3">
                <ImageWithLoading title={userBook.book.title} src={userBook.book.image || ""} />
            </div>
            <div className="mb-5">
              <p title={userBook.book.title} className="line-clamp-3 font-sans">{userBook.book.title} - {userBook.book.author}</p>
            </div>
          </div>
          <div>Catégorie: {userBook.book.category.name}</div>
          <div>Description: {userBook.description}</div>
          <div>Prix: {userBook.price} €</div>
          <div className="flex flex-col items-center">
            {email && userBook.user.email !== email &&
              <Link href={`/purchases/new?userBookId=${userBook.id}`}>
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
                  <Link onNavigate={()=>{setLoading(true)}} href={`/my-books/new?userBookId=${userBook.id}`}><Button>Modifier</Button></Link>
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







