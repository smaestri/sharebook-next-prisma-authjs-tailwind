import { auth, signIn } from "@/auth"
import SideBarPage from "@/components/sidebar/page"

export default async function SignIn() {

  const session = await auth()

  if (!session?.user) return (
    // <form
    //   action={async () => {
    //     "use server"
    //     await signIn("github")
    //   }}
    // >
    //   <button type="submit">Signin with GitHub</button>
    // </form>
    <div>Please sign in from ehader</div>
  )

  return (


    <div>Bienvenue</div>

  )
} 