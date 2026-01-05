"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import FormButton from "./form-button";

const DialogUser = ({ userBooks, book }: { userBooks: any, book: any }) => {

  const [loading, setLoading] = useState(false);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Voir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>Choisir un propriétaire</DialogTitle>
          </DialogHeader>
          <p>
            Plusieurs personnes possèdent <i>{book.title}</i>
          </p>
          <p>Merci de choisir: </p>
          <div>
            <div>
              <div className="flex flex-row gap-10 font-bold">
                <div>Vendeur</div>
                <div>Lieu</div>
              </div>
              {userBooks.map((userBook: any) => (
                <div className="flex flex-row gap-3 items-center">
                  <div>{userBook.user.name}</div>
                  <div>{userBook.user.city} ({userBook.user.cp})</div>
                  <div><Link href={`/purchases/new?userBookId=${userBook.id}`} onNavigate={() => { setLoading(true); }}>
                    <FormButton pending={loading}>Demander</FormButton>
                  </Link></div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>

  )
}

export default DialogUser;