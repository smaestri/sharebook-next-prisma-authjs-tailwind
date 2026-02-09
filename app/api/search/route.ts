import { getBookInfoFromLibForBookCreation } from "@/lib/utils-search";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const value = searchParams.get('value')
  if (!value) {
    return Response.json({ books: [] }, {
      status: 200,
      headers: corsHeaders,
    })
  }
  console.log('api SEARCH called with value' + value)
  const ftsValue = value.split(" ").join(" & ")
  const result = []
  //const books = await prisma.$queryRawTyped(search(ftsValue + ":*"))
  //result.push(...books)

  //if (!books || books.length === 0) {
    const booksFromLib = await getBookInfoFromLibForBookCreation(value)
    result.push(...booksFromLib)
    // for (const bookFromLib of booksFromLib) {
    //   console.log('bookFromLib in loop', bookFromLib)

    //     if (bookFromLib.title) {
    //       const bookcreated = await prisma.book.create({
    //         data: {
    //           title: bookFromLib.title,
    //           author: bookFromLib.author || "Unknown Author",
    //           image: bookFromLib.cover || "",
    //           categoryId: 1
    //         }
    //       })
    //       result.push(bookcreated)
    //     }
    //   }
      console.log('bookcreated', result.length)
      return Response.json({ books: booksFromLib }, {
        status: 200,
        headers: corsHeaders,
      })
   // }
}