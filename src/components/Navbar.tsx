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
import { Logo } from './Logo'
import { GitHubBtn } from './GitHubBtn'

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
          <NavbarBrand className="ml-4 gap-4">
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
