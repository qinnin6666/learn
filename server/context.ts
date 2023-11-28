import { COOKIE_NAME } from '@/lib/constants'
import { NextRequest } from 'next/server'
import { verifyToken as verify } from '@/lib/auth'

export async function createContext(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return {
      req,
      isAdmin: ''
    }
  }

  const verifyToken = await verify(token).catch(err => {
    console.log(err)
  })

  const isAdmin = verifyToken?.isAdmin

  return {
    req,
    isAdmin
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
