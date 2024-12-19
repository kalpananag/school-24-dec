 'use client'

 import { useState, useEffect } from 'react'
 import { useRouter } from 'next/navigation'
 import { signIn } from '@/lib/supabase'
 import { Button } from '@/components/ui/button'
 import { Input } from '@/components/ui/input'
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
 import { supabase } from '@/lib/supabase'
 export default function LoginPage() {
   const router = useRouter()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)
 
   const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault()
     setLoading(true)
     const { data, error } = await signIn(email, password)
 
     if (error) {
       setError(error.message)
       setLoading(false)
       return
     }
 
     if (data) {
       console.log('Redirecting to dashboard')
       //router.push('/dashboard')
       document.location.href = '/dashboard';
     } else {
       setError('Login failed. Please try again.')
       setLoading(false)
     }
   }
 
   // Optional: Check for the session after login success
   useEffect(() => {
     // You can also check the session directly here
     if (loading) return
     // Check if user session exists
     const session = supabase.auth.getSession()
     console.log('Session:', session);
     if (session) {
       //router.push('/dashboard')
     }
   }, [loading])
 
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
   )
 }
 
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

