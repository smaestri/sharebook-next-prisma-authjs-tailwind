"use client"
import { useState } from "react";
import DialogUser from "./DialogUser";
import Image from "next/image"
import { Button } from "./ui/button";
import Link from "next/link";

export default function BookForm({ book, userBooks, email }: any) {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div
            key={book.id}
            className="flex flex-col w-[300px]"
        >
            <div className="flex flex-col items-center">
                <div className="h-[150px] mb-3">
                    <img
                        src={book.image}
                        alt={`${book.title}`}
                        width={100}
                        height={100}
                    />
                </div>
                <div className="h-[65px] mb-5">
                    <Link href={`/list-books/${book.id}`}><p title={book.title} className="line-clamp-3 italic">{book.title} - {book.author}</p></Link>
                </div>
            </div>
            {userBooks?.length === 0 ?
                <div>Pas de dispo pour le moment</div>
                : <>
                    <div className="flex flex-row gap-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                          {userBooks?.length > 1 && <span>{userBooks?.length} utilisateurs possèdent ce livres</span>}
                            {userBooks?.length === 1 && <span>{userBooks[0].user.name} possède ce livre</span>}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div>
                            Habite à {userBooks?.length === 1 && <span>{userBooks[0].user.city} ({userBooks[0].user.cp})</span>}
                        </div>
                    </div>


                    <div className="flex justify-center gap-2 mt-3">
                       {userBooks.length > 1  && <DialogUser book={book} userBooks={userBooks}/>}
                       {userBooks.length == 1 && <Link href={`/purchases/new?userBookId=${userBooks[0].id}`}>
                      <Button>Demander</Button>
                    </Link>}
                    </div>
                </>
            }
            <div>
                {!email && <div>Connectez-vous pour emprunter!{email}</div>}
            </div>
            

        </div>
    )
}