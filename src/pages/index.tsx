import { Navbar } from '@/components/Navbar'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { Button, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const PROGRAM_NAMES = ['MCIT', 'MSE-DS']
const framerVariants = {
  enter: () => {
    return {
      y: -20,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: () => {
    return {
      zIndex: 0,
      opacity: 0,
    }
  },
}

export default function Home() {
  const router = useRouter()
  const [programNameIndex, setProgramNameIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      let nextIndex = programNameIndex + 1
      if (nextIndex === PROGRAM_NAMES.length) {
        nextIndex = 0
      }
      setProgramNameIndex(nextIndex)
    }, 2 * 1000)
  }, [programNameIndex])

  return (
    <>
      <Navbar maxWidthSize="xl" twHeight="h-20" twTextSize="text-sm" />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="m-auto flex w-full flex-col items-center text-center"
      >
        <div className="mt-4 flex flex-col text-left text-3xl font-medium text-blue-700">
          <span className="mr-2">Visualize your entire journey</span>
          <div>
            <span
              className={`mr-2 ${programNameIndex === 0 ? 'ml-2' : '-ml-3'}`}
            >
              in the online
            </span>
            <AnimatePresence>
              <motion.span
                className="fixed font-bold"
                variants={framerVariants}
                key={programNameIndex}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 500, damping: 100 },
                  opacity: { duration: 0.5 },
                }}
              >
                {PROGRAM_NAMES[programNameIndex]} program
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <h2 className="text-md mt-2 max-w-md font-light text-neutral-500">
            Compare courses, plan out your semesters, and track your progress
            towards graduation -- all in one place
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
            className="m-auto mt-10 rounded-lg border-1 border-neutral-300 bg-neutral-100 p-2 ring-8 ring-neutral-100 lg:max-w-3xl"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>
    </>
  )
}
