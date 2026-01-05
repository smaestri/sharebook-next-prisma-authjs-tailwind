"use client"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookSchema, BookType } from "@/lib/ValidationSchemas"
import { useState } from "react"
import { createBook } from "@/lib/actions"
import z from "zod"
import BookCreateInfos from "@/components/book-create-infos"
import FormButton from "@/components/form-button"

const ModalGetBook = ({ categories, isOpen, onClose, book }: { isOpen: any, categories: any, onClose: any, book: any}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<BookType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title || "",
      image: book.image || "",
      author: book.author || "",
      category: "",
      description: "",
      price: 0,
      bookId: book.id,
    },
  })

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    setLoading(true)
    const response = await createBook(values)
    if (response?.error) {
      setErrorMessage(response.error)
    }
    setLoading(false)
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1">J'ai ce livre</DialogTitle>
          </DialogHeader>
          <BookCreateInfos form={form} categories={categories} />
          <DialogFooter className="mt-2">
              <FormButton pending={form.formState.isSubmitting || loading}>
                Valider
              </FormButton>
              <Button type="button" variant="secondary" onClick={onClose}>
                Fermer
              </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog >)
}

export default ModalGetBook;