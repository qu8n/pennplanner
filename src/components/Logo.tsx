import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { Link } from '@nextui-org/react'

export function Logo() {
  return (
    <Link href="/">
      <AcademicCapIcon className="h-5 w-5 text-blue-700" />
      <p className="ml-1 font-semibold tracking-wide text-blue-800">
        PennPlanner
      </p>
    </Link>
  )
}
