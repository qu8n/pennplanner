import { InformationCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowDownOnSquareIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import { Button, Progress } from '@nextui-org/react'

export function Toolbar({ totalCU }: { totalCU: number }) {
  return (
    <div className="flex flex-row items-center h-16 gap-2 p-2">
      <Progress
        isStriped
        aria-label="progress"
        label={
          <div className="flex flex-row items-center gap-1">
            <span className="flex-none text-xs ml-1">
              {totalCU} / 10 course units (CU)
            </span>
            <InformationCircleIcon className="flex-none w-4 h-4 text-neutral-400" />
          </div>
        }
        value={totalCU * 10}
        className="grow mr-4"
      />

      {/* Duplicate this plan as the owner; copy this plan as visitor */}
      <Button
        variant="bordered"
        startContent={<DocumentDuplicateIcon className="w-4 h-4" />}
        className="flex-none w-38 border-none rounded-xl bg-gray-200"
      >
        Duplicate plan
      </Button>

      <Button
        variant="bordered"
        startContent={<ArrowDownOnSquareIcon className="w-4 h-4" />}
        className="flex-none w-38 border-none rounded-xl bg-gray-200"
      >
        Export plan
      </Button>

      <Button
        variant="bordered"
        startContent={<ArrowTopRightOnSquareIcon className="w-4 h-4" />}
        className="flex-none w-38 border-none rounded-xl bg-gray-200"
      >
        Share plan
      </Button>
    </div>
  )
}
