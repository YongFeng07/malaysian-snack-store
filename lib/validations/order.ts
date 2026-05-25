import { z } from 'zod'

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Enter a valid email').optional().or(z.literal('')),
  customerPhone: z.string().min(8, 'Phone number is required'),
  deliveryAddress: z.string().min(10, 'Delivery address is required'),
  deliveryNotes: z.string().optional(),
  paymentMethod: z.enum(['whatsapp', 'toyyibpay', 'stripe', 'qr', 'cod']),
  couponCode: z.string().optional(),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
