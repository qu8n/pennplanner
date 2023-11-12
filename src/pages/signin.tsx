/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
// import { Database } from '@/types/supabase';
import { useRouter } from 'next/router'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

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
      if (error) console.error(error)
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

  return (
    <>
      <div className="flex flex-1 px-4 py-6 2xl:px-28">
        <div className="flex w-full rounded-2xl border-1 border-neutral-300 bg-white p-20 shadow-md">
          {!showSignUpForm ? (
            <>
              <div className="flex w-1/2 flex-col items-center justify-center">
                <h1 className="mb-5 text-center text-2xl font-medium text-blue-700">
                  Access your <b>PennPlanner</b>
                </h1>
                <div className="w-96">
                  <Auth
                    supabaseClient={supabaseClient}
                    redirectTo="http://localhost:3000/signin"
                    appearance={{
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          space: {
                            buttonPadding: '20px',
                          },
                          radii: {
                            borderRadiusButton: '20px',
                          },
                        },
                      },
                    }}
                    providers={['google']}
                    socialLayout="vertical"
                    onlyThirdPartyProviders={true}
                    localization={{
                      variables: {
                        sign_in: {
                          social_provider_text: 'Continue with {{provider}}',
                        },
                      },
                    }}
                  />
                </div>
                <p className="mt-2 max-w-2xl text-center text-xs text-neutral-500">
                  You can use either a (1) Penn email or (2) personal Google
                  email
                </p>
              </div>
              <div className="flex w-1/2 flex-col items-center justify-center">
                <img
                  src="/signin.png"
                  alt="Sign in"
                  className="pointer-events-none max-w-lg"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex w-1/2 flex-col items-center justify-center gap-2 p-20">
                <h1 className="mb-5 text-center text-2xl font-semibold text-blue-700">
                  Almost there!
                </h1>
                <Input
                  fullWidth
                  variant="underlined"
                  isDisabled
                  type="email"
                  label="Email address"
                  value={user?.email}
                  className="max-w-xs opacity-40"
                />

                <Input
                  type="text"
                  label="Full name"
                  variant="underlined"
                  value={newUser.full_name ?? ''}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, full_name: value })
                  }
                  className="max-w-xs"
                />

                <Input
                  type="text"
                  label="Username"
                  variant="underlined"
                  startContent={
                    <div className="pointer-events-none">
                      <span className="text-small text-default-400">
                        pennplanner.com/
                      </span>
                    </div>
                  }
                  value={newUser.username}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, username: value })
                  }
                  className="max-w-xs"
                />

                <Select
                  label="First year"
                  variant="underlined"
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
                  size="lg"
                  onPress={async () => {
                    const { error: userCreateError } = await supabaseClient
                      .from('users')
                      .insert([
                        {
                          id: user!.id,
                          username: newUser.username,
                          full_name: newUser.full_name,
                          first_year: newUser.first_year,
                        },
                      ])
                    if (userCreateError) {
                      console.error('userCreateError:', userCreateError)
                      return
                    } else {
                      router.push(`/${newUser.username}`)
                    }
                  }}
                  className="mt-6 w-full max-w-xs bg-blue-700 text-white hover:bg-blue-800"
                >
                  Confirm
                </Button>
              </div>
              <div className="flex w-1/2 flex-col items-center justify-center">
                <img
                  src="/confirm.png"
                  alt="Confirm information"
                  className="pointer-events-none max-w-lg"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
