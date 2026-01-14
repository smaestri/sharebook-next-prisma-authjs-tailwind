"use client"
import { useState } from "react";
import DialogUser from "./DialogUser";
import Link from "next/link";
import ModalGetBook from "@/app/AdditionalUserInfos/ModalGetBook";
import FormButton from "./form-button";
import ImageWithLoading from "./ImageWithLoading";

export default function BookForm({ book, email, displayLinkToDetail = false, categories, iHaveThisBook = false, iHavePurchasedThisBook = false }: any) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    let urlBookDetail;
    if (!book.id) {
        urlBookDetail = `/list-books/0?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&image=${encodeURIComponent(book.image)}`;
    } else {
        urlBookDetail = `/list-books/${book.id}`;
    }

    const renderbookActions = () => {
        let content = null;
        if (book.UserBook?.length > 1) {
            content = <DialogUser book={book} userBooks={book.UserBook} />
        }
        if (book.UserBook?.length == 1 && !iHaveThisBook && !iHavePurchasedThisBook) {
            content = <div className="flex justify-center gap-2 mt-3">
                <Link onNavigate={() => { setLoading(true); }} href={`/purchases/new?userBookId=${book.UserBook[0].id}`}>
                    <FormButton className="cursor-pointer" pending={loading}>Demander</FormButton>
                </Link>
            </div>
        }
        if (content) {
            return (
                <div className="flex justify-center gap-2 mt-3">{content}</div>
            )
        }
    }

    const renbderBookCOntent = () => {

        if (!book.UserBook || book.UserBook?.length === 0 && !(iHavePurchasedThisBook || iHaveThisBook)) {
            return <div>Pas de dispo pour le moment</div>

        }
        if (!iHavePurchasedThisBook && !iHaveThisBook) {
            return <>
                <div className="flex flex-row gap-2">
                    {book.UserBook?.length?.length === 1 && <div>
                        <span>Prix: {book.UserBook[0].price}</span>
                    </div>}
                </div>
                <div className="flex flex-row gap-2">
                    {<div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>}
                    <div>
                        {book.UserBook?.length > 1 && <span>{book.UserBook?.length} utilisateurs possèdent ce livres</span>}
                        {book.UserBook?.length === 1 && <span><Link href={`/list-books?userId=${book.UserBook[0].user.id}`}>{book.UserBook[0].user.name}</Link> possède ce livre</span>}
                    </div>
                </div>
                {book.UserBook?.length === 1 && !iHaveThisBook && <div className="flex flex-row gap-2">
                    <div>
                        Habite à <span>{book.UserBook[0].user.city} ({book.UserBook[0].user.cp})</span>
                    </div>
                </div>}
                {renderbookActions()}
            </>
        }
    }

    return (
        <div
            key={book.id}
            className="flex flex-col w-[300px]"
        >
            <div className="flex flex-col items-center">
                <div className="h-[150px] mb-3">
                    <ImageWithLoading title={book.title} src={book.image} />
                </div>
                <div className="mb-5">
                    {displayLinkToDetail && <Link href={urlBookDetail} onClick={() => { setLoading(true); }}>
                        <p title={book.title} className="line-clamp-3 italic">{book.title} - {book.author}</p>
                    </Link>}
                    {!displayLinkToDetail &&
                        <p title={book.title} className="line-clamp-3 italic">{book.title} - {book.author}</p>
                    }
                </div>
            </div>
            {renbderBookCOntent()}

            <div className="flex justify-center gap-2 mt-3">
                {iHaveThisBook && <div>Vous possédez déjà ce livre</div>}
                {iHavePurchasedThisBook && <div>Vous avez déjà demandé ce livre</div>}
                {!iHaveThisBook && !iHavePurchasedThisBook &&
                    <FormButton className="cursor-pointer" pending={loading} onClick={() => setModalOpen(true)}>Je possède ce livre!</FormButton>}
            </div>

            <div>
                {!email && <div>Connectez-vous pourType emprunter!{email}</div>}
            </div>
            {!iHaveThisBook && categories && categories.length > 0 && <ModalGetBook onClose={() => setModalOpen(false)} categories={categories} isOpen={modalOpen} book={book} />}
        </div>
    )
}