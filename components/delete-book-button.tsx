"use client"
import { deleteBook } from "@/lib/actions";
import { useActionState, useEffect, useState } from "react";
import FormButton from "./form-button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

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
      <FormButton>Delete</FormButton>
    </form>
    <Dialog open={showBorrowModal} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">Modal Title</DialogHeader>
        <DialogDescription>
          <p>
            The book is currently being borrowed, you cannot delete it!
          </p>

        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => { }}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  );
}