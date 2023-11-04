import { Course, Semester } from '@/shared/types'
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
  Select,
  SelectItem,
  SelectSection,
} from '@nextui-org/react'
import { CourseTiny } from './CourseTiny'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const seasonalBgColors: {
  [key: string]: string
} = {
  Fall: 'bg-orange-100/[.6]',
  Spring: 'bg-emerald-100/[.6]',
  Summer: 'bg-yellow-100/[.6]',
}

const seasonalBorderColors: {
  [key: string]: string
} = {
  Fall: 'border-orange-200',
  Spring: 'border-emerald-200',
  Summer: 'border-yellow-300',
}

export function SemesterContainer({
  s,
  semesters,
  setSemesters,
  firstYear,
  setFirstYear,
  setModalCourse,
  onModalOpen,
  setCourseCatalog,
  courseCatalog,
}: {
  s: Semester
  semesters: Semester[]
  setSemesters: (semesters: Semester[]) => void
  firstYear: number
  setFirstYear: (firstYear: number) => void
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
  setCourseCatalog?: (courseCatalog: Course[]) => void
  courseCatalog?: Course[]
}) {
  const totalCU = s.semester_courses.reduce(
    (acc, curr) => acc + curr.course_unit,
    0,
  )

  const totalHoursPerWeek = s.semester_courses.reduce(
    (acc, curr) => acc + (curr.avg_hours_per_week || 0),
    0,
  )

  return (
    <div
      className={`${seasonalBgColors[s.semester_season]} ${
        seasonalBorderColors[s.semester_season]
      } flex h-72 flex-col gap-y-2 rounded-md border-1 p-4 shadow`}
    >
      <div className="flex flex-row justify-between gap-2">
        {s.semester_id === '0' ? (
          <Select
            classNames={{
              trigger: 'bg-transparent shadow-none',
            }}
            aria-label="Select first semester"
            variant="flat"
            disallowEmptySelection
            size="sm"
            color="warning"
            labelPlacement="outside"
            selectedKeys={[String(firstYear)]}
            className="-ml-2 -mt-2 w-[115px]"
            onChange={(e) => {
              const value = e.target.value
              const firstYearDiff = Number(value) - firstYear
              setFirstYear(Number(value))
              const newSemesters = semesters.map((s) => ({
                ...s,
                semester_year: s.semester_year + firstYearDiff,
              }))
              setSemesters(newSemesters)
            }}
            renderValue={(items) => {
              return items.map((item) => {
                return (
                  <p
                    key={item.textValue}
                    className="text-[16px] font-medium text-blue-950"
                  >
                    {s.semester_season} {s.semester_year}
                  </p>
                )
              })
            }}
          >
            <SelectSection title="First semester">
              {Array.from(
                { length: new Date().getFullYear() - 2019 + 1 },
                (_, i) => 2019 + i,
              )
                .reverse()
                .map((year) => {
                  const yearStr = String(year)
                  return (
                    <SelectItem key={yearStr}>
                      {`${s.semester_season} ${yearStr}`}
                    </SelectItem>
                  )
                })}
            </SelectSection>
          </Select>
        ) : (
          <p className="-mt-1 mb-1 font-medium text-blue-950">
            {s.semester_season} {s.semester_year}
          </p>
        )}

        {totalCU > 0 ? (
          <div className="-mt-1 mb-1 flex gap-1">
            <Chip variant="flat" size="sm" className="text-xs">
              ~{Math.round(totalHoursPerWeek)} hrs/wk
            </Chip>

            <Chip variant="flat" size="sm" className="text-xs" color="default">
              {totalCU} CU
            </Chip>
          </div>
        ) : null}
      </div>

      <Divider className="mb-1" />

      <SortableContext
        id={s.semester_id}
        items={s.semester_courses.map((c) => c.course_id)}
        strategy={rectSortingStrategy}
      >
        {s.semester_courses.map((c) => (
          <Sortable key={c.course_id} course={c}>
            <CourseTiny
              c={c}
              setModalCourse={setModalCourse}
              onModalOpen={onModalOpen}
              setCourseCatalog={setCourseCatalog}
              courseCatalog={courseCatalog}
              setSemesters={setSemesters}
              semesters={semesters}
            />
          </Sortable>
        ))}
      </SortableContext>
    </div>
  )
}
