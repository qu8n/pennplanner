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
import { BookmarkSquareIcon } from '@heroicons/react/24/outline'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

const mobileMenuItems = [
  'My Plans',
  'How It Works',
  'About',
  'Login',
  'Sign Up',
]

export function Navbar({ totalCU }: { totalCU: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { width, height } = useWindowSize()

  return (
    <NextUINavbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      className="h-10 border-b-1 border-gray-400"
    >
      {/* Confetti lives here to not be overlayed by narbar */}
      {totalCU === 10 && (
        <Confetti
          width={width}
          height={height}
          confettiSource={{
            w: 200,
            h: 10,
            x: width / 2,
            y: 100,
          }}
          recycle={false}
        />
      )}

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-1">
          <BookmarkSquareIcon className="h-6 w-6 text-blue-500" />
          <p className="font-semibold">PennPlanner</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end" className="hidden sm:flex gap-8">
        <NavbarItem>
          <Link color="foreground" href="#" size="sm">
            My plans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" size="sm">
            How it works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" size="sm">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="light"
            size="md"
            className="rounded-none"
          >
            Login / Signup
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
  )
}
