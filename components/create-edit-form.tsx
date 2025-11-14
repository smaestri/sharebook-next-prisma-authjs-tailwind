"use client"
import React, { useState } from "react";
import { createBook, updateBook } from "@/lib/actions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import FormButton from "./form-button";
import { Controller, useForm } from "react-hook-form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { bookSchema, BookType } from "@/lib/ValidationSchemas";
import { UserBookWithBookAndUser } from "@/lib/DbSchemas";
import SearchInput from "./header/search-input";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";

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
  // const [isbn, setIsbn] = useState<string>("");
  // const [loadin, setLoading] = useState<boolean>();

  const renderCat = () => {
    return categories.map((cat) => <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>)
  }
  console.log('all cats', categories)
  console.log('userBook passed', userBook)

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

  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => console.log("WATCH" + value, name, type));
    return () => subscription.unsubscribe();
  }, [form.watch]);

  console.log('cat:' + form.getValues("category"))
  console.log('desc:' + form.getValues("description"))

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    console.log("onSubmit ", values)
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
  }
  // const handleIsbnChanged = async (event: any) => {
  //   console.log('isbn changed', event.target.value)
  //   const isbn = event.target.value
  //   const url = `http://localhost:3000/api/isbn?isbn=${isbn}`
  //   try {
  //     setLoading(true)
  //     const response = await axios.get(url)
  //     console.log('response from openlibrary', response)
  //     form.setValue("title", response.data.book.title)
  //     form.setValue("author", response.data.book.authors[0] )


  //   } catch (error) {
  //     console.log('err' + JSON.stringify(error))
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const renderBookForm = () => {
    return (
      <div className="w-300">
         {/* <FormProvider {...form} > */}
      <form onSubmit={form.handleSubmit(onSubmit)}>

        {/* <Controller
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <Field>
                <FieldLabel>Isbn</FieldLabel>
                <FormControl onChange={handleIsbnChanged}>
                  <Input placeholder="isbn" {...field} />
                </FormControl>
                <FormMessage />
              </Field>
            )} /> */}

        {/* <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <Field>
                <FieldLabel>Titre</FieldLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </Field>
            )} /> */}
        <FieldGroup>

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Titre</FieldLabel>
                <SearchInput defaultValue={userBook?.book.title} field={field} callback={(id: number, title: string, author: string, categoryId: number, image: string) => {
                  form.setValue("title", title)
                  form.setValue("author", author)
                  form.setValue("category", categoryId.toString())
                  form.setValue("image", image)
                  form.setValue("bookId", id.toString())
                }} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )} />

          <Controller
            control={form.control}
            name="author"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Auteur</FieldLabel>
                <Input disabled={!!userBook} placeholder="auteur" {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )} />

          <Controller
            control={form.control}
            name="category"
            render={({ field, fieldState }) => (
              <Field>test-sma{field.value}
                <FieldLabel>Catégorie</FieldLabel>
                <Select disabled={!!userBook} name={field.name} value={field.value} onValueChange={field.onChange}>
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
        <FormButton>Save</FormButton>
        {errorMessage ? <div className="p-2 bg-red-200 border border-red-400">{errorMessage}</div> : null}
        {/* <div>
        {loadin ? <div>Loading book info...</div> : null}
                            <Image
                                src={form.getValues("image")}
                                alt={form.getValues("title")}
                                width={100}
                                height={100}
                            />
      </div> */}
      </form>
          {/* </FormProvider> */}
 <button
        type="button"
        onClick={() => {
          const values = form.getValues(); 
          console.log("Current form values:", values);
         
        }}
      >
        Get Values
      </button>
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
