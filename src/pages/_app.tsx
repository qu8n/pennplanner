import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import '@smastrom/react-rating/style.css'
import { Toaster } from 'react-hot-toast'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { geistSans } from '@/fonts/geistSans'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  // Create a new supabase browser client on every first render
  // This is safe because our database enforces RLS (row level security)
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }),
  )

  return (
    // Inside this provider, we can:
    // - Retrieve the supabase client initialized above with useSupabaseClient()
    // - Check if a user is authenticated if useUser() hook returns a defined user obj
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextUIProvider>
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        <main
          className={`flex h-screen flex-col ${geistSans.className} bg-gray-200 text-gray-800`}
        >
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </SessionContextProvider>
  )
}
