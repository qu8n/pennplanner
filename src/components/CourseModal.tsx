import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Tooltip } from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'
import { Course } from '@/shared/types'

export function CourseModal({ course }: { course: Course }) {
  return (
    <>
      <div>
        <p className="font-semibold">MCITCentral Stats</p>
        <div className="flex flex-row gap-2">
          <span className="mr-[1.3rem] font-medium">Rating:</span>
          <Rating
            readOnly={true}
            style={{ maxWidth: 100 }}
            value={course.avg_rating ?? 0}
          />
          {course.avg_rating ?? ''}
          {course.review_count ? ` (${course.review_count} reviews)` : 'N/A'}
        </div>
        <div className="flex flex-row gap-2">
          <span className="font-medium mr-[0.2rem]">Difficulty:</span>
          <Rating
            readOnly={true}
            style={{ maxWidth: 100 }}
            value={course.avg_difficulty ?? 0}
          />
          {course.avg_difficulty ?? 'N/A'}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="font-medium">Workload: </span>
          <Rating
            readOnly={true}
            style={{ maxWidth: 100 }}
            value={
              course.avg_hours_per_week
                ? course.avg_hours_per_week > 20
                  ? 5
                  : course.avg_hours_per_week / 4
                : 0
            }
          />
          {course.avg_hours_per_week
            ? `${course.avg_hours_per_week} hours/week`
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
                    className="-ml-[2px]"
                  />
                  <span>&gt;= 20 hours/week</span>
                </div>
              </div>
            }
            showArrow
          >
            <InformationCircleIcon className="flex-none w-4 h-4 text-gray-400" />
          </Tooltip>
        </div>
      </div>

      <div>
        <p className="font-semibold">Course Unit</p>
        <p>{course.course_unit} unit</p>
      </div>

      <div>
        <p className="font-semibold">Description</p>
        <p>{course.course_description}</p>
      </div>

      <div>
        <p className="font-semibold">Pre-Requisites</p>
        <p>{course.course_prereqs}</p>
      </div>
    </>
  )
}
