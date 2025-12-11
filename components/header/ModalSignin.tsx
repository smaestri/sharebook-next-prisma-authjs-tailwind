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
        <Image
          src={githubIcon}
          alt="Github"
          onClick={() => {
            signIn.social({
              provider: "github", callbackURL: "/"
            })
          }}
          className='cursor-pointer '
        />
        <Image
          src={googleIcon}
          alt="Google"
          onClick={() => {
            signIn.social({
              provider: "google", callbackURL: "/"
            })
          }}
          className='cursor-pointer '
        />
        <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
}

export default ModalSignin;