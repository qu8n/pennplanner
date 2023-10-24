import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'
import { Schedule } from '@/components/Schedule'
import { Divider } from '@nextui-org/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex flex-col h-screen ${inter.className}`}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="flex-col flex w-[30rem] p-4">
          <Sidebar />
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-row items-center h-16 p-4 gap-2">
            <Toolbar />
          </div>

          <Divider />

          <div className="flex flex-col overflow-y-auto p-4 gap-4">
            <Schedule />
            <Schedule />
            <Schedule />
          </div>
        </div>
      </div>
    </main>
  )
}
