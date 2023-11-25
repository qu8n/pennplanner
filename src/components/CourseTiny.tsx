import { Course, Semester, DbUser } from '@/shared/types'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
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
  dbUser?: DbUser
}) {
  const supabaseClient = useSupabaseClient()

  const warnings = useMemo(() => {
    if (s && semesters && dbUser) {
      const warnings = []

      // Check if course is not offered in current semester
      if (
        c.semesters_not_offered.includes(
          `${s.semester_season} ${s.semester_year}`,
        )
      ) {
        warnings.push('Not offered in this semester')
      }

      // Validate that prereqs have been taken in previous semesters
      const courseIdsInPrevSemesters = semesters.reduce(
        (acc, semester) =>
          semester.semester_index < s.semester_index
            ? acc.concat(semester.semester_courses.map((sc) => sc.course_id))
            : acc,
        [] as string[],
      )
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
              'Students must complete 4 core courses before they can take an elective',
            )
          }
        }

        /* "new students must take either CIT 5910 or CIT 5920 in their first 
        semester. If a student chooses to take two courses in their first 
        semester, they must select CIT 5910 and CIT 5920" */
        const firstSemesterWithCourses = semesters.find(
          (semester) => semester.semester_courses.length > 0,
        )
        const firstSemesterCourses = firstSemesterWithCourses?.semester_courses
        if (s.semester_index === firstSemesterWithCourses?.semester_index) {
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
        const semestersCourses = semesters.reduce(
          (acc, semester) => acc.concat(semester.semester_courses),
          [] as Course[],
        )
        const electivesCount = semestersCourses.filter(
          (course) => course.mcit_open_elective,
        ).length
        if (electivesCount > 4 && c.mcit_open_elective) {
          warnings.push(
            `Students must complete 6 core and 4 elective courses to graduate. There are ${electivesCount} electives in the planner`,
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
        isDragging ? 'rotate-1 cursor-grabbing shadow-md' : 'cursor-grab shadow'
      } group relative flex flex-row items-center justify-between rounded-md border-1 border-neutral-300 bg-white px-2 py-1 hover:ring-2 hover:ring-blue-500`}
    >
      {warnings.length > 0 && !isDragging && (
        <Tooltip
          closeDelay={0}
          content={
            <>
              <ul className="list-disc pl-3">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </>
          }
          className="max-w-sm"
          classNames={{
            base: 'bg-rose-100 text-rose-900',
          }}
        >
          <ExclamationCircleIcon className="absolute -right-3 -top-3 h-6 w-6 cursor-default rounded-full bg-white text-red-500" />
        </Tooltip>
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
          } absolute -left-5 -top-4 hidden rounded-full border-2 border-blue-500 bg-white text-red-500 shadow-lg hover:bg-neutral-200`}
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
        </Button>
      </Tooltip>
    </div>
  )
}
