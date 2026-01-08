"use client"

import googleIcon from '../../public/google-icon.svg'
import githubIcon from '../../public/github-icon-light.svg'
import Image from "next/image"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'
import { signIn } from '@/auth-client'

const ModalSignin = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle>
            Choisir un provider
          </DialogTitle></DialogHeader>
        <div className="flex justify-center items-center gap-6 my-4">
          <button
            onClick={() => signIn.social({ provider: "github", callbackURL: "/" })}
            aria-label="Se connecter avec GitHub"
            className="p-1 rounded-full transition-transform transform hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Image
              src={githubIcon}
              alt="Github"
              width={48}
              height={48}
            />
          </button>
          <button
            onClick={() => signIn.social({ provider: "google", callbackURL: "/" })}
            aria-label="Se connecter avec Google"
            className="p-1 rounded-full transition-transform transform hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Image
              src={googleIcon}
              alt="Google"
              width={48}
              height={48}
            />
          </button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
}

export default ModalSignin;