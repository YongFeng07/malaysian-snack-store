import { NextResponse } from 'next/server'
import { checkoutSchema } from '@/lib/validations/order'

export async function POST(request: Request) {
  const payload = await request.json()
  const parsed = checkoutSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    data: {
      orderNumber: `ORD-${Date.now()}`,
      status: 'pending',
      ...parsed.data,
    },
  }, { status: 201 })
}
