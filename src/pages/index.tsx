import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <p>This is the landing page</p>

      <Button
        onPress={() => {
          router.push('/signin')
        }}
      >
        Sign In
      </Button>
    </>
  )
}
