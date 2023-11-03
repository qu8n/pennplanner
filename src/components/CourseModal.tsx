import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { Course } from '@/shared/types'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Link,
} from '@nextui-org/react'

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
    <Modal isOpen={isModalOpen} onOpenChange={onModalOpen} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col">
              <p className="text-neutral-500 font-semibold">
                {modalCourse?.course_id}
              </p>
              <p className="text-2xl font-normal">{modalCourse?.course_name}</p>
            </ModalHeader>

            <ModalBody className="-mt-4">
              <div className="font-normal text-sm flex flex-col">
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
                    : 'N/A'}
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
                  {modalCourse?.avg_difficulty ?? 'N/A'}
                </div>

                <div className="flex flex-row gap-2 items-center">
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
                    : 'N/A'}
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
                    <InformationCircleIcon className="flex-none w-4 h-4 text-neutral-400" />
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
                    className="text-xs mt-2 text-neutral-500"
                  >
                    View course reviews on MCIT Central
                  </Link>
                ) : null}
              </div>

              <p>{modalCourse?.course_description}</p>

              <p>
                <span className="font-semibold">Course units: </span>
                {modalCourse?.course_unit}
              </p>

              <p>
                <span className="font-semibold">Pre-Requisites: </span>
                {modalCourse?.course_prereqs}
              </p>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
