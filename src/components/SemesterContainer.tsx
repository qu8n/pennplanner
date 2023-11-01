import { Semester } from '@/shared/types'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Sortable } from '@/components/DnDWrappers/Sortable'
import { Button } from '@nextui-org/react'

export function SemesterContainer({ semester }: { semester: Semester }) {
  return (
    <>
      <div className="flex flex-row gap-2">
        <p className="font-medium text-medium">
          {semester.semester_season} {semester.semester_year}
        </p>
        {semester.semester_id === '1' ? (
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto -mt-1 border-1 border-gray-400"
          >
            Change year
          </Button>
        ) : null}
      </div>
      <SortableContext
        id={semester.semester_id}
        items={semester.semester_courses.map((c) => c.course_id)}
        strategy={rectSortingStrategy}
      >
        {semester.semester_courses.map((c) => (
          <Sortable key={c.course_id} course={c}>
            <div className="bg-white ring-1 ring-gray-400 rounded-md flex flex-col px-2 py-1">
              <p className="text-sm font-semibold">{c.course_id}</p>
              <p className="text-xs line-clamp-1">{c.course_name}</p>
            </div>
          </Sortable>
        ))}
      </SortableContext>
    </>
  )
}
