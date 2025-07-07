
"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectToHome= () => {
    const { push } = useRouter();
  
    useEffect(() => {
       push('/home');
    }, []);
    return <p></p>;
  };