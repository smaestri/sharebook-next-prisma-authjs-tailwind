import { auth } from "@/auth";
import { headers } from "next/headers";

import prisma from "@/lib/prisma";
import UserAccountForm from "../AdditionalUserInfos/user-account-form";

export default async function Account() {

  const session = await auth.api.getSession({
    headers: await headers()
  })  
    if (!session?.user) return (
      <div>Please connect</div>
    )

    const user = session?.user
    if (!user?.id) {
      return <div>Please connect</div>
    }
    const email = user?.email;

    if(!email) {
      console.error('email not found')
      return null;
    }

    const userInfo = await prisma.user.findFirst({
      where: { email }
    })
    if(!userInfo) {
        console.error('failed to retrieve user')
        return
    }

    return (
        <UserAccountForm email={email} userInfo={userInfo} />
    )
      
}
