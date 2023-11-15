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
import { CourseBig } from './CourseBig'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

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
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

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
    <>
      <Divider />

      <h2 className="ml-1 mt-6 text-xl font-bold text-blue-800">
        Course Catalog
      </h2>

      <Input
        className="h-14"
        type="text"
        label={
          <div className="flex flex-row items-center gap-2">
            <MagnifyingGlassIcon className="pointer-events-none h-4 w-4 flex-shrink-0 text-2xl text-default-400" />
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
              startContent={<AdjustmentsHorizontalIcon className="h-4 w-4" />}
              className={`${
                coursesQuery.filter === 'all-courses'
                  ? 'border-neutral-300 bg-neutral-200'
                  : 'border-blue-600 bg-blue-600 text-white'
              } gap-1 rounded-xl border-1 px-1`}
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
              startContent={<BarsArrowDownIcon className="h-4 w-4" />}
              className={`${
                coursesQuery.sort === ''
                  ? 'border-neutral-300 bg-neutral-200'
                  : 'border-blue-600 bg-blue-600 text-white'
              } gap-1 rounded-xl border-1 px-1`}
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

      <div className="mt-3 flex grow flex-col overflow-hidden rounded-2xl border-1 border-neutral-300 shadow-inner">
        <ScrollShadow className="overflow-y-auto px-2 pb-2 pt-2">
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
    </>
  )
}
