import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { item: string } }) {
    console.log(params)
    return NextResponse.json({ a: 1, b: 2 }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}

export async function POST(request: Request) {
    const formData = await request.formData()
    console.log(formData)
    const name = formData.get('name')
    const email = formData.get('email')
    return NextResponse.json({ name, email })
}