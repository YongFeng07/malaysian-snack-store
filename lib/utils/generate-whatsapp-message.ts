import { CartItem } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils/format-price'

export function generateWhatsAppMessage(order: {
  orderNumber?: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  deliveryNotes?: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
}) {
  const itemsList = order.items
    .map((item) => `- ${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`)
    .join('\n')

  return `NEW ORDER ${order.orderNumber ? `#${order.orderNumber}` : ''}

Customer Details
Name: ${order.customerName}
Phone: ${order.customerPhone}
Address: ${order.deliveryAddress}

Items Ordered
${itemsList}

Summary
Subtotal: ${formatPrice(order.subtotal)}
Delivery: ${order.deliveryFee ? formatPrice(order.deliveryFee) : 'Free'}
SST estimate: ${formatPrice(order.tax)}
Total: ${formatPrice(order.total)}

${order.deliveryNotes ? `Notes\n${order.deliveryNotes}\n\n` : ''}Status: Pending confirmation`
}

export function getWhatsAppLink(phoneNumber: string, message: string) {
  return `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
