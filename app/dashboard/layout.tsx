'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserResponse {
  user: string | null
  err: Error | null
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [user, setUser] = useState<UserResponse['user']>()
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      const { user, err } = await getUser()
      if (err) {
        router.push('/login')
        return
      }
      setIsSuccess(true)
      setUser(user)
    })()
  }, [router])

  if (!isSuccess) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div>hello {user}</div>
      <div>{children}</div>
    </div>
  )
}

async function getUser(): Promise<UserResponse> {
  const res = await fetch('/api/auth/me')
  const data = await res.json()

  if (res.status === 200) {
    return { user: data.user, err: null }
  }
  return { user: null, err: data.message }
}
