import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { COOKIE_NAME } from '@/lib/constants'

export async function GET() {
  const token = cookies().get(COOKIE_NAME)
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { value } = token
    const jwtpayload = await verifyToken(value)

    return NextResponse.json({ user: jwtpayload.iss }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 })
  }
}
