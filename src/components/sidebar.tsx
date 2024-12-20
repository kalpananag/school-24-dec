import Link from 'next/link'
import { Users, GraduationCap, UserCog, BookOpen } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const navItems = [
    { href: '/maindashboard/students', icon: Users, label: 'Students' },
    { href: '/maindashboard/courses', icon: BookOpen, label: 'Courses' },
    { href: '/maindashboard/teachers', icon: GraduationCap, label: 'Teachers' },
    { href: '/maindashboard/staff', icon: UserCog, label: 'Staff' },
  ]

  return (
    <div
      className={`h-screen ${isOpen ? 'w-64' : 'w-20'} bg-white shadow-lg p-4 transition-all duration-300`}
    >
      {/* Header for toggling sidebar */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-800 text-xl font-semibold">{isOpen ? 'School Management' : ''}</div>
        <button
          className="text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg text-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <item.icon className="w-6 h-6 text-gray-700" />
                {/* Add text-white explicitly in the span */}
                {isOpen && <span className="text-gray-800 hover:text-white">{item.label}</span>}
              </Link>

              {/* Collapse Button for Students */}
              {item.label === 'Students' && isOpen && (
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="text-lg">⏳</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
