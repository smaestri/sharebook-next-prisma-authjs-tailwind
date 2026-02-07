"use client"
import FormButton from "@/components/form-button";
import { addAsFriend } from "@/lib/actions";
import { useState } from "react";

export default function AddFriendButton({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(false);
    return <FormButton  pending={loading} className="cursor-pointer" onClick={() => { setLoading(true); addAsFriend(userId); }}>Ajouter en tant qu'ami</FormButton>
}

