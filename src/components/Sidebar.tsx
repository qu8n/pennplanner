import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  Bars3BottomRightIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Input,
  Accordion,
  AccordionItem,
  Chip,
  Link,
} from '@nextui-org/react'
import { useState } from 'react'
import { courses } from '@/data/courses'

const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const accordionItemClasses = {
  base: 'ring-2 ring-gray-300 mb-3 rounded-md',
  title: 'font-semibold text-md',
  trigger:
    'px-3 data-[hover=true]:bg-default-200/[.60] bg-gray-100 rounded-md flex items-center',
  content: 'text-sm px-2 text-gray-500 gap-2 flex flex-col',
}

export function Sidebar() {
  const [searchValue, setSearchValue] = useState('')

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
            Search by course name or number
          </div>
        }
        labelPlacement="inside"
        isClearable
        value={searchValue}
        onValueChange={setSearchValue}
      />

      <div className="flex gap-3 mt-3">
        <Button
          fullWidth
          variant="ghost"
          startContent={<AdjustmentsHorizontalIcon className="w-5 h-5" />}
        >
          Filter
        </Button>
        <Button
          fullWidth
          variant="ghost"
          startContent={<BarsArrowDownIcon className="w-5 h-5" />}
        >
          Sort
        </Button>
      </div>

      <div className="mt-3 flex flex-col overflow-y-auto grow ring-2 rounded-xl ring-gray-300 py-2">
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
                <p className="font-semibold">Description</p>
                <p>{course.course_description}</p>
              </div>
              <div>
                <p className="font-semibold">Pre-Requisites</p>
                <p>{course.course_prereqs}</p>
              </div>
              <div>
                <p className="font-semibold">Course Units</p>
                <p>{course.course_unit} unit</p>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}
