import { NextRequest, NextResponse } from 'next/server'
import { verifyToken as verify } from './lib/auth'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('user-token')?.value
  const verifyToken =
    token &&
    (await verify(token).catch(err => {
      console.log(err)
    }))
  console.log(222)

  if (req.nextUrl.pathname.startsWith('/login') && !verifyToken) {
    return
  }

  if (req.url.includes('/login') && verifyToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  if (!verifyToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard', '/login']
}
