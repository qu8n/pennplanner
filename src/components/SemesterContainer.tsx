import { Course, Semester, DbUser } from '@/shared/types'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Sortable } from '@/components/DnDWrappers/Sortable'
import {
  Chip,
  Divider,
  Select,
  SelectItem,
  SelectSection,
  Tooltip,
} from '@nextui-org/react'
import { CourseTiny } from './CourseTiny'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

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
  dbUser,
}: {
  s: Semester
  semesters: Semester[]
  setSemesters: (semesters: Semester[]) => void
  firstYear: number
  setFirstYear: (firstYear: number) => void
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
  setCourseCatalog: (courseCatalog: Course[]) => void
  courseCatalog: Course[]
  dbUser: DbUser
}) {
  const supabaseClient = useSupabaseClient()

  const totalCU = s.semester_courses.reduce(
    (acc, curr) => acc + curr.course_unit,
    0,
  )

  const totalHoursPerWeek = Math.round(
    s.semester_courses.reduce(
      (acc, curr) => acc + (curr.avg_hours_per_week || 0),
      0,
    ),
  )

  const hasNullHoursPerWeek = s.semester_courses.some(
    (c) => c.avg_hours_per_week === null,
  )

  return (
    <div
      className={`${seasonalBgColors[s.semester_season]} ${
        seasonalBorderColors[s.semester_season]
      } flex h-72 flex-col gap-y-2 rounded-md border-1 p-4 shadow`}
    >
      <div className="flex flex-row justify-between gap-2">
        {s.semester_index === 0 ? (
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
            className="-ml-2 -mt-2 min-w-[115px] max-w-[115px]"
            onChange={async (e) => {
              const value = Number(e.target.value)
              const yearDiff = value - firstYear
              setFirstYear(value)
              const newSemesters = semesters.map((s) => ({
                ...s,
                semester_year: s.semester_year + yearDiff,
              }))
              setSemesters(newSemesters)
              const { error } = await supabaseClient
                .from('users')
                .update({ first_year: value })
                .eq('id', dbUser.id)
              if (error) console.error(error)
            }}
            renderValue={(items) => {
              return items.map((item) => {
                return (
                  <p
                    key={item.textValue}
                    className="text-[16px] font-medium text-blue-900"
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
          <p className="-mt-1 mb-1 line-clamp-1 font-medium text-blue-900">
            {s.semester_season} {s.semester_year}
          </p>
        )}

        {totalCU > 0 ? (
          <div className="-mt-1 mb-1 flex gap-1">
            <Tooltip
              closeDelay={0}
              placement="top"
              size="sm"
              content={
                hasNullHoursPerWeek ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs">
                      Not all courses&#39; workload have reviews:
                    </p>

                    <div>
                      {s.semester_courses.map((c) => {
                        return (
                          <p
                            key={c.course_id}
                            className="flex flex-row gap-1 text-xs"
                          >
                            <span className="font-bold">{c.course_id}:</span>{' '}
                            {c.avg_hours_per_week || 'n/a'} hrs/wk
                          </p>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  'Total hours per week in workload on average per MCIT Central'
                )
              }
            >
              <Chip
                variant="light"
                size="sm"
                className="cursor-default border-1 border-neutral-300 text-xs text-neutral-500"
              >
                {hasNullHoursPerWeek ? '?' : `~${totalHoursPerWeek}`} hrs/wk
              </Chip>
            </Tooltip>

            <Tooltip
              closeDelay={0}
              placement="top"
              size="sm"
              content="Total course units in this semester"
            >
              <Chip
                variant="light"
                size="sm"
                className="cursor-default border-1 border-neutral-300 text-xs text-neutral-500"
              >
                {totalCU} CU
              </Chip>
            </Tooltip>
          </div>
        ) : null}
      </div>

      <Divider className="mb-1" />

      <SortableContext
        id={String(s.semester_index)}
        items={s.semester_courses.map((c) => c.course_id)}
        strategy={rectSortingStrategy}
      >
        {s.semester_courses.map((c) => (
          <Sortable key={c.course_id} course={c}>
            <CourseTiny
              c={c}
              s={s}
              setModalCourse={setModalCourse}
              onModalOpen={onModalOpen}
              setCourseCatalog={setCourseCatalog}
              courseCatalog={courseCatalog}
              setSemesters={setSemesters}
              semesters={semesters}
              dbUser={dbUser}
            />
          </Sortable>
        ))}
      </SortableContext>
    </div>
  )
}
