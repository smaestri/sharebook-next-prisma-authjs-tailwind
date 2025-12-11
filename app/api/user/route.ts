import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const pseudo = searchParams.get('pseudo')
  if (!pseudo) {
    return Response.json(null)
  }

    const session = await auth.api.getSession({
      headers: await headers()
    })
    const email = session?.user.email


  console.log('api SEARCH called with value' + pseudo)
  const users = await prisma.user.findMany({
    where: {
      pseudo: {
        contains: pseudo || "",
      },
      NOT: {
        email: email || "",
      }
    }
  })

  const result = users.map((user) => ({
    id: user.id,
    pseudo: user.pseudo,
  }))

  console.log('result', result)
  return Response.json(result)
  // }
}