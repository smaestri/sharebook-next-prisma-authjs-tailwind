"use client"
import Link from "next/link";

export default function FriendLine({ user }: any) {

    return (
        <div key={user.id}>
            <Link className="underline" href={`/list-books?userId=${user.id}`}>
                <h2>{user.name} ({user.pseudo}) possède {user.UserBook?.length} livres</h2>
            </Link>

        </div>)
}