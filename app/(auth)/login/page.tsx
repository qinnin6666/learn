'use client'
import { trpc } from '@/app/_trpc/client'
import { useRouter } from 'next/navigation'

function Login() {
  const { push } = useRouter()
  const login = trpc.user.login.useMutation({
    onMutate: () => {
      console.log(111)
    },
    onSuccess: data => {
      console.log(data)
      push('/dashboard')
    },
    onError: err => {
      console.log(999, err.message)
    }
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value
    }

    await login.mutateAsync(payload)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Nextjs authentication JWT verify http cookie only</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <div>
          <label htmlFor="username" className="inline-block w-24">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="border rounded border-black"
          />
        </div>
        <div>
          <label htmlFor="password" className="inline-block w-24">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border rounded border-black"
          />
        </div>

        <button type="submit" className="p-2 bg-orange-600 text-white w-fit rounded self-center">
          Submit
        </button>
      </form>
    </main>
  )
}

export default Login
