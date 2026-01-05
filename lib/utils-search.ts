import prisma from "./prisma"

export type ResultBookInfo = {
  numFound: number,
  start: number,
  booksFound: BookInfo[]
}


export type BookInfo = {
  id?: number
  author: string | null,
  title: string | null,
  image: string | null,
  foundInDb?: boolean | undefined
}


export const getBookInfoFromLib = async (search: string, page?: number, numberOfItemsPerPage?: number, searchType?: string): Promise<ResultBookInfo> => {
  let author = ""
  let coverId = ""
  let title = ""
  const q = (search || "").trim().replace(/\s+/g, '+');
  const url = `https://openlibrary.org/search.json?${searchType}=${q}&limit=${numberOfItemsPerPage}&page=${page}&lang=fre`
  console.log('Fetching from OpenLibrary URL: ', url)
  const searchRes: any = await fetch(url);
  let result: ResultBookInfo

  const booksInfo: BookInfo[] = []
  if (searchRes.ok) {
    const sjson = await searchRes.json();
    const docs = sjson.docs;
    result = {
      numFound: sjson.numFound,
      start: sjson.start,
      booksFound: []
    }
    for (const doc of docs) {
      if (doc) {
        title = doc["title"]
        const isbns = doc["isbn"]
        const authors = doc["author_name"]
        if (authors && authors.length > 0) {
          author = authors[0]
        }
        coverId = doc["cover_i"]
        if (!coverId) {
          if (isbns && isbns.length > 0) {
            booksInfo.push({
              image: `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbns[0])}-M.jpg?default=false`,
              author: author || "Unknown Author",
              title,
            })
          } else {
            booksInfo.push({
              image: `https://ui-avatars.com/api/?name=${encodeURIComponent(search || "Book")}&size=512`,
              author: author || "Unknown Author",
              title
            })

          }
        } else {
          booksInfo.push({
            image: "https://covers.openlibrary.org/a/id/" + coverId + "-M.jpg",
            author,
            title
          })
        }
      } else {
        console.log('doc is null for search ', search)
      }
      /// if boos exists in DB with this title, place it at the top
      const titlesFromLibFound: string[] = booksInfo.map(item => item.title ? item.title : "");
     
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

        for (const bookItem of booksInfo) {
          if (bookItem.title && titlesInDb.includes(bookItem.title)) {
            bookItem.foundInDb = true
            bookItem.id = booksinDb.find(b => b.title === bookItem.title)?.id
          }
        }
        // filter
        booksInfo.sort(item => {
          return item.foundInDb ? -1 : 1
        })
      }

    }
    result.booksFound = booksInfo

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
}


export const getBookInfoFromLibForBookCreation = async (search: string): Promise<BookInfo[]> => {
  let author = ""
  let coverId = ""
  let title = ""
  const q = (search || "").trim().replace(/\s+/g, '+');
  const searchRes = await fetch(`https://openlibrary.org/search.json?title=${q}&limit=20&lang=fre`);
  const result: BookInfo[] = []
  if (searchRes.ok) {
    const sjson = await searchRes.json();
    const docs = sjson.docs;
    for (const doc of docs) {
      if (doc) {
        title = doc["title"]
        const isbns = doc["isbn"]
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
        for (const bookItem of result) {
          if (bookItem.title && titlesInDb.includes(bookItem.title)) {
            bookItem.foundInDb = true
            bookItem.id = booksinDb.find(b => b.title === bookItem.title)?.id
          }
        }
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