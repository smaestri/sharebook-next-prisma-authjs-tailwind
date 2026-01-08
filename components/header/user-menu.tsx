"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import ModalSignin from './ModalSignin';
import Image from 'next/image'
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { signOut, useSession } from '@/auth-client';


interface AccountProps {
  borrowsCount: number
  lendsCount: number
}

export default function UserMenu({ borrowsCount, lendsCount }: AccountProps) {
  const router = useRouter()
  //const { userConnected, loading }: any = useUserContext();
  const [modalSigninOpen, setModalSigninOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [modalFriendOpen, setModalFriendOpen] = useState(false);
    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession() 

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

      <ModalSignin isOpen={modalSigninOpen} onClose={() => setModalSigninOpen(false)} />
      {/* <ModalFriend isOpen={modalFriendOpen} onClose={() => setModalFriendOpen(false)} /> */}
      {session?.user && session?.user?.image && <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger>
          
          <div style={{ position: "relative" }}>
            {lendsCount + borrowsCount > 0 ?
            <Tooltip>
              <TooltipTrigger asChild>
                <ExclamationTriangleIcon style={{ position: "absolute", bottom: 0, right: 0 }} className="size-7 text-red-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Vous avez des achat(s) ou vente(s) en cours</p>
              </TooltipContent>
            </Tooltip>
            : null}
            <Image
              className='cursor-pointer'
              src={session?.user?.image}
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="Profile Actions">
          <DropdownMenuItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as {session?.user.email}</p>
          </DropdownMenuItem>
          <DropdownMenuItem key="books">
            <Link href="/my-books" onClick={() => setMenuOpen(false)}>Ma bibiliothèque</Link>
          </DropdownMenuItem>
          <DropdownMenuItem key="purchases">
            <div>
              <Link href="/purchases" onClick={() => setMenuOpen(false)}>Mes achats</Link>
              {borrowsCount > 0 && <Badge variant="destructive">{borrowsCount}</Badge>}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem key="sales">
            <div>
              <Link href="/sales" onClick={() => setMenuOpen(false)}>Mes ventes</Link>
              {lendsCount > 0 && <Badge variant="destructive">{lendsCount}</Badge>}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem key="account">
            <Link href="/account" onClick={() => setMenuOpen(false)}>Mes infos</Link>
          </DropdownMenuItem>
          <DropdownMenuItem key="logout" color="danger" onClick={() => { setMenuOpen(false); signOutAndRedirect(); }}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>}
    </>

  )
}
