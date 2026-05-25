import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ ok: true, data: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ok: true, data: body }, { status: 201 })
}
