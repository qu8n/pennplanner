import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  Bars3BottomRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

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

      <div className="flex gap-3 mt-4">
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
          startContent={<Bars3BottomRightIcon className="w-5 h-5" />}
        >
          Sort
        </Button>
      </div>

      <div className="mt-4 ring flex flex-col flex-grow"></div>
    </>
  )
}
