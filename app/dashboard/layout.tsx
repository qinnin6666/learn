'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { trpc } from '../_trpc/client'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: user } = trpc.user.me.useQuery()
  return (
    <MaxWidthWrapper>
      <div>hello {user?.name}</div>
      <div>{children}</div>
    </MaxWidthWrapper>
  )
}
