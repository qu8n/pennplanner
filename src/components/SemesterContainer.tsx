import { Course, Semester } from '@/shared/types'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
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

function Course({ course }: { course: Course }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: course.course_id,
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Translate.toString(transform) }}
      id={course.course_id}
    >
      {course.course_name}
    </div>
  )
}

export function SemesterContainer({ semester }: { semester: Semester }) {
  // const { setNodeRef } = useDroppable({ id: semester.id })
  return (
    <SortableContext
      id={semester.id}
      items={semester.courses.map((course) => course.course_id)}
      strategy={rectSortingStrategy}
    >
      {/* <div ref={setNodeRef}> */}
      {semester.semester} {semester.year}
      {semester.courses.map((course) => (
        <Course key={course.course_id} course={course}></Course>
      ))}
      {/* </div> */}
    </SortableContext>
  )
}
