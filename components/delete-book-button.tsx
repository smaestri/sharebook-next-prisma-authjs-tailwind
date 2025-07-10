"use client"
import { deleteBook } from "@/lib/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

export function DeleteBook({ userBookId }: { userBookId: number }) {
    const deleteBookAction = deleteBook.bind(null, userBookId)

    // TODO
    // const [formState, action] = useFormState(deleteBookAction, {
    //   message: ""
    // })

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isOpen = false
  const onOpenChange = ()=>{}
    //TODO
    // useEffect(() => {
    //   if (formState && formState.message) {
    //     onOpen()
    //   }
    // }, [formState, onOpen])

    
  
    return (<>
      <form action={() => {}}>
        <FormButton>Delete</FormButton>
      </form>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
              <DialogHeader className="flex flex-col gap-1">Modal Title</DialogHeader>
              <DialogDescription>
                <p>
                  The book is currently being borrowed, you cannot delete it!
                </p>
  
              </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={()=>{}}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    );
  }