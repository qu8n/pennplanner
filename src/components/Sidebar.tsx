import {
  AdjustmentsHorizontalIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  ScrollShadow,
  useDisclosure,
  Link,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { Draggable } from './DnDWrappers/Draggable'
import { Course, DbUser } from '@/shared/types'
import { CourseBig } from './CourseBig'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { ModalWrapper } from './ModalWrapper'

const filterMethods = {
  'mcit-core-courses': 'MCIT core courses',
  'mcit-open-electives': 'MCIT open electives',
  'mse-ds-core-courses': 'MSE-DS core courses',
  'mse-ds-technical-electives': 'MSE-DS technical electives',
  'mse-ds-open-electives': 'MSE-DS open electives',
}

const sortMethods = {
  'name-asc': 'Course name (asc)',
  'name-desc': 'Course name (desc)',
  'number-asc': 'Course number (asc)',
  'number-desc': 'Course number (desc)',
}

function filterCourses(selectedFilter: string, coursesToFilter: Course[]) {
  let filteredCourses: Course[] = []
  switch (selectedFilter) {
    case 'all-courses':
      filteredCourses = [...coursesToFilter]
      break
    case 'mcit-core-courses':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mcit_core_course
      })
      break
    case 'mcit-open-electives':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mcit_open_elective
      })
      break
    case 'mse-ds-core-courses':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mse_ds_core_course
      })
      break
    case 'mse-ds-technical-electives':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mse_ds_technical_elective
      })
      break
    case 'mse-ds-open-electives':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mse_ds_open_elective
      })
      break
  }
  return filteredCourses
}

function sortCourses(sortMethod: string, coursesToSort: Course[]) {
  let sortedCourses: Course[] = []
  switch (sortMethod) {
    case '':
    case 'number-asc':
      sortedCourses = [...coursesToSort].sort((a, b) =>
        a.course_id.localeCompare(b.course_id),
      )
      break
    case 'number-desc':
      sortedCourses = [...coursesToSort].sort((a, b) =>
        b.course_id.localeCompare(a.course_id),
      )
      break
    case 'name-asc':
      sortedCourses = [...coursesToSort].sort((a, b) =>
        a.course_name.localeCompare(b.course_name),
      )
      break
    case 'name-desc':
      sortedCourses = [...coursesToSort].sort((a, b) =>
        b.course_name.localeCompare(a.course_name),
      )
      break
  }
  return sortedCourses
}

function searchCourses(searchValue: string, coursesToSearch: Course[]) {
  const fuse = new Fuse(coursesToSearch, {
    threshold: 0.2,
    keys: ['course_id', 'course_name'],
  })
  const results = fuse.search(searchValue)
  return results.map((result) => result.item)
}

const courseGroups: {
  [program: string]: {
    title: string
    filter: keyof Course // column name from courses data file
    description: string // from Course Catalog page
  }[]
} = {
  MCIT: [
    {
      title: 'Core Courses',
      filter: 'mcit_core_course',
      description:
        'We recommend that you take the core courses in sequential order, but it is not required. You must take CIT 591 in your first semester and complete four core courses before registering for electives.',
    },
    {
      title: 'Open Electives',
      filter: 'mcit_open_elective',
      description:
        'You’ll complete four graduate-level electives. MCIT Online students may use MSE-DS Online electives to satisfy their elective requirements.',
    },
  ],
  'MSE-DS': [
    {
      title: 'Core Courses',
      filter: 'mse_ds_core_course',
      description:
        '4 Course Units. Either ESE 5420 or CIS 5150, but not both, must be taken as one of the 4 core course units.',
    },
    {
      title: 'Technical Electives',
      filter: 'mse_ds_technical_elective',
      description:
        'Choose 4 Course Units. If you take five core courses, one can be used to fulfill a technical elective requirement.',
    },
    {
      title: 'Open Electives',
      filter: 'mse_ds_open_elective',
      description:
        'Choose 2 Course Units. Students may use any additional Core Courses or Technical Electives to fulfill an open elective requirement.',
    },
  ],
}

