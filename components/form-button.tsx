"use client"

import { ReactNode } from "react"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

interface FormButtonProps {
  children: ReactNode
  pending?: boolean
  className?: string
  toggleBorrowModal?: any
  onClick?: () => void
}

export default function FormButton({ children, className, pending = false, onClick }: FormButtonProps) {
 // const { pending } = useFormStatus();
  console.log('pending', pending)
  return <Button onClick={()=> {if (onClick) onClick()}}
            type="submit" className={className} disabled={pending}>
              {pending && <Spinner />}
              {pending && "Chargement"}
    {!pending && children}
  </Button>
}

