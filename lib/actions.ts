'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { BORROW_STATUS } from "./constants";
import prisma from "./prisma";
import { Book, UserBook } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { bookSchema, BookType, UserInfoType } from "./ValidationSchemas";
import { UserBooksWithBorrow } from "./DbSchemas";
import { sendPendingFriendInvitation, sendBookRequestEmail, sendBookRequestCancellationEmail } from "./email";

export const updateUser = async (email: string, cp: string, formData: UserInfoType) => {
    await prisma.user.update({
        where: { email: email },
        data: {
            city: formData.city,
            cp: cp,
            street: formData.street,
            pseudo: formData.pseudo,
        }
    })
    revalidatePath('/')
    redirect('/')
}


const saveBook = async (formData: BookType): Promise<Book> => {

    const author = formData.author
    const title = formData.title
    const category = formData.category
    const image = formData.image

    // let book: Book | null = await prisma.book.findFirst({
    //     where: {
    //         title: {
    //             contains: title,
    //             mode: 'insensitive'
    //         }
    //     }
    // })

    // if (!book) {
    // const cover = await coverFor(title)
    const book = await prisma.book.create({
        data: {
            title,
            author,
            categoryId: parseInt(category),
            image
        }
    })

    // } else {
    //     console.error('book already exists')
    // }
    return book;
}

const saveUserBook = async (book: Book, userId: string, description: string, price: number) => {

    // does the user already declared this book?
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
                price,
                bookId: book.id,
                userId,
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
            price: formData.price,

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
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user?.id) {
        console.error('error no user')
        return
    }
    const bookId = formData.bookId
    let book: Book
    if (!bookId) {
        console.log('book not found, creating it')
        book = await saveBook(formData)
    } else {
        console.log('book found')
        book = await prisma.book.findUniqueOrThrow({
            where: { id: bookId }
        })
    }
    await saveUserBook(book, session.user.id, formData.description, formData.price)

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

    await prisma.borrow.update({
        where: {
            id: purchaseId,
        },
        data: {
            status: BORROW_STATUS.VALIDATED,
            validatedDate: new Date(),
        },
    })

    revalidatePath('/sales')
    redirect('/sales')
}

export async function refusePurchase(purchaseId: number) {
    await prisma.borrow.update({
        where: {
            id: purchaseId,
        },
        data: {
            status: BORROW_STATUS.REFUSED,
            closedDate: new Date(),
        },
    })

    revalidatePath('/sales')
    redirect('/sales')
}


export async function cancelPurchase(purchaseId: number) {
    // Get the borrow details with related data
    const borrow = await prisma.borrow.findUnique({
        where: {
            id: purchaseId,
        },
        include: {
            borrower: true,
            userBook: {
                include: {
                    book: true,
                    user: true,
                }
            }
        }
    })

    if (!borrow) {
        console.error('borrow not found')
        return { message: "error borrow not found" }
    }

    await prisma.borrow.update({
        where: {
            id: purchaseId,
        },
        data: {
            status: BORROW_STATUS.CANCELLED,
            closedDate: new Date(),
        },
    })

    // Send cancellation email to book owner
    const bookOwner = borrow.userBook.user
    const borrower = borrow.borrower

    await sendBookRequestCancellationEmail(
        bookOwner.email,
        bookOwner.name,
        borrower.name,
        borrower.pseudo || borrower.name,
        borrow.userBook.book.title,
        borrow.userBook.book.author
    )

    revalidatePath('/purchases')
    redirect('/purchases')
}


