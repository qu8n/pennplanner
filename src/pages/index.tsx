import { Navbar } from '@/components/Navbar'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { Button, Link } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Navbar
        maxWidthSize="xl"
        twHeight="h-20"
        twTextSize="text-sm"
        twBorderBottomSize="border-b-1"
      />

      <div className="flex flex-1 px-4 py-6 2xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="m-auto flex w-full flex-col items-center text-center"
        >
          <img
            src="/landing.png"
            alt="Plans"
            className="pointer-events-none w-72"
          />

          <h1 className="mt-4 text-4xl font-extrabold text-blue-700">
            Plan Smarter, Not Harder.
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            <h2 className="mt-2 max-w-md text-lg text-neutral-500">
              Drag-and-drop course planning made easy for online <b>MCIT</b> and{' '}
              <b>MSE-DS</b> students.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 4, ease: 'easeOut' }}
          >
            <Button
              className="custom-gradient mt-6 flex flex-row items-center gap-3 rounded-md p-8 text-white"
              size="lg"
              onPress={() => router.push('/signin')}
            >
              <AcademicCapIcon className="text-white-500 h-6 w-6" />
              <p>
                <span className="font-light">Create your </span>
                <span className="font-medium">PennPlanner</span>
              </p>
            </Button>

            <Link className="mt-2" href="/signin" size="sm">
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
