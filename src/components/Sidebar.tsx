import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
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
} from '@nextui-org/react'
import { Key, useEffect, useState } from 'react'
import { allCourses } from '@/data/allCourses'
import Fuse from 'fuse.js'
import { DraggableCourse } from './DraggableCourse'

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

export function Sidebar() {
  const [courses, setCourses] = useState(allCourses)
  const [searchValue, setSearchValue] = useState('')
  const [selectedFilter, setSelectedFilter] = useState(new Set(['all-courses']))
  const [selectedSort, setSelectedSort] = useState(new Set(['']))

  useEffect(() => {
    if (searchValue) {
      const fuse = new Fuse(allCourses, {
        threshold: 0.3,
        keys: ['course_id', 'course_name', 'course_description'],
      })
      const results = fuse.search(searchValue)
      setCourses(results.map((result) => result.item))
      setSelectedFilter(new Set(['all-courses']))
      setSelectedSort(new Set(['']))
    } else {
      setCourses(allCourses)
    }
  }, [searchValue])

  function handleFilter(filterMethod: string) {
    let filteredCourses: typeof courses = []

    let coursesToFilter: typeof courses = []
    if (searchValue) {
      coursesToFilter = [...courses]
    } else {
      coursesToFilter = [...allCourses]
    }

    try {
      switch (filterMethod) {
        case 'all-courses':
          filteredCourses = coursesToFilter
          break
        case 'mcit-core-courses':
          filteredCourses = coursesToFilter.filter((course) => {
            return course.mcit_core_course
          })
          break
        case 'mcit-open-electives':
          filteredCourses = coursesToFilter.filter((course) => {
            return course.mcit_open_elective
          })
          break
        case 'mse-ds-core-courses':
          filteredCourses = coursesToFilter.filter((course) => {
            return course.mse_ds_core_course
          })
          break
        case 'mse-ds-technical-electives':
          filteredCourses = coursesToFilter.filter((course) => {
            return course.mse_ds_technical_elective
          })
          break
        case 'mse-ds-open-electives':
          filteredCourses = coursesToFilter.filter((course) => {
            return course.mse_ds_open_elective
          })
          break
      }
    } catch (e) {
      console.error(e)
    } finally {
      setCourses(filteredCourses)
    }
  }

  function handleSort(sortMethod: string) {
    let sortedCourses: typeof courses = []
    try {
      switch (sortMethod) {
        case 'number-asc':
          sortedCourses = [...courses].sort((a, b) => {
            const [numberA, numberB] = getCourseNumbers(
              a.course_id,
              b.course_id,
            )
            return numberA - numberB
          })
          break
        case 'number-desc':
          sortedCourses = [...courses].sort((a, b) => {
            const [numberA, numberB] = getCourseNumbers(
              a.course_id,
              b.course_id,
            )
            return numberB - numberA
          })
          break
        case 'name-asc':
          sortedCourses = [...courses].sort((a, b) =>
            a.course_name.localeCompare(b.course_name),
          )
          break
        case 'name-desc':
          sortedCourses = [...courses].sort((a, b) =>
            b.course_name.localeCompare(a.course_name),
          )
          break
      }
    } catch (e) {
      console.error(e)
    } finally {
      setCourses(sortedCourses)
    }
  }

  return (
    <>
      <div className="flex flex-row items-center gap-1 text-gray-500">
        <ArrowLeftIcon className="w-3 h-3" />
        <p className="text-xs">Back to My Plans</p>
      </div>

      <div className="flex flex-col mt-4">
        <h1 className="text-2xl font-semibold">My Plan</h1>
        <p className="text-sm text-gray-400 italic">
          By Quan Nguyen. Last updated on Oct. 23, 2023
        </p>
      </div>

      <Input
        className="mt-4"
        type="text"
        label={
          <div className="flex flex-row gap-2 items-center">
            <MagnifyingGlassIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
            Search course name, number, or description
          </div>
        }
        labelPlacement="inside"
        isClearable
        value={searchValue}
        onValueChange={setSearchValue}
      />

      <div className="flex gap-3 mt-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              fullWidth
              variant="ghost"
              startContent={
                selectedFilter.has('all-courses') ? (
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                ) : null
              }
              className={
                selectedFilter.has('all-courses')
                  ? ''
                  : 'border-3 border-blue-500 text-blue-700'
              }
            >
              {selectedFilter.has('all-courses')
                ? 'Filter course type'
                : filterMethods[
                    selectedFilter.values().next()
                      .value as keyof typeof filterMethods
                  ]}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="filter"
            selectionMode="single"
            selectedKeys={selectedFilter}
            disallowEmptySelection
            onSelectionChange={(keys) => {
              setSelectedFilter(
                new Set([(keys as Set<Key>).values().next().value]),
              )
            }}
            onAction={(key) => handleFilter(key as string)}
          >
            <DropdownItem key="all-courses">All courses</DropdownItem>
            <DropdownSection title="MCIT">
              <DropdownItem key="mcit-core-courses">
                {filterMethods['mcit-core-courses']}
              </DropdownItem>
              <DropdownItem key="mcit-open-electives">
                {filterMethods['mcit-open-electives']}
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="MSE-DS">
              <DropdownItem key="mse-ds-core-courses">
                {filterMethods['mse-ds-core-courses']}
              </DropdownItem>
              <DropdownItem key="mse-ds-technical-electives">
                {filterMethods['mse-ds-technical-electives']}
              </DropdownItem>
              <DropdownItem key="mse-ds-open-electives">
                {filterMethods['mse-ds-open-electives']}
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button
              fullWidth
              variant="bordered"
              startContent={<BarsArrowDownIcon className="w-5 h-5" />}
            >
              Sort by
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="sort"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={selectedSort}
            onSelectionChange={(keys) => {
              setSelectedSort(
                new Set([(keys as Set<Key>).values().next().value]),
              )
            }}
            onAction={(key) => handleSort(key as string)}
          >
            <DropdownItem key="number-asc">
              Course number (ascending)
            </DropdownItem>
            <DropdownItem key="number-desc">
              Course number (descending)
            </DropdownItem>
            <DropdownItem key="name-asc">Course name (ascending)</DropdownItem>
            <DropdownItem key="name-desc">
              Course name (descending)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="mt-3 flex flex-col grow ring-2 rounded-xl ring-gray-300 overflow-hidden">
        <div className="overflow-y-auto p-2">
          {courses.map((course) => (
            <DraggableCourse key={course.course_id} id={course.course_id}>
              <div className="ring-2 ring-gray-300 mb-3 rounded-md flex flex-col p-2">
                <p className="text-sm text-gray-400">{course.course_id}</p>
                <p>{course.course_name}</p>
              </div>
            </DraggableCourse>
          ))}
        </div>
      </div>
    </>
  )
}
