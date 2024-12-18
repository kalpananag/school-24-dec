'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItemProps {
  item: {
    title: string
    href: string
    submenu?: { title: string; href: string }[]
  }
  mobile?: boolean
  isHighlighted?: boolean
}

export function NavItem({ item, mobile, isHighlighted }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const textColorClass = isHighlighted ? 'text-blue-600' : ''

  if (item.submenu) {
    return (
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`text-sm font-medium ${
              mobile ? 'w-full justify-between' : 'px-3'
            } ${textColorClass} relative overflow-hidden group transition-colors duration-200 hover:text-white`}
          >
            <span className="relative z-10">{item.title}</span>
            <ChevronDown className={`ml-1 h-4 w-4 opacity-50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            <span className="absolute inset-0 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-48 p-1 bg-white rounded-md shadow-lg animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1"
        >
          {item.submenu.map((subItem) => (
            <DropdownMenuItem key={subItem.title} asChild>
              <Link
                href={subItem.href}
                className="w-full px-2 py-1.5 text-sm rounded-sm transition-colors duration-200 hover:bg-blue-600 hover:text-white"
              >
                {subItem.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      variant="ghost"
      asChild
      className={`text-sm font-medium ${
        mobile ? 'w-full justify-start' : 'px-3'
      } ${textColorClass} relative overflow-hidden group transition-colors duration-200 hover:text-white`}
    >
      <Link href={item.href}>
        <span className="relative z-10">{item.title}</span>
        <span className="absolute inset-0 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </Link>
    </Button>
  )
}

