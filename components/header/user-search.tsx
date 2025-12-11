"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDebounce } from "./useDebounce";
import { Input } from "../ui/input";

export type UserPseudo = {
    id: string
    pseudo: string
}


type USerSearchProps = {
}

export default function UserSearch({  }: USerSearchProps) {
    const [searchVal, setSearchVal] = useState("");
    const [debounceVal, setDebounceVal] = useState("");
    const [results, setResults] = useState<UserPseudo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [display, setDisplay] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);
    const router = useRouter()

    const debounceValue = useDebounce(searchVal, 800);

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDisplay(false)
                    setNotFound(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        console.log("Debounced:", searchVal);
        setDebounceVal(searchVal);
    }, [debounceValue]);

    useEffect(() => {
        if (debounceVal) {
            console.log("Searching for:", debounceVal);
            // Call your search function here with the debounced value
            search(debounceVal);
            
        }
    }, [debounceVal]);


    const search = async (value: string) => {
        const url = `http://localhost:3000/api/user?pseudo=${value}`
        try {
            setLoading(true)
            const response = await axios.get(url)
            console.log('response 2', response)
            if (!response.data || response.data.length === 0) {
                setNotFound(true)
                return
            }
            setNotFound(false)
            setResults(response.data)

        } catch (error) {
            console.log('err' + JSON.stringify(error))
        } finally {
            setLoading(false)
        }
    }

    const handleFocus = () => {
        setDisplay(true)
    }

    const handleChange = (e: any) => {
        setSearchVal(e.target.value);
        setDisplay(true)
    }

    const handleClick = (id: string) => {
        setLoading(true)
        setDisplay(false)
        setResults([])
        router.push(`/list-books?userId=${id}`)
        setLoading(false)
    }

    const renderResults = () => {
        if (loading) {
            return <div className="absolute rounded-md mt-1 bg-white">Chargement, veuillez patienter SVP ...</div>
        }
        if (notFound) {
            return <div>No results found.</div>
        }

        if (display && results.length > 0) {
            return (
                <div className="absolute rounded-md mt-1 bg-white border h-72 overflow-auto z-10" style={{ width: "100%"}}>
                    {results.map((user) => (
                        <button 
                            onClick={() => handleClick(user.id)}
                            className="cursor-pointer w-full text-left px-3 py-2 hover:bg-gray-100 border-b last:border-0"
                            key={user.id}>
                            {user.pseudo}
                        </button>
                    ))}
                </div>

            )
        }
        return null;
    }

    return (
        <div ref={wrapperRef} >
            <div style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                    <Input
                        value={searchVal}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        placeholder="Search..." />
                </div>
                {renderResults()}

            </div>
        </div>)
}