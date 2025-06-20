"use client"
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import api from "@/lib/api";
import { formatDateTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const router = useRouter();
    

    const [email, setEmail] = useState();
    const [dateJoined, setDateJoined] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    async function loadProfile() {
        try {
            setIsLoading(true);
            console.log("Loading profile...");
            const response = await api.get("auth/me");
            setProgress(80);
            setEmail(response.data.user.email);
            setDateJoined(response.data.user.date_joined);
            setProgress(100);
        } catch (error) {
            console.error("Error loading profile:", error);
            router.push('auth/signin');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center min-h-screen text-center"><Progress className="w-[60%]" value={progress}></Progress></div>;  // Show loading state
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <Label>Имейл: { email }</Label>
            <Label>Присъединил се на {dateJoined ? formatDateTime(new Date(dateJoined)) : 'N/A'}</Label>
        </div>
    )
}