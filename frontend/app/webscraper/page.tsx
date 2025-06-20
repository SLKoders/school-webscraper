"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import QuestionPanel from "@/components/ui/question-panel";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const categories = [
  {
    value: "bg",
    label: "Български език",
  },
  // {
  //   value: "math",
  //   label: "Mathematics",
  // },
]

export default function Webscraper() {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    // const [value, setValue] = useState("")
    // const [questions, setQuestions] = useState<Question[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formSchema = z.object({
        category: z.string().min(1, {
            message: "Category cannot be empty.",
        }),
        query: z.string().min(1, {
          message: "Query cannot be empty.",
        })
      })
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          category: "",
          query: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsSubmitting(true);
      try {
        const response = await api.get(`webscraper/scrape/${values.category}/${values.query}`);
        const data = await response.data;
        router.push(`webscraper/${data.question.id}`);
        console.log(data);
      } catch(error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }

    if (localStorage.getItem("Token") === null) {
      router.push('/auth/signin');
    }

    return (
      <div>
        <QuestionPanel></QuestionPanel>

        <div className="flex items-center justify-center min-h-screen">
              <div className="flex items-center gap-2">
                  <Form {...form}>
                  <form 
                      onSubmit={form.handleSubmit(onSubmit)}  
                      className="flex items-center gap-2" // Changed to flex row with gap
                  >
                      <FormField
                        control={form.control}
    name="category"
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[180px] justify-between"
                {...field}  // Add this line to connect with form
              >
                {field.value
                  ? categories.find((framework) => framework.value === field.value)?.label
                  : "Избери категория..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Избери категория..." className="h-9"/>
                <CommandList>
                  <CommandEmpty>Няма намерена категория.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue === field.value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {framework.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            field.value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormControl>
        {/* <FormMessage/> */}
      </FormItem>
    )}
  />
                      <FormField
                      control={form.control}
                      name="query"
                      render={({ field }) => (
                          <FormItem className="flex-1"> {/* Added flex-1 */}
                          <FormControl>
                              <Input className="w-150" placeholder="Търси..." {...field} />
                          </FormControl>
                          {/* <FormMessage/> */}
                          </FormItem>
                      )}
                      />
                      <Button
                      type="submit"
                      size="icon"
                      className="text-3xl" // Removed absolute positioning
                      disabled={isSubmitting}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                      </svg>
                      </Button>
                  </form>
                  </Form>
              </div>
        </div>
      </div>
    )
}