import { Button } from '@nextui-org/react'

export function CoursePlan() {
  return (
    <>
      <div className="w-full p-4 rounded-xl flex flex-col gap-2 ring-2 ring-gray-300">
        <div className="flex flex-row items-center">
          <p className="font-bold text-xl ml-2">Year 1</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-y-2 h-72">
            <div className="flex flex-row gap-2 items-center">
              <p className="font-semibold text-lg">Fall 2022</p>
              <Button size="sm" variant="ghost" className="ml-auto">
                Change starting year
              </Button>
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-y-2 h-72">
            <p className="font-semibold text-lg">Spring 2023</p>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-y-2 h-72">
            <p className="font-semibold text-lg">Summer 2023</p>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
            <div className="bg-white ring-2 ring-gray-200 rounded-lg p-3">
              CIS 5150
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
