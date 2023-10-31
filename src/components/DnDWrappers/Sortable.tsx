import { Course } from '@/shared/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function Sortable({
  children,
  course,
}: {
  children: React.ReactNode
  course: Course
}) {
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
      {children}
    </div>
  )
}
