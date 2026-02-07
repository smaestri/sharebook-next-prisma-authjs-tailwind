import { auth } from "@/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import RemoveFriendButton from "@/components/RemoveFriendButton";
import FriendLine from "@/components/friend-line";

export default async function MyFriends() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) return (
        <div>Please connect</div>
    )
    const friends = await prisma.friend.findMany({
        include: {
            friend: {
                include: {
                    UserBook: {
                        include: {
                            book: true
                        },
                        where: {
                            deleted: false,
                        }
                    }
                }
            }
        },
        where: {
            userId: session?.user?.id
        }
    });
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-6">Mes Amis</h1>
            {friends.length === 0 && <div>Vous n'avez pas d'amis pour le moment</div>}
            {friends.map(f =>
                <div key={f.friend.id} className="flex items-center gap-2 p-2 border rounded">
                    <FriendLine user={f.friend} />
                    <RemoveFriendButton friendId={f.friend.id} />
                </div>
            )}
        </div>
    )
}


