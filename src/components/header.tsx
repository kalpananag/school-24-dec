// import Link from 'next/link'
import { signOut } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FaSignOutAlt } from 'react-icons/fa' // Importing an icon for logout button
import Link from 'next/link'

interface HeaderProps {
  userName?: string;
}

export function Header({ userName }: HeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push('/login')
    }
  }

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md py-4 sticky top-0 z-48">
      <div className="container mx-auto flex justify-between items-center px-6 sm:px-8">
        <Link href="/dashboard" className="text-3xl font-bold text-white hover:text-gray-200 transition duration-300">
          School Management
        </Link>
        <div className="flex items-center space-x-6">
          {userName && (
            <span className="text-white text-lg font-medium">
              Welcome, <span className="font-semibold">{userName}</span>
            </span>
          )}
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="flex items-center space-x-2 bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-600 transition duration-300"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="hidden sm:block">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
