"use client"
import ModalCity from "@/app/AdditionalUserInfos/ModalCity";
import { useState } from "react";


export default function CityClient({ user }: any) {

    const [modalOpen, setModalOpen] = useState(true);

    return (
        <ModalCity email={user?.email || ""} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    )
}