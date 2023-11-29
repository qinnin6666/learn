import { COOKIE_NAME } from '@/lib/constants'
import { NextRequest } from 'next/server'
import { verifyToken as verify } from '@/lib/auth'
import { db } from '@/db'

export async function createContext(req: NextRequest) {
  console.log(100)
  const token = req.cookies.get(COOKIE_NAME)?.value
  console.log(11, token)

  if (!token) {
    return {
      req,
      db,
      isAdmin: ''
    }
  }

  const verifyToken = await verify(token).catch(err => {
    console.log(err)
  })

  const isAdmin = verifyToken?.isAdmin

  return {
    req,
    db,
    isAdmin
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
