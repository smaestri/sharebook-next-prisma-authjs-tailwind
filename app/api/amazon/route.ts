import axios from "axios";
import * as cheerio from 'cheerio';
import { Categories } from "./mapping-category";

export async function GET(request: Request) {
  console.log('request.url',request.url)
    const { searchParams } = new URL(request.url)
    const isbn = searchParams.get('isbn')
    console.log('api called with isbn' + isbn)
    const url = `http://amazon.fr/s?k=${isbn}&i=stripbooks&__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=23EPQ78KSIEAG&sprefix=${isbn}%2Cstripbooks%2C148&ref=nb_sb_noss`;   
    //const url = `https://www.amazon.fr/s?i=stripbooks&rh=p_66\:${isbn}`
    console.log('url', url)
    // try {
    //     const response = await axios.get(url, {
    //       headers: {
    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    //       }
    //     });

    //     const $ = cheerio.load(response.data)
    //     const res = $("body").find("h2.a-size-medium");
    //     //const title = res.find(".a-text-normal").first();
    //     const title = res.first().text()
  
    //     return Response.json({ title, isbn, author: "toto", image: null})

    //   } catch (error) {
    //     console.log('err' + JSON.stringify(error))
    //   }
    //   return Response.error();
            return Response.json({ title: 'abc', isbn: 'def', author: "ghj", image: null})


}