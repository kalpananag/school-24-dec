'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const navItems = [
  {
    title: 'ABOUT',
    href: '/about',
    
  },
  {
    title: 'ADMISSIONS',
    href: '/admissions',
  },
  {
    title: 'ACADEMICS',
    href: '/academics',
  },
  {
    title: 'ARTS',
    href: '/arts',
  },
  {
    title: 'ATHLETICS',
    href: '/athletics',
  },
  {
    title: 'STUDENT LIFE',
    href: '/student-life',
  },
  {
    title: 'SUPPORT US',
    href: '/support',
  },
  {
    title: 'DASHBOARD',
    href: '/dashboard',
  },
]

export function TopNav() {
  return (
    <div className="hidden md:block border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-10">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center px-4 text-xs font-medium tracking-wider transition-colors hover:bg-gray-100",
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center">
            <button className="flex items-center px-4 text-xs font-medium tracking-wider text-gray-600 hover:text-gray-900">
              QUICKLINKS
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

