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
        isDragging ? 'shadow-md cursor-grabbing' : 'shadow-sm hover:cursor-grab'
      } flex flex-row items-center justify-between bg-neutral-100 ring-1 ring-neutral-300 mb-3 rounded-2xl py-2 px-3 gap-1`}
    >
      <div className="flex flex-col">
        <p className="font-semibold text-sm">{c.course_id}</p>
        <p className="text-xs">{c.course_name}</p>
        <div className="flex flex-row gap-2 text-xs mt-1">
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
          <BookOpenIcon className="w-4 h-4 text-gray-500" />
        </Button>
      </Tooltip>
    </div>
  )
}
