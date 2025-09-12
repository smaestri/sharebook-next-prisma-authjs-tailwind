"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const DialogUser = ({ userBooks, book }: { userBooks: any, book: any }) => {


  console.log('userBooks in dialog', userBooks)

  return (
    <Dialog>
      <form>
         <DialogTrigger asChild>
            <Button variant="outline">Voir</Button>
          </DialogTrigger>
      <DialogContent>
          <DialogContent>
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle>Choisir un propriétaire</DialogTitle>
            </DialogHeader>
            <p>
              Plusieurs personnes possèdent <i>{book.title}</i>
            </p>
            <p>Merci de choisir: </p>
            <div>
              <table>
                <tr>
                  <td>Livre</td>
                  <td>Nom propriétaire</td>
                  <td>Email propriétaire</td>
                </tr>
                {userBooks.map((userBook: any) => (
                  <tr>
                    <td>{userBook.book.title}</td>
                    <td>{userBook.user.name}</td>
                    <td>{userBook.user.email}</td>
                    <td><Link href={`purchases/new?bookId=${userBook.id}`}>
                      <Button>Acheter</Button>
                    </Link></td>
                  </tr>
                ))}
              </table>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        
      </DialogContent>
      </form>
    </Dialog>

    //  <Dialog>
    //       <form>
    //         <DialogTrigger asChild>
    //           <Button variant="outline">Open Dialog</Button>
    //         </DialogTrigger>
    //         <DialogContent className="sm:max-w-[425px]">
    //           <DialogHeader>
    //             <DialogTitle>Edit profile</DialogTitle>
    //             <DialogDescription>
    //               Make changes to your profile here. Click save when you&apos;re
    //               done.
    //             </DialogDescription>
    //           </DialogHeader>
    //           <div className="grid gap-4">
    //             <div className="grid gap-3">

    //             </div>
    //             <div className="grid gap-3">

    //             </div>
    //           </div>
    //           <DialogFooter>
    //             <DialogClose asChild>
    //               <Button variant="outline">Cancel</Button>
    //             </DialogClose>
    //             <Button type="submit">Save changes</Button>
    //           </DialogFooter>
    //         </DialogContent>
    //       </form>
    //     </Dialog>
  )
}

export default DialogUser;