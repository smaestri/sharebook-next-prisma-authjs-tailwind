import prisma from "@/lib/prisma";
import SideBarView from "./SideBarView";
export default async function SideBarPage({}) {


  const categories : any= await prisma.category.findMany();
 
   console.log('cate', categories)

  return (<SideBarView categories={categories}/>)
}
