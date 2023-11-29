import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button, Link } from '@nextui-org/react'
import { useState } from 'react'

function Disclaimer() {
  return (
    <>
      <h2 className="text-lg font-semibold text-blue-900">Disclaimer</h2>
      <div className="text-left">
        PennPlanner is still in early development and may contains errors or
        inaccuracies. Please refer to the Penn Engineering Online&apos;s{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://online.seas.upenn.edu/student-knowledge-base/"
        >
          Student Knowledge Base
        </Link>{' '}
        for official information.
      </div>

      <div className="text-left">
        PennPlanner also references reviews from{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://mcitcentral.com/"
        >
          MCIT Central
        </Link>
        , which is no longer maintained and may contain outdated information.
      </div>

      <div className="text-left">
        For the latest student experiences, please refer to the Penn Engineering
        Online&apos;s Slack channel{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://penn-eng-onl-students.slack.com/archives/C02ADHGAL93"
        >
          #course-planning-advice
        </Link>
        , the{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://discord.gg/3HDZ2FNJaG"
        >
          MCIT Discord server
        </Link>
        , and the{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://discord.gg/S4KQKCXdvv"
        >
          MSE-DS Discord server
        </Link>
        .
      </div>

      <div className="text-left">
        See an error? Let me know by creating an issue on GitHub{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
        >
          here
        </Link>
        . Contributions are also welcome! I&apos;m happy to help you get started
        over{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://penn-eng-onl-students.slack.com/team/U029YJF17LG"
        >
          Slack.
        </Link>
      </div>
      <p>-Quan</p>
    </>
  )
}

function BrowseCourses() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-900">
        Browse, then drag and drop courses into a semester
      </h2>
      <p className="text-sm">
        Use the left sidebar to search, filter, sort, and view course info of
        the entire course catalog
      </p>
      <img
        src="/tutorial/browse-courses.gif"
        alt="Browse courses"
        className="pointer-events-none mx-auto max-w-xl rounded-md border-1 border-neutral-200"
      />
    </>
  )
}

function CourseWarnings() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-900">
        Get warnings when requirements are not met
      </h2>
      <p className="text-sm">
        Return courses back to the sidebar by clicking on the &quot;x&quot;
        button
      </p>
      <img
        src="/tutorial/course-warnings.gif"
        alt="Course warnings"
        className="pointer-events-none mx-auto max-w-xl rounded-md border-1 border-neutral-200"
      />
    </>
  )
}

function PageContent({ page }: { page: number }) {
  switch (page) {
    case 0:
      return <BrowseCourses />
    case 1:
      return <CourseWarnings />
    case 2:
      return <Disclaimer />
  }
}

const PAGE_COUNT = 3

export function Tutorial() {
  const [page, setPage] = useState(0)

  return (
    <div className="flex flex-col gap-4 text-center">
      <PageContent page={page} />

      <Button
        fullWidth
        className="custom-gradient mx-auto mt-4 max-w-xs rounded-md text-white"
        onPress={() => {
          if (page === PAGE_COUNT - 1) setPage(0)
          else setPage(page + 1)
        }}
        endContent={<ChevronRightIcon className="h-4 w-4 text-neutral-300" />}
      >
        {page === PAGE_COUNT - 1 ? 'Get Started' : 'Next'}
      </Button>
    </div>
  )
}
