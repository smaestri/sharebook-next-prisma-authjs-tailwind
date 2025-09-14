'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// import * as cheerio from 'cheerio';
import { BOOK_STATUS } from "./constants";
import prisma from "./prisma";
import { Book, UserBook } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { bookSchema, BookType } from "./ValidationSchemas copy";
import { UserBooksWithBorrow } from "./DbSchemas";

const saveUser = async (supabase: any, email: string, pseudo: string) => {
    console.log('saving user with email ' + email)
    let { data: user } = await supabase
        .from("user")
        .select("*")
        .eq("email", email);

    if (user == null || user.length == 0) {
        const { error: userError } = await supabase
            .from('user')
            .insert({
                email,
                pseudo
            })
        console.log('error when saving user ', userError)
    }
}

export const saveCity = async (email: string, street: any, selectedCity: any, formState: any, formData: any) => {

    console.log('save city with city ', selectedCity + " and cp " + formData.get('cp') + ' street', street + " pseudo " + formData.get('pseudo'))
    console.log('')
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // console.log('user retrieved from oauth', (JSON.stringify(user)))
    // console.log('email', email)

    // await saveUser(supabase, email, formData.get('pseudo') )

    console.log('saving city ...')

    // const { error: errorCity } = await supabase
    //     .from('user')
    //     .update({
    //         pseudo: formData.get('pseudo'),
    //         cp: formData.get('cp'),
    //         city: selectedCity,
    //         street,
    //     })
    //     .eq('email', email)

    // if (errorCity) {
    //     console.log('error when updating city / cp')
    //     return 'KO';
    // }
    return 'OK';

}


const saveBook = async (formData: BookType): Promise<Book> => {

    const author = formData.author
    const title = formData.title
    const category = formData.category

    let book: Book | null = await prisma.book.findFirst({
        where: { title: {
            contains: title,
            mode: 'insensitive'
        } }
    })

    if (!book) {
        console.log("saving book with title:", title, " author" + author, " category " + category)
        book = await prisma.book.create({
            data: {
                title,
                author,
                categoryId: parseInt(category),
                image: "toto"
            }
        })

    } else {
        console.error('book already exists')
    }
    return book;
}

const attachBookToUser = async (book: Book, userId: string,description: string) => {

    // does the use already declared this book?
    let userBook: UserBook | null = await prisma.userBook.findFirst({
        where: {
            bookId: book.id,
            userId,
        },
    })

    if (!userBook) {
        userBook = await prisma.userBook.create({
            data: {
                description,
                bookId: book.id,
                userId
            }
        })
        console.log('userBook created:', userBook)
    } else if (userBook.deleted) {
        console.log('userBook was deleted, restoring it')
        userBook = await prisma.userBook.update({
            where: {
                id: userBook.id,
            },
            data: {
                deleted: false
            }
        })
        console.log('userBook restored:', userBook)
    } else {
        console.log('userBook already exists')
    }
}
export async function updateBook(id: number, formData: BookType): Promise<any> {

    console.log('update book with id', id, ' and data', formData)

    let userBook: UserBook | null = await prisma.userBook.findFirst({
        where: {
            id,
        }
    })
    console.log('userBook found', userBook)

    if (!userBook) {
        console.error('book not found')
        return { error: "Book not found" }
    }

    await prisma.book.update({
        where: {
            id: userBook.bookId,
        },
        data: {
            title: formData.title,
            author: formData.author,
            categoryId: parseInt(formData.category),
        },
    })

    await prisma.userBook.update({
        where: {
            id,
        },
        data: {
            description: formData.description,
        },
    })

    revalidatePath('/my-books')
    redirect('/my-books')

}


