"use client"

import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import Link from "next/link"

export default function SignUp() {
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }),
        password1: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        password2: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password1: "",
          password2: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        const response = await api.post("auth/signup", values)

        if (response.status === 200) {
            router.push('/');
        }

        console.log(response.data);
    }

    return (
        <div className="flex items-center justify-center min-h-screen text-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имейл</FormLabel>
                                <FormControl>
                                    <Input placeholder="имейл" {...field}></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Парола</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="парола" {...field}></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Парола... </FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="...отново :D" {...field}></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Регистрирай се</Button>
                    <div className="text-center text-sm mt-4">
                        Имаш профил?{" "}
                        <Link href="/auth/signin" className="hover:underline">
                            Влез от тук
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}