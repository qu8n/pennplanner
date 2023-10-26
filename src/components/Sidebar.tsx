import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Input,
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/react'
import { Key, useEffect, useState } from 'react'
import { courses as coursesData } from '@/data/courses'
import { Rating } from '@smastrom/react-rating'
import Fuse from 'fuse.js'

const accordionItemClasses = {
  base: 'ring-2 ring-gray-300 mb-3 rounded-md',
  title: 'font-semibold text-md',
  trigger:
    'px-3 data-[hover=true]:bg-default-200/[.60] bg-gray-100 rounded-md flex items-center',
  content: 'text-sm p-2 text-gray-500 gap-2 flex flex-col',
}

function getCourseNumbers(courseIdA: string, courseIdB: string) {
  const numberA = parseInt(courseIdA.match(/\d+/)![0])
  const numberB = parseInt(courseIdB.match(/\d+/)![0])
  return [numberA, numberB]
}

export function Sidebar() {
  const [courses, setCourses] = useState(coursesData)
  const [searchValue, setSearchValue] = useState('')
  const [selectedFilter, setSelectedFilter] = useState(new Set(['all-courses']))
  const [selectedSort, setSelectedSort] = useState(new Set(['']))

  useEffect(() => {
    if (searchValue) {
      const fuse = new Fuse(coursesData, {
        threshold: 0.3,
        keys: ['course_id', 'course_name', 'course_description'],
      })
      const results = fuse.search(searchValue)
      setCourses(results.map((result) => result.item))
      setSelectedFilter(new Set(['all-courses']))
      setSelectedSort(new Set(['']))
    } else {
      setCourses(coursesData)
    }
  }, [searchValue])

  function handleFilter(filterMethod: string) {
    let filteredCourses: typeof courses = []

    let coursesToFilter: typeof courses = []
    if (searchValue) {
      coursesToFilter = [...courses]
    } else {
      coursesToFilter = [...coursesData]
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
              startContent={<AdjustmentsHorizontalIcon className="w-5 h-5" />}
            >
              Filter course type
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
        <div className="overflow-y-auto py-2">
          <Accordion
            showDivider={false}
            variant="light"
            itemClasses={accordionItemClasses}
          >
            {courses.map((course) => (
              <AccordionItem
                key={course.course_id}
                aria-label={course.course_id}
                title={course.course_id}
                subtitle={course.course_name}
              >
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
                    {course.review_count
                      ? ` (${course.review_count} reviews)`
                      : 'N/A'}
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
                  <div className="flex flex-row gap-2">
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
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  )
}
