import { Navbar } from '@/components/Navbar'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { Button, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Navbar maxWidthSize="xl" twHeight="h-20" twTextSize="text-sm" />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="m-auto flex w-full flex-col items-center text-center"
      >
        <h1 className="mt-4 inline-block max-w-lg bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 bg-clip-text text-3xl font-semibold text-transparent">
          Easily plan out your entire online MCIT or MSE-DS degree
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <Button
            className="custom-gradient m-auto mt-6 flex flex-row items-center gap-3 rounded-md p-8 text-white"
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

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            <video
              autoPlay
              muted
              loop
              className="m-auto mt-10 rounded-lg border-1 border-neutral-300 bg-neutral-100 p-2 ring-8 ring-neutral-100 lg:max-w-3xl"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
