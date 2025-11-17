"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Search } from "lucide-react";
import axios from "axios";
import { useDebounce } from "./useDebounce";
import { Input } from "../ui/input";

type SearchInputProps = {
    redirect?: boolean;
    callback?: (id: number, title: string, author: string, categoryId: number, image: string) => void;
    callbackNotFound?: () => void;
    callbackChange?: (toto: string) => void;
    field?: any;
    defaultValue?: string;
}

export default function SearchInput({ redirect, callback, callbackNotFound, callbackChange, field, defaultValue }: SearchInputProps) {
    const [searchVal, setSearchVal] = useState(defaultValue || "");
    const [finalValue, setFinalValue] = useState("");
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
                if (callbackNotFound) {
                    callbackNotFound()
                }
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

    const handleBlur = ()=> {
        console.log('blur')
    }

    const handleFocus = () => {
        setDisplay(true)
    }

    const handleChange = (e: any) => {
        setFinalValue("")
        setSearchVal(e.target.value);
        setDisplay(true)
    }

    const handleClick = (id: number, title: string, author: string, categoryId: number, image: string) => {
        setLoading(true)
        console.log('handleClick', id)
        setDisplay(false)
        setFinalValue(title)
        setResults([])
        if (redirect) {
            router.push(`/list-books/${id}`)
        }
        if (callback) {
            callback(id, title, author, categoryId, image)
        }
        setLoading(false)
    }

    const renderResults = () => {
        if (loading) {
            return <div>Loading...</div>
        }
        if (notFound) {
            return <div>No results found.</div>
        }

        if (display) {
            return (
                <div style={{position: "absolute", backgroundColor: "white", border: "1px solid gray", zIndex: 1000, width: "100%"}}>
                    {results.map((book) => (
                        <button onClick={() => handleClick(book.id, book.title, book.author, book.categoryId, book.image)} className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" key={book.id} onSelect={() => console.log(book.title)}>
                            {book.title}
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
                {/* <InputGroup>
                    <InputGroupInput
                        disabled={!!defaultValue}
                        {...field}
                        value={defaultValue || finalValue || searchVal}
                        onFocus={handleFocus}
                        // onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Search..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup> */}
                <div style={{ position: "relative" }}>
                    <Input
                        disabled={!!defaultValue}
                        {...field}
                        value={defaultValue || finalValue || searchVal}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Search..." />
                </div>
                {renderResults()}

            </div>
        </div>)
}