import './globals.css'
import { Inter } from 'next/font/google'
import { TopNav } from '@/components/top-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'School Management System',
  description: 'A comprehensive system for managing educational institutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    // <html lang="en">
    //   <body className={inter.className}>{children}</body>
    // </html>
    //......................
  //   <div className="min-h-screen bg-gray-100">
  //   <TopNav />
    
  //   <div className="flex">
      
  //     <main className="flex-1 p-6">
        
  //       {children}
  //     </main>
  //   </div>
  // </div>
  //.......................................

  <html lang="en">
      <head>
        {/* You can add your metadata and links here */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My App</title>
      </head>
      <body className="min-h-screen bg-gray-100">
        <TopNav />
        <div className="flex">
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

// src/app/layout.tsx
// import './globals.css'
// import { Inter } from 'next/font/google'
// import { TopNav } from '@/components/top-nav'
// import { useEffect, useState } from 'react'
// import { getCurrentUser } from '@/lib/supabase'
// import { useRouter } from 'next/navigation'
// import { UserInfo } from '@/components/user-info'

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [isLoading, setIsLoading] = useState(true)
//   const [user, setUser] = useState(null)
//   const router = useRouter()

//   useEffect(() => {
//     const checkUser = async () => {
//       const currentUser = await getCurrentUser()
//       if (!currentUser) {
//         router.push('/login')
//       } else {
//         setUser(currentUser)
//         setIsLoading(false)
//       }
//     }
//     checkUser()
//   }, [router])

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Add the TopNav here */}
//       <TopNav />
//       {/* Optionally, you can display user info in the header or elsewhere */}
//       {user && <UserInfo user={user} />}
//       <main>{children}</main>
//     </div>
//   )
// }
