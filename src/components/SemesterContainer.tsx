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

const seasonalColors: {
  [key: string]: string
} = {
  Fall: 'bg-orange-100/[.6]',
  Spring: 'bg-emerald-100/[.6]',
  Summer: 'bg-yellow-100/[.6]',
}

export function SemesterContainer({
  semester,
  semesters,
  setSemesters,
  firstYear,
  setFirstYear,
  setModalCourse,
  onModalOpen,
  setCourseCatalog,
  courseCatalog,
}: {
  semester: Semester
  semesters: Semester[]
  setSemesters: (semesters: Semester[]) => void
  firstYear: number
  setFirstYear: (firstYear: number) => void
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
  setCourseCatalog?: (courseCatalog: Course[]) => void
  courseCatalog?: Course[]
}) {
  const totalCU = semester.semester_courses.reduce(
    (acc, curr) => acc + curr.course_unit,
    0,
  )

  return (
    <div
      className={`${
        seasonalColors[semester.semester_season]
      } rounded-md p-4 flex flex-col gap-y-2 h-72 shadow-sm`}
    >
      <div className="flex flex-row gap-2 items-center">
        <p className="font-medium">
          {semester.semester_season} {semester.semester_year}
        </p>
        {totalCU > 0 ? (
          <Chip variant="flat" size="sm" className="text-xs" color="primary">
            {totalCU} CU
          </Chip>
        ) : null}
        {semester.semester_id === '1' ? (
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                size="sm"
                variant="flat"
                startContent={<ArrowPathIcon className="w-4 h-4" />}
                className="ml-auto -mt-1 bg-transparent ring-1 ring-neutral-400/[.3] rounded-3xl"
              >
                First year
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
