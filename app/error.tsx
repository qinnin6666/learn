'use client'
import Link from 'next/link'
import { FC } from 'react'

interface errorProps {
  error: Error
  reset: () => void
}

const error: FC<errorProps> = ({ error, reset }) => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-gray-700">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50 m-4">
          {error.message || 'something went wrong'}
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  cursor-pointer"
            onClick={reset}>
            Try Again
          </div>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default error
