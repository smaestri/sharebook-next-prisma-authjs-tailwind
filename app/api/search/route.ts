import { search } from "@/app/generated/prisma/sql";
import prisma from "@/lib/prisma";
import { getBookInfoFromLib } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const value = searchParams.get('value')
  if (!value) {
    return Response.json({ books: [] })
  }
  console.log('api SEARCH called with value' + value)
  const ftsValue = value.split(" ").join(" & ")
  const books = await prisma.$queryRawTyped(search(ftsValue + ":*"))
  if (!books || books.length === 0) {
    const bookFromLib = await getBookInfoFromLib(value)
    console.log('bookFromLib', bookFromLib)
    if (bookFromLib.title) {
      const bookcreated = await prisma.book.create({
        data: {
          title: bookFromLib.title,
          author: bookFromLib.author || "Unknown Author",
          image: bookFromLib.cover || "",
          categoryId: 1
        }
      })
      console.log('bookcreated', bookcreated)
      return Response.json({ books: [bookcreated] })
    }
  }

  return Response.json({ books })
}