"use client"
import { useState } from "react";
import { createBook, updateBook } from "@/lib/actions";
import FormButton from "./form-button";
import { Controller, useForm } from "react-hook-form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input";
import { bookSchema, BookType } from "@/lib/ValidationSchemas";
import { UserBookWithBookAndUser } from "@/lib/DbSchemas";
import SearchInputAutoComplete from "./header/search-input-autocomplete";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import BookCreateInfos from "./book-create-infos";
import ImageWithLoading from "./ImageWithLoading";

export interface Category {
  id: string;
  name: string
}

export interface CreateEditBookFormProps {
  userBook?: UserBookWithBookAndUser | null
  categories: Category[]
}

export default function CreateEditBookForm({ categories, userBook }: CreateEditBookFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [authorDisabled, setAuthorDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cover, setCover] = useState<string | undefined>(undefined);
  const form = useForm<BookType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: userBook?.book.title || "",
      image: userBook?.book.image || "",
      author: userBook?.book.author || "",
      category: userBook?.book.categoryId?.toString() || "",
      description: userBook?.description || "",
      price: userBook?.price || 0,
      bookId: undefined
    },
  })

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    setLoading(true)
    setErrorMessage("")

    let response = null
    if (userBook) {
      response = await updateBook(userBook.id, values)
    } else {
      response = await createBook(values)
    }
    if (response?.error) {
      setErrorMessage(response.error)
    }
    setLoading(false)
  }

  const renderBookForm = () => {
    return (
      <div className="w-300">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Titre</FieldLabel>
                  <div className="flex items-center">
                    <div>
                      <SearchInputAutoComplete
                        defaultValue={userBook?.book.title} field={field}
                        callbackChange={(title: string) => {
                          form.setValue("title", title)
                        }}
                        callbackNotFound={async (title: string) => {
                          console.log('not found callback')
                          setAuthorDisabled(false);
                          form.setValue("author", "")
                          form.setValue("category", "")
                          form.setValue("image", "")
                          form.setValue("bookId", undefined)
                        }}
                        callback={async (id: number, title: string, author: string, image: string) => {
                          setAuthorDisabled(true);
                          form.setValue("title", title)
                          form.setValue("author", author)
                          form.setValue("image", image)
                          setCover(image)
                          if (id) {
                            form.setValue("bookId", id)
                          }
                        }} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                    <div>
                      {cover &&
                        <ImageWithLoading title={form.getValues("title")} src={cover} />
                      }
                    </div>
                  </div>
                </Field>
              )} />

            <Controller
              control={form.control}
              name="author"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Auteur</FieldLabel>
                  <Input disabled={!!userBook || authorDisabled} placeholder="auteur" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )} />

            <BookCreateInfos form={form} categories={categories} />

          </FieldGroup>
          <FormButton pending={form.formState.isSubmitting || loading}>Save</FormButton>
          {errorMessage ? <div className="p-2 bg-red-200 border border-red-400">{errorMessage}</div> : null}
        </form>

      </div>)
  }
  return (
    <div className="flex">
      <div>
        {renderBookForm()}
      </div>
    </div>
  )
}
