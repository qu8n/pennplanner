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
  const [showPageLoading, setShowPageLoading] = useState(true)
  const [showSubmitLoading, setShowSubmitLoading] = useState(false)

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
          setShowPageLoading(false)
          setShowSignUpForm(true)
        }
      })
    } else {
      setShowPageLoading(false)
    }
    // eslint-disable-next-line
  }, [user, isLoading])

  return (
    <>
      <Head>
        <title>PennPlanner Login</title>
        <meta property="og:title" content="PennPlanner login" key="title" />
      </Head>

      <Navbar maxWidthSize="xl" />

      <div className="relative flex flex-grow flex-col items-center justify-evenly p-10 lg:flex-row">
        {showPageLoading ? (
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
        ) : !showSignUpForm ? (
          <>
            <div className="flex flex-col justify-center">
              <h1 className="mb-5 text-center text-2xl font-medium text-blue-700">
                Access your <b>PennPlanner</b>
              </h1>

              <div className="">
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
                  into <b>wgusduhubrpononyltwn.supabase.co</b> with any of your
                  Google account. &quot;wgusduhubrpononyltwn&quot; is a free,
                  randomly-generated subdomain provided by Supabase, a{' '}
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

            <div className="flex flex-col justify-center">
              <img
                src="/diploma.png"
                alt="Sign in"
                className="pointer-events-none hidden max-w-md lg:block"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <h1 className="mb-5 text-3xl font-semibold text-blue-700">
                Almost there
              </h1>

              <Input
                fullWidth
                isDisabled
                isRequired
                variant="faded"
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
                variant="faded"
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
                variant="faded"
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
                  new RegExp('^[A-Za-z0-9]+$').test(newUser.username) === false
                }
                errorMessage={
                  newUser.username === '' ||
                  new RegExp('^[A-Za-z0-9]+$').test(newUser.username) === false
                    ? 'Only letters (a-z) and numbers (0-9) are allowed'
                    : undefined
                }
              />

              <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                <Select
                  isRequired
                  label="First semester"
                  variant="faded"
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
                  variant="faded"
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
                    { length: new Date().getFullYear() - 2019 + 2 },
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
                className="ml-1 w-full"
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
              </RadioGroup>

              <Button
                isDisabled={showSubmitLoading}
                onPress={async () => {
                  setShowSubmitLoading(true)

                  const allFilledOut = Object.values(newUser).every(
                    (value) => value !== '',
                  )

                  if (!allFilledOut) {
                    toast.error('Please fill out all fields', {
                      style: {
                        background: '#fecaca',
                      },
                    })

                    setShowSubmitLoading(false)
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

                    toast.error(
                      `${
                        userCreateError.code === '23505'
                          ? 'Username is already taken'
                          : userCreateError.message
                      }`,
                      {
                        style: {
                          background: '#fecaca',
                        },
                      },
                    )

                    setShowSubmitLoading(false)
                    return
                  } else {
                    router.push(`/${newUser.username}`)
                  }
                }}
                className="custom-gradient mt-6 w-full rounded-md text-white"
              >
                Submit
              </Button>

              {showSubmitLoading && (
                <div className="mx-auto flex flex-row items-center gap-2">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="text-xs text-neutral-500">
                    Creating your planner...
                  </span>
                </div>
              )}
            </div>

            <img
              src="/puzzle.png"
              alt="Confirm information"
              className="pointer-events-none hidden max-w-md xl:block"
            />
          </>
        )}
      </div>
    </>
  )
}
