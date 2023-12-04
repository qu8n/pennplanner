import { Course, Visitor } from '@/shared/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function Sortable({
  children,
  course,
  visitorType,
}: {
  children: React.ReactNode
  course: Course
  visitorType: Visitor
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: course.course_id,
      disabled: visitorType !== 'owner',
    })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Translate.toString(transform) }}
      id={course.course_id}
      className={`${isDragging && 'opacity-50'}`}
    >
      {children}
    </div>
  )
}
