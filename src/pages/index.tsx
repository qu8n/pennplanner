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
import { geistSans } from '@/fonts/geistSans'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { CourseTiny } from '@/components/CourseTiny'
import { CourseBig } from '@/components/CourseBig'
import { CourseModal } from '@/components/CourseModal'
import { SquaresPlusIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const id = useId()
  const { width, height } = useWindowSize()

  const [firstYear, setFirstYear] = useState<number>(new Date().getFullYear())
  const semestersData: Semester[] = [
    {
      semester_id: '0',
      semester_year: firstYear,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '0',
    },
    {
      semester_id: '1',
      semester_year: firstYear + 1,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '0',
    },
    {
      semester_id: '2',
      semester_year: firstYear + 1,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '0',
    },
    {
      semester_id: '3',
      semester_year: firstYear + 1,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '1',
    },
    {
      semester_id: '4',
      semester_year: firstYear + 2,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '1',
    },
    {
      semester_id: '5',
      semester_year: firstYear + 2,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '1',
    },
    {
      semester_id: '6',
      semester_year: firstYear + 2,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '2',
    },
    {
      semester_id: '7',
      semester_year: firstYear + 3,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '2',
    },
    {
      semester_id: '8',
      semester_year: firstYear + 3,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '2',
    },
  ]

  const [semesters, setSemesters] = useState<Semester[]>(semestersData)
  const [courseCatalog, setCourseCatalog] = useState<Course[]>(allCourses)
  const [coursesToDisplay, setCoursesToDisplay] =
    useState<Course[]>(courseCatalog)
  const [activeDragEvent, setActiveDragEvent] = useState<Active | null>(null)
  const [modalCourse, setModalCourse] = useState<Course | null>(null)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveDragEvent(active)
  }

  const getSemesterFromId = (uniqueId: string | null) => {
    if (!uniqueId) {
      return null
    }
    if (semesters.some((s) => s.semester_id === uniqueId)) {
      return semesters.find((s) => s.semester_id === uniqueId) ?? null
    }
    const id = String(uniqueId)
    const itemWithSemesterId = semesters.flatMap((s) => {
      const semester_id = s.semester_id
      return s.semester_courses.map((c) => ({
        course_id: c.course_id,
        semester_id: semester_id,
      }))
    })
    const semester_id = itemWithSemesterId.find((i) => i.course_id === id)
      ?.semester_id
    return semesters.find((s) => s.semester_id === semester_id) ?? null
  }

  const handleDragOver = (event: DragOverEvent) => {
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
        if (s.semester_id === activeSemester.semester_id) {
          s.semester_courses = activeCourses.filter(
            (c) => c.course_id !== activeId,
          )
          return s
        } else if (s.semester_id === overSemester.semester_id) {
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) {
      return
    }
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null

    // Handles sort-dragging courses within the same semester
    const activeSemester = getSemesterFromId(activeId)
    const overSemester = getSemesterFromId(overId)

    if (activeSemester && overSemester && activeSemester === overSemester) {
      const activeIndex = activeSemester.semester_courses.findIndex(
        (i) => i.course_id === activeId,
      )
      const overIndex = overSemester.semester_courses.findIndex(
        (i) => i.course_id === overId,
      )
      if (activeIndex !== overIndex) {
        setSemesters((prevState) => {
          return prevState.map((s) => {
            if (s.semester_id === activeSemester.semester_id) {
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
    }

    // Handles dragging courses from sidebar to semester containers
    const activeCourse = courseCatalog.find((c) => c.course_id === active.id)
    if (!activeCourse) {
      return
    }
    setSemesters((semesters) =>
      semesters.map((s) => {
        if (s.semester_id === over.id) {
          s.semester_courses.push(activeCourse)
        }
        return s
      }),
    )
    setCourseCatalog(courseCatalog.filter((c) => c.course_id !== active.id))
    setCoursesToDisplay(
      coursesToDisplay.filter((c) => c.course_id !== active.id),
    )
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const activeCourse = useMemo(() => {
    return allCourses.find((c) => c.course_id === activeDragEvent?.id)
  }, [activeDragEvent])

  const semestersByYearId = useMemo(
    () =>
      semesters.reduce(
        (acc, s) => {
          const yearId = s.year_id
          if (!acc[yearId]) {
            acc[yearId] = []
          }
          acc[yearId].push(s)
          return acc
        },
        {} as Record<string, Semester[]>,
      ),
    [semesters],
  )
  const numOfYears = useMemo(
    () => Object.keys(semestersByYearId).length,
    [semestersByYearId],
  )

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

  return (
    <main
      className={`flex h-screen flex-col px-28 ${geistSans.className} bg-blue-950 text-gray-800`}
    >
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
          <Sidebar
            courseCatalog={courseCatalog}
            coursesToDisplay={coursesToDisplay}
            setCoursesToDisplay={setCoursesToDisplay}
            setModalCourse={setModalCourse}
            onModalOpen={onOpen}
          />

          <Spacer x={3} />

          <div className="my-6 flex flex-1 flex-col rounded-2xl bg-white p-6 shadow-md">
            <Toolbar
              totalCU={totalCU}
              semesters={semesters}
              setSemesters={setSemesters}
              setCourseCatalog={setCourseCatalog}
            />

            <Divider className="mt-4" />

            <div className="flex grow flex-col overflow-hidden pl-1">
              <ScrollShadow className="flex flex-col items-center overflow-y-auto">
                {Object.keys(semestersByYearId)
                  .sort()
                  .map((yearId) => (
                    <div
                      key={yearId}
                      className="flex w-full flex-col rounded-xl py-4 pr-2"
                    >
                      <h2 className="ml-2 text-lg font-semibold text-blue-950">
                        Year {Number(yearId) + 1}
                      </h2>

                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {semestersByYearId[yearId].map((s) => (
                          <Droppable id={s.semester_id} key={s.semester_id}>
                            <SemesterContainer
                              key={s.semester_id}
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
                          semester_id: String(semesters.length),
                          semester_year: firstYear + numOfYears,
                          semester_season: 'Fall',
                          semester_courses: [],
                          year_id: String(numOfYears),
                        },
                        {
                          semester_id: String(semesters.length + 1),
                          semester_year: firstYear + numOfYears + 1,
                          semester_season: 'Spring',
                          semester_courses: [],
                          year_id: String(numOfYears),
                        },
                        {
                          semester_id: String(semesters.length + 2),
                          semester_year: firstYear + numOfYears + 1,
                          semester_season: 'Summer',
                          semester_courses: [],
                          year_id: String(numOfYears),
                        },
                      ])
                    }}
                  >
                    Add calendar year
                  </Button>
                ) : null}
              </ScrollShadow>
            </div>

            <Divider />
          </div>
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
    </main>
  )
}
