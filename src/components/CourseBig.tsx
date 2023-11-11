import { Course } from '@/shared/types'
import { EyeIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip } from '@nextui-org/react'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'

export function CourseBig({
  c,
  isDragging,
  setModalCourse,
  onModalOpen,
}: {
  c: Course
  isDragging?: boolean
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
}) {
  return (
    <div
      className={`${
        isDragging ? 'cursor-grabbing shadow-md' : 'shadow hover:cursor-grab'
      } mb-3 flex flex-row items-center justify-between gap-1 rounded-2xl bg-neutral-100 px-3 py-2 ring-1 ring-neutral-300`}
    >
      <div className="flex flex-col">
        <p className="text-sm font-bold text-neutral-500">{c.course_id}</p>
        <p className="line-clamp-2 text-xs font-semibold text-blue-900">
          {c.course_name}
        </p>
        <div className="mt-1 flex flex-col text-xs font-light text-neutral-500">
          <div className="flex flex-row gap-2">
            <span className="mr-[16px]">Rating:</span>
            <Rating
              readOnly={true}
              style={{ maxWidth: 60 }}
              value={c.avg_rating ?? 0}
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: '#3b82f6',
                inactiveFillColor: '#cbd5e1',
              }}
            />
            {c.avg_rating ?? ''}
            {c.review_count ? ` (${c.review_count} reviews)` : 'n/a'}
          </div>

          <div className="flex flex-row gap-2">
            <span className="mr-[3px]">Difficulty:</span>
            <Rating
              readOnly={true}
              style={{ maxWidth: 60 }}
              value={c.avg_difficulty ?? 0}
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: '#3b82f6',
                inactiveFillColor: '#cbd5e1',
              }}
            />
            {c.avg_difficulty ?? 'n/a'}
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="-mr-[1px]">Workload: </span>
            <Rating
              readOnly={true}
              style={{ maxWidth: 60 }}
              value={
                c.avg_hours_per_week
                  ? c.avg_hours_per_week > 20
                    ? 5
                    : c.avg_hours_per_week / 4
                  : 0
              }
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: '#3b82f6',
                inactiveFillColor: '#cbd5e1',
              }}
            />
            {c.avg_hours_per_week
              ? `${c.avg_hours_per_week} hours/week`
              : 'n/a'}
          </div>
        </div>
      </div>
      <Tooltip closeDelay={0} content="View course details">
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          className="-mr-1"
          onPress={() => {
            setModalCourse(c)
            onModalOpen()
          }}
        >
          <EyeIcon className="h-4 w-4 text-neutral-500" />
        </Button>
      </Tooltip>
    </div>
  )
}
