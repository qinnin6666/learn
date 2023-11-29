'use client'
import { useRouter } from 'next/navigation'
import Modal from '@/components/modal/Modal'
import Login from '@/app/(auth)/login/page'

export default function Login2() {
  const router = useRouter()
  return (
    <Modal>
      <div className="bg-white max-h-[360px] rounded relative">
        <Login />
        <span
          onClick={() => router.back()}
          className="absolute right-2 top-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer">
          X
        </span>
      </div>
    </Modal>
  )
}
