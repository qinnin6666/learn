import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, MAX_AGE } from '../constants'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { username, password } = body
  if (username !== 'admin' || password !== '111111') {
    return NextResponse.json({ message: new Error('Unauthorized') }, { status: 401 })
  }

  const token = sign({ username }, process.env.JWT_SECRET, { expiresIn: MAX_AGE })

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/'
  })
  return NextResponse.json({ message: 'Authenticated' }, { status: 200 })
}
