import { auth, signIn } from "@/auth"
 
export default async function SignIn() {

  const session = await auth()
 
  if (!session?.user) return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  )
 
  return (
    <div>Bienvenue! 
      <img src={session?.user?.image} alt="User Avatar" />
    </div>



  )
} 