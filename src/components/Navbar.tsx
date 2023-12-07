import { useState } from 'react'
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { Logo } from './Logo'
import { GitHubBtn } from './GitHubBtn'
import {
  CalendarIcon,
  ChevronDownIcon,
  LinkIcon,
} from '@heroicons/react/24/solid'
import {
  BookOpenIcon,
  HomeIcon,
  LifebuoyIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { Database } from '@/shared/types'

export function Navbar({
  maxWidthSize,
  twHeight,
  twTextSize,
}: {
  maxWidthSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | undefined
  twHeight: string
  twTextSize: string
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser()

  return (
    <>
      <NextUINavbar
        maxWidth={maxWidthSize}
        onMenuOpenChange={setIsMenuOpen}
        className={`${twHeight} bg-neutral-100 bg-[linear-gradient(to_right,#e8e8e8_1px,transparent_1px),linear-gradient(to_bottom,#e8e8e8_1px,transparent_1px)] bg-[size:6rem_4rem]`}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
          <NavbarBrand className="gap-4">
            <Logo />
            <GitHubBtn twTextSize={twTextSize} />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" justify="end" className="hidden gap-6 sm:flex">
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className={`${twTextSize} text-neutral-500`}
              as={Link}
              href="https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
              isExternal
            >
              Report Issues
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className={`${twTextSize} text-neutral-500`}
              as={Link}
              href="https://github.com/qu8n/pennplanner/discussions/new?category=q-a"
              isExternal
            >
              Ask Questions
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className={`${twTextSize} text-neutral-500`}
              as={Link}
              href="https://github.com/qu8n/PennPlanner/discussions/new?category=feature-ideas"
              isExternal
            >
              Suggest Features
            </Button>
          </NavbarItem>

          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className={`${twTextSize} -mr-2 text-neutral-500`}
                  endContent={<ChevronDownIcon className="h-4 w-4" />}
                  size="sm"
                  variant="light"
                  startContent={<LinkIcon className="h-4 w-4" />}
                >
                  Penn Resources
                </Button>
              </DropdownTrigger>
            </NavbarItem>

            <DropdownMenu aria-label="Penn resources">
              <DropdownItem
                key="knowledge-base"
                startContent={<HomeIcon className="h-4 w-4" />}
              >
                <Link
                  color="foreground"
                  isExternal={true}
                  href="https://online.seas.upenn.edu/student-knowledge-base/"
                  className="text-sm"
                >
                  Student Knowledge Base
                </Link>
              </DropdownItem>

              <DropdownItem
                key="course-schedule"
                startContent={<CalendarIcon className="h-4 w-4" />}
              >
                <Link
                  color="foreground"
                  isExternal={true}
                  href="https://online.seas.upenn.edu/student-knowledge-base/course-schedule//"
                  className="text-sm"
                >
                  Course Schedule
                </Link>
              </DropdownItem>

              <DropdownItem
                key="course-syllabi"
                startContent={<NewspaperIcon className="h-4 w-4" />}
              >
                <Link
                  color="foreground"
                  isExternal={true}
                  href="https://online.seas.upenn.edu/student-knowledge-base/course-syllabi/"
                  className="text-sm"
                >
                  Course Syllabi
                </Link>
              </DropdownItem>

              <DropdownItem
                key="student-handbook"
                startContent={<BookOpenIcon className="h-4 w-4" />}
              >
                <Link
                  color="foreground"
                  isExternal={true}
                  href="https://online.seas.upenn.edu/degrees/student-services/student-handbook/"
                  className="text-sm"
                >
                  Student Handbook
                </Link>
              </DropdownItem>

              <DropdownItem
                key="get-advising-help"
                startContent={<LifebuoyIcon className="h-4 w-4 text-red-600" />}
              >
                <Link
                  color="foreground"
                  isExternal={true}
                  href="https://online.seas.upenn.edu/student-knowledge-base/connect-with-student-support/"
                  className="text-sm text-red-600"
                >
                  Get Advising Help
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {user ? (
            <NavbarItem>
              <Button
                variant="light"
                size="sm"
                className={`${twTextSize} text-neutral-500 hover:text-neutral-400`}
                onPress={() => {
                  document.cookie = `showedInitialDisclaimer=true; expires=${new Date().toUTCString()}`
                  supabaseClient.auth.signOut().then(() => router.push('/'))
                }}
              >
                Sign Out
              </Button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button
                variant="light"
                size="sm"
                className={`${twTextSize} text-neutral-500 hover:text-neutral-400`}
                onPress={() => router.push('/signin')}
              >
                Sign In
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </NextUINavbar>
    </>
  )
}
