import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { Draggable } from './DnDWrappers/Draggable'
import { Course, DbUser, Visitor } from '@/shared/types'
import { CourseBig } from './CourseBig'
import { ModalWrapper } from './ModalWrapper'
import { Tutorial } from '@/contents/Tutorial'
import { useRouter } from 'next/router'

const sortMethods = {
  id: 'Course id: A-Z (default)',
  name: 'Course name: A-Z',
  rating: 'Rating: high-low',
}

function filterCourses(selectedFilter: string, coursesToFilter: Course[]) {
  let filteredCourses: Course[] = []
  switch (selectedFilter) {
    case 'all':
      filteredCourses = [...coursesToFilter]
      break
    case 'mcit_core_course':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mcit_core_course
      })
      break
    case 'mcit_open_elective':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mcit_open_elective
      })
      break
    case 'mse_ds_core_course':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mse_ds_core_course
      })
      break
    case 'mse_ds_technical_elective':
      filteredCourses = [...coursesToFilter].filter((course) => {
        return course.mse_ds_technical_elective
      })
      break
    case 'mse_ds_open_elective':
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
    case 'id':
      sortedCourses = [...coursesToSort].sort((a, b) =>
        a.course_id.localeCompare(b.course_id),
      )
      break
    case 'name':
      sortedCourses = [...coursesToSort].sort((a, b) =>
        a.course_name.localeCompare(b.course_name),
      )
      break
    case 'rating':
      sortedCourses = [...coursesToSort].sort((a, b) => {
        const aRating = a.avg_rating ? a.avg_rating : 0
        const bRating = b.avg_rating ? b.avg_rating : 0
        return bRating - aRating
      })
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
      title: 'Core courses',
      filter: 'mcit_core_course',
      description:
        'We recommend that you take the core courses in sequential order, but it is not required. You must take CIT 591 in your first semester and complete four core courses before registering for electives.',
    },
    {
      title: 'Open electives',
      filter: 'mcit_open_elective',
      description:
        'You’ll complete four graduate-level electives. MCIT Online students may use MSE-DS Online electives to satisfy their elective requirements.',
    },
  ],
  'MSE-DS': [
    {
      title: 'Core courses',
      filter: 'mse_ds_core_course',
      description:
        '4 Course Units. Either ESE 5420 or CIS 5150, but not both, must be taken as one of the 4 core course units.',
    },
    {
      title: 'Technical electives',
      filter: 'mse_ds_technical_elective',
      description:
        'Choose 4 Course Units. If you take five core courses, one can be used to fulfill a technical elective requirement.',
    },
    {
      title: 'Open electives',
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
  visitorType,
}: {
  dbUser: DbUser
  courseCatalog: Course[]
  coursesToDisplay: Course[]
  setCoursesToDisplay: (courses: Course[]) => void
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
  visitorType: Visitor
}) {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [coursesQuery, setCoursesQuery] = useState({
    search: '',
    filter: 'all',
    sort: 'id',
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
    if (
      !document.cookie.includes('showedInitialDisclaimer=true') &&
      visitorType === 'owner'
    ) {
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
        <h2
          className={`text-xl font-bold text-blue-800 ${
            visitorType !== 'owner' && 'opacity-50'
          }`}
        >
          Course Catalog
        </h2>

        <Button
          variant="light"
          color="primary"
          size="sm"
          onPress={onOpen}
          className="flex items-center gap-1 text-blue-700"
          isDisabled={visitorType !== 'owner'}
        >
          <p className="text-xs">Tutorial</p>
          <PlayCircleIcon className="h-4 w-4" />
        </Button>
      </div>

      <ModalWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        header="📖 Tutorial"
        baseCustomClasses="max-w-2xl"
        body={<Tutorial onClose={onClose} />}
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
        isDisabled={visitorType !== 'owner'}
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
                coursesQuery.filter !== 'all' && 'ring-2 ring-blue-700'
              } gap-1 rounded-md border-1 border-b-4 border-neutral-300 bg-neutral-200 px-1 hover:bg-neutral-300/[.8]`}
              isDisabled={visitorType !== 'owner'}
            >
              <span className="line-clamp-1">
                {coursesQuery.filter === 'all'
                  ? 'Filter course type'
                  : courseGroups[dbUser.program].find(
                      (group) => group.filter === coursesQuery.filter,
                    )?.title}
              </span>
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="filter"
            selectionMode="single"
            selectedKeys={[coursesQuery.filter]}
            disallowEmptySelection
            onAction={(key) =>
              setCoursesQuery({ ...coursesQuery, filter: key as string })
            }
          >
            {/* Temp fix for an unresolved bug: https://github.com/nextui-org/nextui/issues/1691 */}
            {[
              <DropdownItem key="all">All courses (default)</DropdownItem>,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              courseGroups[dbUser.program].map((group) => (
                <DropdownItem key={group.filter}>{group.title}</DropdownItem>
              )),
            ]}
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
                coursesQuery.sort !== 'id' && 'ring-2 ring-blue-700'
              } gap-1 rounded-md border-1 border-b-4 border-neutral-300 bg-neutral-200 px-1 hover:bg-neutral-300/[.8]`}
              isDisabled={visitorType !== 'owner'}
            >
              <span className="line-clamp-1">
                {coursesQuery.sort === 'id'
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
            <DropdownItem key="id">{sortMethods['id']}</DropdownItem>
            <DropdownItem key="name">{sortMethods['name']}</DropdownItem>
            <DropdownItem key="rating">{sortMethods['rating']}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div
        className={`mt-3 flex grow flex-col overflow-hidden rounded-md border-1 shadow-inner ${
          visitorType === 'owner' ? 'border-neutral-300' : 'border-neutral-200'
        }`}
      >
        <div className="flex grow flex-col overflow-y-auto px-2 pb-2 pt-2">
          {visitorType === 'owner' ? (
            <>
              {courseGroups[dbUser.program].map((group, index) => (
                <>
                  <h3
                    className={`${
                      index !== 0 && 'mt-10'
                    } text-md mx-1 border-b-2 border-neutral-500 bg-neutral-100 bg-opacity-70 font-semibold text-neutral-500`}
                  >
                    {group.title}
                  </h3>
                  <p className="mx-1 mb-4 mt-2 bg-neutral-100 bg-opacity-70 text-xs text-neutral-500">
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
            </>
          ) : (
            <div className="m-auto flex flex-col gap-2">
              <p className="text-center font-medium text-blue-800">
                Create or view your own planner
              </p>

              <Button
                className="custom-gradient m-auto flex flex-row items-center gap-3 rounded-md p-8 text-white"
                onPress={() => router.push('/signin')}
              >
                <AcademicCapIcon className="text-white-500 h-6 w-6" />
                <p>
                  <span className="font-light">Access your </span>
                  <span className="font-medium">PennPlanner</span>
                </p>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
