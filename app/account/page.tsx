import { auth } from "@/auth";
import UserAccountForm from "@/components/user-account-form";
import prisma from "@/lib/prisma";

export default async function Account() {

    const session = await auth()
  
    if (!session?.user) return (
      <div>Please connect</div>
    )

    const user = session?.user

    console.log('user in account', user)
    if (!user?.id) {
      return <div>Please connect</div>
    }
    const email = user?.email;

    if(!email) {
      console.error('email not found')
      return null;
    }

    // fetch user account
    // const { data: userInfo } = await supabase
    // .from("user")
    // .select("*")
    // .eq("email", email)

    const userInfo = await prisma.user.findFirst({
      where: { email }
    })

    console.log('userInfo', JSON.stringify(userInfo))
    if(!userInfo) {
        console.error('failed to retrieve user')
        return
    }

    return (
        <UserAccountForm email={email} userInfo={userInfo} pseudo={userInfo.name} />
    )
      
}
