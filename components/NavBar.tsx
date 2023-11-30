'use client'
import Link from 'next/link'
import React, { FC } from 'react'
import Logout from './Logout'
import { trpc } from '@/app/_trpc/client'

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  const { data: user } = trpc.user.me.useQuery()

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="max-w-5xl mx-auto relative h-full">
        <div className="flex justify-center gap-12 items-center h-full">
          <Link href="/dashboard" className="bg-red-400 text-white px-2 py-1 rounded">
            dashboard
          </Link>
          <Link href="/todo" className="bg-red-400 text-white px-2 py-1 rounded">
            todo
          </Link>
          <Link href="/notch">notch</Link>
          <Link href="/dash">dash</Link>
          <Link href="/canvas">canvas</Link>
          <Link href="/post/post-one">post</Link>
        </div>
        <div className="absolute right-0 top-0 h-full flex justify-end items-center gap-1">
          {user ? <div>{user.name}</div> : (
            <>
              <LinkButton href="/login" />
              <LinkButton href="/signup" />
            </>
          )}

          <Logout />
        </div>
      </div>
    </nav>
  )
}

function LinkButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors h-10 px-2 py-1 bg-slate-600 hover:bg-slate-800 text-white"
    >
      {href.slice(1)}
    </Link>
  )
}

export default NavBar
