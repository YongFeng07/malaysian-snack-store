import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json()
  const { id } = await params
  return NextResponse.json({ ok: true, data: { id, ...body } })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return NextResponse.json({ ok: true, data: { id } })
}
