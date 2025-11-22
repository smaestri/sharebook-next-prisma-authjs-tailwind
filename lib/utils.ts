import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const times = [
//   { id: '10_to_12', label: '10h à midi' },
//   { id: '12_to_14', label: '12h à 14h' },
//   { id: '14_to_16', label: '14h à 16h' },
//   { id: '16_to_18', label: '16h à 18h' },
//   { id: '18_to_20', label: '18h à 20h' },
//   { id: '20_to_22', label: '20h à 22h' }
// ]

export const formatDate = (stringFromDb:string) => {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
      }).format(new Date(stringFromDb))
}

export type BookInfo = {
  author: string | null,
  title: string | null,
  cover: string| null,
}

export const getBookInfoFromLib = async (search: string): Promise<BookInfo> => {
    let author = ""
    let coverId = ""
    let title = ""
    const q = (search || "").trim().replace(/\s+/g, '+');
    console.log('new q', q)

    const searchRes = await fetch(`https://openlibrary.org/search.json?title=${q}&limit=1`);
    if (searchRes.ok) {
      const sjson = await searchRes.json();
      const doc = sjson.docs?.[0];
      console.log('isbn for search', search, doc)
      if (doc) {
        title = doc["title"]
        console.log('title found', title)
        const authors = doc["author_name"]
        if (authors && authors.length > 0) {
          author = authors[0]
        }
        coverId = doc["cover_i"]
        if (!coverId) {
          const isbns = doc["isbn"]
          if (isbns && isbns.length > 0) {
            return {
              cover: `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbns[0])}-M.jpg?default=false`,
              author: null,
              title
            }
          }
          return {
            cover: `https://ui-avatars.com/api/?name=${encodeURIComponent(search || "Book")}&size=512`,
            author: null,
            title
          }


        }
        console.log('found coverId', coverId)
        return {
          cover: "https://covers.openlibrary.org/a/id/" + coverId + "-M.jpg",
          author,
          title
        }
      };
    }
    console.log('err getting cover for ', search)
    return {
      cover: `https://ui-avatars.com/api/?name=${encodeURIComponent(search || "Book")}&size=512`,
      author: null,
      title
    }
  };