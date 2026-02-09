import axios from "axios";
import * as cheerio from 'cheerio';

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
    const cp = searchParams.get('cp')
    console.log('api GEO called with isbn' + cp)
    const url = `https://apicarto.ign.fr/api/codes-postaux/communes/${cp}`
    console.log('url', url)
    try {
        const response = await axios.get(url, {
          headers: {
            "User-Agent": "axios 0.21.1"
          }
        });
        return Response.json({ cities: response.data }, {
          status: 200,
          headers: corsHeaders,
        })

      } catch (error) {
        console.log('err' + JSON.stringify(error))
      }
      return Response.error();

}