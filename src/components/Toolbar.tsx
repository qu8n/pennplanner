import { allCourseIds, allCourses } from '@/data/allCourses'
import { Course, Semester, dbUser } from '@/shared/types'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { ArrowPathIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Progress,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ModalWrapper } from './ModalWrapper'

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [modalContent, setModalContent] = useState<{
    header: string | JSX.Element | null
    body: JSX.Element | null
    footer?: JSX.Element | null
  }>({
    header: null,
    body: null,
    footer: null,
  })
  const [selected, setSelected] = useState(dbUser.waived_courses)

  const waivedCoursesBody = (
    <CheckboxGroup
      label="Select courses you have waived"
      value={selected}
      onValueChange={async (value) => {
        setSelected(value)

        const { error } = await supabaseClient
          .from('users')
          .update({ waived_courses: value })
          .eq('id', dbUser.id)

        if (error) {
          console.error(error)
          toast.error('Waived courses failed to update')
        } else {
          toast.success(
            'Waived courses updated successfully. Refresh to see the planner changes',
          )
        }
      }}
    >
      <div className="columns-3">
        {allCourseIds.map((courseId) => (
          <Checkbox id={courseId} key={courseId} value={courseId}>
            {courseId}
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  )

  useEffect(() => {
    setModalContent((prev) => ({
      ...prev,
      body: waivedCoursesBody,
    }))
    // eslint-disable-next-line
  }, [selected])

  return (
    <div className="flex h-16 flex-row items-center gap-2 pl-2">
      <div className="flex grow flex-col gap-2 pr-4">
        <div className="flex flex-row justify-between">
          <h2 className="flex-none text-xl font-bold text-blue-800">
            {dbUser.full_name.split(/(\s+)/)[0]}&#39;s {dbUser.program} Degree
            Planner
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

      <Tooltip
        closeDelay={0}
        placement="top"
        content="Select courses you have waived"
      >
        <Button
          startContent={
            <PencilSquareIcon className="h-4 w-4 text-neutral-500" />
          }
          className="w-38 flex-none rounded-md border-1 border-neutral-300 bg-neutral-200 hover:bg-neutral-300/[.8]"
          onPress={() => {
            onOpen()
            setModalContent({
              header: 'Waived courses',
              body: waivedCoursesBody,
            })
          }}
        >
          Waived courses
        </Button>
      </Tooltip>

      <Tooltip
        closeDelay={0}
        placement="top"
        content="Remove all courses from your planner"
      >
        <Button
          startContent={<ArrowPathIcon className="h-4 w-4 text-neutral-500" />}
          className="w-38 flex-none rounded-md border-1 border-neutral-300 bg-neutral-200 hover:bg-neutral-300/[.8]"
          onPress={() => {
            onOpen()
            setModalContent({
              header: 'Are you sure?',
              body: (
                <p>
                  You will remove all courses from your planner. This action
                  cannot be undone.
                </p>
              ),
              footer: (
                <>
                  <Button
                    color="default"
                    variant="light"
                    onPress={onClose}
                    className="rounded-md"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    className="rounded-md hover:bg-red-600"
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
                    Reset
                  </Button>
                </>
              ),
            })
          }}
        >
          Reset plan
        </Button>
      </Tooltip>

      <ModalWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        header={modalContent.header}
        body={modalContent.body}
        footer={modalContent.footer}
      />
    </div>
  )
}
