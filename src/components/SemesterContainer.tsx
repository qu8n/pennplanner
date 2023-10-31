import { Semester } from '@/shared/types'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Sortable } from '@/components/DnDWrappers/Sortable'

export function SemesterContainer({ semester }: { semester: Semester }) {
  return (
    <SortableContext
      id={semester.semester_id}
      items={semester.semester_courses.map((course) => course.course_id)}
      strategy={rectSortingStrategy}
    >
      {semester.semester_name} {semester.semester_year}
      {semester.semester_courses.map((course) => (
        <Sortable key={course.course_id} course={course}>
          {course.course_name}
        </Sortable>
      ))}
    </SortableContext>
  )
}
