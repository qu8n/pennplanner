import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {
  useUser,
  useSupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  Input,
  Link,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { ProgressBar } from 'react-loader-spinner'
import { Navbar } from '@/components/Navbar'
import Head from 'next/head'
import { Database } from '@/shared/types'
import toast from 'react-hot-toast'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { H } from '@highlight-run/next/client'

export default function SignIn() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser()
  const { isLoading } = useSessionContext()
  const router = useRouter()
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    full_name: '',
    first_semester: 'Fall',
    first_year: new Date().getFullYear(),
    program: 'MCIT',
  })
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    async function getUsername() {
      const { data, error } = await supabaseClient
        .from('users')
        .select('username')
        .eq('id', user!.id)
        .single()
      if (data) return data.username
      if (error) console.error(error)
    }

    if (isLoading) return

    if (user) {
      setNewUser({
        ...newUser,
        username: user.email!.split('@')[0],
        full_name: user.user_metadata.full_name,
      })

      H.identify(user.email!)

      getUsername().then((username) => {
        if (username) {
          router.push(`/${username}`)
        } else {
          setShowLoading(false)
          setShowSignUpForm(true)
        }
      })
    } else {
      setShowLoading(false)
    }
    // eslint-disable-next-line
  }, [user, isLoading])

  if (showLoading) {
    return (
      <div className="m-auto flex flex-col items-center">
        <ProgressBar
          height="150"
          width="150"
          borderColor="#1d4ed8"
          wrapperClass="progress-bar-wrapper"
          barColor="#1d4ed8"
          ariaLabel="loading"
          visible={true}
        />
        <p className="text-neutral-500">
          Working hard to prepare your planner...
        </p>
        <p className="text-neutral-500">This can take several seconds</p>
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

      <div className="flex flex-1 justify-evenly px-32">
        {!showSignUpForm ? (
          <>
            <div className="flex flex-col justify-center">
              <div className="flex flex-col justify-center rounded-md bg-white bg-opacity-50 p-10">
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

                <div className="flex max-w-sm flex-col gap-2 px-2 text-start text-xs text-neutral-500">
                  <div>
                    <InformationCircleIcon className="mr-1 inline-block h-4 w-4 flex-none" />
                    After clicking the link above, you will be prompted to sign
                    into <b>wgusduhubrpononyltwn.supabase.co</b> with any of
                    your Google account. &quot;wgusduhubrpononyltwn&quot; is a
                    free, randomly-generated subdomain provided by Supabase, a{' '}
                    <Link
                      isExternal={true}
                      underline="hover"
                      href="https://supabase.com/security"
                      className="text-xs"
                    >
                      secure
                    </Link>{' '}
                    backend service that powers PennPlanner.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <img
                src="/diploma.png"
                alt="Sign in"
                className="pointer-events-none max-w-md"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center">
              <div className="flex flex-col gap-2 rounded-md bg-white bg-opacity-50 p-10">
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
                  isInvalid={newUser.full_name === ''}
                  errorMessage={
                    newUser.full_name === '' ? 'Required field' : undefined
                  }
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
                  description="Only letters (a-z) and numbers (0-9) are allowed"
                  value={newUser.username}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, username: value.toLowerCase() })
                  }
                  classNames={{
                    label: 'text-neutral-500',
                  }}
                  isInvalid={
                    newUser.username === '' ||
                    new RegExp('^[A-Za-z0-9]+$').test(newUser.username) ===
                      false
                  }
                  errorMessage={
                    newUser.username === '' ||
                    new RegExp('^[A-Za-z0-9]+$').test(newUser.username) ===
                      false
                      ? 'Only letters (a-z) and numbers (0-9) are allowed'
                      : undefined
                  }
                />

                <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                  <Select
                    isRequired
                    label="First semester"
                    variant="underlined"
                    disallowEmptySelection
                    selectedKeys={[newUser.first_semester]}
                    onChange={(e) => {
                      const value = e.target.value
                      setNewUser({ ...newUser, first_semester: value })
                    }}
                    classNames={{
                      label: 'text-neutral-500',
                    }}
                  >
                    <SelectItem key="Fall">Fall</SelectItem>
                    <SelectItem key="Spring">Spring</SelectItem>
                  </Select>

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
                </div>

                <RadioGroup
                  isRequired
                  size="sm"
                  label="Online program"
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
                    <span className="font-semibold text-neutral-700">MCIT</span>{' '}
                    - Master of Computer and Information Technology
                  </Radio>
                  <Radio value="MSE-DS">
                    <span className="font-semibold text-neutral-700">
                      MSE-DS
                    </span>{' '}
                    - Master of Science in Engineering in Data Science
                  </Radio>
                </RadioGroup>

                <Button
                  onPress={async () => {
                    const allFilledOut = Object.values(newUser).every(
                      (value) => value !== '',
                    )

                    if (!allFilledOut) {
                      toast.error('Please fill out all fields', {
                        style: {
                          background: '#fecaca',
                        },
                      })
                      return
                    }

                    const { error: userCreateError } = await supabaseClient
                      .from('users')
                      .insert([
                        {
                          id: user!.id,
                          username: newUser.username,
                          full_name: newUser.full_name,
                          first_year:
                            newUser.first_semester === 'Fall'
                              ? newUser.first_year
                              : newUser.first_year - 1,
                          program: newUser.program,
                          waived_courses:
                            newUser.program === 'MSE-DS'
                              ? ['CIT 5910', 'CIT 5920', 'CIT 5930', 'CIT 5940']
                              : [],
                        },
                      ])
                    if (userCreateError) {
                      console.error('userCreateError:', userCreateError)

                      if (userCreateError.code === '23505') {
                        toast.error('Username is already taken', {
                          style: {
                            background: '#fecaca',
                          },
                        })
                      }

                      return
                    } else {
                      router.push(`/${newUser.username}`)
                    }
                  }}
                  className="custom-gradient mt-6 w-full rounded-md text-white"
                >
                  Confirm
                </Button>
              </div>
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
