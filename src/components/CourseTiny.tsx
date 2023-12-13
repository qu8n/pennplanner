import { Course, Semester, DbUser, Database, Visitor } from '@/shared/types'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react'
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
  visitorType,
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
  dbUser?: DbUser
  visitorType?: Visitor
}) {
  const supabaseClient = useSupabaseClient<Database>()

  const warnings = useMemo(() => {
    if (s && semesters && dbUser) {
      const warnings = []

      // Check if course is not offered in current semester
      if (
        c.semesters_not_offered.includes(
          `${s.semester_season} ${s.semester_year}`,
        )
      ) {
        warnings.push(
          'This course is not offered in this semester, according to the latest Course Schedule',
        )
      }

      const courseIdsInPrevSemesters = semesters.reduce(
        (acc, semester) =>
          semester.semester_index < s.semester_index
            ? acc.concat(semester.semester_courses.map((sc) => sc.course_id))
            : acc,
        [] as string[],
      )

      // Validate that prereqs have been taken in previous semesters
      if (c.course_prereq_ids.length > 0) {
        const missingPrereqs: string[] = []
        const coursesToScan = courseIdsInPrevSemesters.concat(
          dbUser.waived_courses,
        )
        c.course_prereq_ids.forEach((prereq) => {
          if (Array.isArray(prereq)) {
            const tookPrereq = prereq.some((prereqId) =>
              coursesToScan.includes(prereqId),
            )
            if (!tookPrereq)
              missingPrereqs.push(`either ${prereq.join(' or ')}`)
          } else {
            if (!coursesToScan.includes(prereq)) missingPrereqs.push(prereq)
          }
        })
        if (missingPrereqs.length > 0) {
          warnings.push(
            `Missing prerequisite${
              missingPrereqs.length > 1 ? 's' : ''
            } in previous semesters: ${missingPrereqs.join(', ')}`,
          )
        }
      }

      const totalCUsInPrevSemesters = semesters.reduce(
        (acc, semester) =>
          semester.semester_index < s.semester_index
            ? acc +
              semester.semester_courses.reduce(
                (acc, sc) => acc + sc.course_unit,
                0,
              )
            : acc,
        0,
      )

      // Enforce the 10 CUs to graduate rule
      if (totalCUsInPrevSemesters >= 10) {
        warnings.push(
          '10 CUs have been reached or exceeded in previous semesters. Graduation is now required',
        )
      }

      // Validate coreqs being taken in previous or current semesters
      if (c.course_coreq_ids.length > 0) {
        const courseIdsInCurrSemester = s.semester_courses.map(
          (sc) => sc.course_id,
        )
        const coursesToScan = courseIdsInPrevSemesters.concat(
          courseIdsInCurrSemester,
          dbUser.waived_courses,
        )
        const missingCoreqs: string[] = []
        c.course_coreq_ids.forEach((coreq) => {
          if (Array.isArray(coreq)) {
            const tookCoreq = coreq.some((coreqId) =>
              coursesToScan.includes(coreqId),
            )
            if (!tookCoreq) missingCoreqs.push(`either ${coreq.join(' or ')}`)
          } else {
            if (!coursesToScan.includes(coreq)) missingCoreqs.push(coreq)
          }
        })
        if (missingCoreqs.length > 0) {
          warnings.push(
            `Missing corequisite${
              missingCoreqs.length > 1 ? 's' : ''
            } in current or previous semesters: ${missingCoreqs.join(', ')}`,
          )
        }
      }

      if (dbUser.program === 'MCIT') {
        /* "When students have passed and completed 4 of the 6 core courses, 
        they may register for electives" */
        const coreCoursesInPrevSemestersCount = semesters.reduce(
          (acc, semester) =>
            semester.semester_index < s.semester_index
              ? acc +
                semester.semester_courses.filter((sc) => sc.mcit_core_course)
                  .length
              : acc,
          0,
        )
        if (c.mcit_open_elective) {
          if (coreCoursesInPrevSemestersCount < 4) {
            warnings.push(
              'Students must complete a minimum of 4 core courses before they can take an elective',
            )
          }
        }

        /* "new students must take either CIT 5910 or CIT 5920 in their first 
        semester. If a student chooses to take two courses in their first 
        semester, they must select CIT 5910 and CIT 5920" */
        const firstSemesterWithCourses = semesters.find(
          (semester) => semester.semester_courses.length > 0,
        )
        const waived591or592 =
          dbUser.waived_courses?.includes('CIT 5910') ||
          dbUser.waived_courses?.includes('CIT 5920')
        if (
          s.semester_index === firstSemesterWithCourses?.semester_index &&
          !waived591or592
        ) {
          const firstSemesterCourses =
            firstSemesterWithCourses?.semester_courses
          if (firstSemesterCourses?.length === 1) {
            const courseId = firstSemesterCourses[0].course_id
            if (courseId !== 'CIT 5910' && courseId !== 'CIT 5920') {
              warnings.push(
                'Students must take either CIT 5910 or CIT 5920, or both, in their first semester',
              )
            }
          } else {
            const has591 = firstSemesterCourses?.find(
              (course) => course.course_id === 'CIT 5910',
            )
            const has592 = firstSemesterCourses?.find(
              (course) => course.course_id === 'CIT 5920',
            )
            if (!has591 || !has592) {
              warnings.push(
                'Students must take either CIT 5910 or CIT 5920 in their first semester. If taking > 1 course in their first semester, they must include both CIT 5910 and CIT 5920',
              )
            }
          }
        }

        /* "students must complete six core course units and four
        elective course units" */
        const allSemestersCourses = semesters.reduce(
          (acc, semester) => acc.concat(semester.semester_courses),
          [] as Course[],
        )
        const coreCoursesCount = allSemestersCourses.filter(
          (course) => course.mcit_core_course,
        ).length
        if (
          coreCoursesCount < 6 &&
          allSemestersCourses.length >= 10 &&
          c.mcit_core_course
        ) {
          warnings.push(
            `Students must complete all core courses to graduate. There are only ${coreCoursesCount} core courses in the planner`,
          )
        }
      }

      return warnings
    }

    return ['']
    // eslint-disable-next-line
  }, [semesters])

  return (
    <div
      className={`${
        isDragging ? 'rotate-1 cursor-grabbing shadow-md' : 'shadow'
      } group relative flex flex-row items-center justify-between rounded-md border-1 border-neutral-300 bg-white px-2 py-1 ${
        visitorType === 'owner'
          ? 'cursor-grab hover:ring-2 hover:ring-blue-500'
          : 'cursor-default'
      } duration-300`}
    >
      {warnings.length > 0 && !isDragging && (
        <Popover
          showArrow
          placement="top"
          className="max-w-sm"
          classNames={{
            base: 'bg-red-100 text-red-900',
            arrow: 'bg-red-100',
          }}
        >
          <PopoverTrigger>
            <ExclamationCircleIcon className="absolute -right-3 -top-3 h-6 w-6 cursor-default rounded-full bg-white text-red-600 hover:text-red-700" />
          </PopoverTrigger>
          <PopoverContent>
            {warnings.length === 1 ? (
              <p>{warnings[0]}</p>
            ) : (
              <ul className="list-disc pl-3">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </Popover>
      )}

      <div className="flex flex-col">
        <p className="text-sm font-semibold text-neutral-500">{c.course_id}</p>
        <p className="line-clamp-1 text-xs font-medium text-blue-900">
          {c.course_name}
        </p>
      </div>

      <Tooltip closeDelay={0} content="View course info">
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          onPress={() => {
            setModalCourse(c)
            onModalOpen()
          }}
          className="ml-1 rounded-md hover:bg-neutral-300/[.8]"
        >
          <InformationCircleIcon className="h-5 w-5 text-neutral-500" />
        </Button>
      </Tooltip>

      {visitorType === 'owner' && (
        <Tooltip
          closeDelay={0}
          placement="top-start"
          content="Remove course from the planner and return it back to the course catalog"
        >
          <Button
            size="sm"
            isIconOnly
            className={`${
              isDragging ? '' : 'group-hover:block'
            } absolute -left-5 -top-4 hidden rounded-full border-2 border-blue-500 bg-white text-red-600 shadow-lg hover:bg-neutral-200`}
            onPress={async () => {
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
                  .eq('semester_index', s!.semester_index)
                  .eq('user_id', dbUser!.id)
                if (error) console.error(error)
              } else {
                const { error } = await supabaseClient
                  .from('semesters')
                  .update({ semester_course_ids })
                  .eq('semester_index', s!.semester_index)
                  .eq('user_id', dbUser!.id)
                if (error) console.error(error)
              }
            }}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon
              className="pointer-events-none mx-auto h-4 w-4"
              aria-hidden="true"
            />
          </Button>
        </Tooltip>
      )}
    </div>
  )
}
