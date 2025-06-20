"use client"

import api from "@/lib/api"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
    const router = useRouter();

    async function signOut() {
        try {
            api.post("auth/signout");
            localStorage.removeItem("Token");
            router.push("/auth/signin");
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        signOut();
    }, []);

    return (
        <></>
    )
}