'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavItem } from '@/components/top-item'

const navItems = [
  { title: 'DASHBOARD', href: '/dashboard', isHighlighted: true },
  { title: 'ADMISSIONS', href: '/admissions' },
  { title: 'ACADEMICS', href: '/academics' },
  { title: 'ARTS', href: '/arts' },
  { title: 'ATHLETICS', href: '/athletics' },
  { title: 'STUDENT LIFE', href: '/student-life' },
  { title: 'SUPPORT US', href: '/support' },
  {
    title: 'Products',
    href: '#',
    submenu: [
      { title: 'Analytics', href: '/products/analytics' },
      { title: 'Engagement', href: '/products/engagement' },
      { title: 'Security', href: '/products/security' },
      { title: 'Integrations', href: '/products/integrations' },
    ],
  },
  {
    title: 'Solutions',
    href: '#',
    submenu: [
      { title: 'Enterprise', href: '/solutions/enterprise' },
      { title: 'Small Business', href: '/solutions/small-business' },
      { title: 'Startups', href: '/solutions/startups' },
    ],
  },
]

export function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 transition-transform duration-200 hover:scale-110">
              <span className="sr-only">Your Logo</span>
              <div className="h-8 w-8 bg-primary rounded-full"></div>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center space-x-1">
            {navItems.map((item) => (
              <NavItem key={item.title} item={item} isHighlighted={item.isHighlighted} />
            ))}
          </div>
          <div className="hidden sm:flex sm:items-center space-x-2">
            <Button variant="outline" className="transition-all duration-200 hover:bg-blue-600 hover:text-white">Log in</Button>
            <Button className="transition-all duration-200 hover:bg-blue-700">Sign up</Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              className="transition-colors duration-200 hover:bg-blue-600 hover:text-white"
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden animate-in slide-in-from-top-5 duration-300">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.title} item={item} mobile isHighlighted={item.isHighlighted} />
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 space-y-1">
              <Button variant="outline" className="w-full justify-start transition-colors duration-200 hover:bg-blue-600 hover:text-white">Log in</Button>
              <Button className="w-full justify-start transition-colors duration-200 hover:bg-blue-700 hover:text-white">Sign up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

