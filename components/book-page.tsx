import BookForm from "./book-form";

export default async function BookPage({ book, email, displayLinkToDetail, myBooks, myPurchases, categories }: any) {

  const iHavePurchasedThisBook = myPurchases?.filter((purchase: any) => {
    return purchase.userBook.book.id === book.id
  })?.length > 0
  
  const iHaveThisBook = myBooks.filter((myBook: any) => {
    return myBook.book.id === book.id
  })?.length > 0

  return (<BookForm 
            book={book} 
            email={email} 
            displayLinkToDetail={displayLinkToDetail} 
            categories={categories}
            iHaveThisBook={iHaveThisBook} 
            iHavePurchasedThisBook={iHavePurchasedThisBook} />)
}