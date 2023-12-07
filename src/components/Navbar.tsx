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
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react'
import { Logo } from './Logo'
import { GitHubBtn } from './GitHubBtn'
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import {
  BookOpenIcon,
  FlagIcon,
  HomeIcon,
  LifebuoyIcon,
  LightBulbIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { Database } from '@/shared/types'

const menuGroups = [
  {
    groupName: 'Get Help',
    menuItems: [
      {
        text: 'Report Issues',
        href: 'https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=',
      },
      {
        text: 'Ask Questions',
        href: 'https://github.com/qu8n/pennplanner/discussions/new?category=q-a',
      },
      {
        text: 'Suggest Features',
        href: 'https://github.com/qu8n/PennPlanner/discussions/new?category=feature-ideas',
      },
    ],
  },
  {
    groupName: 'Penn Resources',
    menuItems: [
      {
        text: 'Student Knowledge Base',
        href: 'https://online.seas.upenn.edu/student-knowledge-base/',
      },
      {
        text: 'Course Schedule',
        href: 'https://online.seas.upenn.edu/student-knowledge-base/course-schedule//',
      },
      {
        text: 'Course Syllabi',
        href: 'https://online.seas.upenn.edu/student-knowledge-base/course-syllabi/',
      },
      {
        text: 'Student Handbook',
        href: 'https://online.seas.upenn.edu/degrees/student-services/student-handbook/',
      },
      {
        text: 'Get Advising Help',
        href: 'https://online.seas.upenn.edu/student-knowledge-base/connect-with-student-support/',
      },
    ],
  },
]

export function Navbar({
  maxWidthSize,
  twHeight,
  twTextSize,
}: {
  maxWidthSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | undefined
  twHeight?: string
  twTextSize: string
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser()

  return (
    <NextUINavbar
      maxWidth={maxWidthSize}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className={`${twHeight} bg-neutral-200 bg-opacity-50`}
    >
      {/* Desktop nav */}
      <NavbarContent className="hidden md:flex" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <GitHubBtn twTextSize={twTextSize} />
      </NavbarContent>

      <NavbarContent className="hidden gap-4 md:flex" justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={`${twTextSize} -mr-2 text-neutral-500`}
                endContent={<ChevronDownIcon className="h-4 w-4" />}
                size="sm"
                variant="light"
              >
                Get Help
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu aria-label="Help">
            <DropdownItem
              key="report-issues"
              textValue="Report Issues"
              startContent={<FlagIcon className="h-4 w-4" />}
            >
              <Link
                href="https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
                color="foreground"
                isExternal={true}
                className="text-sm"
              >
                Report Issues
              </Link>
            </DropdownItem>

            <DropdownItem
              key="ask-questions"
              textValue="Ask Questions"
              startContent={<QuestionMarkCircleIcon className="h-4 w-4" />}
            >
              <Link
                color="foreground"
                isExternal={true}
                href="https://github.com/qu8n/pennplanner/discussions/new?category=q-a"
                className="text-sm"
              >
                Ask Questions
              </Link>
            </DropdownItem>

            <DropdownItem
              key="suggest-features"
              textValue="Suggest Features"
              startContent={<LightBulbIcon className="h-4 w-4" />}
            >
              <Link
                color="foreground"
                isExternal={true}
                href="https://github.com/qu8n/PennPlanner/discussions/new?category=feature-ideas"
                className="text-sm"
              >
                Suggest Features
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={`${twTextSize} -mr-2 text-neutral-500`}
                endContent={<ChevronDownIcon className="h-4 w-4" />}
                size="sm"
                variant="light"
              >
                Penn Resources
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu aria-label="Penn resources">
            <DropdownItem
              key="knowledge-base"
              textValue="Student Knowledge Base"
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
              textValue="Course Schedule"
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
              textValue="Course Syllabi"
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
              textValue="Student Handbook"
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
              textValue="Get Advising Help"
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

      {/* Mobile nav */}
      <NavbarContent className="pr-3 md:hidden" justify="end">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>

        <GitHubBtn twTextSize={twTextSize} />
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarMenu className="">
        {menuGroups.flatMap((group, index) => [
          <NavbarMenuItem key={`${group.groupName}-${index}`}>
            <p className="mt-4 font-medium text-blue-900">{group.groupName}</p>
          </NavbarMenuItem>,
          ...group.menuItems.map((item) => (
            <NavbarMenuItem key={`${item.text}-${index}`}>
              <Link
                className="w-full"
                isExternal={true}
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.text}
              </Link>
            </NavbarMenuItem>
          )),
        ])}
      </NavbarMenu>
    </NextUINavbar>
  )
}
