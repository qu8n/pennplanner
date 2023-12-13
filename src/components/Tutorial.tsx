import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button, Link, Pagination } from '@nextui-org/react'
import { useState } from 'react'

function BrowseCourses() {
  return (
    <>
      <h2 className="text-xl font-medium text-blue-900">
        Browse, then drag and drop courses into a semester
      </h2>
      <img
        src="/tutorial/browse-courses.gif"
        alt="Browse courses"
        className="pointer-events-none mx-auto rounded-md border-1 border-neutral-200"
      />
    </>
  )
}

function CourseWarnings() {
  return (
    <>
      <h2 className="text-xl font-medium text-blue-900">
        Get warnings when requirements are not met
      </h2>
      <img
        src="/tutorial/course-warnings.gif"
        alt="Course warnings"
        className="pointer-events-none mx-auto rounded-md border-1 border-neutral-200"
      />
    </>
  )
}

function WarningTriggers() {
  return (
    <>
      <h2 className="text-xl font-medium text-blue-900">
        What would trigger a course warning?
      </h2>
      <ul className="ml-4 list-disc">
        <li>
          The course&apos;s <b>prerequisites</b> or <b>corequisites</b> have not
          been met
        </li>
        <li>
          Course is <b>not available</b> in the assigned semester, per the{' '}
          <Link
            className="text-xs text-blue-700 lg:text-base"
            isExternal={true}
            underline="hover"
            href="https://online.seas.upenn.edu/student-knowledge-base/course-schedule/"
          >
            Course Schedule
          </Link>
        </li>
        <li>
          Other miscellaneous rules from the{' '}
          <Link
            className="text-xs text-blue-700 lg:text-base"
            isExternal={true}
            underline="hover"
            href="https://online.seas.upenn.edu/degrees/student-services/student-handbook/"
          >
            Student Handbook
          </Link>
        </li>
      </ul>
      <img
        src="/tutorial/course-warning-example.png"
        alt="Course warnings"
        className="pointer-events-none mx-auto rounded-md border-1 border-neutral-200"
      />
    </>
  )
}

function Disclaimer() {
  return (
    <>
      <h2 className="text-xl font-medium text-blue-900">Disclaimer</h2>
      <div className="text-left">
        PennPlanner is still in early development and may contains errors or
        inaccuracies. It also references reviews from{' '}
        <Link
          className="text-xs text-blue-700 lg:text-base"
          isExternal={true}
          underline="hover"
          href="https://mcitcentral.com/"
        >
          MCIT Central
        </Link>
        , which is no longer maintained and may contain outdated information
        (although a group of students is working on a replacement).
      </div>

      <div className="text-left">
        For official and updated information, please refer to the Penn
        Engineering Online&apos;s{' '}
        <Link
          className="text-xs text-blue-700 lg:text-base"
          isExternal={true}
          underline="hover"
          href="https://online.seas.upenn.edu/student-knowledge-base/"
        >
          Student Knowledge Base
        </Link>
        . For the latest student experiences, please refer to the Penn
        Engineering Online&apos;s Slack channel{' '}
        <Link
          className="text-xs text-blue-700 lg:text-base"
          isExternal={true}
          underline="hover"
          href="https://penn-eng-onl-students.slack.com/archives/C02ADHGAL93"
        >
          #course-planning-advice
        </Link>
        , the{' '}
        <Link
          className="text-xs text-blue-700 lg:text-base"
          isExternal={true}
          underline="hover"
          href="https://discord.gg/3HDZ2FNJaG"
        >
          MCIT Discord server
        </Link>
        , and the{' '}
        <Link
          className="text-xs text-blue-700 lg:text-base"
          isExternal={true}
          underline="hover"
          href="https://discord.gg/S4KQKCXdvv"
        >
          MSE-DS Discord server
        </Link>
        .
      </div>

      <img
        src="/tutorial/get-started.png"
        alt="Get started"
        className="pointer-events-none mx-auto hidden max-w-xs lg:block"
      />
    </>
  )
}

function PageContent({ page }: { page: number }) {
  switch (page) {
    case 1:
      return <BrowseCourses />
    case 2:
      return <CourseWarnings />
    case 3:
      return <WarningTriggers />
    case 4:
      return <Disclaimer />
  }
}

const TOTAL_PAGES = 4

const nextButtonTwClasses =
  'gap-1 border-1 border-b-4 border-neutral-300 bg-neutral-200 hover:bg-neutral-300/[.8]'

const getStartedButtonTwClasses = 'custom-gradient text-white'

export function Tutorial({ onClose }: { onClose: () => void }) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="flex flex-col gap-4">
      <PageContent page={currentPage} />

      <Button
        fullWidth
        className={`${
          currentPage !== TOTAL_PAGES
            ? nextButtonTwClasses
            : getStartedButtonTwClasses
        } mx-auto mt-4 max-w-xs rounded-md`}
        onPress={() => {
          if (currentPage !== TOTAL_PAGES) setCurrentPage(currentPage + 1)
          else onClose()
        }}
        endContent={
          currentPage !== TOTAL_PAGES && (
            <ChevronRightIcon className="h-4 w-4 text-neutral-500" />
          )
        }
      >
        {currentPage !== TOTAL_PAGES ? 'Next' : 'Get started'}
      </Button>

      <Pagination
        total={TOTAL_PAGES}
        page={currentPage}
        onChange={setCurrentPage}
        className="mx-auto"
        classNames={{
          cursor: 'bg-neutral-200 text-black',
        }}
      />
    </div>
  )
}
