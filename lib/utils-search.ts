import { Item } from "@radix-ui/react-dropdown-menu"
import prisma from "./prisma"

export type BookInfo = {
  id?: number
  author: string | null,
  title: string | null,
  image: string | null,
  foundInDb?: boolean | undefined
}


export const getBookInfoFromLib = async (search: string): Promise<BookInfo[]> => {
  let author = ""
  let coverId = ""
  let title = ""
  const q = (search || "").trim().replace(/\s+/g, '+');
  console.log('new q', q)
  const searchRes = await fetch(`https://openlibrary.org/search.json?title=${q}&limit=20&lang=fre`);
  const result: BookInfo[] = []
  if (searchRes.ok) {
    const sjson = await searchRes.json();
    const docs = sjson.docs;
    console.log('found' + docs.length + ' docs for search ' + search)
    for (const doc of docs) {
      if (doc) {
        title = doc["title"]
        const isbns = doc["isbn"]
        console.log('title', title)
        const authors = doc["author_name"]
        if (authors && authors.length > 0) {
          author = authors[0]
        }
        coverId = doc["cover_i"]
        if (!coverId) {
          if (isbns && isbns.length > 0) {
            result.push({
              image: `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbns[0])}-M.jpg?default=false`,
              author: author || "Unknown Author",
              title
            })
          } else {
            result.push({
              image: `https://ui-avatars.com/api/?name=${encodeURIComponent(search || "Book")}&size=512`,
              author: author || "Unknown Author",
              title
            })

          }
        } else {
          console.log('found coverId', coverId)

          result.push({
            image: "https://covers.openlibrary.org/a/id/" + coverId + "-M.jpg",
            author,
            title
          })
        }
      } else {
        console.log('doc is null for search ', search)
      }

      const titlesFromLibFound: string[] = result.map(item => item.title ? item.title : "");
      console.log('titlesFound', titlesFromLibFound);
      if (titlesFromLibFound.length > 0) {
        //if book already exist in DB, place it at the top
        const booksinDb = await prisma.book.findMany({
          where: {
            title: {
              in: titlesFromLibFound
            }
          }
        })

        const titlesInDb: string[] = booksinDb.map(book => book.title);
        console.log('titlesInDb', titlesInDb);

        for (const bookItem of result) {
          if (bookItem.title && titlesInDb.includes(bookItem.title)) {
            console.log('book found in DB for title', bookItem.title)
            bookItem.foundInDb = true
            bookItem.id = booksinDb.find(b => b.title === bookItem.title)?.id
          }
        }
        // filter
        result.sort(item => {
          return item.foundInDb ? -1 : 1
        })
      }

    }
    console.log('result length from OpenLibrary for search ', search, result.length)
    return result
  } else {
    console.log('Error fetching from OpenLibrary for search ', search)
  }
  console.log('err getting cover for ', search)
  // result.push( {
  //   cover: `https://ui-avatars.com/api/?name=${encodeURIComponent(search || "Book")}&size=512`,
  //   author: null,
  //   title
  // })
  return []
}