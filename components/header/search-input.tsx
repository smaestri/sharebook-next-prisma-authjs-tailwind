"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Search } from "lucide-react";
import axios from "axios";
import { useDebounce } from "./useDebounce";

export default function SearchInput({redirect, callback}: any) {
    const [searchVal, setSearchVal] = useState("");
    const [debounceVal, setDebounceVal] = useState("");
    const router = useRouter()

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [display, setDisplay] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

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
        const url = `http://localhost:3000/api/search?value=${value}`
        try {

            setLoading(true)
            const response = await axios.get(url)
            console.log('response 2', response)
            if (response.data.books.length === 0) {
                setResults([])
                setNotFound(true)
                return
            }
            setNotFound(false)

            setResults(response.data.books)
        } catch (error) {
            console.log('err' + JSON.stringify(error))
        } finally {
            setLoading(false)
        }
    }

    // const handleBlur = ()=> {
    //     setDisplay(false)
    //     setNotFound(false)
    // }

    const handleFocus = () => {
        setDisplay(true)
    }

    const handleChange = (e: any) => {
        setSearchVal(e.target.value);
        setDisplay(true)
    }

    const handleClick = (id: number, author: string, categoryId: number, image: string) => {
        setLoading(true)
        console.log('handleClick', id)
        setDisplay(false)
        if(redirect) {
            router.push(`/list-books/${id}`)
        }
        if(callback) {
            callback(id, author, categoryId, image)
        }
        setLoading(false)
    }

    console.log('display', display)

    const renderResults = () => {
        if (loading) {
            return <div>Loading...</div>
        }
        if (notFound) {
            return <div>No results found.</div>
        }
        return (
            <div className="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto">
                {display && <div className="text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium">
                    {results.map((book) => (
                        <button onClick={() => handleClick(book.id, book.author, book.categoryId, book.image)} className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" key={book.id} onSelect={() => console.log(book.title)}>
                            {book.title}
                        </button>
                    ))}
                </div>}
            </div>
        )
    }

    return (

        <div ref={wrapperRef} className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md border shadow-md outline-hidden w-[200px] p-0">
            <div className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md">

                <InputGroup>
                    <InputGroupInput
                        value={searchVal}
                        onFocus={handleFocus}
                        // onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Search..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
                {renderResults()}

            </div>
        </div>)
}