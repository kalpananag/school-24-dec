'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Ensure this import is correct
import { signIn } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Call your sign-in method, passing only the necessary info
    const { data, error } = await signIn(email, password);

    if (error) {
      setError(error?.message || 'An unexpected error occurred');
    } else {
      setLoggedIn(true); // Update login state
    }

    // Clear the password after login is finished
    setPassword('');
    setLoading(false);
  };

  // Optional: Check for session after login success
  useEffect(() => {
    if (loggedIn) {
      router.push('/maindashboard');  // Ensure redirect after successful login
    }
  }, [loggedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Shri Vishwakarma School</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
//.................
// 'use client'

// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import { Button } from '@/components/ui/button'

// export default function LoginPage() {
//   const router = useRouter()

//   const handleClick = () => {
//     router.push('/newdashboard')
//   }

//   useEffect(() => {
//     // Any side effects you want to run on component mount
//   }, [])

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-6 bg-white rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Login Page</h1>
//         <Button onClick={handleClick}>Go to Dashboard</Button>
//       </div>
//     </div>
//   )
// }


//..................
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { signIn } from '@/lib/supabase'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const { data, error } = await signIn(email, password)
//     console.log(data, error);  // Check what is being returned
//     if (error) {
//       setError(error.message)
//       return
//     }

//     if (data) {
//       router.push('/dashboard')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">Welcome to Shri Vishwakarma School</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

