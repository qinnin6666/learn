import Link from 'next/link'
import React from 'react'

const Notch = () => {
  return (
    <div className="bg-fuchsia-200 text-white rounded flex gap-8 justify-center items-center">
      {['/login', '/signup'].map(i => (
        <Link
          href={i}
          key={i}
          className="bg-slate-500 text-white px-4 py-2 rounded-lg cursor-pointer w-24 text-center">
          {i.slice(1)}
        </Link>
      ))}
    </div>
  )
}

export default Notch
