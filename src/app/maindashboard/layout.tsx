'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'
import { getCurrentUser } from '@/lib/supabase'
import { UserInfo } from '@/components/user-info' // Assuming UserInfo is a new component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null) // Added state for user
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
      } else {
        setUser(currentUser) // Set user state
        setIsLoading(false)
      }
    }
    checkUser()
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <TopNav /> */}
      <Header userName={user?.name} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {user && <UserInfo user={user} />}
          {children}
        </main>
      </div>
    </div>
    // <div className="min-h-screen bg-gray-100">
    //   <TopNav />
    //   {/* Pass user to Header */}
    //   <Header user={user}/>
    //   <div className="flex">
    //     <Sidebar />
    //     <main className="flex-1 p-6">{children}</main>
    //   </div>
    // </div>
  )
}

