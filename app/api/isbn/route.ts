// import { NextResponse } from "next/server";

// type BookInfo = {
//   title?: string;
//   authors?: string[];
//   publishDate?: string;
//   publishers?: string[];
//   pages?: number;
//   cover?: string;
//   isbn?: string;
//   raw?: any;
// };

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const rawIsbn = url.searchParams.get("isbn");
//   const isbn = rawIsbn?.replace(/[^0-9Xx]/g, "");
//   if (!isbn) {
//     return NextResponse.json({ error: "isbn query param required" }, { status: 400 });
//   }
// console.log('fetch isbn info for', isbn)
//   try {
//     // Primary lookup: OpenLibrary Books API (data + cover)
//     const bookRes = await fetch(
//       `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
//     );
//     if (bookRes.ok) {
//       const json = await bookRes.json();
//       const key = `ISBN:${isbn}`;
//       const item = json[key];
//       if (item) {
//         const book: BookInfo = {
//           title: item.title,
//           authors: item.authors?.map((a: any) => a.name) ?? [],
//           publishDate: item.publish_date,
//           publishers: item.publishers?.map((p: any) => p.name) ?? [],
//           pages: item.number_of_pages,
//           cover:
//             `https://covers.openlibrary.org/b/id/${isbn}-M.jpg`,
//           isbn,
//           raw: item,
//         };
//         return NextResponse.json({ book });
//       }
//     }
//     console.log('fetch isbn info2 for', isbn)
//     // Fallback: search endpoint (sometimes returns docs with useful metadata)
//     const searchRes = await fetch(`https://openlibrary.org/search.json?q=${isbn}&limit=1`);
//     if (searchRes.ok) {
//       const sjson = await searchRes.json();
//       const doc = sjson.docs?.[0];
//       if (doc) {
//         const book: BookInfo = {
//           title: doc.title,
//           authors: doc.author_name ?? [],
//           publishDate: Array.isArray(doc.publish_date) ? doc.publish_date[0] : doc.publish_date,
//           publishers: doc.publisher ?? [],
//           pages: doc.number_of_pages_median,
//           cover: `https://covers.openlibrary.org/b/id/${isbn}-M.jpg`,
//           isbn,
//           raw: doc,
//         };
//         return NextResponse.json({ book });
//       }
//     }

//     // Not found
//     return NextResponse.json({ book: null }, { status: 404 });
//   } catch (err) {
//     console.error("OpenLibrary lookup failed:", err);
//     return NextResponse.json({ error: "lookup failed" }, { status: 500 });
//   }
// }