"use client"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookSchema, BookType } from "@/lib/ValidationSchemas"
import { useState } from "react"
import { createBook } from "@/lib/actions"
import z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import FormButton from "./form-button"

const ModalGetBook = ({ categories, isOpen, onClose, book, setLoading }: { isOpen: any, categories: any, onClose: any, book: any, setLoading}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<BookType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title || "",
      image: book.image || "",
      author: book.author || "",
      category: "",
      description: "",
      price: 0,
      bookId: undefined
    },
  })

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    console.log("onSubmit ", values)

    setLoading(true)
    const response = await createBook(values)
    if (response?.error) {
      setErrorMessage(response.error)
    }
        setLoading(false)

  }

  const renderCat = () => {
    return categories.map((cat: any) => <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>)
  }
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1">J'ai ce livre</DialogTitle>
          </DialogHeader>

          <FieldGroup>

            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Catégorie</FieldLabel>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {renderCat()}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea placeholder="description" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Prix</FieldLabel>
                  <Input type="number" placeholder="prix" {...field} onChange={event => field.onChange(+event.target.value)} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              <FormButton>
                Valider
              </FormButton>
              <Button type="button" variant="secondary" onClick={onClose}>
                Fermer
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog >)
}

export default ModalGetBook;