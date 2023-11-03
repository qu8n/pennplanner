import { Course, Semester } from '@/shared/types'
import { BookOpenIcon, XMarkIcon } from '@heroicons/react/24/outline'
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
        isDragging ? 'shadow-md cursor-grabbing' : 'shadow-sm hover:cursor-grab'
      } group relative flex flex-row items-center justify-between px-2 py-1 rounded-lg bg-neutral-50 ring-1 ring-neutral-300`}
    >
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{c.course_id}</p>
        <p className="text-xs line-clamp-1">{c.course_name}</p>
      </div>

      <Tooltip closeDelay={0} content="View course details">
        <Button
          size="sm"
          radius="lg"
          variant="light"
          isIconOnly
          className="-mr-1"
          onPress={() => {
            setModalCourse(c)
            onModalOpen()
          }}
        >
          <BookOpenIcon className="w-3 h-3 text-gray-500" />
        </Button>
      </Tooltip>

      <Tooltip
        closeDelay={0}
        placement="top-start"
        content="Return course back to the sidebar course catalog"
      >
        <button
          type="button"
          className={`${
            isDragging ? '' : 'group-hover:block'
          } hidden absolute w-6 h-6 text-red-500 bg-white rounded-full shadow-lg ring-1 ring-neutral-200 -top-2 -left-2`}
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
            className="w-4 h-4 mx-auto pointer-events-none"
            aria-hidden="true"
          />
        </button>
      </Tooltip>
    </div>
  )
}
