import { Semester } from '@/shared/types'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Sortable } from '@/components/DnDWrappers/Sortable'
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from '@nextui-org/react'

export function SemesterContainer({
  semester,
  semesters,
  setSemesters,
  firstYear,
  setFirstYear,
}: {
  semester: Semester
  semesters: Semester[]
  setSemesters: (semesters: Semester[]) => void
  firstYear: number
  setFirstYear: (year: number) => void
}) {
  return (
    <>
      <div className="flex flex-row gap-2">
        <p className="font-medium text-medium">
          {semester.semester_season} {semester.semester_year}
        </p>
        {semester.semester_id === '1' ? (
          <Popover>
            <PopoverTrigger>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto -mt-1 border-1 border-gray-300 bg-gray-200/[.5]"
              >
                Change year
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="py-3">
                <Input
                  type="email"
                  label="First year"
                  placeholder={String(new Date().getFullYear())}
                  value={String(firstYear)}
                  onValueChange={(value) => {
                    const firstYearDiff = Number(value) - firstYear
                    setFirstYear(Number(value))
                    const newSemesters = semesters.map((s) => ({
                      ...s,
                      semester_year: s.semester_year + firstYearDiff,
                    }))
                    setSemesters(newSemesters)
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
      <SortableContext
        id={semester.semester_id}
        items={semester.semester_courses.map((c) => c.course_id)}
        strategy={rectSortingStrategy}
      >
        {semester.semester_courses.map((c) => (
          <Sortable key={c.course_id} course={c}>
            <div className="bg-white border-1 border-gray-400 rounded-md flex flex-col px-2 py-1 shadow-sm">
              <p className="text-sm font-semibold">{c.course_id}</p>
              <p className="text-xs line-clamp-1">{c.course_name}</p>
            </div>
          </Sortable>
        ))}
      </SortableContext>
    </>
  )
}
