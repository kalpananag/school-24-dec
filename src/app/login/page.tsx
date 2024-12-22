// 'use client'

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';  // Ensure this import is correct
// import { signIn } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [zoom, setZoom] = useState(1); // State to control zoom level
//   const [zoomingIn, setZoomingIn] = useState(true);
//   const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

//   // Handle automatic zoom-in and zoom-out effect for background
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Zoom effect
//       setZoom((prevZoom) => {
//         if (zoomingIn && prevZoom >= 1.1) {
//           setZoomingIn(false);
//           return 1.1; // Stop zooming after 10% zoom
//         } else if (!zoomingIn && prevZoom <= 1) {
//           setZoomingIn(true);
//           return 1; // Stop zooming out after reaching the original size
//         }
//         return zoomingIn ? prevZoom + 0.005 : prevZoom - 0.005; // Slow zooming
//       });
      
//       // Background movement effect in limited range
//       setBgPosition((prevPosition) => ({
//         x: prevPosition.x + (Math.random() - 0.5) * 0.2, // Smaller movement range for X
//         y: prevPosition.y + (Math.random() - 0.5) * 0.2, // Smaller movement range for Y
//       }));
//     }, 60); // Slow down the interval to 60ms for smoother transitions

//     return () => clearInterval(interval); // Cleanup the interval when component unmounts
//   }, [zoomingIn]);

//   // Handle form submission for login
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const { data, error } = await signIn(email, password);

//     if (error) {
//       setError(error?.message || 'An unexpected error occurred');
//     } else {
//       setLoggedIn(true); // Update login state
//     }

//     setPassword('');
//     setLoading(false);
//   };

//   // Redirect on successful login
//   useEffect(() => {
//     if (loggedIn) {
//       router.push('/maindashboard');  // Redirect to main dashboard
//     }
//   }, [loggedIn, router]);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gray-100 relative"
//       style={{
//         backgroundImage: 'url(/login.png)', // Set your background image
//         backgroundSize: `${zoom * 100}%`, // Dynamically adjust the zoom level for the background image
//         backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`, // Dynamically change the background position for movement
//         transition: 'background-size 0.3s ease, background-position 0.3s ease', // Smoother transition for zoom and movement
//       }}
//     >
//       {/* Optional overlay to improve form visibility */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* The login form remains static on top of the background */}
//       <Card className="relative z-10 w-full max-w-md">
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
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
//}






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
    <div className="min-h-screen flex items-center justify-center bg-blue-400"
    //style={{ backgroundImage: 'url(/principal1.jpg)' }}
    >
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

