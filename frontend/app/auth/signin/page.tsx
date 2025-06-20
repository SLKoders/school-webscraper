"use client";

import { Input } from "@/components/ui/input"
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function SignIn() {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post("auth/signin", values)

      if (response.status === 200) {
        localStorage.setItem('Token', response.data.token);
        router.push('/webscraper');
      }
    } catch {
      console.log(values);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имейл</FormLabel>
                <FormControl>
                  <Input placeholder="имейл" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Парола</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="парола" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Влез</Button>
          <div className="text-center text-sm mt-4">
            Нямате профил?{" "}
            <Link href="/auth/signup" className="hover:underline">
              Регистрирайте се от тук
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}