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
import { Draggable } from '@/components/DnDWrappers/Draggable'
import { Course, Semester } from '@/shared/types'
import { Droppable } from '@/components/DnDWrappers/Droppable'
import { SemesterContainer } from '@/components/SemesterContainer'
import { arrayMove } from '@dnd-kit/sortable'

export default function Home() {
  const id = useId()

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      semester_id: 'semester-1',
      semester_year: 2023,
      semester_name: 'Fall',
      semester_courses: [],
    },
    {
      semester_id: 'semester-2',
      semester_year: 2024,
      semester_name: 'Spring',
      semester_courses: [],
    },
    {
      semester_id: 'semester-3',
      semester_year: 2024,
      semester_name: 'Fall',
      semester_courses: [],
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
                <Droppable id={semester.semester_id} key={semester.semester_id}>
                  <SemesterContainer
                    key={semester.semester_id}
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
