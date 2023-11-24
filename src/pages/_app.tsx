import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import '@smastrom/react-rating/style.css'
import { Toaster } from 'react-hot-toast'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { geistSans } from '@/fonts/geistSans'
import Head from 'next/head'
import { MobileWarning } from '@/contents/mobileWarning'

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
      <Head>
        <title>PennPlanner</title>
        <meta property="og:title" content="PennPlanner" key="title" />
        <meta
          name="description"
          content="Course planner for online MCIT and MSE-DS students at the University of Pennsylvania"
          key="desc"
        />
      </Head>

      <NextUIProvider className={`${geistSans.className}`}>
        <Toaster position="top-right" reverseOrder={false} />

        <main
          className={`absolute inset-0 -z-10 hidden h-full w-full flex-col bg-neutral-100 bg-[linear-gradient(to_right,#e8e8e8_1px,transparent_1px),linear-gradient(to_bottom,#e8e8e8_1px,transparent_1px)] bg-[size:6rem_4rem] xl:flex`}
        >
          <Component {...pageProps} />
        </main>

        <MobileWarning />
      </NextUIProvider>
    </SessionContextProvider>
  )
}
