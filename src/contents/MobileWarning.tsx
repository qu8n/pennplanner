import { GitHubBtn } from '@/components/GitHubBtn'
import { Logo } from '@/components/Logo'
import { Link } from '@nextui-org/react'

export function MobileWarning() {
  return (
    <div className="m-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
      <Logo />
      <p>
        😅 Mobile / smaller screens are not currently supported. If you are on a
        desktop, please resize your browser window to be larger.
      </p>
      <p>
        Want this feature? Express your interest{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://github.com/qu8n/PennPlanner/discussions/1"
        >
          here.
        </Link>
      </p>
      <GitHubBtn twTextSize="text-sm" />
    </div>
  )
}
