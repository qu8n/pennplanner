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
          <div className="bg-white ring-1 ring-gray-400 rounded-md flex flex-col px-2 py-1">
            <p className="text-xs text-gray-400">{c.course_id}</p>
            <p className="text-sm">{c.course_name}</p>
          </div>
        </Sortable>
      ))}
    </SortableContext>
  )
}
