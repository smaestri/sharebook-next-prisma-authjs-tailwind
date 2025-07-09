"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
// import { useUserContext } from '@/app/AuthProvider';
import ModalSignin from './ModalSignin';
import Image from 'next/image'
// import ModalFriend from './ModalFriend';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface AccountProps {
  userId?: string
  avatarSrc?: string
  mail?: string
}

export default function UserMenu({ }: AccountProps) {
  const router = useRouter()
  //const { userConnected, loading }: any = useUserContext();
  const [modalSigninOpen, setModalSigninOpen] = useState(false);
  // const [modalFriendOpen, setModalFriendOpen] = useState(false);
  const { data: session } = useSession()

  async function signOutAndRedirect() {
    signOut()
    router.push("/")
    router.refresh();
  }
  return (
    <>
      {!session?.user && <Button onClick={() => setModalSigninOpen(true)}>
        Connexion
      </Button>}
      {/* {session?.user  && <Button onClick={() => setModalFriendOpen(true)}>Voir les livres d'un ami</Button>} */}

      <ModalSignin isOpen={modalSigninOpen} onClose={() => setModalSigninOpen(false) }/>
      {/* <ModalFriend isOpen={modalFriendOpen} onClose={() => setModalFriendOpen(false)} /> */}
      {session?.user && session?.user?.image && <DropdownMenu>
        <DropdownMenuTrigger>
             <Image
                className='cursor-pointer'
                src={session?.user?.image}
                width={50}
                height={50}
                alt="Picture of the author"
                />

        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="Profile Actions">
          <DropdownMenuItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as {session?.user.email}</p>
          </DropdownMenuItem>
          <DropdownMenuItem key="books">Ma bibiliothèque</DropdownMenuItem>
          <DropdownMenuItem key="purchases">Mes achats</DropdownMenuItem>
          <DropdownMenuItem key="sales">Mes ventes</DropdownMenuItem>
          <DropdownMenuItem key="account">Mon compte</DropdownMenuItem>
          <DropdownMenuItem key="logout" color="danger" onClick={signOutAndRedirect}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>}
    </>

  )
}
