import type { CartItem } from '@/store/cart-store'

export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'delivered' | 'cancelled'
export type PaymentMethod = 'whatsapp' | 'toyyibpay' | 'stripe' | 'qr' | 'cod'

export interface CheckoutPayload {
  customerName: string
  customerEmail?: string
  customerPhone: string
  deliveryAddress: string
  deliveryNotes?: string
  paymentMethod: PaymentMethod
  couponCode?: string
  items: CartItem[]
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  delivery_address: string
  total_amount: number
  status: OrderStatus
  payment_status: string
  created_at: string
}
