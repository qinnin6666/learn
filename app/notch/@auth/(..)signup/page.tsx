'use client'
import { useRouter } from 'next/navigation'
import Singup from '@/app/(auth)/signup/page'
import Modal from '@/components/modal/Modal'

function Singup2() {
  const router = useRouter()

  return (
    <Modal>
      <div className="bg-white max-h-[460px] rounded relative">
        <Singup />
        <span
          onClick={() => router.back()}
          className="absolute right-2 top-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer">
          X
        </span>
      </div>
    </Modal>
  )
}

export default Singup2
