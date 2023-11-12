import { Course, Semester, dbUser } from '@/shared/types'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { XMarkIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip } from '@nextui-org/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMemo } from 'react'

export function CourseTiny({
  c,
  s,
  isDragging,
  setModalCourse,
  onModalOpen,
  setCourseCatalog,
  courseCatalog,
  setSemesters,
  semesters,
  dbUser,
}: {
  c: Course
  s?: Semester
  isDragging?: boolean
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
  setCourseCatalog?: (courseCatalog: Course[]) => void
  courseCatalog?: Course[]
  setSemesters?: (semesters: Semester[]) => void
  semesters?: Semester[]
  dbUser?: dbUser
}) {
  const supabaseClient = useSupabaseClient()

  const warningMessage: string = useMemo(() => {
    if (s && semesters && dbUser?.program === 'MCIT') {
      if (c.mcit_open_elective) {
        const coreCoursesInPreviousSemesters = semesters.reduce(
          (acc, semester) =>
            semester.semester_index < s.semester_index
              ? acc +
                semester.semester_courses.filter((sc) => sc.mcit_core_course)
                  .length
              : acc,
          0,
        )
        if (coreCoursesInPreviousSemesters < 4) {
          return 'You must complete 4 core courses before you can take an elective.'
        }
      }
    }
    return ''
    // eslint-disable-next-line
  }, [semesters])

  return (
    <div
      className={`${
        isDragging ? 'cursor-grabbing shadow-md' : 'shadow hover:cursor-grab'
      } group relative flex flex-row items-center justify-between rounded-lg bg-neutral-50 px-2 py-1 ring-1 ring-neutral-300`}
    >
      {warningMessage && (
        <Tooltip closeDelay={0} content={warningMessage} color="danger">
          <ExclamationCircleIcon className="absolute -right-3 -top-3 h-6 w-6 cursor-default rounded-full bg-white text-red-500" />
        </Tooltip>
      )}

      <div className="flex flex-col">
        <p className="text-sm font-semibold text-neutral-500">{c.course_id}</p>
        <p className="line-clamp-1 text-xs font-medium text-blue-900">
          {c.course_name}
        </p>
      </div>

      <Tooltip closeDelay={0} content="View course details">
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          onPress={() => {
            setModalCourse(c)
            onModalOpen()
          }}
        >
          <EyeIcon className="h-3 w-3 text-neutral-500" />
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
          onClick={async () => {
            setCourseCatalog!([...courseCatalog!, c])

            setSemesters!(
              semesters!.map((s) => ({
                ...s,
                semester_courses: s.semester_courses.filter(
                  (sc) => sc.course_id !== c.course_id,
                ),
              })),
            )

            const semester_course_ids = s?.semester_courses
              .filter((sc) => sc.course_id !== c.course_id)
              .map((sc) => sc.course_id)

            if (semester_course_ids?.length === 0) {
              const { error } = await supabaseClient
                .from('semesters')
                .delete()
                .eq('semester_index', s?.semester_index)
                .eq('user_id', dbUser?.id)
              if (error) console.error(error)
            } else {
              const { error } = await supabaseClient
                .from('semesters')
                .update({ semester_course_ids })
                .eq('semester_index', s?.semester_index)
                .eq('user_id', dbUser?.id)
              if (error) console.error(error)
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
