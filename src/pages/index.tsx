import { Navbar } from '@/components/Navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex flex-col h-screen ${inter.className}`}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-[35rem] p-4 ring"></aside>

        <div className="flex flex-1 flex-col ring">
          {/* Header */}
          <div className="flex h-16 p-4 ring"></div>

          {/* Scrollable content */}
          <div className="flex flex-1 overflow-y-auto paragraph px-4 ring"></div>
        </div>
      </div>

      <footer className="flex ring">Footer</footer>
    </main>
  )
}
