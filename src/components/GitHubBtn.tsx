import { StarIcon } from '@heroicons/react/20/solid'
import { Button, Link } from '@nextui-org/react'

export function GitHubBtn() {
  return (
    <Button
      className="hover:bg-orange-200/[1]] gap-1 bg-orange-200/[.8]"
      as={Link}
      href="https://github.com/qu8n/pennplanner"
      isExternal
      size="sm"
      variant="flat"
    >
      <StarIcon className="h-4 w-4 text-yellow-500" />
      <span className={`text-neutral-500`}>Star GitHub Repo</span>
    </Button>
  )
}
