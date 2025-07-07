'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod"
import axios from "axios";
// import * as cheerio from 'cheerio';
import { BOOK_STATUS, BORROW_STATUS } from "./constants";

const createBookSchema = z.object({
    title: z.string().min(3).regex(/^[a-z]+$/, { message: "Must be lowercase" }),
    author: z.string().min(3),
    category: z.string()
})

interface CreateBookFormState {
    errors: {
        title?: string[];
        author?: string[];
        _form?: string[];
    }
}

// export async function signIn() {
//     return auth.signIn("github")
// }

// export async function signOut() {
//     return auth.signOut()
// }

const saveUser = async (supabase: any, email: string, pseudo: string ) => {
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

    console.log('save city with city ', selectedCity + " and cp " + formData.get('cp') + ' street', street + " pseudo " + formData.get('pseudo') )
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


const saveBook = async (supabase: any, formData: any) => {

    const isbn = formData.get('isbn')
    console.log('saving book with isbn', isbn, " title:", formData.get('title'), " author" + formData.get('author'))

    let { data: book } = await supabase
        .from("book")
        .select("*").eq("isbn", isbn);

    if (!book || book.length == 0) {
        console.log('book not found, inserting')
        const { error } = await supabase
            .from('book')
            .insert({
                isbn,
                title: formData.get('title'),
                author: formData.get('author'),
                category_id: formData.get('category'),
                image: formData.get('image'),
            })

        if (error) {
            console.log('error when savingbook', error)
            return
        }

        let { data } = await supabase
            .from("book")
            .select("*").eq("isbn", isbn);
        console.log('data', data)
        if (error) {
            console.log('error when getting book', error)
            return
        }
        return data[0];
    }
    console.log('book already exists returning ', book[0])

    return book[0]

}

const attachBookToUser = async (supabase: any, isbn: string, email: string, state: string | null, price: string | null) => {
    let { data: bookWithCategory } = await supabase
        .from("user_book")
        .select("*")
        .eq("email", email)
        .eq("deleted", false)
        .eq("book_isbn", isbn);
    if (!bookWithCategory || bookWithCategory.length == 0) {
        console.log('user_book not found, inserting with isbn', isbn, " and email " + email, " and state " + state, " and price ", price)
        const { error } = await supabase
            .from('user_book')
            .insert({
                book_isbn: isbn,
                email,
                state,
                price,

            })
        console.log('error when saving user_book ', error)
    } else {
console.log('book already exists')
    }
}


export async function createBook(formState: CreateBookFormState, formData: FormData): Promise<any> {
    // const supabase = createClient();

    // console.log('create' + formData.get('isbn') + " " + formData.get('title') + " " + formData.get('author') + " " + formData.get('category') + " "+ " " + formData.get('image'))
    // const { data: { user } } = await supabase.auth.getUser();

    // console.log('user retrieved from oauth', (JSON.stringify(user)))
    // const email = user?.user_metadata["email"]
    // const pseudo = user?.user_metadata["full_name"]

    // try {
    //     await saveUser(supabase, email,pseudo)
    //     const book: BookWithCategory = await saveBook(supabase, formData)
    //     //@ts-ignore
    //     await attachBookToUser(supabase, book.isbn, email, formData.get('state') as string, formData.get('price'))
    // } catch (err: unknown) {
    //     if (err instanceof Error) {
    //         return {
    //             errors: {
    //                 _form: [err.message]
    //             }
    //         }
    //     } else {
    //         return {
    //             errors: {
    //                 _form: ['Something went wrong']
    //             }
    //         }
    //     }
    // }
    // revalidatePath('/my-books')
    // redirect('/my-books')
}

export async function deleteBook(id: number) {

    // console.log('deleting user book with id ' + id)
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();

    // //check if borrow attached
    // let { data: borrow } = await supabase
    //     .from("user_book")
    //     .select("*")
    //     .eq("id", id)
    //     .eq("status", BOOK_STATUS.PURCHASED);

    // if (borrow && borrow.length > 0) {
    //     console.log('error book pending!!', borrow)
    //     return {
    //         message: "The book is currently being borrowed, you can't delete it!"
    //     }
    // }


    // const { error } = await supabase
    //     .from('user_book')
    //     .update({
    //         deleted: true,
    //     })
    //     .eq('id', id)

    // console.log('delete book')
    // const book: any = {}
    // if (book?.status === "BORROWED") {
    //     return {
    //         message: "The book is currently being borrowed, you can't delete it!"
    //     }

    // }

   // console.log('error', error)

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


export async function purchaseBook(bookId: number, rdvDate: any, message: string, formData: FormData) {

    // console.log('formdata with message ', message)

    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // const email = user?.user_metadata["email"]


    // console.log('borrow book' + bookId + "and email" + email + "and rdv date" + rdvDate + "and first time" + formData.get("firstTime"))

    // const { data: borrow, error } = await supabase
    //     .from('borrow')
    //     .insert({
    //         borrower_id: email,
    //         book_id: bookId,
    //         rdv_date: rdvDate,
    //         rdv_time: formData.get("firstTime")
    //     })
    //     .select()

    // if (error) {
    //     console.log('error during borrow: ', error)
    //     return; //todo error management
    // }

    // // need to retrieve id
    // console.log('new borrow ID=' + JSON.stringify(borrow))
    // console.log('insertign message with borrow_id', borrow[0].id, " email ", email, " message ", message)
    // const { error: errorMessage } = await supabase
    //     .from('messages')
    //     .insert({
    //         borrow_id: borrow[0].id,
    //         email,
    //         message
    //     })

    // if (errorMessage) {
    //     console.log('error during inserting message ', error)
    //     return; //todo error management
    // }


    // const { error: errorBOok } = await supabase
    //     .from('user_book')
    //     .update({
    //         status: BOOK_STATUS.PURCHASED,
    //     })
    //     .eq('id', bookId)

    // if (errorBOok) {
    //     console.log('error during updating book status: ', error)
    //     return; //todo error management
    // }


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

export async function addMessage(borrowId: any, message: string, isPurchase: any) {
    // const supabase = createClient();
    // const { data, error: errConnect } = await supabase.auth.getUser()
    // const { data: { user } } = await supabase.auth.getUser();

    // console.log('user retrieved from oauth', (JSON.stringify(user)))
    // const email = user?.user_metadata["email"]
    // const { error: errorMessage } = await supabase
    //     .from('messages')
    //     .insert({
    //         borrow_id: borrowId,
    //         email,
    //         message
    //     })

    // const path = `/purchase?id=${borrowId}&isPurchase=${isPurchase}`
    // revalidatePath(path)
    // redirect(path)
}

export async function updateAccount(){

    console.log('todo')
}