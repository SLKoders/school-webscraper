"use client"

import api from "@/lib/api"
import { useRouter } from "next/navigation";

export default function SignOut() {
    const router = useRouter();

    async function signOut() {
        api.post("auth/signout");

        router.push("auth/signin");
    }

    signOut();

    return (
        <div>
            <h1>Sign Out</h1>
        </div>
    )
}