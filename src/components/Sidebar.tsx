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

const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const accordionItemClasses = {
  base: 'ring-2 ring-gray-300 mb-3 rounded-md',
  title: 'font-bold text-lg',
  subtitle: 'text-black',
  trigger:
    'px-2 py-0 data-[hover=true]:bg-default-200/[.60] bg-default-100 rounded-md h-14 flex items-center',
  content: 'text-small px-2 text-gray-500',
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

      <div className="mt-3 flex flex-col grow ring-2 rounded-xl ring-gray-300 py-2">
        <Accordion
          showDivider={false}
          variant="light"
          itemClasses={accordionItemClasses}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title={
              <div className="flex flex-row items-center gap-1">
                <span className="mr-2">CIS 5150</span>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  MSE-DS
                </Chip>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  1.0 CU
                </Chip>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  Technical Elective
                </Chip>
              </div>
            }
            subtitle="Computer Vision & Computational Photography"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 1"
            title={
              <div className="flex flex-row items-center gap-1">
                <span className="mr-2">CIS 5150</span>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  MSE-DS
                </Chip>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  1.0 CU
                </Chip>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  Technical Elective
                </Chip>
              </div>
            }
            subtitle="Computer Vision & Computational Photography"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 1"
            title={
              <div className="flex flex-row items-center gap-1">
                <span className="mr-2">CIS 5150</span>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  MSE-DS
                </Chip>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  1.0 CU
                </Chip>
                <Chip variant="bordered" size="sm" className="text-gray-400">
                  Technical Elective
                </Chip>
              </div>
            }
            subtitle="Computer Vision & Computational Photography"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-row items-center mt-4 gap-4">
        <Link href="#" size="sm">
          Privacy Policy
        </Link>
        <Link href="#" size="sm">
          Terms of Service
        </Link>
      </div>
    </>
  )
}
