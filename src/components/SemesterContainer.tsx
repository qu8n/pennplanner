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

export function SemesterContainer({ semester }: { semester: Semester }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: semester.id })

  useEffect(() => {
    setCourses(semester.courses)
  }, [semester.courses])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

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
          items={courses.map((course) => `sortable-${course.course_id}`)}
          strategy={verticalListSortingStrategy}
        >
          {courses.map((course) => (
            <div
              key={course.course_id}
              id={course.course_id}
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
              className="bg-white border-2 border-gray-500"
            >
              {course.course_id}
            </div>
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
