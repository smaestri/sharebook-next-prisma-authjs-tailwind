"use client"

import { ReactNode } from "react"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"
import { useFormStatus } from "react-dom"

interface FormButtonProps {
  children: ReactNode
  pending?: boolean
  className?: string
  toggleBorrowModal?: any
}

export default function FormButtonActionState({ children, className }: FormButtonProps) {
  const { pending } = useFormStatus();
  console.log('pending', pending)
  return <Button
            type="submit" className={className} disabled={pending}>
              {pending && <Spinner />}
              {pending && "Chargement"}
    {!pending && children}
  </Button>
}

