import Link from 'next/link'
import { signOut } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

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
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
          School Management
        </Link>
        <div className="flex items-center space-x-4">
          {userName && <span className="text-gray-600">Hello, {userName}</span>}
          <Button onClick={handleSignOut} variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

