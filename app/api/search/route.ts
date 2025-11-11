import { search } from "@/app/generated/prisma/sql";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const value = searchParams.get('value')
  if (!value) {
    return Response.json({ books: [] })
  }
  console.log('api SEARCH called with value' + value)
  const books = await prisma.$queryRawTyped(search(value + ":*"))
  // const books = await prisma.book.findMany({ take: 5 });
  console.log('result', books)
  //  const books:any = []
  return Response.json({ books })
}