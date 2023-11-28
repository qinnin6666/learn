import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/lib/auth'
import { COOKIE_MAX_AGE, COOKIE_NAME } from '@/lib/constants'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { username, password } = body
  if (username !== 'admin' || password !== '111111') {
    return NextResponse.json({ message: new Error('Unauthorized') }, { status: 401 })
  }

  const token = await generateToken(username, 'admin')

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  })
  return NextResponse.json({ message: 'Authenticated' }, { status: 200 })
}
