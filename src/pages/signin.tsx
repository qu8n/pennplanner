import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
// import { Database } from '@/types/supabase';
import { useRouter } from 'next/router'

export default function SignIn() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [showUsernameForm, setShowUsernameForm] = useState(false)
  const [newUsername, setNewUsername] = useState('')

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
          setShowUsernameForm(true)
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

  if (showUsernameForm) {
    return (
      <div>
        <label
          htmlFor="newUsername"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          New username
        </label>
        <input
          type="text"
          value={newUsername}
          onKeyUp={async (e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              const { error } = await supabaseClient.from('users').insert([
                {
                  username: newUsername,
                  id: user?.id,
                  avatar_url: user?.user_metadata.avatar_url,
                  full_name: user?.user_metadata.full_name,
                },
              ])
              if (error) {
                console.error(error)
                return
              } else {
                router.push(`/${newUsername}`)
              }
            }
          }}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
    )
  }
}
