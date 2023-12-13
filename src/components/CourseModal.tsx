import {
  InformationCircleIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/20/solid'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { Course } from '@/shared/types'
import {
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
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
            <p className="font-semibold text-neutral-500">
              {modalCourse?.course_id}
            </p>
            <p className="font-semibold text-blue-900">
              {modalCourse?.course_name}
            </p>
          </>
        }
        body={
          <>
            <div className="flex flex-col font-normal">
              {(modalCourse?.course_id === 'ESE 5410' ||
                modalCourse?.course_id === 'ESE 5420') && (
                <div className="mb-4 w-auto rounded-md bg-red-100 p-4 text-red-900">
                  <SpeakerWaveIcon className="inline-block h-4 w-4 flex-none" />
                  <b className="ml-1">Notes:</b> the previous ESE 5420 was
                  renamed to ESE 5410 in Fall 2022, and the current ESE 5420 was
                  newly launched in Summer 2023. As a result, older reviews and
                  various ratings for ESE 5420 on MCIT Central are actually for
                  the now ESE 5410. For more context, see the full Slack
                  announcement{' '}
                  <Link
                    className="text-xs text-blue-700 lg:text-base"
                    isExternal={true}
                    underline="hover"
                    href="https://penn-eng-onl-students.slack.com/archives/CDAUBBFFA/p1657223897934779"
                  >
                    here.
                  </Link>
                </div>
              )}

              <div className="flex flex-row gap-2">
                <span className="mr-[1.1rem] lg:mr-[1.3rem]">Rating:</span>
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

                <Popover showArrow placement="right">
                  <PopoverTrigger>
                    <InformationCircleIcon className="h-4 w-4 flex-none text-neutral-400 hover:text-neutral-500" />
                  </PopoverTrigger>
                  <PopoverContent>
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
                  </PopoverContent>
                </Popover>
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
