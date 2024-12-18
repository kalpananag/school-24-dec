import Link from 'next/link'
import { Users, GraduationCap, UserCog, BookOpen } from 'lucide-react'

export function Sidebar() {
  const navItems = [
    { href: '/dashboard/students', icon: Users, label: 'Students' },
    { href: '/dashboard/courses', icon: BookOpen, label: 'Courses' },
    { href: '/dashboard/teachers', icon: GraduationCap, label: 'Teachers' },
    { href: '/dashboard/staff', icon: UserCog, label: 'Staff' },
  ]

  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

