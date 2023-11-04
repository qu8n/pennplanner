import { Course } from '@/shared/types'
import { BookOpenIcon } from '@heroicons/react/24/outline'
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
        <p className="text-sm font-semibold">{c.course_id}</p>
        <p className="text-xs">{c.course_name}</p>
        <div className="mt-1 flex flex-row gap-2 text-xs">
          <Rating
            readOnly={true}
            style={{ maxWidth: 75 }}
            value={c.avg_rating ?? 0}
            itemStyles={{
              itemShapes: ThinRoundedStar,
              activeFillColor: '#3b82f6',
              inactiveFillColor: '#cbd5e1',
            }}
          />
          <span className="text-gray-500">
            {c.avg_rating ?? ''}
            {c.review_count ? ` (${c.review_count} reviews)` : 'n/a'}
          </span>
        </div>
      </div>
      <Tooltip closeDelay={0} content="View course details">
        <Button
          size="sm"
          radius="lg"
          variant="light"
          isIconOnly
          className="-mr-1"
          onPress={() => {
            setModalCourse(c)
            onModalOpen()
          }}
        >
          <BookOpenIcon className="h-4 w-4 text-gray-500" />
        </Button>
      </Tooltip>
    </div>
  )
}
