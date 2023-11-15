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
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

const mobileMenuItems = [
  'My Plans',
  'How It Works',
  'About',
  'Login',
  'Sign Up',
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  return (
    <>
      <NextUINavbar
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
        className="h-10 bg-neutral-100 px-6"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcademicCapIcon className="h-5 w-5 text-blue-700" />
            <p className="ml-1 font-semibold tracking-wide text-blue-800">
              PennPlanner
            </p>
            <Button
              className="ml-4 gap-1"
              as={Link}
              href="https://github.com/qu8n/pennplanner"
              isExternal
              size="sm"
              variant="light"
              color="warning"
            >
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-neutral-500">Star GitHub repo</span>
            </Button>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" justify="end" className="hidden gap-6 sm:flex">
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className="text-neutral-500"
              as={Link}
              href="https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
              isExternal
            >
              Report issues
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className="text-neutral-500"
              as={Link}
              href="https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=feature_request.md&title="
              isExternal
            >
              Suggest features
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className="text-neutral-500"
              onPress={() =>
                supabaseClient.auth.signOut().then(() => router.push('/'))
              }
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {mobileMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 3
                    ? 'primary'
                    : index === mobileMenuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
    </>
  )
}
