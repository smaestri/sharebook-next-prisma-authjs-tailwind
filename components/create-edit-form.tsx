"use client"
import React, { useState } from "react";
import { createBook, updateBook } from "@/lib/actions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import FormButton from "./form-button";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { bookSchema, BookType } from "@/lib/ValidationSchemas copy";
import { UserBookWithBookAndUser } from "@/lib/DbSchemas";

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

  const renderCat = () => {
    return categories.map((cat) => <SelectItem value={cat.id.toString()}>{cat.name}</SelectItem>)
  }
  console.log('all cats', categories)
  console.log('userBook passed', userBook)

  const form = useForm<BookType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: userBook?.book.title || "",
      author: userBook?.book.author || "",
      category: userBook?.book.categoryId?.toString() || "",
      description: userBook?.description || "",
      price: userBook?.price || 0,
    },
  })

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    console.log("onSubmit ", values)
    setErrorMessage("")

    let response = null
    if(userBook){
      response = await updateBook(userBook.id, values)

    } else {
      response = await createBook(values)
    }
    if (response?.error) {
      setErrorMessage(response.error)
    }
  }

  const renderBookForm = () => {
    return (<>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auteur</FormLabel>
                <FormControl>
                  <Input placeholder="auteur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {renderCat()}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="prix" {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton>Save</FormButton>
          {errorMessage ? <div className="p-2 bg-red-200 border border-red-400">{errorMessage}</div> : null}
        </form>
      </Form>
    </>

    )
  }
  return (
    <div className="flex">
      <div>
        {renderBookForm()}
      </div>
    </div>
  )
}
