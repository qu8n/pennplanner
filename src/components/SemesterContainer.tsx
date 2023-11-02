import { Semester } from '@/shared/types'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Sortable } from '@/components/DnDWrappers/Sortable'
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Chip,
  Divider,
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
  const totalCU = semester.semester_courses.reduce(
    (acc, curr) => acc + curr.course_unit,
    0,
  )

  return (
    <div className="rounded-2xl bg-neutral-200/[.6] p-4 flex flex-col gap-y-2 h-72 shadow-inner">
      <div className="flex flex-row gap-2 items-center">
        <p className="font-medium">
          {semester.semester_season} {semester.semester_year}
        </p>
        {totalCU > 0 ? (
          <span className="text-xs text-neutral-500">({totalCU} CU)</span>
        ) : null}
        {semester.semester_id === '1' ? (
          <Popover>
            <PopoverTrigger>
              <Button
                size="sm"
                variant="flat"
                className="ml-auto -mt-1 bg-neutral-200/[.6] ring-2 ring-neutral-400/[.3] rounded-3xl"
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

      <Divider className="mb-1" />

      <SortableContext
        id={semester.semester_id}
        items={semester.semester_courses.map((c) => c.course_id)}
        strategy={rectSortingStrategy}
      >
        {semester.semester_courses.map((c) => (
          <Sortable key={c.course_id} course={c}>
            <div className="flex flex-col px-2 py-1 shadow-sm rounded-lg bg-neutral-200 ring-2 ring-neutral-400/[.4]">
              <p className="text-sm font-semibold">{c.course_id}</p>
              <p className="text-xs line-clamp-1">{c.course_name}</p>
            </div>
          </Sortable>
        ))}
      </SortableContext>
    </div>
  )
}
