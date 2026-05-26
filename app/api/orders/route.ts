import { NextResponse } from 'next/server'
import { checkoutSchema } from '@/lib/validations/order'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient as createServerSupabaseClient } from '@/lib/supabase/server'

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

interface CheckoutItem {
  id?: string
  name?: string
  price?: number | string
  quantity?: number | string
}

function isUuid(value: string) {
  return uuidPattern.test(value)
}

export async function POST(request: Request) {
  const payload = await request.json()
  const parsed = checkoutSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 })
  }

  const items: CheckoutItem[] = Array.isArray(payload.items) ? payload.items : []
  if (!items.length) {
    return NextResponse.json({ ok: false, error: 'Cart is empty' }, { status: 400 })
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0)
  const deliveryFee = subtotal > 50 ? 0 : 8
  const tax = subtotal * 0.06
  const total = subtotal + deliveryFee + tax
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  try {
    const supabase = createAdminClient()
    const authClient = await createServerSupabaseClient()
    const { data: { user } } = await authClient.auth.getUser()
    const userId = user?.id && isUuid(user.id) ? user.id : null

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: userId,
        customer_name: parsed.data.customerName,
        customer_email: parsed.data.customerEmail || `${parsed.data.customerPhone}@rasa.local`,
        customer_phone: parsed.data.customerPhone,
        delivery_address: parsed.data.deliveryAddress,
        delivery_notes: parsed.data.deliveryNotes,
        subtotal,
        delivery_fee: deliveryFee,
        tax_amount: tax,
        total_amount: total,
        coupon_code: parsed.data.couponCode || null,
        status: 'pending',
        payment_method: parsed.data.paymentMethod === 'whatsapp' || parsed.data.paymentMethod === 'cod' ? 'cash' : parsed.data.paymentMethod,
        payment_status: 'pending',
      })
      .select('id, order_number, total_amount')
      .single()

    if (orderError) {
      return NextResponse.json({ ok: false, error: orderError.message, details: orderError }, { status: 400 })
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: typeof item.id === 'string' && isUuid(item.id) ? item.id : null,
      product_name: String(item.name),
      product_price: Number(item.price),
      quantity: Number(item.quantity),
      total_price: Number(item.price) * Number(item.quantity),
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) {
      return NextResponse.json({ ok: false, error: itemsError.message, details: itemsError }, { status: 400 })
    }

    return NextResponse.json({ ok: true, data: { order, subtotal, deliveryFee, tax, total } }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create order'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
