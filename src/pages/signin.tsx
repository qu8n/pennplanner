/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { RotatingSquare } from 'react-loader-spinner'
import { Navbar } from '@/components/Navbar'
import Head from 'next/head'
import { Database } from '@/shared/types'

export default function SignIn() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser()
  const router = useRouter()
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    full_name: '',
    first_year: new Date().getFullYear(),
    program: 'MCIT',
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
        .eq('id', user!.id)
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

  if (router.query.code && !showSignUpForm) {
    return (
      <div className="m-auto">
        <RotatingSquare
          height="100"
          width="100"
          color="#1d4ed8"
          ariaLabel="rotating-square-loading"
          strokeWidth="10"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="text-center text-xs text-neutral-500">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>PennPlanner Login</title>
        <meta property="og:title" content="PennPlanner login" key="title" />
      </Head>

      <Navbar maxWidthSize="xl" twHeight="h-20" twTextSize="text-sm" />

      <div className="flex flex-1 px-32">
        {!showSignUpForm ? (
          <>
            <div className="flex w-1/2 flex-col items-center justify-center">
              <h1 className="mb-5 text-center text-2xl font-medium text-blue-700">
                Access your <b>PennPlanner</b>
              </h1>
              <div className="w-96">
                <Auth
                  supabaseClient={supabaseClient}
                  redirectTo={currentUrl}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        space: {
                          buttonPadding: '20px',
                        },
                        radii: {
                          borderRadiusButton: '7px',
                        },
                        colors: {
                          defaultButtonBackground: '#e5e5e5',
                        },
                        borderWidths: {
                          buttonBorderWidth: '1px',
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
              <p className="max-w-2xl text-center text-xs text-neutral-500">
                You can use either your (1) Penn email or (2) personal Google
                email
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img
                src="/diploma.png"
                alt="Sign in"
                className="pointer-events-none max-w-md"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-start justify-center gap-2 px-56">
              <h1 className="mb-5 text-3xl font-semibold text-blue-700">
                Almost there
              </h1>

              <Input
                fullWidth
                isDisabled
                isRequired
                variant="underlined"
                type="email"
                label="Email address"
                value={user?.email}
                className="opacity-40"
                classNames={{
                  label: 'text-neutral-500',
                }}
              />

              <Input
                isRequired
                type="text"
                label="Full name"
                variant="underlined"
                value={newUser.full_name ?? ''}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, full_name: value })
                }
                classNames={{
                  label: 'text-neutral-500',
                }}
              />

              <Input
                isRequired
                type="text"
                label="Username"
                variant="underlined"
                startContent={
                  <span className="-mr-1 mb-1 text-sm text-default-400">
                    pennplanner.com/
                  </span>
                }
                value={newUser.username}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, username: value })
                }
                classNames={{
                  label: 'text-neutral-500',
                }}
              />

              <Select
                isRequired
                label="First year"
                variant="underlined"
                disallowEmptySelection
                selectedKeys={[String(newUser.first_year)]}
                onChange={(e) => {
                  const value = e.target.value
                  setNewUser({ ...newUser, first_year: Number(value) })
                }}
                classNames={{
                  label: 'text-neutral-500',
                }}
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

              <RadioGroup
                isRequired
                size="sm"
                label="Online program"
                // orientation="horizontal"
                value={newUser.program}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, program: value })
                }
                className="ml-1 mt-2 w-full"
                classNames={{
                  label: 'text-xs font-medium text-neutral-500',
                }}
              >
                <Radio value="MCIT">
                  <span className="font-semibold text-neutral-700">MCIT</span> -
                  Master of Computer and Information Technology
                </Radio>
                <Radio value="MSE-DS">
                  <span className="font-semibold text-neutral-700">MSE-DS</span>{' '}
                  - Master of Science in Engineering in Data Science
                </Radio>
                <Radio value="Dual Degree" isDisabled>
                  <span className="font-semibold text-neutral-700">
                    Dual Degree
                  </span>{' '}
                  (coming soon)
                </Radio>
              </RadioGroup>

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
                        program: newUser.program,
                        waived_courses:
                          newUser.program === 'MSE-DS'
                            ? ['CIT 5910', 'CIT 5920', 'CIT 5930', 'CIT 5940']
                            : [],
                      },
                    ])
                  if (userCreateError) {
                    console.error('userCreateError:', userCreateError)
                    return
                  } else {
                    router.push(`/${newUser.username}`)
                  }
                }}
                className="mt-6 w-full bg-blue-700 text-white hover:bg-blue-800"
              >
                Confirm
              </Button>
            </div>
            <div className="flex flex-col justify-center">
              <img
                src="/puzzle.png"
                alt="Confirm information"
                className="pointer-events-none max-w-md"
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
