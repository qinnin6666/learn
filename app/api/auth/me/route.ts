import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '../constants'
import { JwtPayload, verify } from 'jsonwebtoken'

export function GET() {
  const token = cookies().get(COOKIE_NAME)
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { value } = token
    const jwtpayload = verify(value, process.env.JWT_SECRET) as JwtPayload

    return NextResponse.json({ user: jwtpayload.username }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 })
  }
}
