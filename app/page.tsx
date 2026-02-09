import { auth } from "@/auth"
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import RecentBooksCarousel from "@/components/RecentBooksCarousel";
import CityClient from "@/components/CityClient";

export default async function SignIn() {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  // fetchu user from DB to get address
  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id,
    }
  });

  // is this user a pending friend for someone ? if yes move to fridn list and delete pending friend
  const pendingFriend = await prisma.pendingFriend.findFirst({
    where: {
      email: session?.user.email || "",
    }
  })
  console.log("pendingFriend", pendingFriend)
  if (pendingFriend && pendingFriend.userId && session?.user.id) {
    await prisma.friend.create({
      data: {
        userId: pendingFriend.userId,
        friendId: session?.user.id,
      }
    })
    await prisma.pendingFriend.delete({
      where: {
        id: pendingFriend.id,
      }
    })

  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Accueil</h1>
      {(!user?.cp || !user.city) && <CityClient user={user}/>}

      <div>
        <p>Bienvenue sur LivresEntreAmis! Ce site vous permet de partager vos livres, et trouver les livres que d'autres personnes partagent.</p>
        <p>Une fois votre livre trouvé, vous pourrez faire une demande à son propriétaire pour convenir d'un RDV et obtenir le livre! Il peut s'agir d'une vente, prêt ou don, au goût du propriétaire du livre!</p>
        <p>Et n'oubliez pas d'ajouter cette personne en tant qu'ami, ce qui vous permettra de facilement voir ses livres via le lien "Mes amis" du menu utilisateur! De plus, cette page vous permet d'inviter une personne qui ne serait pas encore inscrite: quand celle-ci se connectera au site, elle deviendra automatiquement votre ami!</p>
        <p>Bonne visite!</p>
        </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Derniers livres ajoutés</h2>
        <RecentBooksCarousel />
      </div>
    </>

  )
} 