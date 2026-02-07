"use client"
import { removeFriend } from "@/lib/actions"
import { X } from "lucide-react"
import { useState } from "react"

export default function RemoveFriendButton({ friendId }: { friendId: string }) {
    const [loading, setLoading] = useState(false)

    const handleRemove = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet ami ?")) return
        setLoading(true)
        await removeFriend(parseInt(friendId))
        setLoading(false)
    }

    if (loading) return <div className="ml-2 p-1 rounded text-red-600 opacity-60">Veuillez patienter...</div>

    return (
        <button
            onClick={handleRemove}
            disabled={loading}
            className="ml-2 p-1 hover:bg-red-100 rounded text-red-600 disabled:opacity-60"
            title="Remove friend"
        >
            <X size={20} />
        </button>
    )
}
