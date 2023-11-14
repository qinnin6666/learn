import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // console.log(request)
    // const { pathname, searchParams } = request.nextUrl
    // console.log({ pathname, a: searchParams.get('a') })
    return NextResponse.next()
    // return NextResponse.redirect(new URL('/dash', request.url))
    // return NextResponse.rewrite(new URL('/dash', request.url))

    // let cookies = request.cookies.getAll()
    // console.log(cookies)
    // const res = NextResponse.next()
    // res.cookies.set('vercel', 'fast')
    // res.cookies.set({
    //     name: 'vercel',
    //     value: 'fast',
    //     path: '/',
    // })
    // return res

    // return NextResponse.json({message: 'hello from middleware'})
}

export const config = {
    matcher: '/dashboard/:path*',
}