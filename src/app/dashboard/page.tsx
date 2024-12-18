import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, UserCog, BookOpen } from 'lucide-react'
import Link from 'next/link'

import './dash.css'; 

export default function DashboardPage() {
  const modules = [
    {
      title: 'Students',
      icon: Users,
      description: 'Manage student enrollments and information',
      href: '/dashboard/students',
      color: 'bg-yellow-500',
    },
    {
      title: 'Courses',
      icon: BookOpen,
      description: 'Manage course offerings and schedules',
      href: '/dashboard/courses',
      color: 'bg-yellow-500',
    },
    {
      title: 'Teachers',
      icon: GraduationCap,
      description: 'Manage teaching staff and assignments',
      href: '/dashboard/teachers',
      color: 'bg-yellow-500',
    },
    {
      title: 'Staff',
      icon: UserCog,
      description: 'Manage administrative staff',
      href: '/dashboard/staff',
      color: 'bg-yellow-500',
    },
  ]

  return (
    <div className="dashboard-container">
      {/* Background video */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="school-cone.gif" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      {/* <img
        src="school-cone.gif"
        alt="Animated background"
        className="background-gif"
      /> */}
      <div className="container mx-auto py-6 relative z-10">
        <h1 className="text-4xl font-bold text-black mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => (
            <Link key={module.title} href={module.href}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className={`${module.color} text-white rounded-t-lg`}>
                  <module.icon className="w-8 h-8 mb-2" />
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">{module.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

