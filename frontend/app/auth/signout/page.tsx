"use client"

import api from "@/lib/api"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
    const router = useRouter();

    async function signOut() {
        api.post("auth/signout");
        localStorage.removeItem("Token");
        router.push("/auth/signin");
    }

    useEffect(() => {
        signOut();
    }, []);

    return (
        <div>
            <h1>Sign Out</h1>
        </div>
    )
}