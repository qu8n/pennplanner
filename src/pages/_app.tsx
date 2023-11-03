import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import '@smastrom/react-rating/style.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
