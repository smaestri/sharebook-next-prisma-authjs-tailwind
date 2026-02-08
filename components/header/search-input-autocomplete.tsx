"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDebounce } from "./useDebounce";
import { Input } from "../ui/input";

type SearchInputAutoCompleteProps = {
    redirect?: boolean;
    callback?: (id: number, title: string, author: string, image: string) => void;
    callbackNotFound?: (title: string) => void;
    callbackChange?: (title: string) => void;
    field?: any;
    defaultValue?: string;
}

export default function SearchInputAutoComplete({ redirect, callback, callbackNotFound, callbackChange, field, defaultValue }: SearchInputAutoCompleteProps) {
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
        const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/search?value=${value}`
        try {

            setLoading(true)
            const response = await axios.get(url)
            console.log('response 2', response)
            if (response.data.books.length === 0) {
                setResults([])
                setNotFound(true)
                if (callbackNotFound) {
                    callbackNotFound(searchVal)
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

    const handleFocus = () => {
        setDisplay(true)
    }

    const handleChange = (e: any) => {
        setFinalValue("")
        setSearchVal(e.target.value);
        callbackChange && callbackChange(e.target.value)
        setDisplay(true)
    }

    const handleClick = (id: number, title: string, author: string, image: string) => {
        setLoading(true)
        console.log('handleClick', id)
        setDisplay(false)
        setFinalValue(title)
        setResults([])
        if (redirect) {
            setFinalValue("")
            setSearchVal("")
            if(id && id != 0 ){
                router.push(`/list-books/${id}`)
            } else {
                router.push(`/list-books/0?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&image=${encodeURIComponent(image)}`)
            }
        }
        if (callback) {
            callback(id, title, author, image)
        }
        setLoading(false)
    }

    const renderResults = () => {
        if (loading) {
            return <div className="absolute rounded-md mt-1 bg-white">Chargement, veuillez patienter SVP ...</div>
        }
        if (!callbackNotFound && notFound) {
            return <div>No results found.</div>
        }

        if (display && results.length > 0) {
            return (
                <div className="absolute rounded-md mt-1 bg-white border h-72 overflow-auto z-10" style={{ width: "100%"}}>
                    {results.map((book) => (
                        <button 
                            onClick={() => handleClick(book.id, book.title, book.author, book.image)}
                            className="cursor-pointer w-full text-left px-3 py-2 hover:bg-gray-100 border-b last:border-0"
                            key={book.id}>
                            {book.title} ({book.author})
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
                        onChange={handleChange}
                        placeholder="Search..." />
                </div>
                {renderResults()}

            </div>
        </div>)
}