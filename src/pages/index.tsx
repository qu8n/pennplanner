import { Navbar } from '@/components/Navbar'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { Button, Link } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Navbar maxWidthSize="xl" twHeight="h-20" twTextSize="text-sm" />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="m-auto flex w-full flex-col items-center text-center"
      >
        <h1 className="mt-4 text-3xl font-bold text-blue-700">
          Easily plan out your entire online MCIT journey.
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <h2 className="mt-2 max-w-md text-lg text-neutral-500">
            Compare courses, plan out your semesters, and track your progress
            towards graduation all in one place.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 4, ease: 'easeOut' }}
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

          <video
            autoPlay
            muted
            loop
            className="m-auto mt-10 max-w-3xl rounded-lg border-5 border-gray-100 shadow-md ring-1 ring-neutral-300"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>
    </>
  )
}
