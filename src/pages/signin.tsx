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
    username: '',
    full_name: '',
    first_year: new Date().getFullYear(),
  })

  useEffect(() => {
    setNewUser({
      ...newUser,
      username: user?.email ? user.email?.split('@')[0] : '',
      full_name: user ? user.user_metadata.full_name : '',
    })

    async function getUsername() {
      const { data, error } = await supabaseClient
        .from('users')
        .select('username')
        .eq('id', user?.id)
        .single()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <div className="flex flex-row gap-2">
          <Input
            type="text"
            label="First name"
            variant="bordered"
            value={newUser.full_name.split(' ')[0] ?? ''}
            onValueChange={(value) =>
              setNewUser({ ...newUser, full_name: value })
            }
            className="max-w-xs"
          />

          <Input
            type="text"
            label="Last name"
            variant="bordered"
            value={newUser.full_name.split(' ')[1] ?? ''}
            onValueChange={(value) =>
              setNewUser({ ...newUser, full_name: value })
            }
            className="max-w-xs"
          />
        </div>

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
          label="First year"
          variant="bordered"
          disallowEmptySelection
          selectedKeys={[String(newUser.first_year)]}
          onChange={(e) => {
            const value = e.target.value
            setNewUser({ ...newUser, first_year: Number(value) })
          }}
          className="max-w-xs"
        >
          {Array.from(
            { length: new Date().getFullYear() - 2019 + 1 },
            (_, i) => 2019 + i,
          )
            .reverse()
            .map((year) => {
              const yearStr = String(year)
              return <SelectItem key={yearStr}>{yearStr}</SelectItem>
            })}
        </Select>

        <Button
          color="primary"
          onPress={async () => {
            const { error } = await supabaseClient.from('users').insert([
              {
                id: user.id,
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
