import { InformationCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowDownOnSquareIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import { Button, Progress } from '@nextui-org/react'
import { useState } from 'react'

export function Toolbar() {
  const [progressValue, setProgressValue] = useState(45)

  return (
    <>
      <Progress
        isStriped
        aria-label="progress"
        label={
          <div className="flex flex-row items-center gap-1">
            <span className="flex-none text-xs ml-1">
              4.5 / 10.0 course units
            </span>
            <InformationCircleIcon className="flex-none w-4 h-4 text-gray-400" />
          </div>
        }
        value={progressValue}
        className="grow mr-4"
      />

      {/* Duplicate this plan as the owner; copy this plan as visitor */}
      <Button
        variant="bordered"
        startContent={<DocumentDuplicateIcon className="w-5 h-5" />}
        className="flex-none w-38 border-1 border-gray-400"
      >
        Duplicate plan
      </Button>
      <Button
        variant="bordered"
        startContent={<ArrowDownOnSquareIcon className="w-5 h-5" />}
        className="flex-none w-38 border-1 border-gray-400"
      >
        Export plan
      </Button>
      <Button
        variant="bordered"
        startContent={<ArrowTopRightOnSquareIcon className="w-5 h-5" />}
        className="flex-none w-38 border-1 border-gray-400"
      >
        Share plan
      </Button>
    </>
  )
}
