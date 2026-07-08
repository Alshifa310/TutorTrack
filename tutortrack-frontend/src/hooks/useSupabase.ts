// hooks/useSupabase.ts
'use client'
import { useSession } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export function useSupabase() {
  const { session } = useSession()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          // Dynamically grab the active third-party token from Clerk
          const token = await session?.getToken({ template: 'supabase' })
          
          const headers = new Headers(options.headers)
          if (token) {
            headers.set('Authorization', `Bearer ${token}`)
          }

          return fetch(url, { ...options, headers })
        },
      },
    }
  )

  return supabase
}
