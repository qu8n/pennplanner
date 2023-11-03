import { Course } from '@/shared/types'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip } from '@nextui-org/react'

export function CourseTiny({
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
      } flex flex-row items-center justify-between px-2 py-1 rounded-lg bg-neutral-50 ring-1 ring-neutral-300`}
    >
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{c.course_id}</p>
        <p className="text-xs line-clamp-1">{c.course_name}</p>
      </div>

      <Tooltip closeDelay={0} showArrow={true} content="View course details">
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
          <BookOpenIcon className="w-3 h-3 text-gray-500" />
        </Button>
      </Tooltip>
    </div>
  )
}
