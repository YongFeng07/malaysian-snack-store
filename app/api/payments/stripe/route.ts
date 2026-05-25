import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { orderId } = await request.json()
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('your_')) {
    return NextResponse.json({ ok: true, url: `/account/orders?payment=stripe-demo&orderId=${orderId}` })
  }

  return NextResponse.json({ ok: false, error: 'Stripe checkout creation should be connected with live keys.' }, { status: 501 })
}
