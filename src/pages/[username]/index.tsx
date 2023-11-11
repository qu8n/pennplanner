import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'
import {
  Button,
  Divider,
  ScrollShadow,
  Spacer,
  useDisclosure,
} from '@nextui-org/react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverEvent,
  Active,
} from '@dnd-kit/core'
import { useId, useMemo, useState } from 'react'
import { allCourses } from '@/data/allCourses'
import { Draggable } from '@/components/DnDWrappers/Draggable'
import { Course, Semester } from '@/shared/types'
import { Droppable } from '@/components/DnDWrappers/Droppable'
import { SemesterContainer } from '@/components/SemesterContainer'
import { arrayMove } from '@dnd-kit/sortable'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { CourseTiny } from '@/components/CourseTiny'
import { CourseBig } from '@/components/CourseBig'
import { CourseModal } from '@/components/CourseModal'
import { SquaresPlusIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { generateSemestersData } from '@/utils/generateSemestersData'

export default function Planner({
  dbUser,
  semestersData,
  courseCatalogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const id = useId()
  const { width, height } = useWindowSize()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const sensors = useSensors(useSensor(PointerSensor))
  const supabaseClient = useSupabaseClient()

  const [firstYear, setFirstYear] = useState<number>(dbUser.first_year)
  const [semesters, setSemesters] = useState<Semester[]>(semestersData)
  const [activeDragEvent, setActiveDragEvent] = useState<Active | null>(null)
  const [modalCourse, setModalCourse] = useState<Course | null>(null)
  const [courseCatalog, setCourseCatalog] =
    useState<Course[]>(courseCatalogData)
  const [coursesToDisplay, setCoursesToDisplay] =
    useState<Course[]>(courseCatalog)

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveDragEvent(active)
  }

  /**
   * Get the Semester object from a given semester_index or course_id
   * @param uniqueId - semester_index or course_id from the drag event's active/over object
   * @returns the Semester object matching the semester_index or containing the course_id
   */
  function getSemesterFromId(uniqueId: string | null) {
    if (!uniqueId) {
      return null
    }
    if (semesters.some((s) => String(s.semester_index) === uniqueId)) {
      return (
        semesters.find((s) => String(s.semester_index) === uniqueId) ?? null
      )
    }
    const semesterCoursesFlatMap = semesters.flatMap((s) => {
      return s.semester_courses.map((c) => ({
        course_id: c.course_id,
        semester_index: s.semester_index,
      }))
    })
    const semester_index = semesterCoursesFlatMap.find(
      (i) => i.course_id === uniqueId,
    )?.semester_index
    return semesters.find((s) => s.semester_index === semester_index) ?? null
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over, delta } = event

    const activeId = String(active.id)
    const overId = over ? String(over.id) : null

    const activeSemester = getSemesterFromId(activeId)
    const overSemester = getSemesterFromId(overId)

    if (!activeSemester || !overSemester || activeSemester === overSemester) {
      return null
    }

    setSemesters((semesters) => {
      const activeCourses = activeSemester.semester_courses
      const overCourses = overSemester.semester_courses

      const activeIndex = activeCourses.findIndex(
        (i) => i.course_id === activeId,
      )
      const overIndex = overCourses.findIndex((i) => i.course_id === overId)

      const newIndex = () => {
        const putOnBelowLastCourse =
          overIndex === overCourses.length - 1 && delta.y > 0
        const modifier = putOnBelowLastCourse ? 1 : 0
        return overIndex >= 0 ? overIndex + modifier : overCourses.length + 1
      }

      return semesters.map((s) => {
        if (s.semester_index === activeSemester.semester_index) {
          s.semester_courses = activeCourses.filter(
            (c) => c.course_id !== activeId,
          )
          return s
        } else if (s.semester_index === overSemester.semester_index) {
          s.semester_courses = [
            ...overCourses.slice(0, newIndex()),
            activeCourses[activeIndex],
            ...overCourses.slice(newIndex(), overCourses.length),
          ]
          return s
        } else {
          return s
        }
      })
    })
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) {
      return
    }

    const activeId = String(active.id)
    const overId = over ? String(over.id) : null

    const activeSemester = getSemesterFromId(activeId)
    const overSemester = getSemesterFromId(overId)

    // Handle dragging courses within the planner
    if (activeSemester && overSemester) {
      const activeIndex = activeSemester.semester_courses.findIndex(
        (i) => i.course_id === activeId,
      )
      const overIndex = overSemester.semester_courses.findIndex(
        (i) => i.course_id === overId,
      )
      if (activeIndex !== overIndex) {
        setSemesters((prevState) => {
          return prevState.map((s) => {
            if (s.semester_index === activeSemester.semester_index) {
              s.semester_courses = arrayMove(
                overSemester.semester_courses,
                activeIndex,
                overIndex,
              )
              return s
            } else {
              return s
            }
          })
        })
      }

      const { containerId: startSemesterIndex, items: startSemesterCourseIds } =
        activeDragEvent?.data.current?.sortable
      if (startSemesterIndex !== String(overSemester?.semester_index)) {
        // across different semesters
        const newStartSemesterCourseIds = startSemesterCourseIds.filter(
          (courseId: string) => courseId !== activeId,
        )
        if (newStartSemesterCourseIds.length === 0) {
          const { error } = await supabaseClient
            .from('semesters')
            .delete()
            .eq('semester_index', startSemesterIndex)
          if (error) console.error(error)
        } else {
          const { error } = await supabaseClient
            .from('semesters')
            .update({ semester_course_ids: newStartSemesterCourseIds })
            .eq('semester_index', startSemesterIndex)
          if (error) console.error(error)
        }

        const overSemesterCourseIds = overSemester.semester_courses.map(
          (c) => c.course_id,
        )
        if (overSemesterCourseIds.length === 1) {
          const { error } = await supabaseClient.from('semesters').insert([
            {
              user_id: dbUser.id,
              semester_index: overSemester.semester_index,
              semester_course_ids: overSemesterCourseIds,
            },
          ])
          if (error) console.error(error)
        } else {
          const { error } = await supabaseClient
            .from('semesters')
            .update({ semester_course_ids: overSemesterCourseIds })
            .eq('semester_index', overSemester.semester_index)
          if (error) console.error(error)
        }
      } else {
        // ...within the same semester
        const semester_course_ids = activeSemester.semester_courses.map(
          (c) => c.course_id,
        )
        const { error } = await supabaseClient
          .from('semesters')
          .update({ semester_course_ids })
          .eq('semester_index', activeSemester.semester_index)
        if (error) console.error(error)
      }
    } else {
      // Handle dragging courses from sidebar to semester containers
      const activeCourse = courseCatalog.find((c) => c.course_id === active.id)
      if (!activeCourse) {
        return
      }

      setSemesters((semesters) =>
        semesters.map((s) => {
          if (String(s.semester_index) === over.id) {
            s.semester_courses.push(activeCourse)
          }
          return s
        }),
      )

      setCourseCatalog(courseCatalog.filter((c) => c.course_id !== active.id))
      setCoursesToDisplay(
        coursesToDisplay.filter((c) => c.course_id !== active.id),
      )

      const semester_course_ids = overSemester?.semester_courses.map(
        (c) => c.course_id,
      )
      if (semester_course_ids?.length === 1) {
        const { error } = await supabaseClient.from('semesters').insert([
          {
            user_id: dbUser.id,
            semester_index: overSemester?.semester_index,
            semester_course_ids,
          },
        ])
        if (error) console.error(error)
      } else {
        const { error } = await supabaseClient
          .from('semesters')
          .update({ semester_course_ids })
          .eq('semester_index', overSemester?.semester_index)
        if (error) console.error(error)
      }
    }
  }

  const activeCourse = useMemo(() => {
    return allCourses.find((c) => c.course_id === activeDragEvent?.id)
  }, [activeDragEvent])

  const totalCU = useMemo(() => {
    return semesters.reduce((acc, s) => {
      return (
        acc +
        s.semester_courses.reduce(
          (acc, c) => acc + (c.course_unit ? c.course_unit : 0),
          0,
        )
      )
    }, 0)
  }, [semesters])

  const semestersByYearOrder = useMemo(
    () =>
      semesters.reduce(
        (acc, s) => {
          const yearOrder = s.year_index
          if (!acc[yearOrder]) {
            acc[yearOrder] = []
          }
          acc[yearOrder].push(s)
          return acc
        },
        {} as Record<string, Semester[]>,
      ),
    [semesters],
  )

  const numOfYears = useMemo(
    () => Object.keys(semestersByYearOrder).length,
    [semestersByYearOrder],
  )

  return (
    <>
      {totalCU === 10 && (
        <Confetti
          width={width}
          height={height}
          confettiSource={{
            w: 200,
            h: 10,
            x: width / 2,
            y: 55,
          }}
          recycle={false}
        />
      )}

      <DndContext
        id={id} // resolves "`aria-describedby` did not match" warning
        onDragStart={handleDragStart}
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="my-6 flex w-[26rem] flex-col rounded-2xl bg-white p-6 shadow-md"
          >
            <Sidebar
              courseCatalog={courseCatalog}
              coursesToDisplay={coursesToDisplay}
              setCoursesToDisplay={setCoursesToDisplay}
              setModalCourse={setModalCourse}
              onModalOpen={onOpen}
            />
          </motion.div>

          <Spacer x={3} />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="my-6 flex flex-1 flex-col rounded-2xl bg-white p-6 shadow-md"
          >
            <Toolbar
              totalCU={totalCU}
              semesters={semesters}
              setSemesters={setSemesters}
              setCourseCatalog={setCourseCatalog}
              dbUser={dbUser}
            />

            <Divider className="mt-4" />

            <div className="flex grow flex-col overflow-hidden pl-1">
              <ScrollShadow className="flex flex-col items-center overflow-y-auto">
                {Object.keys(semestersByYearOrder)
                  .sort()
                  .map((yearOrder) => (
                    <div
                      key={yearOrder}
                      className="flex w-full flex-col rounded-xl py-4 pr-2"
                    >
                      <h2 className="ml-2 text-lg font-semibold text-blue-950">
                        Year {Number(yearOrder) + 1}
                      </h2>

                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {semestersByYearOrder[yearOrder].map((s) => (
                          <Droppable
                            id={String(s.semester_index)}
                            key={s.semester_index}
                          >
                            <SemesterContainer
                              key={s.semester_index}
                              s={s}
                              semesters={semesters}
                              setSemesters={setSemesters}
                              firstYear={firstYear}
                              setFirstYear={setFirstYear}
                              setModalCourse={setModalCourse}
                              onModalOpen={onOpen}
                              setCourseCatalog={setCourseCatalog}
                              courseCatalog={courseCatalog}
                            />
                          </Droppable>
                        ))}
                      </div>
                    </div>
                  ))}

                {numOfYears < 7 ? (
                  <Button
                    startContent={<SquaresPlusIcon className="h-5 w-5" />}
                    className="my-6 rounded-xl border-none bg-gray-200 p-5"
                    onPress={() => {
                      setSemesters((semesters) => [
                        ...semesters,
                        {
                          semester_index: semesters.length,
                          semester_year: firstYear + numOfYears,
                          semester_season: 'Fall',
                          semester_courses: [],
                          year_index: numOfYears,
                        },
                        {
                          semester_index: semesters.length + 1,
                          semester_year: firstYear + numOfYears + 1,
                          semester_season: 'Spring',
                          semester_courses: [],
                          year_index: numOfYears,
                        },
                        {
                          semester_index: semesters.length + 2,
                          semester_year: firstYear + numOfYears + 1,
                          semester_season: 'Summer',
                          semester_courses: [],
                          year_index: numOfYears,
                        },
                      ])
                    }}
                  >
                    Add year
                  </Button>
                ) : null}
              </ScrollShadow>
            </div>

            <Divider />
          </motion.div>
        </div>

        <DragOverlay>
          {activeCourse ? (
            <Draggable key={activeCourse.course_id} id={activeCourse.course_id}>
              <div className="scale-105">
                {activeDragEvent?.data.current ? (
                  <CourseTiny
                    c={activeCourse}
                    isDragging={true}
                    setModalCourse={setModalCourse}
                    onModalOpen={onOpen}
                  />
                ) : (
                  <CourseBig
                    c={activeCourse}
                    isDragging={true}
                    setModalCourse={setModalCourse}
                    onModalOpen={onOpen}
                  />
                )}
              </div>
            </Draggable>
          ) : null}
        </DragOverlay>
      </DndContext>

      <CourseModal
        isModalOpen={isOpen}
        onModalOpen={onOpenChange}
        modalCourse={modalCourse}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query

  const supabaseClient = createPagesServerClient(context, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  const {
    data: { session },
  } = await supabaseClient.auth.getSession()

  const { data: dbUser, error: usersError } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', session?.user.id)
    .single()

  if (!session || dbUser.username !== username)
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }

  const { data: dbSemesters, error: semestersError } = await supabaseClient
    .from('semesters')
    .select('*')
    .eq('user_id', dbUser.id)

  const error = usersError || semestersError
  if (error) {
    console.error(error)
  }

  const firstYearData = dbUser.first_year

  const semestersData = generateSemestersData(firstYearData, dbSemesters)

  const courseCatalogData = allCourses.filter((allCourse) => {
    return !semestersData.some((s) => {
      return s.semester_courses.some(
        (semesterCourse) => semesterCourse.course_id === allCourse.course_id,
      )
    })
  })

  return {
    props: {
      dbUser,
      semestersData,
      courseCatalogData,
    },
  }
}
