import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'
import { Divider } from '@nextui-org/react'
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
import { Draggable } from '@/components/Draggable'
import { Course, Semester } from '@/shared/types'
import { Droppable } from '@/components/Droppable'
import { SemesterContainer } from '@/components/SemesterContainer'
import { arrayMove } from '@dnd-kit/sortable'

export default function Home() {
  const id = useId()

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 'semester-1',
      year: 2023,
      semester: 'Fall',
      courses: [],
    },
    {
      id: 'semester-2',
      year: 2024,
      semester: 'Spring',
      courses: [],
    },
    {
      id: 'semester-3',
      year: 2024,
      semester: 'Fall',
      courses: [],
    },
  ])
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
    if (semesters.some((s) => s.id === uniqueId)) {
      return semesters.find((s) => s.id === uniqueId) ?? null
    }
    const id = String(uniqueId)
    const itemWithSemesterId = semesters.flatMap((semester) => {
      const semesterId = semester.id
      return semester.courses.map((course) => ({
        courseId: course.course_id,
        semesterId: semesterId,
      }))
    })
    const semesterId = itemWithSemesterId.find((item) => item.courseId === id)
      ?.semesterId
    return semesters.find((semester) => semester.id === semesterId) ?? null
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activesemester = getSemesterFromId(activeId)
    const oversemester = getSemesterFromId(overId)
    if (!activesemester || !oversemester || activesemester === oversemester) {
      return null
    }
    setSemesters((prevState) => {
      const activeCourses = activesemester.courses
      const overCourses = oversemester.courses
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
      return prevState.map((c) => {
        if (c.id === activesemester.id) {
          c.courses = activeCourses.filter((i) => i.course_id !== activeId)
          return c
        } else if (c.id === oversemester.id) {
          c.courses = [
            ...overCourses.slice(0, newIndex()),
            activeCourses[activeIndex],
            ...overCourses.slice(newIndex(), overCourses.length),
          ]
          return c
        } else {
          return c
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

    // Enables sort-dragging courses within the same semester
    const activeSemester = getSemesterFromId(activeId)
    const overSemester = getSemesterFromId(overId)

    if (activeSemester && overSemester && activeSemester === overSemester) {
      const activeIndex = activeSemester.courses.findIndex(
        (i) => i.course_id === activeId,
      )
      const overIndex = overSemester.courses.findIndex(
        (i) => i.course_id === overId,
      )
      if (activeIndex !== overIndex) {
        setSemesters((prevState) => {
          return prevState.map((semester) => {
            if (semester.id === activeSemester.id) {
              semester.courses = arrayMove(
                overSemester.courses,
                activeIndex,
                overIndex,
              )
              return semester
            } else {
              return semester
            }
          })
        })
      }
    }

    // Handles dragging courses from sidebar to semester containers
    const activeCourse = courseCatalog.find(
      (course) => course.course_id === active.id,
    )
    if (!activeCourse) {
      return
    }
    setSemesters((semesters) =>
      semesters.map((semester) => {
        if (semester.id === over.id) {
          semester.courses.push(activeCourse)
        }
        return semester
      }),
    )

    setCourseCatalog(
      courseCatalog.filter((course) => course.course_id !== active.id),
    )
    setCoursesToDisplay(
      coursesToDisplay.filter((course) => course.course_id !== active.id),
    )
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const activeCourse = useMemo(() => {
    return allCourses.find((course) => course.course_id === activeId)
  }, [activeId])

  return (
    <main className={`flex flex-col h-screen px-28 font-geist-sans`}>
      <DndContext
        id={id} // resolves "`aria-describedby` did not match" warning
        onDragStart={handleDragStart}
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <aside className="flex-col flex w-[30rem] p-4">
            <Sidebar
              courseCatalog={courseCatalog}
              coursesToDisplay={coursesToDisplay}
              setCoursesToDisplay={setCoursesToDisplay}
            />
          </aside>

          <div className="flex flex-1 flex-col">
            <div className="flex flex-row items-center h-16 p-4 gap-2">
              <Toolbar />
            </div>

            <Divider />

            <div className="flex flex-col overflow-y-auto p-4 gap-4">
              {semesters.map((semester) => (
                <Droppable id={semester.id} key={semester.id}>
                  <SemesterContainer
                    key={semester.id}
                    semester={semester}
                  ></SemesterContainer>
                </Droppable>
              ))}
            </div>
          </div>
        </div>

        {/* <DragOverlay>
          {activeCourse ? (
            <Draggable key={activeCourse.course_id} id={activeCourse.course_id}>
              <div className="ring-2 ring-gray-300 mb-3 rounded-md flex flex-col p-2">
                <p className="text-sm text-gray-400">
                  {activeCourse.course_id}
                </p>
                <p>{activeCourse.course_name}</p>
              </div>
            </Draggable>
          ) : null}
        </DragOverlay> */}
      </DndContext>
    </main>
  )
}
