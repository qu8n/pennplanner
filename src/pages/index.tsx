import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'
import { ScrollShadow } from '@nextui-org/react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverEvent,
} from '@dnd-kit/core'
import { useId, useMemo, useState } from 'react'
import { allCourses } from '@/data/allCourses'
import { Draggable } from '@/components/DnDWrappers/Draggable'
import { Course, Semester, Year } from '@/shared/types'
import { Droppable } from '@/components/DnDWrappers/Droppable'
import { SemesterContainer } from '@/components/SemesterContainer'
import { arrayMove } from '@dnd-kit/sortable'
import { geistSans } from '@/fonts/geistSans'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export default function Home() {
  const id = useId()
  const { width, height } = useWindowSize()

  const [firstYear, setFirstYear] = useState<number>(new Date().getFullYear())
  const semestersData: Semester[] = [
    {
      semester_id: '1',
      semester_year: firstYear,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '1',
    },
    {
      semester_id: '2',
      semester_year: firstYear + 1,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '1',
    },
    {
      semester_id: '3',
      semester_year: firstYear + 1,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '1',
    },
    {
      semester_id: '4',
      semester_year: firstYear + 1,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '2',
    },
    {
      semester_id: '5',
      semester_year: firstYear + 2,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '2',
    },
    {
      semester_id: '6',
      semester_year: firstYear + 2,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '2',
    },
    {
      semester_id: '7',
      semester_year: firstYear + 2,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '3',
    },
    {
      semester_id: '8',
      semester_year: firstYear + 3,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '3',
    },
    {
      semester_id: '9',
      semester_year: firstYear + 3,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '3',
    },
    {
      semester_id: '10',
      semester_year: firstYear + 3,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '4',
    },
    {
      semester_id: '11',
      semester_year: firstYear + 4,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '4',
    },
    {
      semester_id: '12',
      semester_year: firstYear + 4,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '4',
    },
    {
      semester_id: '13',
      semester_year: firstYear + 4,
      semester_season: 'Fall',
      semester_courses: [],
      year_id: '5',
    },
    {
      semester_id: '14',
      semester_year: firstYear + 5,
      semester_season: 'Spring',
      semester_courses: [],
      year_id: '5',
    },
    {
      semester_id: '15',
      semester_year: firstYear + 5,
      semester_season: 'Summer',
      semester_courses: [],
      year_id: '5',
    },
  ]

  const [semesters, setSemesters] = useState<Semester[]>(semestersData)
  const [courseCatalog, setCourseCatalog] = useState<Course[]>(allCourses)
  const [coursesToDisplay, setCoursesToDisplay] =
    useState<Course[]>(courseCatalog)

  const [activeId, setActiveId] = useState<string | null>(null)

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveId(active.id as string)
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
    return allCourses.find((c) => c.course_id === activeId)
  }, [activeId])

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
      className={`flex flex-col h-screen px-28 ${geistSans.className} text-gray-800 py-4 bg-neutral-200`}
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
          <aside className="flex-col flex w-[30rem] p-4">
            <Sidebar
              courseCatalog={courseCatalog}
              coursesToDisplay={coursesToDisplay}
              setCoursesToDisplay={setCoursesToDisplay}
            />
          </aside>

          <div className="flex flex-1 flex-col">
            <Toolbar totalCU={totalCU} />

            <ScrollShadow className="flex flex-col overflow-y-auto p-4 gap-4 mt-2">
              {['1', '2', '3', '4', '5'].map((yearId) => (
                <div
                  key={yearId}
                  className="w-full p-4 rounded-xl flex flex-col gap-2 bg-gray-100"
                >
                  <p className="font-semibold text-lg ml-2">Year {yearId}</p>

                  <div className="grid grid-cols-3 gap-4">
                    {semestersByYearId[yearId].map((s) => (
                      <Droppable id={s.semester_id} key={s.semester_id}>
                        <div className="border-1 border-gray-400 rounded-lg p-4 flex flex-col gap-y-2 h-72 shadow-sm bg-gray-50">
                          <SemesterContainer
                            key={s.semester_id}
                            semester={s}
                            semesters={semesters}
                            setSemesters={setSemesters}
                            firstYear={firstYear}
                            setFirstYear={setFirstYear}
                          />
                        </div>
                      </Droppable>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollShadow>
          </div>
        </div>

        <DragOverlay>
          {activeCourse ? (
            <Draggable key={activeCourse.course_id} id={activeCourse.course_id}>
              <div className="bg-white border-1 border-gray-400 shadow-md rounded-md flex flex-col px-2 py-1 scale-105">
                <p className="text-sm font-semibold">
                  {activeCourse.course_id}
                </p>
                <p className="text-xs">{activeCourse.course_name}</p>
              </div>
            </Draggable>
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  )
}
