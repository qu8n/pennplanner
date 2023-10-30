import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'
import { CoursePlan } from '@/components/CoursePlan'
import { Divider } from '@nextui-org/react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  DragOverlay,
} from '@dnd-kit/core'
import { useEffect, useId, useMemo, useState } from 'react'
import { allCourses } from '@/data/allCourses'
import { Draggable } from '@/components/Draggable'
import { Course, Semester } from '@/shared/types'
import { Droppable } from '@/components/Droppable'
import { SemesterContainer } from '@/components/SemesterContainer'

export default function Home() {
  const id = useId()

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 'semester-1',
      year: 2023,
      semester: 'Fall',
      courses: [],
    },
  ])
  const [courses, setCourses] = useState<Course[]>(allCourses)
  const [activeId, setActiveId] = useState<string | null>(null)

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveId(active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) {
      return
    }

    const activeCourse = courses.find(
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
    setCourses(courses.filter((course) => course.course_id !== active.id))
  }

  const activeCourse = useMemo(() => {
    return allCourses.find((course) => course.course_id === activeId)
  }, [activeId])

  return (
    <main className={`flex flex-col h-screen px-28 font-geist-sans`}>
      <DndContext
        id={id} // resolves "`aria-describedby` did not match" warning
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <aside className="flex-col flex w-[30rem] p-4">
            <Sidebar courses={courses} setCourses={setCourses} />
          </aside>

          <div className="flex flex-1 flex-col">
            <div className="flex flex-row items-center h-16 p-4 gap-2">
              <Toolbar />
            </div>

            <Divider />

            <div className="flex flex-col overflow-y-auto p-4 gap-4">
              {/* <CoursePlan /> */}
              {semesters.map((semester) => (
                <Droppable id={semester.id} key={semester.id}>
                  <SemesterContainer semester={semester} />
                </Droppable>
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>
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
        </DragOverlay>
      </DndContext>
    </main>
  )
}
