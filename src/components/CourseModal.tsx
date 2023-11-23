import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { Course } from '@/shared/types'
import { Link, Tooltip } from '@nextui-org/react'
import { ModalWrapper } from './ModalWrapper'

export function CourseModal({
  isModalOpen,
  onModalOpen,
  modalCourse,
}: {
  modalCourse: Course | null
  isModalOpen: boolean
  onModalOpen: () => void
}) {
  return (
    <>
      <ModalWrapper
        isOpen={isModalOpen}
        onOpenChange={onModalOpen}
        baseCustomClasses="max-w-3xl"
        header={
          <>
            <p className="text-xl font-bold text-neutral-500">
              {modalCourse?.course_id}
            </p>
            <p className="text-2xl font-semibold text-blue-900">
              {modalCourse?.course_name}
            </p>
          </>
        }
        body={
          <>
            <div className="flex flex-col text-sm font-normal">
              <div className="flex flex-row gap-2">
                <span className="mr-[1.3rem]">Rating:</span>
                <Rating
                  readOnly={true}
                  style={{ maxWidth: 100 }}
                  value={modalCourse?.avg_rating ?? 0}
                  itemStyles={{
                    itemShapes: ThinRoundedStar,
                    activeFillColor: '#3b82f6',
                    inactiveFillColor: '#cbd5e1',
                  }}
                />
                {modalCourse?.avg_rating ?? ''}
                {modalCourse?.review_count
                  ? ` (${modalCourse?.review_count} reviews)`
                  : 'n/a'}
              </div>

              <div className="flex flex-row gap-2">
                <span className="mr-[0.2rem]">Difficulty:</span>
                <Rating
                  readOnly={true}
                  style={{ maxWidth: 100 }}
                  value={modalCourse?.avg_difficulty ?? 0}
                  itemStyles={{
                    itemShapes: ThinRoundedStar,
                    activeFillColor: '#3b82f6',
                    inactiveFillColor: '#cbd5e1',
                  }}
                />
                {modalCourse?.avg_difficulty ?? 'n/a'}
              </div>

              <div className="flex flex-row items-center gap-2">
                <span>Workload: </span>
                <Rating
                  readOnly={true}
                  style={{ maxWidth: 100 }}
                  value={
                    modalCourse?.avg_hours_per_week
                      ? modalCourse?.avg_hours_per_week > 20
                        ? 5
                        : modalCourse?.avg_hours_per_week / 4
                      : 0
                  }
                  itemStyles={{
                    itemShapes: ThinRoundedStar,
                    activeFillColor: '#3b82f6',
                    inactiveFillColor: '#cbd5e1',
                  }}
                />
                {modalCourse?.avg_hours_per_week
                  ? `${modalCourse?.avg_hours_per_week} hours/week`
                  : 'n/a'}
                <Tooltip
                  placement="right"
                  content={
                    <div className="flex flex-col">
                      <p className="font-medium">Rating system:</p>
                      <div className="flex flex-row items-center gap-1">
                        <span>1</span>
                        <Rating
                          readOnly={true}
                          style={{ maxWidth: 20 }}
                          value={1}
                          items={1}
                          itemStyles={{
                            itemShapes: ThinRoundedStar,
                            activeFillColor: '#3b82f6',
                            inactiveFillColor: '#cbd5e1',
                          }}
                        />
                        <span>= 4 hours/week</span>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <span>5</span>
                        <Rating
                          readOnly={true}
                          style={{ maxWidth: 20 }}
                          value={1}
                          items={1}
                          itemStyles={{
                            itemShapes: ThinRoundedStar,
                            activeFillColor: '#3b82f6',
                            inactiveFillColor: '#cbd5e1',
                          }}
                          className="-ml-[2px]"
                        />
                        <span>&gt;= 20 hours/week</span>
                      </div>
                    </div>
                  }
                  showArrow
                >
                  <InformationCircleIcon className="h-4 w-4 flex-none text-neutral-400" />
                </Tooltip>
              </div>

              {modalCourse?.review_count ? (
                <Link
                  isExternal={true}
                  showAnchorIcon
                  href={`https://mcitcentral.com/courses/${modalCourse?.course_id
                    .replace(/\s/g, '-')
                    .replace(/\d$/, '')}`}
                  underline="hover"
                  className="mt-2 text-xs text-neutral-500"
                >
                  View course reviews on MCIT Central
                </Link>
              ) : (
                <p className="mt-2 text-xs text-neutral-500">
                  No course reviews found on MCIT Central
                </p>
              )}
            </div>

            <p>{modalCourse?.course_description}</p>

            <p>
              <span className="font-semibold">Course units: </span>
              {modalCourse?.course_unit}
            </p>

            <p>
              <span className="font-semibold">Pre-Requisites: </span>
              {modalCourse?.course_prereqs_text}
            </p>
          </>
        }
      />
    </>
  )
}
