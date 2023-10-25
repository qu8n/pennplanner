import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'
import { CoursePlan } from '@/components/CoursePlan'
import { Divider } from '@nextui-org/react'

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
            <CoursePlan />
            <CoursePlan />
            <CoursePlan />
            <CoursePlan />
            <CoursePlan />
          </div>
        </div>
      </div>
    </main>
  )
}