export async function createBook(formData: BookType): Promise<any> {
    console.log('create book with data', formData)

    const result = bookSchema.safeParse(formData);

    console.log('result', result)
    if (!result.success) {
        let errorMessage = "";
        result.error.issues.forEach((issue) => {
            errorMessage += `${issue.message}\n`;
        });
        return {
            error: errorMessage
        }
    }
    const session = await auth()
    if (!session?.user?.id) {
        console.error('error no user')
        return
    }

    const book: Book = await saveBook(formData)
    await attachBookToUser(book, session.user.id, formData.description)

    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function deleteBook(id: number) {
    let userBook: UserBooksWithBorrow | null = await prisma.userBook.findFirst({
        include: {
            Borrow: true
        },
        where: { id: id }
    })

    if (userBook && userBook.Borrow && userBook.Borrow.length > 0) {
        console.error('book borrowed!')
        return { message: "The book is currently being borrowed, you can't delete it!" }
    }


    await prisma.userBook.update({
        where: {
            id: id,
        },
        data: {
            deleted: true,
        },
    })

    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function validatePurchase(purchaseId: number) {

    // TODO only if PENDING
    // console.log('validatePurchase', purchaseId)
    // const supabase = createClient();

    // const { data: { user }, error: errConnect } = await supabase.auth.getUser()

    // const { error: errorValidatre } = await supabase
    //     .from('borrow')
    //     .update({
    //         status: BORROW_STATUS.VALIDATED,
    //         validated_date: new Date().toISOString()
    //     })
    //     .eq('id', purchaseId)

    // if (errorValidatre) {
    //     console.log('error during borrows update')
    // }

    revalidatePath('/sales')
    redirect('/sales')
}

export async function refusePurchase(purchaseId: number, bookId: number, motif: any, slot: any) {
    // TODO only if PENDING
    // console.log('refusePurchase', purchaseId, " book=", bookId, " motif= ", motif, " slot= " + slot)
    // const supabase = createClient();
    // const { data: { user }, error: errConnect } = await supabase.auth.getUser()
    // const email = user?.user_metadata["email"]

    // if (motif == "INCORRECT_SLOT") {
    //     const { error: errorMessage } = await supabase
    //         .from('messages')
    //         .insert({
    //             borrow_id: purchaseId,
    //             email,
    //             message: "Le créneau ne me convient pas, pouvez-vous refaire la demande sur ce créneau SVP: " + slot
    //         })
    // }

    // const { error: errorValidatre } = await supabase
    //     .from('borrow')
    //     .update({
    //         status: BORROW_STATUS.REFUSED,
    //         close_date: new Date().toISOString()
    //     })
    //     .eq('id', purchaseId)

    // setBookToFree(bookId, supabase)

    revalidatePath('/sales')
    redirect('/sales')
}


export async function cancelPurchase(purchaseId: number, bookId: number) {
    // TODO only if PENDING
    // console.log('cancel', purchaseId, " book=", bookId)
    // const supabase = createClient();
    // const { data: { user }, error: errConnect } = await supabase.auth.getUser()
    // const { error: errorValidatre } = await supabase
    //     .from('borrow')
    //     .update({
    //         status: BORROW_STATUS.CANCELLED,
    //         close_date: new Date().toISOString()
    //     })
    //     .eq('id', purchaseId)

    // setBookToFree(bookId, supabase)

    revalidatePath('/purchases')
    redirect('/purchases')
}


export async function purchaseBook(userBookId: string, rdvDate: any, message?: string, formData: FormData) {

    console.log('purchaseBook bookId: ', userBookId, " rdvDate ", rdvDate, "message:", message)

    const session = await auth()

    const userConnectedId = session?.user?.id
    if (!userConnectedId) {
        console.error('error no user')
        return
    }
    console.log('userConnectedId', userConnectedId)

    // 0 - Get user of the borrowed book
    const userBook = await prisma.userBook.findUnique({
        where: { id: parseInt(userBookId) }
    })
    if (!userBook) {
        console.error('error book not found')
        return
    }

    console.log('userBook found:', userBook)

    // 1. Insert borrow

    // check if already borrowed
    const existingBorrow = await prisma.borrow.findFirst({
        where: {
            userBookId: userBook.id,
            borrowerId: userConnectedId
        }
    })
    if (existingBorrow) {
        console.error('error user book already borrowed')
        return
    }

    console.log('creating borrow for userConnectedId:', userConnectedId, 'and userBook', userBook)
    const borrow = await prisma.borrow.create({
        data: {
            userBookId: userBook.id,
            //rdvDate,
            borrowerId: userConnectedId,
        }
    })

    console.log('borrow created:', borrow)

    //2. Insert message
    if (message) {
        await prisma.messages.create({
            data: {
                borrowId: borrow.id,
                message: message,
                userId: userConnectedId
            }
        })
    }
    // //3. Update status
    await prisma.userBook.update({
        data: {
            status: BOOK_STATUS.PURCHASED,
        },
        where: { id: userBook.id }

    })

    revalidatePath('/purchases')
    redirect('/purchases')
}

export async function closePurchase(borrowId: number, bookId: number) {
    // const supabase = createClient();
    // const { error: errorBorrow } = await supabase
    //     .from('borrow')
    //     .update({
    //         status: BORROW_STATUS.CLOSED,
    //         close_date: new Date().toISOString()
    //     })
    //     .eq('id', borrowId)

    // setBookToFree(bookId, supabase)

    revalidatePath('/purchases')
    redirect('/purchases')
}



const setBookToFree = async (bookId: any, supabase: any) => {
    const { error: errorBook } = await supabase
        .from('user_book')
        .update({
            status: BOOK_STATUS.FREE,
        })
        .eq('id', bookId)
}

export async function search(formData: FormData) {
    const term = formData.get('term')
    console.log('in server action ', term)

    if (typeof term !== 'string' || !term) {
        redirect("/")
    }
    redirect(`/search?term=${term}`)
}

export async function addMessage(borrowId: any, isPurchase: any, message?: string) {
    console.log('addMessage with borrowId', borrowId), "ispurchase" + isPurchase + " message " + message
    const session = await auth()

    const userConnectedId = session?.user?.id
    if (!userConnectedId) {
        console.error('error no user')
        return
    }

    if (!message || message.trim().length === 0) {
        console.error('error no message')
        return
    }
    console.log('userConnectedId', userConnectedId)


    await prisma.messages.create({
        data: {
            borrowId: borrowId,
            message: message,
            userId: userConnectedId
        }
    })

    const path = `/purchase?id=${borrowId}&isPurchase=${isPurchase}`
    revalidatePath(path)
    redirect(path)
}

export async function updateAccount() {

    console.log('todo')
}