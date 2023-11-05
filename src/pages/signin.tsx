import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
// import { Database } from '@/types/supabase';
import { useRouter } from 'next/router'
import {
  Button,
  Input,
  Select,
  SelectItem,
  SelectSection,
} from '@nextui-org/react'

export default function SignIn() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [newUser, setNewUser] = useState({
    id: user ? user.id : '',
    username: user ? user.email?.split('@')[0] : '',
    full_name: user ? user.user_metadata.full_name : '',
    first_year: new Date().getFullYear(),
  })

  useEffect(() => {
    async function getUsername() {
      const { data, error } = await supabaseClient
        .from('users')
        .select('username')
        .eq('id', user?.id)
        .single()
      if (error) console.error(error)
      if (data) return data.username
    }

    if (user) {
      getUsername().then((username) => {
        if (username) {
          router.push(`/${username}`)
        } else {
          setShowSignUpForm(true)
        }
      })
    }
  }, [user, router, supabaseClient])

  if (!user) {
    return (
      <>
        <h1 className="mb-5 text-center text-lg font-semibold">Get Started</h1>
        <div className="mx-auto block w-1/3">
          <Auth
            supabaseClient={supabaseClient}
            redirectTo="http://localhost:3000/signin"
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  space: {
                    buttonPadding: '30px',
                  },
                  radii: {
                    borderRadiusButton: '50px',
                  },
                },
              },
            }}
            providers={['google']}
            socialLayout="vertical"
            onlyThirdPartyProviders={true}
          />
        </div>
      </>
    )
  }

  if (showSignUpForm) {
    return (
      <div className="flex max-w-xs flex-col gap-2">
        <h1 className="text-xl font-bold text-blue-950">Get Started</h1>
        <Input
          fullWidth
          variant="faded"
          isDisabled
          type="email"
          label="Email address"
          value={user?.email}
          className="max-w-xs"
        />

        <Input
          type="text"
          label="Full name"
          variant="bordered"
          value={newUser.full_name}
          onValueChange={(value) =>
            setNewUser({ ...newUser, full_name: value })
          }
          className="max-w-xs"
        />

        <Input
          type="text"
          label="Username"
          variant="bordered"
          startContent={
            <div className="pointer-events-none">
              <span className="text-small text-default-400">
                pennplanner.com/
              </span>
            </div>
          }
          value={newUser.username}
          onValueChange={(value) => setNewUser({ ...newUser, username: value })}
          className="max-w-xs"
        />

        <Select
          label="First semester"
          variant="bordered"
          disallowEmptySelection
          selectedKeys={[String(newUser.first_year)]}
          onChange={(e) => {
            const value = e.target.value
            setNewUser({ ...newUser, first_year: Number(value) })
          }}
          className="max-w-xs"
        >
          <SelectSection title="First semester">
            {Array.from(
              { length: new Date().getFullYear() - 2019 + 1 },
              (_, i) => 2019 + i,
            )
              .reverse()
              .map((year) => {
                const yearStr = String(year)
                return <SelectItem key={yearStr}>{yearStr}</SelectItem>
              })}
          </SelectSection>
        </Select>

        <Button
          color="primary"
          onPress={async () => {
            const { error } = await supabaseClient.from('users').insert([
              {
                id: newUser.id,
                username: newUser.username,
                full_name: newUser.full_name,
                first_year: newUser.first_year,
              },
            ])
            if (error) {
              console.error(error)
              return
            } else {
              router.push(`/${newUser.username}`)
            }
          }}
        >
          Start planning
        </Button>
      </div>
    )
  }
}
