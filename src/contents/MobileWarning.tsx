import { GitHubBtn } from '@/components/GitHubBtn'
import { Logo } from '@/components/Logo'

export function MobileWarning() {
  return (
    <div className="flex h-screen bg-neutral-100 text-neutral-500 xl:hidden">
      <div className="m-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <Logo />
        <p>
          😅 Mobile / smaller screens are not currently supported. If you are on
          a desktop, please resize your browser window to be larger.
        </p>
        <p>
          Want this feature? Express your interest{' '}
          <a
            href="https://github.com/qu8n/PennPlanner/discussions/1"
            className="text-blue-700"
          >
            here.
          </a>
        </p>
        <GitHubBtn twTextSize="text-sm" />
      </div>
    </div>
  )
}