export function Sidebar({
  dbUser,
  courseCatalog, // courses not assigned to a semester
  coursesToDisplay, // filtered/unfiltered view of courseCatalog
  setCoursesToDisplay,
  setModalCourse,
  onModalOpen,
}: {
  dbUser: DbUser
  courseCatalog: Course[]
  coursesToDisplay: Course[]
  setCoursesToDisplay: (courses: Course[]) => void
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [coursesQuery, setCoursesQuery] = useState({
    search: '',
    filter: 'all-courses',
    sort: '',
  })

  useEffect(() => {
    let coursesToQuery: Course[] = courseCatalog
    if (coursesQuery.search)
      coursesToQuery = searchCourses(coursesQuery.search, coursesToQuery)
    coursesToQuery = filterCourses(coursesQuery.filter, coursesToQuery)
    coursesToQuery = sortCourses(coursesQuery.sort, coursesToQuery)
    setCoursesToDisplay(coursesToQuery)
    // eslint-disable-next-line
  }, [coursesQuery, courseCatalog])

  useEffect(() => {
    if (!document.cookie.includes('showedInitialDisclaimer=true')) {
      onOpen()
      const aMonthFromNow = new Date()
      aMonthFromNow.setTime(aMonthFromNow.getTime() + 30 * 24 * 60 * 60 * 1000)
      document.cookie = `showedInitialDisclaimer=true; expires=${aMonthFromNow.toUTCString()}`
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="ml-1 mt-6 flex flex-row items-start justify-between">
        <h2 className="text-xl font-bold text-blue-800">Course Catalog</h2>
        <Button
          variant="light"
          color="danger"
          size="sm"
          onPress={onOpen}
          className="flex items-center gap-1 text-red-600"
        >
          <p className="text-xs">Disclaimer</p>
          <ExclamationTriangleIcon className="h-4 w-4" />
        </Button>
      </div>

      <ModalWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        header="Disclaimer"
        baseCustomClasses="max-w-lg"
        body={
          <>
            <div>
              PennPlanner is still in early development and may contains errors
              or inaccuracies. Please refer to the Penn Engineering
              Online&apos;s{' '}
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

            <div>
              This application references reviews from{' '}
              <Link
                className="text-blue-700"
                isExternal={true}
                underline="hover"
                href="https://mcitcentral.com/"
              >
                MCIT Central
              </Link>
              , which is no longer maintained and may contain outdated
              information.
            </div>

            <div>
              Please refer to the Penn Engineering Online&apos;s Slack channel{' '}
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
              </Link>{' '}
              to gather the latest student experiences.
            </div>

            <div>
              See an error? Let me know by creating an issue on GitHub{' '}
              <Link
                className="text-blue-700"
                isExternal={true}
                underline="hover"
                href="https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
              >
                here
              </Link>
              . Contributions are also welcome! I&apos;m happy to help you get
              started over{' '}
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
        }
      />

      <Input
        className="h-14"
        type="text"
        label={
          <div className="flex flex-row items-center gap-2">
            <MagnifyingGlassIcon className="pointer-events-none h-4 w-4 flex-shrink-0 text-2xl text-neutral-400" />
            Search course name, id, or number
          </div>
        }
        variant="underlined"
        labelPlacement="inside"
        isClearable
        value={coursesQuery.search}
        onValueChange={(value) =>
          setCoursesQuery({ ...coursesQuery, search: value })
        }
      />

      <div className="z-0 mt-3 flex gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              fullWidth
              variant="bordered"
              startContent={
                <AdjustmentsHorizontalIcon className="h-4 w-4 text-neutral-500" />
              }
              className={`${
                coursesQuery.filter !== 'all-courses' && 'ring-2 ring-blue-700'
              } gap-1 rounded-md border-1 border-b-4 border-neutral-300 bg-neutral-200 px-1 hover:bg-neutral-300/[.8]`}
            >
              <span className="line-clamp-1">
                {coursesQuery.filter === 'all-courses'
                  ? 'Filter course type'
                  : filterMethods[
                      coursesQuery.filter as keyof typeof filterMethods
                    ]}
              </span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="filter"
            selectionMode="single"
            selectedKeys={[coursesQuery.filter]}
            onAction={(key) =>
              setCoursesQuery({ ...coursesQuery, filter: key as string })
            }
          >
            <DropdownItem key="all-courses">All courses</DropdownItem>
            <DropdownSection title="MCIT">
              <DropdownItem key="mcit-core-courses">Core courses</DropdownItem>
              <DropdownItem key="mcit-open-electives">
                Open electives
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="MSE-DS">
              <DropdownItem key="mse-ds-core-courses">
                Core courses
              </DropdownItem>
              <DropdownItem key="mse-ds-technical-electives">
                Technical electives
              </DropdownItem>
              <DropdownItem key="mse-ds-open-electives">
                Open electives
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button
              fullWidth
              variant="bordered"
              startContent={
                <BarsArrowDownIcon className="h-4 w-4 text-neutral-500" />
              }
              className={`${
                coursesQuery.sort !== '' && 'ring-2 ring-blue-700'
              } gap-1 rounded-md border-1 border-b-4 border-neutral-300 bg-neutral-200 px-1 hover:bg-neutral-300/[.8]`}
            >
              <span className="line-clamp-1">
                {coursesQuery.sort === ''
                  ? 'Sort by'
                  : sortMethods[coursesQuery.sort as keyof typeof sortMethods]}
              </span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="sort"
            selectionMode="single"
            selectedKeys={[coursesQuery.sort]}
            disallowEmptySelection
            onAction={(key) =>
              setCoursesQuery({ ...coursesQuery, sort: key as string })
            }
          >
            <DropdownItem key="name-asc">
              {sortMethods['name-asc']}
            </DropdownItem>
            <DropdownItem key="name-desc">
              {sortMethods['name-desc']}
            </DropdownItem>
            <DropdownItem key="number-asc">
              {sortMethods['number-asc']}
            </DropdownItem>
            <DropdownItem key="number-desc">
              {sortMethods['number-desc']}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="mt-3 flex grow flex-col overflow-hidden rounded-md border-1 border-neutral-300 shadow-inner">
        <ScrollShadow className="overflow-y-auto px-2 pb-2 pt-2">
          {courseGroups[dbUser.program].map((group, index) => (
            <>
              <h3
                className={`${
                  index !== 0 && 'mt-10'
                } text-md mx-1 border-b-2 border-neutral-500 bg-neutral-100 bg-opacity-70 font-semibold text-neutral-500`}
              >
                {group.title}
              </h3>
              <p className="mx-1 mb-4 mt-2 text-xs text-neutral-500">
                {group.description}
              </p>
              {coursesToDisplay.map((c) => {
                if (c[group.filter] === true) {
                  return (
                    <Draggable key={c.course_id} id={c.course_id}>
                      <CourseBig
                        c={c}
                        setModalCourse={setModalCourse}
                        onModalOpen={onModalOpen}
                      />
                    </Draggable>
                  )
                }
              })}
            </>
          ))}

          {coursesToDisplay.length === 0 && (
            <div className="flex flex-col items-center">
              <p className="mt-2 text-sm">
                No courses found. Try a different search or filter.
              </p>
            </div>
          )}
        </ScrollShadow>
      </div>
    </>
  )
}