export async function purchaseBook(userBookId: string, rdvDate: any, message?: string) {

    console.log('purchaseBook bookId: ', userBookId, " rdvDate ", rdvDate, "message:", message)
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userConnectedId = session?.user?.id
    if (!userConnectedId) {
        console.error('error no user')
        return { message: "error no user" }
    }
    console.log('userConnectedId', userConnectedId)

    const userBook = await prisma.userBook.findUnique({
        where: { id: parseInt(userBookId) },
        include: {
            book: true,
            user: true
        }
    })
    if (!userBook) {
        console.error('error book not found')
        return { message: "error book not found" }
    }

    console.log('userBook found:', userBook)

    // Get requester info
    const requester = await prisma.user.findUnique({
        where: { id: userConnectedId }
    })
    if (!requester) {
        console.error('error requester not found')
        return { message: "error requester not found" }
    }

    // 1. Insert borrow
    console.log('creating borrow for userConnectedId:', userConnectedId, 'and userBook', userBook)
    const borrow = await prisma.borrow.create({
        data: {
            userBookId: userBook.id,
            rdvDate,
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

    // 3. Send email to book owner
    // Determine request type based on whether price is set (SALE if price > 0, LOAN otherwise)
    const requestType: 'LOAN' | 'GIFT' | 'SALE' = userBook.price && userBook.price > 0 ? 'SALE' : 'LOAN'
    
    await sendBookRequestEmail(
        userBook.user.email,
        userBook.user.name,
        requester.name,
        requester.pseudo || requester.name,
        userBook.book.title,
        userBook.book.author,
        requestType,
        message,
        rdvDate,
        userBook.price || undefined
    )
    
    revalidatePath('/purchases')
    redirect('/purchases')
}

export async function closePurchase(borrowId: number) {
    await prisma.borrow.update({
        where: {
            id: borrowId,
        },
        data: {
            status: BORROW_STATUS.CLOSED,
            closedDate: new Date(),
        },
    })

    revalidatePath('/purchases')
    redirect('/purchases')
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
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userConnectedId = session?.user?.id
    if (!userConnectedId) {
        console.error('error no user')
        return {message: "error no user"}
    }

    if (!message || message.trim().length === 0) {
        console.error('error no message')
        return {message: "error no message"}
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

export async function addAsFriend(friendId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user?.id) {
        console.error('error no user')
        return {message: "error no user"}
    }
    const existing = await prisma.friend.findFirst({ where: { userId: session?.user?.id, friendId } })
    if (existing) {
        console.log('already friend')
        return {message: "already friend"}
    }
    await prisma.friend.create({
        data: {
            userId: session?.user?.id,
            friendId: friendId,
        },
    })

    revalidatePath('/my-friends')
    redirect('/my-friends')
}

export async function addAsPendingFriend(email: string) {
    
    if(!email || typeof email !== 'string') {
        console.error('error invalid email')
        return {message: "L'email est invalide"}
    }
    console.log('addAsPendingFriend with email', email)
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user?.id) {
        console.error('error no user')
        return {message: "error no user"}
    }
    const existingPf = await prisma.pendingFriend.findFirst({ where: { userId: session?.user?.id, email } })
    if (existingPf) {
        console.log('already pending friend')
        return {message: "Vous avez dejà envoyé une invitation à cette personne"}
    }
    const existing = await prisma.friend.findFirst({
        include: {user: true},
        where: {
            friend: {
                email: email,
            }   
        }
    })
    console.log('existing friend with email', email, ':', existing)
    if (existing) {
        console.log('already friend')
        return {message: "Vous êtes déjà ami avec cette personne"}
    }


    // if the email already exist in db then insert directlr in friend instead of pendinffriend
    const userExistWithEmail = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })
    console.log('userExistWithEmail', userExistWithEmail)
    if (userExistWithEmail) {
        console.log('email belongs to an existing user, adding as friend directly')
        await prisma.friend.create({
            data: {
                userId: session?.user?.id,
                friendId: userExistWithEmail.id,
            },
        })
        revalidatePath('/my-friends')
        redirect('/my-friends')
        return
    }

    console.log('creating pf with email', email, ' for userId', session?.user?.id)
    const pendingFriend = await prisma.pendingFriend.create({
        data: {
            userId: session?.user?.id,
            email: email,
        },
    })

    // Get the sender's info to include in the email
    const sender = await prisma.user.findUnique({
        where: { id: session?.user?.id },
        select: { name: true, pseudo: true, email: true }
    })

    // Send invitation email
    if (sender) {
        await sendPendingFriendInvitation(
            email,
            sender.name,
            sender.pseudo || sender.name
        )
    }

    revalidatePath('/my-friends')
    redirect('/my-friends')
}

export const removeFriend = async (id: number) => {
    console.log('removeFriend with id', id)
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user?.id) {
        return {message: "error no user"}
    }
    await prisma.friend.delete({
        where: {
            id
        }
    })
    revalidatePath('/my-friends')
    redirect('/my-friends')

}

export const removePendingFriend = async (id: number) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user?.id) {
        return {message: "error no user"}
    }
    await prisma.pendingFriend.delete({
        where: {
            id: id
        }
    })
    revalidatePath('/my-friends')
    redirect('/my-friends')

}