"use client"
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const router = useRouter();

    const [email, setEmail] = useState();
    const [dateJoined, setDateJoined] = useState();

    async function loadProfile() {
        try {
            console.log("Loading profile...");
            const response = await api.get("auth/me");
            setEmail(response.data.user.email);
            setDateJoined(response.data.user.date_joined);
        } catch (error) {
            console.error("Error loading profile:", error);
            router.push('auth/signin');
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <Label>Email: { email }</Label>
            <Label>Date Joined: { dateJoined }</Label>
        </div>
    )
}