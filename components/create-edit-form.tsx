"use client"
import { useFormState } from "react-dom";
import { BookWithCategory } from "@/app/my-books/page";
import React, { useActionState, useState } from "react";
import { createBook } from "@/lib/actions";
import axios from "axios";
import { Input } from "./ui/input";
import { Select, SelectItem } from "./ui/select";
import FormButton from "./form-button";
import { SelectContent } from "@radix-ui/react-select";

export interface Category {
  id: number;
  name: string
}

export interface CreateEditBookFormProps {
  book?: BookWithCategory
  categories: Category[]
}

const states = [
  { id: "NEW", label: "Neuf" },
  { id: "GOOD", label: "Bon état" },
  { id: "AVERAGE", label: "Moyen" },
  { id: "BAD", label: "Mauvais état" }]


export default function CreateEditBookForm({ categories, book }: CreateEditBookFormProps) {
  // need to transform ID in string to display Select correctly
  //const categoriesFormatted = categories.map((cat: any) => ({ ...cat, id: cat.id.toString() }))

  const [fetchedBook, setFetchedBook] = useState<BookWithCategory>();
  const [loading, setLoading] = useState<boolean>();
  const [showPrice, setShowPrice] = useState<boolean>(false);

  const [formState, action] = useActionState(createBook, {
    errors: {}
  })

  console.log('formState', formState)

  const onIsbnChanged = async (event: any) => {
    setLoading(true)
    setFetchedBook(undefined)
    let isbn: string = event.target.value;
    console.log('isbn', isbn)
    isbn = isbn.replace("-", "").trim()
    const url = `http://localhost:3000/api/amazon?isbn=${isbn}`
    if (!isbn || (isbn.length != 10 && isbn.length != 13)) {
      return
    }

    try {
      const response = await axios.get(url)
      setFetchedBook(response.data)
    } catch (error) {
      console.log('err' + JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  const renderbookInfo = () => {
    return (<div className="flex flex-col">
      <div>Titre: {fetchedBook?.title}</div>
      <div>Author: {fetchedBook?.author}</div>
      <div>Catégorie: {fetchedBook?.category}</div>
      <div>
        <img src={fetchedBook?.image} />
      </div>
    </div>
    )

  }

  const togglePrice = (event: any) => {
    console.log(event.target.value)
    if (event.target.value === "sell") {
      setShowPrice(true)
      return
    }
    setShowPrice(false)
  }

  console.log('show proce', showPrice)
  const renderBookForm = () => {

    return (
        <form action={action}>
          <Input name="isbn" placeholder="isbn" onChange={onIsbnChanged} value={fetchedBook?.isbn} />
          <input name="title" type="hidden" value={fetchedBook?.title}></input>
          <input name="author" type="hidden" value={fetchedBook?.author}></input>
          <input name="image" type="hidden" value={fetchedBook?.image}></input>
          {/* <Select
            label="Category"
            defaultSelectedKeys={book?.category.id ? [book.category.id.toString()] : undefined}
            items={categories} name="category">
            {(category: any) => (
              <SelectItem key={category.id} value={category.id} >{category.name}</SelectItem>
            )}
          </Select> */}
          <Select
            name="state">
              <SelectContent>
                <SelectItem value={"test"}></SelectItem>
              </SelectContent>
          </Select>
          {/* <RadioGroup orientation="horizontal" onChange={togglePrice}>
            <Radio value='sell' >Je le vends</Radio>
            <Radio value='give' >Je le donne</Radio>
          </RadioGroup> */}
          {showPrice && <span>Prix: <Input name="price" placeholder="prix" /></span>}
          <FormButton>Save</FormButton>
          {formState.errors._form ? <div className="p-2 bg-red-200 border border-red-400">{formState.errors._form?.join(', ')}</div> : null}
        </form>
     )
  }
  return (
    <div className="flex justify-center gap-4">
      <div className="w-[250px]">
        {renderBookForm()}
      </div>
      <div className="w-[250px]">
        {loading && <div>Chargement des informations du livre, veuillez patienter ...</div>}
        {fetchedBook && renderbookInfo()}
      </div>
    </div>
  )
}
