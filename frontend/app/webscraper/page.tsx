"use client"

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

const categories = [
  {
    value: "bg",
    label: "Bulgarian",
  },
  {
    value: "math",
    label: "Mathematics",
  },
]

export default function Webscraper() {
    // <div className="fixed bottom-4 left-0 right-0 flex justify-center mb-8"></div>

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center gap-2"> {/* Added flex container with gap */}
                {/* Popover */}
                <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    >
                    {value
                        ? categories.find((framework) => framework.value === value)?.label
                        : "Select category..."}
                    <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                        {categories.map((framework) => (
                            <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                            >
                            {framework.label}
                            <Check
                                className={cn(
                                "ml-auto",
                                value === framework.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </CommandList>
                    </Command>
                </PopoverContent>
                </Popover>

                {/* Input with Button - relative positioning for the button */}
                <div className="relative">
                <Input 
                    maxLength={200} 
                    placeholder="Минало свършено време..."
                    className="w-150 pr-10" // Add right padding for the button
                />
                <Button
                    type="button"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                    </svg>
                </Button>
                </div>
            </div>
        </div>
    )
}