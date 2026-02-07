"use client"
import { removePendingFriend } from "@/lib/actions"
import { X } from "lucide-react"
import { useState } from "react"

// interface PendingFriend {
//   id: number
//   email: string
//   createdAt?: Date | undefined
// }

export default function PendingFriendsList({ pendingFriends }: { pendingFriends: any }) {
  const [removing, setRemoving] = useState<number | null>(null)

  const handleRemove = async (pendingFriendId: number) => {
   removePendingFriend(pendingFriendId)
  }

  if (pendingFriends.length === 0) {
    return <div className="text-gray-500">Aucune invitation en cours</div>
  }

  return (
    <div className="flex flex-col gap-2">
      {pendingFriends.map((pf: any) => (
        <div key={pf.id} className="flex items-center justify-between p-2 border rounded">
          <div className="flex flex-col">
            <span className="font-medium">{pf.email}</span>
            {pf.createdAt && (
              <span className="text-sm text-gray-500">
                Invité le {new Date(pf.createdAt).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
          <button
            onClick={() => handleRemove(pf.id)}
            disabled={removing === pf.id}
            className="ml-2 p-1 hover:bg-red-100 rounded text-red-600 disabled:opacity-60"
            title="Supprimer l'invitation"

          >
            {removing === pf.id ? "Suppression..." :<X size={20} />
}
          </button>
        </div>
      ))}
    </div>
  )
}
