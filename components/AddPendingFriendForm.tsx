"use client"
import { useState } from "react"
import { Input } from "./ui/input"
import FormButton from "./form-button"
import { addAsPendingFriend } from "@/lib/actions"

export default function AddPendingFriendForm() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        await addAsPendingFriend(email)
        setEmail("")
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-start">
            <div className="flex-1">
                <Input
                    type="email"
                    placeholder="Entrez l'email de votre ami"
                    className="border p-2 rounded w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
            </div>
            <FormButton
                pending={loading}
                className="cursor-pointer"
            >
                Envoyer invitation
            </FormButton>
        </form>
    )
}
