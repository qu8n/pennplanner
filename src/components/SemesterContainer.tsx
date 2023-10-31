import { Semester } from '@/shared/types'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Sortable } from '@/components/DnDWrappers/Sortable'

export function SemesterContainer({ semester }: { semester: Semester }) {
  return (
    <SortableContext
      id={semester.semester_id}
      items={semester.semester_courses.map((c) => c.course_id)}
      strategy={rectSortingStrategy}
    >
      {semester.semester_courses.map((c) => (
        <Sortable key={c.course_id} course={c}>
          <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
            {c.course_id}
          </div>
        </Sortable>
      ))}
    </SortableContext>
  )
}
