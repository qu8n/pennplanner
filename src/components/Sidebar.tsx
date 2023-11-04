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
  Divider,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { Draggable } from './DnDWrappers/Draggable'
import { Course } from '@/shared/types'
import { BookmarkSquareIcon } from '@heroicons/react/20/solid'
import { CourseBig } from './CourseBig'

function getCourseNumbers(courseIdA: string, courseIdB: string) {
  const numberA = parseInt(courseIdA.match(/\d+/)![0])
  const numberB = parseInt(courseIdB.match(/\d+/)![0])
  return [numberA, numberB]
}

const filterMethods = {
  'mcit-core-courses': 'MCIT core courses',
  'mcit-open-electives': 'MCIT open electives',
  'mse-ds-core-courses': 'MSE-DS core courses',
  'mse-ds-technical-electives': 'MSE-DS technical electives',
  'mse-ds-open-electives': 'MSE-DS open electives',
}

const sortMethods = {
  'name-asc': 'Course name (A-Z)',
  'name-desc': 'Course name (Z-A)',
  'number-asc': 'Course number (0-9)',
  'number-desc': 'Course number (9-0)',
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
    case 'number-asc':
      sortedCourses = [...coursesToSort].sort((a, b) => {
        const [numberA, numberB] = getCourseNumbers(a.course_id, b.course_id)
        return numberA - numberB
      })
      break
    case 'number-desc':
      sortedCourses = [...coursesToSort].sort((a, b) => {
        const [numberA, numberB] = getCourseNumbers(a.course_id, b.course_id)
        return numberB - numberA
      })
      break
  }
  return sortedCourses
}

function searchCourses(searchValue: string, coursesToSearch: Course[]) {
  const fuse = new Fuse(coursesToSearch, {
    threshold: 0.3,
    keys: ['course_id', 'course_name', 'course_description'],
  })
  const results = fuse.search(searchValue)
  return results.map((result) => result.item)
}

export function Sidebar({
  courseCatalog,
  coursesToDisplay,
  setCoursesToDisplay,
  setModalCourse,
  onModalOpen,
}: {
  courseCatalog: Course[]
  coursesToDisplay: Course[]
  setCoursesToDisplay: (courses: Course[]) => void
  setModalCourse: (modalCourse: Course) => void
  onModalOpen: () => void
}) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesQuery, courseCatalog])

  return (
    <aside className="my-6 flex w-[26rem] flex-col rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-lg font-semibold">Course Catalog</h2>

      <Input
        className="mt-3 h-14"
        type="text"
        label={
          <div className="flex flex-row items-center gap-2">
            <MagnifyingGlassIcon className="pointer-events-none h-4 w-4 flex-shrink-0 text-2xl text-default-400" />
            Search course name, number, or description
          </div>
        }
        variant="flat"
        labelPlacement="inside"
        isClearable
        value={coursesQuery.search}
        onValueChange={(value) =>
          setCoursesQuery({ ...coursesQuery, search: value })
        }
      />

      <div className="mt-3 flex gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              fullWidth
              variant="bordered"
              startContent={
                coursesQuery.filter === 'all-courses' ? (
                  <AdjustmentsHorizontalIcon className="h-4 w-4" />
                ) : null
              }
              className={`${
                coursesQuery.filter === 'all-courses'
                  ? 'border-none bg-gray-200'
                  : 'border-1 border-blue-500 bg-white text-blue-500'
              } rounded-xl`}
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
                coursesQuery.sort === '' ? (
                  <BarsArrowDownIcon className="h-4 w-4" />
                ) : null
              }
              className={`${
                coursesQuery.sort === ''
                  ? 'border-none bg-gray-200'
                  : 'border-1 border-blue-500 bg-white text-blue-500'
              } rounded-xl`}
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

      <Divider className="mt-3" />

      <div className="flex grow flex-col overflow-hidden">
        <ScrollShadow className="overflow-y-auto px-1 pb-2 pt-3">
          {coursesToDisplay.map((c) => (
            <Draggable key={c.course_id} id={c.course_id}>
              <CourseBig
                c={c}
                setModalCourse={setModalCourse}
                onModalOpen={onModalOpen}
              />
            </Draggable>
          ))}
        </ScrollShadow>
      </div>

      <Divider />

      {/* For non-logged in users */}
      <div className="mt-4 flex flex-row items-center gap-2">
        <button className="flex flex-row items-center gap-1 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 text-white">
          <BookmarkSquareIcon className="text-white-500 h-4 w-4" />
          <span className="text-sm">Create your </span>
          <span className="text-sm font-medium">PennPlanner</span>
        </button>

        <div className="flex">
          <button className="rounded-xl px-1 py-1 text-xs text-neutral-500 hover:bg-neutral-100">
            Login
          </button>

          <button className="rounded-xl px-1 py-1 text-xs text-neutral-500 hover:bg-neutral-100">
            About
          </button>

          <button className="rounded-xl px-1 py-1 text-xs text-neutral-500 hover:bg-neutral-100">
            Feedback
          </button>
        </div>
      </div>

      {/* For logged-in users */}
      {/* <div className="mt-4 flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-1">
          <BookmarkSquareIcon className="h-4 w-4 text-blue-700" />
          <span className="font-medium text-sm text-blue-700">PennPlanner</span>
        </div>

        <button className="text-xs text-neutral-500 py-1 px-2 hover:bg-neutral-100 rounded-xl">
          Logout
        </button>

        <button className="text-xs text-neutral-500 py-1 px-2 hover:bg-neutral-100 rounded-xl">
          About
        </button>

        <button className="text-xs text-neutral-500 py-1 px-2 hover:bg-neutral-100 rounded-xl">
          Feedback
        </button>
      </div> */}
    </aside>
  )
}
