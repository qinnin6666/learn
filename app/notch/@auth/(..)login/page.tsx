'use client'
import { useRouter } from 'next/navigation'
import Modal from '@/components/modal/Modal'

export default function Login() {
  const router = useRouter()
  console.log(123, router)
  return (
    <Modal>
      <h1>Login3333</h1>
      <h2>modal</h2>
      <span onClick={() => router.back()}>Close modal</span>
      {/* ... */}
    </Modal>
  )
}