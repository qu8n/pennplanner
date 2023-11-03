import { InformationCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Tooltip,
} from '@nextui-org/react'
import toast from 'react-hot-toast'

export function Toolbar({ totalCU }: { totalCU: number }) {
  return (
    <div className="flex flex-row h-16 gap-2 pl-2 items-center">
      <div className="grow pr-4 flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <h2 className="flex-none font-semibold text-lg">Degree Planner</h2>
          <div className="flex flex-row items-center gap-1 mt-1">
            <span className="text-xs">{totalCU} / 10 course units (CU)</span>
            <Tooltip
              closeDelay={0}
              placement="top"
              size="md"
              content="A course unit (CU) is the basic unit of progress toward the degree. One CU is usually converted to a four-semester-hour course."
            >
              <InformationCircleIcon className="flex-none w-4 h-4 text-neutral-400" />
            </Tooltip>
          </div>
        </div>
        <Progress isStriped aria-label="progress" value={totalCU * 10} />
      </div>

      {/* Duplicate this plan as the owner; copy this plan as visitor */}
      <Tooltip
        closeDelay={0}
        placement="top"
        content="Create a copy of this plan in your account"
      >
        <Button
          variant="bordered"
          startContent={<DocumentDuplicateIcon className="w-4 h-4" />}
          className="flex-none w-38 border-none rounded-xl bg-gray-200"
        >
          Make a copy
        </Button>
      </Tooltip>

      <Tooltip
        closeDelay={0}
        placement="top"
        content="Copy this plan's URL to share with others"
      >
        <Button
          variant="bordered"
          startContent={<LinkIcon className="w-4 h-4" />}
          className="flex-none w-38 border-none rounded-xl bg-gray-200"
          onPress={() => {
            window.navigator.clipboard.writeText(window.location.href)
            toast.success('Plan URL copied to clipboard')
          }}
        >
          Copy plan URL
        </Button>
      </Tooltip>
    </div>
  )
}
