import { Course, Semester } from '@/shared/types'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import React, { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'

type CourseCardUIProps = {
  id: string
  style: React.CSSProperties
  course: Course // Replace `string` with the actual type of the `course` prop
}

// eslint-disable-next-line react/display-name
const CourseCardUI = React.forwardRef<HTMLDivElement, CourseCardUIProps>(
  ({ course, ...rest }, ref) => {
    return (
      <div
        className="mt-5"
        ref={ref as React.RefObject<HTMLDivElement>}
        {...rest}
      >
        <div className="rounded-md shadow bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <div className="text-sm font-medium text-gray-900">
                {course.course_id}
              </div>
              <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                <div>{course.course_name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

function CourseCard({ id, course }: { id: string; course: Course }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <CourseCardUI
      id={id}
      course={course}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  )
}

export function SemesterContainer({ semester }: { semester: Semester }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: semester.id })

  useEffect(() => {
    setCourses(semester.courses)
  }, [semester.courses])

  const sensors = useSensors(useSensor(PointerSensor))

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div className="border-2 border-gray-500">
      {semester.year} {semester.semester}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={courses.map((course) => course.course_id)}
          strategy={verticalListSortingStrategy}
        >
          {courses.map((course) => (
            <CourseCard
              key={course.course_id}
              id={course.course_id}
              course={course}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    setActiveId(active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setCourses((courses) => {
        const oldIndex = courses.findIndex(
          (course) => course.course_id === active.id,
        )
        const newIndex = courses.findIndex(
          (course) => course.course_id === over?.id,
        )

        return arrayMove(courses, oldIndex, newIndex)
      })
    }
    setActiveId(null)
  }
}
