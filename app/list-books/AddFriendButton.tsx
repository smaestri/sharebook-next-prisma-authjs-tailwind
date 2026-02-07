"use client"
import FormButton from "@/components/form-button";
import { addAsFriend } from "@/lib/actions";

export default function AddFriendButton({ userId }: { userId: string }) {
    return <FormButton className="cursor-pointer" onClick={() => addAsFriend(userId)}>Ajouter en tant qu'ami</FormButton>
}

