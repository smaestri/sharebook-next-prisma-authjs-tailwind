"use client"

import googleIcon from '../../public/google-icon.svg'
import githubIcon from '../../public/github-icon-light.svg'

import Image from "next/image"

import { useRouter } from 'next/navigation'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '../ui/dialog'
import { signIn } from "next-auth/react"
import { Button } from '../ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'

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
            signIn("github", { redirectTo: "/" })
          }}
          className='cursor-pointer '
        />
        <Image
          src={googleIcon}
          alt="Google"
          onClick={() => {
            signIn("google", { redirectTo: "/" })
          }}
          className='cursor-pointer '
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
}

export default ModalSignin;