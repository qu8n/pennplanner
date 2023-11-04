import { allCourses } from '@/data/allCourses'
import { Course, Semester } from '@/shared/types'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { ArrowPathIcon, LinkIcon } from '@heroicons/react/24/outline'
import { Button, Progress, Tooltip } from '@nextui-org/react'
import toast from 'react-hot-toast'

export function Toolbar({
  totalCU,
  semesters,
  setSemesters,
  setCourseCatalog,
}: {
  totalCU: number
  semesters: Semester[]
  setSemesters: (semesters: Semester[]) => void
  setCourseCatalog: (courseCatalog: Course[]) => void
}) {
  return (
    <div className="flex h-16 flex-row items-center gap-2 pl-2">
      <div className="flex grow flex-col gap-1 pr-4">
        <div className="flex flex-row justify-between">
          <h2 className="flex-none text-lg font-semibold">Degree Planner</h2>
          <div className="mt-1 flex flex-row items-center gap-1">
            <span className="text-xs">{totalCU} / 10 course units (CU)</span>
            <Tooltip
              closeDelay={0}
              placement="top"
              size="md"
              content="A course unit (CU) is the basic unit of progress toward the degree. One CU is usually converted to a four-semester-hour course."
            >
              <InformationCircleIcon className="h-4 w-4 flex-none text-neutral-400" />
            </Tooltip>
          </div>
        </div>
        <Progress isStriped aria-label="progress" value={totalCU * 10} />
      </div>

      {/* For logged-in users only */}
      <Tooltip
        closeDelay={0}
        placement="top"
        content="Remove all courses from your planner"
      >
        <Button
          variant="bordered"
          startContent={<ArrowPathIcon className="h-4 w-4" />}
          className="w-38 flex-none rounded-xl border-none bg-gray-200"
          onPress={() => {
            setSemesters(
              semesters.map((s) => ({
                ...s,
                semester_courses: [],
              })),
            )
            setCourseCatalog(allCourses)
            toast('Plan has been reset', {
              icon: '🔄',
            })
          }}
        >
          Reset plan
        </Button>
      </Tooltip>

      <Tooltip
        closeDelay={0}
        placement="top"
        content="Copy this plan's URL to your clipboard"
      >
        <Button
          variant="bordered"
          startContent={<LinkIcon className="h-4 w-4" />}
          className="w-38 flex-none rounded-xl border-none bg-gray-200"
          onPress={() => {
            window.navigator.clipboard.writeText(window.location.href)
            toast.success('Plan URL copied to clipboard')
          }}
        >
          Copy plan URL
        </Button>
      </Tooltip>
    </div>
  )
}
