import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from 'next/headers'
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    console.log(111, cookieStore, token)

    const headersList = headers()
    const userAgent = headersList.get('User-Agent')
    console.log(222, headersList, userAgent)

    const url = new URL(req.url)
    console.log(333, url)
    // return NextResponse.json({ a: 1, b: 2 }, {
    //     status: 200
    // })

    redirect('https://nextjs.org/')
}

export async function POST(req: NextRequest) {
    const res = await req.json()
    console.log(123, res)
    return NextResponse.json(res)
}
