import { Semester } from '@/shared/types'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Sortable } from '@/components/DnDWrappers/Sortable'

export function SemesterContainer({ semester }: { semester: Semester }) {
  return (
    <SortableContext
      id={semester.id}
      items={semester.courses.map((course) => course.course_id)}
      strategy={rectSortingStrategy}
    >
      {semester.semester} {semester.year}
      {semester.courses.map((course) => (
        <Sortable key={course.course_id} course={course}>
          {course.course_name}
        </Sortable>
      ))}
    </SortableContext>
  )
}
