import CreateEditBookForm from "@/components/create-edit-form";
import prisma from "@/lib/prisma";

export default async function CreateBook() {
   const categories : any= await prisma.category.findMany();
  return (
    <CreateEditBookForm categories={categories || []} />
  )
}
