import { useState } from 'react'
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from '@nextui-org/react'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/20/solid'

const mobileMenuItems = [
  'Star GitHub Repo',
  'Report Issues',
  'Suggest Features',
]

export function Navbar({
  maxWidthSize,
  twHeight,
  twTextSize,
  customNavbarItem,
}: {
  maxWidthSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | undefined
  twHeight: string
  twTextSize: string
  customNavbarItem?: JSX.Element
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <NavbarBrand>
            <Link href="/">
              <AcademicCapIcon className="ml-4 h-5 w-5 text-blue-700" />
              <p className="ml-1 font-semibold tracking-wide text-blue-800">
                PennPlanner
              </p>
            </Link>
            <Button
              className="hover:bg-orange-200/[1]] ml-4 gap-1 bg-orange-200/[.8]"
              as={Link}
              href="https://github.com/qu8n/pennplanner"
              isExternal
              size="sm"
              variant="flat"
              // color="warning"
            >
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <span className={`${twTextSize} text-neutral-500`}>
                Star GitHub Repo
              </span>
            </Button>
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
              href="https://github.com/qu8n/pennplanner/discussions/new?category=ideas"
              isExternal
            >
              Suggest Features
            </Button>
          </NavbarItem>
          {customNavbarItem}
        </NavbarContent>

        <NavbarMenu>
          {mobileMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" className="w-full" href="#" size="lg">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
    </>
  )
}
