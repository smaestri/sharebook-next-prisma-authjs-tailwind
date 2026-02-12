"use client"

import googleIcon from '../../public/google-icon.svg'
import githubIcon from '../../public/github-icon-light.svg'
import Image from "next/image"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'
import { signIn } from '@/auth-client'
import { useState } from 'react'
import { Spinner } from '../ui/spinner'

const ModalSignin = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleSocialSignIn = async (provider: string) => {
    try {
      setLoadingProvider(provider)
      // signIn.social should trigger a redirect; awaiting in case it returns a promise
      await (signIn.social({ provider, callbackURL: provider === 'google' ? process.env.REDIRECT_URL_GOOGLE : process.env.REDIRECT_URL_GITHUB }))
    } catch (err) {
      // if sign-in fails synchronously, remove loading state
      console.error('Social sign-in error', err)
      setLoadingProvider(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle>
            Choisir un fournisseur avec lequel vous souhaitez vous connecter sur LivresEntreAmis: 
          </DialogTitle></DialogHeader>
        <div className="flex justify-center items-center gap-6 my-4">
          <button
            onClick={() => handleSocialSignIn('github')}
            aria-label={loadingProvider === 'github' ? 'Connexion en cours...' : 'Se connecter avec GitHub'}
            aria-busy={loadingProvider === 'github'}
            disabled={!!loadingProvider}
            className={`flex flex-col items-center gap-2 p-1 cursor-pointer rounded-full transition-transform transform hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-offset-2 focus:ring-primary ${loadingProvider ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loadingProvider === 'github' ? (
              <Spinner className="w-12 h-12" />
            ) : (
              <Image
                src={githubIcon}
                alt="Github"
                width={48}
                height={48}
              />
            )}
            <span className="text-sm font-medium">Github</span>
          </button>
          <button
            onClick={() => handleSocialSignIn('google')}
            aria-label={loadingProvider === 'google' ? 'Connexion en cours...' : 'Se connecter avec Google'}
            aria-busy={loadingProvider === 'google'}
            disabled={!!loadingProvider}
            className={`flex flex-col items-center gap-2 p-1  cursor-pointer rounded-full transition-transform transform hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-offset-2 focus:ring-primary ${loadingProvider ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loadingProvider === 'google' ? (
              <Spinner className="w-12 h-12" />
            ) : (
              <Image
                src={googleIcon}
                alt="Google"
                width={48}
                height={48}
              />
            )}
            <span className="text-sm font-medium">Google</span>
          </button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={!!loadingProvider}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
}

export default ModalSignin;