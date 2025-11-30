"use client"

import { useFormStatus } from "react-dom"
import { ReactNode } from "react"
import { Button } from "./ui/button"

interface FormButtonProps {
  children: ReactNode
  disabled?: boolean
  className?: string
  toggleBorrowModal?: any
}

export default function FormButton({ children, className, disabled = false }: FormButtonProps) {
  const { pending } = useFormStatus();
  return <Button
            type="submit" className={className} disabled={pending || disabled}>
    {children}
  </Button>
}

