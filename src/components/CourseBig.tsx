import { Course } from '@/shared/types'
import { Button, Divider } from '@nextui-org/react'
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
        isDragging ? 'rotate-1 cursor-grabbing shadow-md' : 'cursor-grab shadow'
      } mb-2 flex flex-col items-start rounded-md border-1 border-neutral-300 bg-white px-3 py-2 duration-300 hover:ring-2 hover:ring-blue-500`}
    >
      <p className="font-semibold text-neutral-500">{c.course_id}</p>
      <p className="line-clamp-2 text-sm font-medium text-blue-900">
        {c.course_name}
      </p>

      <Divider className="my-2 bg-neutral-200" />

      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-1 text-xs text-neutral-500">
          <Rating
            readOnly={true}
            style={{ maxWidth: 80 }}
            value={c.avg_rating ?? 0}
            itemStyles={{
              itemShapes: ThinRoundedStar,
              activeFillColor: '#3b82f6',
              inactiveFillColor: '#cbd5e1',
            }}
            className="-mt-1"
          />
          <span>{c.avg_rating ?? ''}</span>
          <span className="line-clamp-1">
            {c.review_count ? ` (${c.review_count} reviews)` : 'n/a'}
          </span>
        </div>

        <Button
          size="sm"
          variant="flat"
          className="h-7 rounded-md text-xs text-neutral-500 hover:bg-neutral-300/[.8]"
          onPress={() => {
            setModalCourse(c)
            onModalOpen()
          }}
        >
          View course info
        </Button>
      </div>
    </div>
  )
}
