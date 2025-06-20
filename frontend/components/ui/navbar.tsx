"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import router from "next/router"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // Check auth status whenever the route changes
    const token = typeof window !== 'undefined' && localStorage.getItem('Token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 mt-1 ml-1">
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Начало</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">За нас</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {!isAuthenticated && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/auth/signin">Влез</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/auth/signup">Регистрирай се</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
            </>
        )}
        {isAuthenticated && (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/webscraper">Уебскрейпър</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/profile">Профил</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/auth/signout">Излез</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}