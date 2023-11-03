import { InformationCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowDownOnSquareIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import { Button, Progress } from '@nextui-org/react'

export function Toolbar({ totalCU }: { totalCU: number }) {
  return (
    <div className="flex flex-row h-16 gap-2 pl-2 items-center">
      <div className="grow pr-4 flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <h2 className="flex-none font-semibold text-lg">Degree Planner</h2>
          <div className="flex flex-row items-center gap-1 mt-1">
            <span className="text-xs">{totalCU} / 10 course units (CU)</span>
            <InformationCircleIcon className="flex-none w-4 h-4 text-neutral-400" />
          </div>
        </div>
        <Progress isStriped aria-label="progress" value={totalCU * 10} />
      </div>

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
