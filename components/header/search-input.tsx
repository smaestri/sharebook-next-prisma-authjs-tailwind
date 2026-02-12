"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { SearchIcon } from "lucide-react";



export default function SearchInput() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const doSearch = (q: string) => {
        const value = (q || "").trim();
        if (!value) return; // ignore empty search
        router.push(`/list-books?search=${encodeURIComponent(value)}`);
    }

    const handleSubmit = (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();
        doSearch(search);
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <InputGroupInput
                    placeholder="Rechercher par titre, auteur, nom d'utilisateur..."
                    aria-label="Search books"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton type="submit" onClick={() => doSearch(search)}>Rechercher</InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </form>)
}