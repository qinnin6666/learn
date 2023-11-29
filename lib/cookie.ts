import { cookies } from 'next/headers'
import { COOKIE_MAX_AGE, COOKIE_NAME } from './constants'

export function loginSetCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  })
}

export function logoutClearCookie() {
  cookies().delete(COOKIE_NAME)
}
