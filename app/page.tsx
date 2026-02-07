import { auth } from "@/auth"
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { User } from "./generated/prisma";
import ModalCity from "./AdditionalUserInfos/ModalCity";

export default async function SignIn() {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session?.user) return (
    <div>Please sign in.</div>
  )

  // fetchu user from DB to get address
  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id,
    }
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Accueil</h1>
      {(!user?.cp || !user.city) && <ModalCity email={user?.email || ""} isOpen={true} />}

      <div>Bienvenue</div>
    </>

  )
} 