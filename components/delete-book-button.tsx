"use client"
import { deleteBook } from "@/lib/actions";
import { useActionState, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import FormButtonActionState from "./form-button-action-state";

export function DeleteBook({ userBookId }: { userBookId: number }) {
  const deleteBookAction = deleteBook.bind(null, userBookId)

  const [formState, action] = useActionState(deleteBookAction, { message: '' })

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const onOpenChange = () => { setShowBorrowModal(modal => !modal)}
  useEffect(() => {
    if (formState && formState.message) {
      setShowBorrowModal(true)
    }
  }, [formState.message, setShowBorrowModal])

  return (<>
    <form action={action}>
      <FormButtonActionState className="cursor-pointer">Supprimer</FormButtonActionState>
    </form>
    <Dialog open={showBorrowModal} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">Livre emprunté</DialogHeader>
        <DialogDescription>
          <p>
            Le livre ne peut pas être supprimé car il est actuellement emprunté.
          </p>
        </DialogDescription>
        <DialogFooter>
            <Button variant="outline" onClick={onOpenChange}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  );
}