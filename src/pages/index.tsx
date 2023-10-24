import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex flex-col h-screen ${inter.className}`}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="flex-col flex w-[30rem] p-4 ring">
          <Sidebar />
        </aside>

        <div className="flex flex-1 flex-col ring">
          {/* Header */}
          <div className="flex flex-row items-center h-16 p-4 ring gap-2">
            <Toolbar />
          </div>

          {/* Scrollable content */}
          <div className="flex flex-1 overflow-y-auto paragraph px-4 ring"></div>
        </div>
      </div>
    </main>
  )
}
