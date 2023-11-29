'use client'
import { trpc } from '@/app/_trpc/client'

const Logout = () => {
  const { mutate: logout } = trpc.user.logout.useMutation()
  return (
    <button
      onClick={() => logout()}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors h-10 px-2 py-1 bg-slate-600 hover:bg-slate-800 text-white"
    >
      logout
    </button>
  )
}

export default Logout
