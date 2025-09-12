import prisma from "@/lib/prisma";
import SideBarView from "./SideBarView";
export default async function SideBarPage({}) {


  const categories : any= await prisma.category.findMany();


  const resCat = []

  // for each category, get counter of books
  for (const category of categories) {
    const count = await prisma.userBook.findMany({
      where: {
        book: {
          categoryId: category.id,
        },
        deleted: false
      }
    });
    resCat.push({ ...category, count: count.length });
  }
   console.log('resCat', resCat)

  return (<SideBarView categories={resCat}/>)
}
