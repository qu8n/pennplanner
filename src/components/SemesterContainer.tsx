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

  return (
    <div
      className={`${seasonalBgColors[s.semester_season]} ${
        seasonalBorderColors[s.semester_season]
      } border-1 rounded-md p-4 flex flex-col gap-y-2 h-72 shadow-sm`}
    >
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex gap-2">
          <p className="font-medium">
            {s.semester_season} {s.semester_year}
          </p>
          {s.semester_id === '1' ? (
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<ArrowPathIcon className="w-4 h-4" />}
                  className="-mt-1 bg-transparent ring-1 ring-neutral-400/[.3] rounded-3xl"
                >
                  Change
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

        {totalCU > 0 ? (
          <Chip variant="flat" size="sm" className="text-xs" color="primary">
            {totalCU} CU
          </Chip>
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
