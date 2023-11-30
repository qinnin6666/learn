'use client'
import { trpc } from '@/app/_trpc/client'
import { useRouter } from 'next/navigation'

function Singup() {
  const { push } = useRouter()

  const {
    mutate: register,
    isError,
    error
  } = trpc.user.register.useMutation({
    onSuccess(data) {
      push('/dashboard')
      localStorage.setItem('user', JSON.stringify(data))
    }
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
      role: event.currentTarget.roles.value
    }

    await register(payload)
  }

  return (
    <main className="flex min-h-screen flex-col items-center mt-14 p-24">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">Sign UP</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <div>
          <label htmlFor="username" className="inline-block w-24">
            Username
          </label>
          <input type="text" name="username" required className="border rounded border-black" />
        </div>
        <div>
          <label htmlFor="password" className="inline-block w-24">
            Password
          </label>
          <input type="password" name="password" required className="border rounded border-black" />
        </div>
        <div>
          <label htmlFor="roles" className="inline-block w-24">
            Role
          </label>
          <select name="roles" defaultValue="customer">
            <option value="admin">管理员</option>
            <option value="customer">普通用户</option>
          </select>
        </div>

        {isError && <div className="text-red-500">登陆失败,{error.message}</div>}

        <button type="submit" className="p-2 bg-orange-600 text-white w-fit rounded self-center">
          Submit
        </button>
      </form>
    </main>
  )
}

export default Singup
