import { Navbar } from '@/components/Navbar'
import { AcademicCapIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Navbar maxWidthSize="xl" twTextSize="text-sm" />

      <div className="relative flex flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex w-full flex-col items-center justify-center p-10"
        >
          <h1 className="max-w-md text-center text-3xl font-semibold text-blue-700">
            Visualize your entire online MCIT or MSE-DS journey
          </h1>

          <div className="mt-4 flex flex-col gap-1 text-sm sm:text-base">
            <div className="flex flex-row items-center gap-1">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <p className="text-neutral-500">
                Easily <b>drag and drop</b> courses into semesters
              </p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <p className="text-neutral-500">
                <b>Compare courses</b> by their MCITCentral ratings
              </p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <p className="text-neutral-500">
                Know when <b>prerequisites</b> & rules aren&apos;t met
              </p>
            </div>
          </div>

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
                <span className="font-light">Access your </span>
                <span className="font-medium">PennPlanner</span>
              </p>
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            >
              <video
                autoPlay
                muted
                loop
                className="pointer-events-none m-auto mt-10 rounded-lg border-1 border-neutral-300 bg-neutral-100 p-2 ring-8 ring-neutral-100 lg:max-w-3xl"
              >
                <source src="/demo.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
