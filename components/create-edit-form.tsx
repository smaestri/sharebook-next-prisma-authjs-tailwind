"use client"
import { BookWithCategory } from "@/app/my-books/page";
import React, { useActionState, useState } from "react";
import { createBook } from "@/lib/actions";
import axios from "axios";
import { Input } from "./ui/input";
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import FormButton from "./form-button";
import { SelectContent } from "@radix-ui/react-select";
import { Label } from "./ui/label";

export interface Category {
  id: string;
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
  const [catSelected, setCatSelected] = useState<string>();

  const [formState, action] = useActionState(createBook, {
    errors: {}
  })

  console.log('categories', categories)
  console.log('formState', formState)
  console.log('catSelected', catSelected)

  const renderCat = () => {
    return categories.map((cat) => <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>)
  }

  const renderBookForm = () => {

    return (
      <form action={action}>
        <div>
        <div>
        <Label htmlFor="title">Title</Label>
        <Input id="titre" placeholder="titre" />
        </div>
        <div>
        <Label htmlFor="state">author</Label>
        <Input id="author" placeholder="author" />
        </div>
        <div>
        <Label htmlFor="category">category</Label>

        <Select value={catSelected} onValueChange={(e)=> setCatSelected(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {renderCat()}
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>

        {/* <FormButton>Save</FormButton> */}
        {formState?.errors?._form ? <div className="p-2 bg-red-200 border border-red-400">{formState.errors._form?.join(', ')}</div> : null}
        </div>
        <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </form>
      
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
