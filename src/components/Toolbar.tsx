import { allCourseIds, coursesData } from '@/data/coursesData'
import { Course, Semester, DbUser, Database, Visitor } from '@/shared/types'
import { InformationCircleIcon, LightBulbIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  GlobeAltIcon,
  LinkIcon,
  LockClosedIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Link,
  Progress,
  Switch,
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
  visitorType,
}: {
  totalCU: number
  semesters: Semester[]
  setSemesters: (semesters: Semester[]) => void
  setCourseCatalog: (courseCatalog: Course[]) => void
  dbUser: DbUser
  visitorType: Visitor
}) {
  const supabaseClient = useSupabaseClient<Database>()
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
  const [selectedWaivedCourses, setSelectedWaivedCourses] = useState(
    dbUser.waived_courses,
  )
  const [isPublic, setIsPublic] = useState(dbUser.is_public)

  const waivedCoursesModalBody = (
    <CheckboxGroup
      label="Select courses you have waived:"
      value={selectedWaivedCourses}
      onValueChange={async (value) => {
        setSelectedWaivedCourses(value)

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
        {allCourseIds.map((courseId) => {
          let isDisabled = false
          if (
            dbUser.program === 'MSE-DS' &&
            ['CIT 5910', 'CIT 5920', 'CIT 5930', 'CIT 5940'].includes(courseId)
          ) {
            isDisabled = true
          }

          return (
            <Checkbox
              id={courseId}
              key={courseId}
              value={courseId}
              isDisabled={isDisabled}
            >
              {courseId}
            </Checkbox>
          )
        })}
      </div>
      <div className="mt-4 flex flex-row items-center gap-1 text-neutral-500">
        <LightBulbIcon className="h-4 w-4" />
        <span className="text-sm font-semibold">Quick tips</span>
      </div>
      <p className="text-xs text-neutral-500">
        Waiving a course means that you have passed a proficiency exam or
        satisfy some requirement that allows you to skip the course. Waived
        courses will not be counted towards your degree progress, but they will
        satisfy prerequisites or corequisites of other courses.
      </p>
    </CheckboxGroup>
  )

  const sharePlannerModalBody = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-medium">Enable public access to your planner</h2>

        <div className="flex flex-row items-center justify-between">
          <Switch
            isSelected={isPublic}
            onValueChange={async (value) => {
              setIsPublic(value)

              const { error } = await supabaseClient
                .from('users')
                .update({ is_public: value })
                .eq('id', dbUser.id)

              if (error) {
                console.error(error)
                toast.error('Privacy setting failed to update')
              } else {
                toast.success('Privacy setting updated successfully')
              }
            }}
            isDisabled={visitorType !== 'owner'}
          >
            {isPublic ? 'On' : 'Off'}
          </Switch>

          {isPublic ? (
            <div className="flex flex-row items-center gap-1">
              <GlobeAltIcon className="h-4 w-4 text-blue-500" />
              <span className="text-blue-500">
                Everyone can view, only you can edit
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-1">
              <LockClosedIcon className="h-4 w-4 text-neutral-500" />
              <span className="text-neutral-500">
                Only you can view and edit
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md bg-red-100 p-4 text-xs text-red-900">
        This app is still in early development. We recommend that you enable
        public access, copy your planner link, and share it with your program
        advisor for their professional review{' '}
        <Link
          isExternal={true}
          href="https://online.seas.upenn.edu/student-knowledge-base/connect-with-student-support/"
          className="text-xs text-blue-700"
        >
          here
        </Link>
        .
      </div>

      <div className="flex flex-row">
        <Button
          isDisabled={!isPublic}
          startContent={<LinkIcon className="h-4 w-4 text-white" />}
          fullWidth
          className="custom-gradient rounded-md text-white"
          onPress={async () => {
            window.navigator.clipboard.writeText(window.location.href)
            toast.success('Planner link copied to clipboard')
          }}
        >
          Copy planner link
        </Button>
      </div>
    </div>
  )

  useEffect(() => {
    setModalContent((prev) => ({
      ...prev,
      body: waivedCoursesModalBody,
    }))
    // eslint-disable-next-line
  }, [selectedWaivedCourses])

  useEffect(() => {
    setModalContent((prev) => ({
      ...prev,
      body: sharePlannerModalBody,
    }))
    // eslint-disable-next-line
  }, [isPublic])

  return (
    <div className="flex h-16 flex-row items-center gap-2 pl-2">
      <div className="flex grow flex-col gap-2 pr-4">
        <div className="flex flex-row justify-between gap-2">
          <h2 className="flex-none text-xl font-bold text-blue-800">
            {dbUser.full_name.split(/(\s+)/)[0]}&#39;s {dbUser.program} Degree
            Planner
          </h2>
          <div className="mt-1 flex flex-row items-center gap-1">
            <span className="line-clamp-1 text-xs">
              {totalCU} / 10 course units (CU)
            </span>
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
          className="w-38 flex-none rounded-md border-1 border-b-4 border-neutral-300 bg-neutral-200 hover:bg-neutral-300/[.8]"
          onPress={() => {
            onOpen()
            setModalContent({
              header: 'Waived courses',
              body: waivedCoursesModalBody,
            })
          }}
          isDisabled={visitorType !== 'owner'}
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
          className="w-38 flex-none rounded-md border-1 border-b-4 border-neutral-300 bg-neutral-200 hover:bg-neutral-300/[.8]"
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
                      setCourseCatalog(coursesData)
                      toast('Planner has been reset', {
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
          isDisabled={visitorType !== 'owner'}
        >
          Reset planner
        </Button>
      </Tooltip>

      <Tooltip
        closeDelay={0}
        placement="top"
        content="Copy your planner URL for sharing or edit your privacy setting"
      >
        <Button
          startContent={
            isPublic ? (
              <GlobeAltIcon className="h-4 w-4 text-blue-500" />
            ) : (
              <LockClosedIcon className="text-500-500 h-4 w-4" />
            )
          }
          className="w-38 flex-none rounded-md border-1 border-b-4 border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200"
          onPress={() => {
            onOpen()
            setModalContent({
              header: 'Share planner',
              body: sharePlannerModalBody,
            })
          }}
        >
          Share planner
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
