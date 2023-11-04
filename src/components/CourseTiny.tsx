import { Course, Semester } from '@/shared/types'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip } from '@nextui-org/react'

export function CourseTiny({
  c,
  isDragging,
  setModalCourse,
  onModalOpen,
  setCourseCatalog,
  courseCatalog,
  setSemesters,
  semesters,
}: {
  c: Course
  isDragging?: boolean
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
  setCourseCatalog?: (courseCatalog: Course[]) => void
  courseCatalog?: Course[]
  setSemesters?: (semesters: Semester[]) => void
  semesters?: Semester[]
}) {
  return (
    <div
      className={`${
        isDragging ? 'cursor-grabbing shadow-md' : 'shadow hover:cursor-grab'
      } group relative flex flex-row items-center justify-between rounded-lg bg-neutral-50 px-2 py-1 ring-1 ring-neutral-300`}
    >
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-neutral-500">{c.course_id}</p>
        <p className="line-clamp-1 text-xs font-medium text-blue-950">
          {c.course_name}
        </p>
      </div>

      <Tooltip closeDelay={0} content="View course details">
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          className="p-0"
          onPress={() => {
            setModalCourse(c)
            onModalOpen()
          }}
        >
          <MagnifyingGlassIcon className="h-3 w-3 text-gray-500" />
        </Button>
      </Tooltip>

      <Tooltip
        closeDelay={0}
        placement="top-start"
        content="Remove course from the planner and return it back to the course catalog"
      >
        <button
          type="button"
          className={`${
            isDragging ? '' : 'group-hover:block'
          } absolute -left-2 -top-2 hidden h-6 w-6 rounded-full bg-white text-red-500 shadow-lg ring-1 ring-neutral-200`}
          onClick={() => {
            if (setCourseCatalog && setSemesters) {
              setCourseCatalog([...courseCatalog!, c])
              setSemesters(
                semesters!.map((s) => ({
                  ...s,
                  semester_courses: s.semester_courses.filter(
                    (sc) => sc.course_id !== c.course_id,
                  ),
                })),
              )
            }
          }}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon
            className="pointer-events-none mx-auto h-4 w-4"
            aria-hidden="true"
          />
        </button>
      </Tooltip>
    </div>
  )
}
