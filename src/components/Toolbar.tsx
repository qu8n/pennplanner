import { allCourses } from '@/data/allCourses'
import { Course, Semester, dbUser } from '@/shared/types'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { ArrowPathIcon, LinkIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Modal,
  Progress,
  Tooltip,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'

export function Toolbar({
  totalCU,
  semesters,
  setSemesters,
  setCourseCatalog,
  dbUser,
}: {
  totalCU: number
  semesters: Semester[]
  setSemesters: (semesters: Semester[]) => void
  setCourseCatalog: (courseCatalog: Course[]) => void
  dbUser: dbUser
}) {
  const supabaseClient = useSupabaseClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="flex h-16 flex-row items-center gap-2 pl-2">
      <div className="flex grow flex-col gap-1 pr-4">
        <div className="flex flex-row justify-between">
          <h2 className="flex-none text-xl font-bold text-blue-950">
            Quan&#39;s Degree Planner
          </h2>
          <div className="mt-1 flex flex-row items-center gap-1">
            <span className="text-xs">{totalCU} / 10 course units (CU)</span>
            <Tooltip
              closeDelay={0}
              placement="top"
              size="md"
              content="A course unit (CU) is the basic unit of progress toward the degree. 10 CUs are required to graduate."
            >
              <InformationCircleIcon className="h-4 w-4 flex-none text-neutral-400" />
            </Tooltip>
          </div>
        </div>
        <Progress isStriped aria-label="progress" value={totalCU * 10} />
      </div>

      {/* For logged-in users only */}
      <Tooltip
        closeDelay={0}
        placement="top"
        content="Remove all courses from your planner"
      >
        <Button
          startContent={<ArrowPathIcon className="h-4 w-4" />}
          className="w-38 flex-none rounded-xl border-none bg-gray-200"
          onPress={onOpen}
        >
          Reset plan
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3>Are you sure?</h3>
              </ModalHeader>
              <ModalBody>
                <p>
                  You will remove all courses from your planner. This action
                  cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    const { error } = await supabaseClient
                      .from('semesters')
                      .delete()
                      .eq('user_id', dbUser.id)
                    console.error(error)
                    setSemesters(
                      semesters.map((s) => ({
                        ...s,
                        semester_courses: [],
                      })),
                    )
                    setCourseCatalog(allCourses)
                    toast('Plan has been reset', {
                      icon: '🔄',
                    })
                    onClose()
                  }}
                >
                  Reset anyway
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Tooltip
        closeDelay={0}
        placement="top"
        content="Copy this plan's URL to your clipboard"
      >
        <Button
          startContent={<LinkIcon className="h-4 w-4" />}
          className="w-38 flex-none rounded-xl border-none bg-gray-200"
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
