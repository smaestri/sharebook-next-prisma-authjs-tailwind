"use client"
import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import FormButton from "./form-button"
import { addAsPendingFriend } from "@/lib/actions"

export default function AddPendingFriendForm() {
    const [email, setEmail] = useState("")
    const [formState, action, isPending] = useActionState(addAsPendingFriend.bind(null, email), { message: '' })
    
    return (
        <form action={action} className="flex gap-2 items-start">
            <div className="flex-1">
                <Input
                    type="email"
                    placeholder="Entrez l'email de votre ami"
                    className="border p-2 rounded w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                />
            </div>
            <FormButton
                pending={isPending}
                className="cursor-pointer"
            >
                Envoyer invitation
            </FormButton>
            {formState?.message && <div className="text-sm text-red-500">{formState.message}</div>}
        </form>
    )
}
