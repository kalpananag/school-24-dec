import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { createClient } from '@supabase/supabase-js'

// Get the Supabase URL and anon key from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or anonymous key is not defined.");
}
// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const auth = {
  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser()  // This is the updated way
    if (error) {
      console.error('Error fetching user:', error)
      return { data: null }
    }
    return { data }
  },
}

export async function signIn(email: string, password: string) {
  const { data, error } = await auth.signInWithPassword({ email, password })
  if (data?.user) {
    setCookie(null, 'user', JSON.stringify(data.user), {
      maxAge: 10 * 60, // 10 minutes
      path: '/',
    })
  }
  return { data, error }
}

export async function signOut() {
  const { error } = await auth.signOut()
  destroyCookie(null, 'user')
  return { error }
}

export async function getCurrentUser() {
  const { data } = await auth.getUser()  // This will return { data: { user } }
  return data?.user  // Returns user if exists, otherwise null
}
